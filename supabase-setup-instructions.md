# Supabase Local Setup Instructions for EduLearn Platform

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Docker Desktop (for local Supabase instance)
- Git

## Step 1: Install Supabase CLI

### On macOS (using Homebrew)
```bash
brew install supabase/tap/supabase
```

### On Windows (using Scoop)
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### On Linux/macOS/Windows (using npm)
```bash
npm install -g supabase
```

## Step 2: Initialize Supabase in Your Project

1. Navigate to your project directory:
```bash
cd /home/ubuntu/app/edulearn_platform
```

2. Initialize Supabase:
```bash
supabase init
```

This creates a `supabase` folder in your project with configuration files.

## Step 3: Start Local Supabase Instance

1. Start the local Supabase stack:
```bash
supabase start
```

This command will:
- Pull and start Docker containers for PostgreSQL, PostgREST, Realtime, Storage, etc.
- Create local development URLs and keys
- Display connection details

2. Note the output which will include:
- **API URL**: `http://localhost:54321`
- **DB URL**: `postgresql://postgres:postgres@localhost:54322/postgres`
- **Studio URL**: `http://localhost:54323`
- **Inbucket URL**: `http://localhost:54324`
- **anon key**: (for client-side usage)
- **service_role key**: (for server-side usage)

## Step 4: Install Supabase JavaScript Client

```bash
npm install @supabase/supabase-js
```

## Step 5: Configure Environment Variables

Update your `.env` file with Supabase configuration:

```env
# Existing variables
REACT_APP_API_URL=http://localhost:3001
VITE_APP_TITLE="EduLearn Platform"

# Supabase Configuration
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your_anon_key_from_supabase_start_output
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_from_supabase_start_output
```

## Step 6: Create Supabase Client Configuration

Create a new file for Supabase configuration:

**File: `src/lib/supabase.js`**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
```

## Step 7: Set Up Database Schema

Create your database schema by either:

### Option A: Using Supabase Studio
1. Open `http://localhost:54323` in your browser
2. Use the visual interface to create tables
3. Set up Row Level Security (RLS) policies

### Option B: Using SQL Migrations
1. Create a new migration:
```bash
supabase migration new create_courses_schema
```

2. Edit the generated SQL file in `supabase/migrations/` to define your schema:
```sql
-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  duration TEXT,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  enrollment_count INTEGER DEFAULT 0,
  is_bestseller BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  language TEXT DEFAULT 'English',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Courses are viewable by everyone" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

3. Apply the migration:
```bash
supabase db reset
```

## Step 8: Seed Sample Data

Create a seed file to populate your database with sample courses:

**File: `supabase/seed.sql`**
```sql
-- Insert sample courses
INSERT INTO courses (
  title, description, instructor, category, thumbnail_url, price, original_price, 
  rating, review_count, duration, difficulty, enrollment_count, is_bestseller, 
  tags, language
) VALUES 
(
  'Complete React Development Bootcamp',
  'Master React from fundamentals to advanced concepts including hooks, context, Redux, and modern development practices.',
  'Sarah Johnson',
  'technology',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
  89.99,
  199.99,
  4.8,
  2847,
  '42 hours',
  'Intermediate',
  15420,
  true,
  ARRAY['React', 'JavaScript', 'Frontend', 'Web Development'],
  'English'
),
(
  'Digital Marketing Masterclass',
  'Comprehensive digital marketing course covering SEO, social media marketing, email campaigns, and analytics.',
  'Michael Chen',
  'business',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
  69.99,
  149.99,
  4.6,
  1923,
  '28 hours',
  'Beginner',
  8765,
  false,
  ARRAY['Marketing', 'SEO', 'Social Media', 'Analytics'],
  'English'
);
```

## Step 9: Update Course Library to Use Supabase

Modify your course library to fetch data from Supabase instead of mock data:

**File: `src/hooks/useCourses.js`**
```javascript
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCourses = async (filters = {}) => {
    try {
      setLoading(true)
      let query = supabase.from('courses').select('*')

      // Apply filters
      if (filters.category && filters.category !== 'All') {
        query = query.eq('category', filters.category.toLowerCase())
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,instructor.ilike.%${filters.search}%`)
      }

      if (filters.difficulty && filters.difficulty.length > 0) {
        query = query.in('difficulty', filters.difficulty)
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        query = query.gte('price', min).lte('price', max)
      }

      if (filters.rating) {
        query = query.gte('rating', filters.rating)
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'rating':
          query = query.order('rating', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'price-low':
          query = query.order('price', { ascending: true })
          break
        case 'price-high':
          query = query.order('price', { ascending: false })
          break
        default:
          query = query.order('enrollment_count', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error

      setCourses(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const enrollInCourse = async (courseId, userId) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({ user_id: userId, course_id: courseId })

      if (error) throw error

      // Update local state
      setCourses(prev => prev.map(course => 
        course.id === courseId 
          ? { ...course, enrollment_count: course.enrollment_count + 1 }
          : course
      ))

      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    fetchCourses,
    enrollInCourse
  }
}
```

## Step 10: Authentication Setup (Optional)

If you want to add user authentication:

```javascript
// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  }
}
```

## Step 11: Running and Testing

1. Make sure Supabase is running:
```bash
supabase status
```

2. Start your React development server:
```bash
npm start
```

3. Test the integration by:
   - Viewing courses in the Course Library
   - Testing search and filter functionality
   - Enrolling in courses (if authentication is implemented)

## Step 12: Common Commands

```bash
# Stop Supabase
supabase stop

# Reset database (applies all migrations)
supabase db reset

# Create new migration
supabase migration new migration_name

# Generate TypeScript types from your schema
supabase gen types typescript --local > src/types/supabase.ts

# View logs
supabase logs
```

## Troubleshooting

1. **Docker issues**: Ensure Docker Desktop is running
2. **Port conflicts**: Stop other services running on ports 54321-54324
3. **Permission errors**: Run commands with appropriate permissions
4. **Environment variables**: Ensure all Supabase environment variables are correctly set

## Production Deployment

When ready for production:

1. Create a Supabase project at https://supabase.com
2. Update environment variables with production URLs and keys
3. Deploy your database schema using migrations
4. Configure production authentication settings

This setup provides a complete local development environment with Supabase integration for your EduLearn Platform.
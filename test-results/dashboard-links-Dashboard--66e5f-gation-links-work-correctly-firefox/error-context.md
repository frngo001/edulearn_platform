# Test info

- Name: Dashboard Links E2E Test >> should verify all dashboard navigation links work correctly
- Location: /Users/francloicngongangfanang/edulearn_platform/tests/e2e/dashboard-links.test.js:23:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="dashboard-content"], .max-w-7xl, main') to be visible

    at /Users/francloicngongangfanang/edulearn_platform/tests/e2e/dashboard-links.test.js:16:16
```

# Page snapshot

```yaml
- navigation:
  - link "EduLearn":
    - /url: /
    - img
    - text: EduLearn
  - link "← Back to Home":
    - /url: /
- heading "Welcome back" [level=1]
- paragraph: Sign in to your account to continue learning
- text: Email address
- textbox "Email address"
- text: Password
- textbox "Password"
- checkbox "Remember me"
- text: Remember me
- link "Forgot password?":
  - /url: "#"
- button "Sign in":
  - text: Sign in
  - img
- text: Or continue with
- button "Continue with Google":
  - img
  - text: Continue with Google
- button "Continue with GitHub":
  - img
  - text: Continue with GitHub
- button "Continue with Microsoft":
  - img
  - text: Continue with Microsoft
- paragraph:
  - text: Don't have an account?
  - button "Sign up here"
- img
- text: Secure login
- img
- text: 50K+ students
- img
- text: 4.9/5 rating
```

# Test source

```ts
   1 | const { test, expect, devices } = require('@playwright/test');
   2 |
   3 | test.describe('Dashboard Links E2E Test', () => {
   4 |   let page;
   5 |
   6 |   test.beforeEach(async ({ browser }) => {
   7 |     page = await browser.newPage();
   8 |     
   9 |     // Navigate to the dashboard
   10 |     await page.goto('/dashboard');
   11 |     
   12 |     // Wait for the page to load
   13 |     await page.waitForLoadState('networkidle');
   14 |     
   15 |     // Wait for dashboard components to load
>  16 |     await page.waitForSelector('[data-testid="dashboard-content"], .max-w-7xl, main', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   17 |   });
   18 |
   19 |   test.afterEach(async () => {
   20 |     await page.close();
   21 |   });
   22 |
   23 |   test('should verify all dashboard navigation links work correctly', async () => {
   24 |     console.log('🚀 Starting Dashboard Links E2E Test');
   25 |     
   26 |     // Define all expected navigation routes and their verification selectors
   27 |     const expectedLinks = [
   28 |       // Bottom Tab Navigation Links
   29 |       {
   30 |         name: 'Dashboard Tab',
   31 |         selector: 'text=Dashboard',
   32 |         expectedRoute: '/dashboard',
   33 |         verification: 'text=Good morning, || text=Good afternoon, || text=Good evening,'
   34 |       },
   35 |       {
   36 |         name: 'My Courses Tab',
   37 |         selector: 'text=Courses',
   38 |         expectedRoute: '/my-courses',
   39 |         verification: 'text=My Courses, h1, h2'
   40 |       },
   41 |       {
   42 |         name: 'Study Tab',
   43 |         selector: 'text=Study',
   44 |         expectedRoute: '/flashcard-study-interface',
   45 |         verification: 'text=Flashcards, h1, h2'
   46 |       },
   47 |       {
   48 |         name: 'Progress Tab',
   49 |         selector: 'text=Progress',
   50 |         expectedRoute: '/study-progress',
   51 |         verification: 'text=Progress, h1, h2'
   52 |       },
   53 |       {
   54 |         name: 'Learning Goals Tab',
   55 |         selector: 'text=Learning Goals',
   56 |         expectedRoute: '/learning-goals',
   57 |         verification: 'text=Learning Goals, h1, h2'
   58 |       },
   59 |       {
   60 |         name: 'Planning Tab',
   61 |         selector: 'text=Planning',
   62 |         expectedRoute: '/study-schedule',
   63 |         verification: 'text=Schedule, h1, h2'
   64 |       },
   65 |       {
   66 |         name: 'Settings Tab',
   67 |         selector: 'text=Settings',
   68 |         expectedRoute: '/user-profile-settings',
   69 |         verification: 'text=Profile Settings, text=Settings, h1, h2'
   70 |       }
   71 |     ];
   72 |
   73 |     // Quick Actions Links (from QuickActions component)
   74 |     const quickActionLinks = [
   75 |       {
   76 |         name: 'Browse Courses',
   77 |         selector: 'text=Browse Courses',
   78 |         expectedRoute: '/course-library',
   79 |         verification: 'text=Course Library, h1, h2'
   80 |       },
   81 |       {
   82 |         name: 'Create Flashcards',
   83 |         selector: 'text=Create Flashcards',
   84 |         expectedRoute: '/flashcards',
   85 |         verification: 'text=Flashcards, h1, h2'
   86 |       },
   87 |       {
   88 |         name: 'AI Assistant',
   89 |         selector: 'text=AI Assistant',
   90 |         expectedRoute: '/ai-chat-assistant',
   91 |         verification: 'text=AI Assistant, text=Chat, h1, h2'
   92 |       },
   93 |       {
   94 |         name: 'Learning Goals Quick',
   95 |         selector: '[data-testid="quick-learning-goals"], button:has-text("Learning Goals"):not([role="tab"])',
   96 |         expectedRoute: '/learning-goals',
   97 |         verification: 'text=Learning Goals, h1, h2'
   98 |       },
   99 |       {
  100 |         name: 'Profile Settings Quick',
  101 |         selector: '[data-testid="quick-profile-settings"], button:has-text("Profile Settings")',
  102 |         expectedRoute: '/user-profile-settings',
  103 |         verification: 'text=Profile Settings, text=Settings, h1, h2'
  104 |       }
  105 |     ];
  106 |
  107 |     // Test each navigation link
  108 |     for (const link of expectedLinks) {
  109 |       console.log(`🔍 Testing navigation link: ${link.name}`);
  110 |       
  111 |       try {
  112 |         // Go back to dashboard first
  113 |         await page.goto('/dashboard');
  114 |         await page.waitForLoadState('networkidle');
  115 |         
  116 |         // Wait for the link to be visible and clickable
```
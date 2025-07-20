import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';

import { useUserProfile } from 'lib/hooks/useUserProfile';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Mock course data - in production, this would be fetched from API
  const mockCourseData = {
    1: {
      id: 1,
      title: "Complete React Development Bootcamp",
      subtitle: "Master React from fundamentals to advanced concepts including hooks, context, Redux, and modern development practices",
      instructor: {
        name: "Sarah Johnson",
        title: "Senior Frontend Engineer at Meta",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        students: 45000,
        courses: 12,
        bio: "Sarah is a senior frontend engineer with 8+ years of experience building scalable web applications. She has worked at companies like Meta, Netflix, and Spotify, and is passionate about teaching modern React development."
      },
      category: "Technology",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      videoPreview: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      rating: 4.8,
      reviewCount: 2847,
      duration: "42 hours",
      lectures: 156,
      difficulty: "Intermediate",
      enrollmentCount: 15420,
      price: 89.99,
      originalPrice: 199.99,
      isBestseller: true,
      lastUpdated: "January 2024",
      language: "English",
      captions: true,
      certificate: true,
      description: `This comprehensive React course will take you from absolute beginner to advanced React developer. You'll learn not just React, but the entire ecosystem around it including modern JavaScript, hooks, context API, Redux, testing, and deployment.

The course is project-based, meaning you'll build real applications throughout the course rather than just following along with simple examples. By the end, you'll have built 5 complete projects including a social media app, e-commerce platform, and task management application.

What makes this course special is the focus on industry best practices and modern development workflows. You'll learn the same techniques used by developers at top tech companies like Facebook, Netflix, and Airbnb.`,
      whatYouWillLearn: [
        "Build modern, responsive web applications with React",
        "Master React Hooks including useState, useEffect, useContext, and custom hooks",
        "Implement state management with Context API and Redux Toolkit",
        "Create reusable component libraries and design systems",
        "Test React applications with Jest and React Testing Library",
        "Deploy applications to production with Vercel, Netlify, and AWS",
        "Optimize React applications for performance and SEO",
        "Work with APIs and handle asynchronous operations",
        "Implement authentication and authorization",
        "Build responsive designs with CSS-in-JS and styled-components"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Understanding of ES6+ JavaScript features (arrow functions, destructuring, etc.)",
        "A computer with internet connection",
        "Text editor (VS Code recommended)",
        "Node.js installed on your computer"
      ],
      curriculum: [
        {
          id: 1,
          title: "Getting Started with React",
          duration: "3h 45m",
          lectures: 18,
          lessons: [
            { id: 1, title: "Course Introduction and Setup", duration: "12:30", type: "video", isPreview: true },
            { id: 2, title: "What is React and Why Use It?", duration: "15:45", type: "video", isPreview: true },
            { id: 3, title: "Setting Up Development Environment", duration: "18:22", type: "video", isPreview: false },
            { id: 4, title: "Creating Your First React App", duration: "22:15", type: "video", isPreview: false },
            { id: 5, title: "Understanding JSX", duration: "16:30", type: "video", isPreview: false },
            { id: 6, title: "Components and Props", duration: "25:40", type: "video", isPreview: false },
          ]
        },
        {
          id: 2,
          title: "React Components Deep Dive",
          duration: "4h 20m",
          lectures: 22,
          lessons: [
            { id: 7, title: "Functional vs Class Components", duration: "20:15", type: "video", isPreview: false },
            { id: 8, title: "Understanding State", duration: "18:30", type: "video", isPreview: false },
            { id: 9, title: "Event Handling", duration: "16:45", type: "video", isPreview: false },
            { id: 10, title: "Conditional Rendering", duration: "14:20", type: "video", isPreview: false },
            { id: 11, title: "Lists and Keys", duration: "19:35", type: "video", isPreview: false },
            { id: 12, title: "Practice Exercise: Todo App", duration: "45:00", type: "exercise", isPreview: false },
          ]
        },
        {
          id: 3,
          title: "React Hooks Mastery",
          duration: "5h 15m",
          lectures: 28,
          lessons: [
            { id: 13, title: "Introduction to Hooks", duration: "12:00", type: "video", isPreview: false },
            { id: 14, title: "useState Hook Deep Dive", duration: "24:30", type: "video", isPreview: false },
            { id: 15, title: "useEffect Hook and Side Effects", duration: "32:15", type: "video", isPreview: false },
            { id: 16, title: "useContext for State Management", duration: "28:45", type: "video", isPreview: false },
            { id: 17, title: "Custom Hooks Creation", duration: "26:20", type: "video", isPreview: false },
            { id: 18, title: "useReducer for Complex State", duration: "22:30", type: "video", isPreview: false },
          ]
        },
        {
          id: 4,
          title: "Advanced React Patterns",
          duration: "6h 30m",
          lectures: 32,
          lessons: [
            { id: 19, title: "Higher-Order Components", duration: "25:15", type: "video", isPreview: false },
            { id: 20, title: "Render Props Pattern", duration: "22:30", type: "video", isPreview: false },
            { id: 21, title: "Compound Components", duration: "28:45", type: "video", isPreview: false },
            { id: 22, title: "React.memo and Performance", duration: "24:20", type: "video", isPreview: false },
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          user: {
            name: "Alex Thompson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
            title: "Frontend Developer"
          },
          rating: 5,
          date: "2 weeks ago",
          content: "This course is absolutely fantastic! Sarah's teaching style is clear and engaging. The projects are real-world applicable and the pacing is perfect. I went from knowing basic JavaScript to confidently building React applications.",
          helpful: 24
        },
        {
          id: 2,
          user: {
            name: "Maria Garcia",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=50&h=50&fit=crop&crop=face",
            title: "Web Developer"
          },
          rating: 5,
          date: "1 month ago",
          content: "Best React course I've taken! The curriculum is well-structured and covers everything you need to know. The instructor's explanations are crystal clear and the hands-on projects really help cement the concepts.",
          helpful: 18
        },
        {
          id: 3,
          user: {
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
            title: "Software Engineer"
          },
          rating: 4,
          date: "3 weeks ago",
          content: "Great course overall. Very comprehensive and up-to-date with modern React practices. The only minor issue is that some sections could be a bit more concise, but the content quality is excellent.",
          helpful: 12
        }
      ],
      relatedCourses: [
        {
          id: 2,
          title: "Advanced JavaScript ES6+",
          instructor: "John Doe",
          rating: 4.7,
          price: 69.99,
          thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop"
        },
        {
          id: 3,
          title: "Node.js Backend Development",
          instructor: "Jane Smith",
          rating: 4.6,
          price: 79.99,
          thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop"
        }
      ]
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'curriculum', label: 'Curriculum', icon: 'BookOpen' },
    { id: 'instructor', label: 'Instructor', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  useEffect(() => {
    // Simulate API call to fetch course data
    setTimeout(() => {
      const courseData = mockCourseData[courseId];
      if (courseData) {
        setCourse(courseData);
        // Check if user is already enrolled (mock check)
        setIsEnrolled(false); // In production, check from user's enrolled courses
      }
      setIsLoading(false);
    }, 1000);
  }, [courseId]);

  const handleEnroll = () => {
    if (!userProfile) {
      navigate('/signin');
      return;
    }
    setShowEnrollModal(true);
  };

  const confirmEnrollment = () => {
    setIsEnrolled(true);
    setShowEnrollModal(false);
    // In production, make API call to enroll user
  };

  const handleStartLearning = () => {
    navigate(`/course/${course.id}/learn`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Icon name="Star" size={16} className="text-gray-300 dark:text-gray-600" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* What You'll Learn */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-4">
          What you'll learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {course.whatYouWillLearn.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <span className="text-text-secondary dark:text-dark-text-secondary">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Description */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-4">
          Course Description
        </h3>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-text-secondary dark:text-dark-text-secondary whitespace-pre-line">
            {course.description}
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-4">
          Requirements
        </h3>
        <ul className="space-y-2">
          {course.requirements.map((requirement, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="Dot" size={16} className="text-text-tertiary dark:text-dark-text-tertiary mt-2 flex-shrink-0" />
              <span className="text-text-secondary dark:text-dark-text-secondary">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderCurriculum = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
          Course Content
        </h3>
        <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
          {course.curriculum.length} sections • {course.lectures} lectures • {course.duration}
        </div>
      </div>

      {course.curriculum.map((module) => (
        <div key={module.id} className="border border-border dark:border-dark-border rounded-lg">
          <button
            onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            <div>
              <h4 className="font-heading font-medium text-text-primary dark:text-dark-text-primary mb-1">
                {module.title}
              </h4>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {module.lectures} lectures • {module.duration}
              </p>
            </div>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-200 ${
                expandedModule === module.id ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedModule === module.id && (
            <div className="border-t border-border dark:border-dark-border">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 border-t border-border dark:border-dark-border first:border-t-0">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={lesson.type === 'video' ? 'Play' : 'FileText'} 
                      size={16} 
                      className="text-text-tertiary dark:text-dark-text-tertiary" 
                    />
                    <span className="text-text-primary dark:text-dark-text-primary">{lesson.title}</span>
                    {lesson.isPreview && (
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs px-2 py-1 rounded">
                        Preview
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {lesson.duration}
                    </span>
                    {lesson.isPreview && (
                      <button className="text-primary hover:text-primary-700 transition-colors duration-150">
                        <Icon name="Eye" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderInstructor = () => (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <Image
          src={course.instructor.avatar}
          alt={course.instructor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            {course.instructor.name}
          </h3>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-3">
            {course.instructor.title}
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-text-secondary dark:text-dark-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-yellow-400" />
              <span>{course.instructor.rating} rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{course.instructor.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={16} />
              <span>{course.instructor.courses} courses</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-heading font-medium text-text-primary dark:text-dark-text-primary mb-3">
          About the Instructor
        </h4>
        <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
          {course.instructor.bio}
        </p>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
          Student Reviews
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
          </div>
          <span className="font-medium text-text-primary dark:text-dark-text-primary">
            {course.rating}
          </span>
          <span className="text-text-secondary dark:text-dark-text-secondary">
            ({course.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {course.reviews.map((review) => (
          <div key={review.id} className="border-b border-border dark:border-dark-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-text-primary dark:text-dark-text-primary">
                      {review.user.name}
                    </h5>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {review.user.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                      {review.date}
                    </span>
                  </div>
                </div>
                
                <p className="text-text-secondary dark:text-dark-text-secondary mb-3 leading-relaxed">
                  {review.content}
                </p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors duration-150">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="text-text-tertiary dark:text-dark-text-tertiary hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors duration-150">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <ContextualHeader />
        <div className="pt-16 pb-20 md:pb-4 md:pl-16">
          <div className="p-4 lg:p-6">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <ContextualHeader />
        <div className="pt-16 pb-20 md:pb-4 md:pl-16">
          <div className="p-4 lg:p-6">
            <div className="max-w-6xl mx-auto text-center py-12">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-2xl font-heading font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Course Not Found
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                The course you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/course-library')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-150"
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ContextualHeader />
      <NavigationBridge />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        {/* Mobile Course Header - inspired by learning page */}
        <div className="md:hidden">
          <div className="bg-primary p-4 text-white">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigate('/course-library')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <Icon name="Play" size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
                  <Icon name="Bookmark" size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
                  <Icon name="Share2" size={20} />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {course.category}
                </span>
                {course.isBestseller && (
                  <span className="bg-orange-500/20 text-orange-200 text-xs font-medium px-2 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold mb-1">{course.title}</h1>
              <p className="text-blue-100 text-sm mb-3">{course.subtitle}</p>
              
              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <div className="flex items-center space-x-1">
                  {renderStars(course.rating)}
                  <span className="ml-1">{course.rating}</span>
                </div>
                <span>•</span>
                <span>{course.enrollmentCount.toLocaleString()} students</span>
              </div>
            </div>

            <div className="flex space-x-3">
              {isEnrolled ? (
                <button
                  onClick={handleStartLearning}
                  className="flex-1 bg-white text-primary py-3 px-4 rounded-xl font-semibold transition-all duration-200 active:scale-95"
                >
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="flex-1 bg-white text-primary py-3 px-4 rounded-xl font-semibold transition-all duration-200 active:scale-95"
                >
                  Enroll Now
                </button>
              )}
              <button className="bg-white/10 text-white p-3 rounded-xl transition-all duration-200 active:scale-95">
                <Icon name="Heart" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Desktop Breadcrumb */}
            <nav className="hidden md:flex items-center space-x-2 text-sm text-text-secondary dark:text-dark-text-secondary mb-6">
              <button 
                onClick={() => navigate('/course-library')}
                className="hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-150"
              >
                Courses
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-text-primary dark:text-dark-text-primary">{course.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Desktop Course Header */}
                <div className="hidden md:block mb-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary text-white text-sm font-medium px-3 py-1.5 rounded-full">
                      {course.category}
                    </span>
                    {course.isBestseller && (
                      <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1.5 rounded-full">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {course.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {course.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      {renderStars(course.rating)}
                      <span className="font-medium text-gray-900 dark:text-white ml-1">
                        {course.rating}
                      </span>
                      <span>({course.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} />
                      <span>{course.enrollmentCount.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={16} />
                      <span>Updated {course.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Course Video/Image */}
                <div className="relative w-full h-64 lg:h-80 bg-gray-900 rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                  
                  {/* Play Button */}
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Icon name="Play" size={28} className="text-primary ml-1" />
                    </div>
                  </button>
                  
                  {/* Course Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Clock" size={16} />
                        <span>{course.duration}</span>
                        <span>•</span>
                        <Icon name="BookOpen" size={16} />
                        <span>{course.lectures} lectures</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200">
                          <Icon name="Bookmark" size={16} />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200">
                          <Icon name="Share2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modern Tabs */}
                <div className="mb-8">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl overflow-x-auto">
                    <nav className="flex space-x-1">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-white dark:bg-gray-700 text-primary shadow-md'
                              : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-white/50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <Icon name={tab.icon} size={16} />
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && renderOverview()}
                  {activeTab === 'curriculum' && renderCurriculum()}
                  {activeTab === 'instructor' && renderInstructor()}
                  {activeTab === 'reviews' && renderReviews()}
                </motion.div>
              </div>

              {/* Modern Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Course Action Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                    {/* Course Preview */}
                    <div className="relative mb-6">
                      <div className="relative w-full h-32 bg-gray-900 rounded-xl overflow-hidden">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <button 
                          onClick={() => setShowVideoModal(true)}
                          className="absolute inset-0 flex items-center justify-center group"
                        >
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                            <Icon name="Play" size={16} className="text-primary ml-0.5" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-6">
                      {isEnrolled ? (
                        <button
                          onClick={handleStartLearning}
                          className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95"
                        >
                          Continue Learning
                        </button>
                      ) : (
                        <button
                          onClick={handleEnroll}
                          className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95"
                        >
                          Enroll Now
                        </button>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 py-2 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <Icon name="Heart" size={16} />
                          <span className="text-sm">Wishlist</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 py-2 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <Icon name="Share2" size={16} />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Course Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Icon name="Clock" size={18} className="text-primary" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Duration</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon name="BookOpen" size={18} className="text-primary" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Lectures</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">{course.lectures}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon name="BarChart" size={18} className="text-primary" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Level</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">{course.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon name="Globe" size={18} className="text-primary" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Language</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">{course.language}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon name="MessageSquare" size={18} className="text-primary" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Captions</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">
                            {course.captions ? 'Available' : 'Not available'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon name="Award" size={18} className="text-primary" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Certificate</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">
                            {course.certificate ? 'Included' : 'Not included'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Courses */}
                  {course.relatedCourses && course.relatedCourses.length > 0 && (
                    <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-6">
                      <h3 className="font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                        Related Courses
                      </h3>
                      <div className="space-y-4">
                        {course.relatedCourses.map((relatedCourse) => (
                          <div key={relatedCourse.id} className="flex space-x-3">
                            <Image
                              src={relatedCourse.thumbnail}
                              alt={relatedCourse.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-text-primary dark:text-dark-text-primary text-sm mb-1">
                                {relatedCourse.title}
                              </h4>
                              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                                by {relatedCourse.instructor}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <Icon name="Star" size={12} className="text-yellow-400" />
                                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                    {relatedCourse.rating}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                                  ${relatedCourse.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Tab Navigation for Mobile */}
      <BottomTabNavigation />

      {/* Video Preview Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-4xl max-h-96 m-4"
            >
              <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={32} className="text-primary ml-1" />
                  </div>
                </div>
                
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                  <p className="text-sm opacity-90">Course Preview</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {showEnrollModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Enroll in Course
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You're about to enroll in "{course.title}". This will give you lifetime access to all course materials.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowEnrollModal(false)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEnrollment}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors duration-200"
                  >
                    Confirm Enrollment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails; 
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';
import CourseCard from './components/CourseCard';
import FilterPanel from './components/FilterPanel';
import SearchSuggestions from './components/SearchSuggestions';

const CourseLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const searchInputRef = useRef(null);
  const observerRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All', icon: 'Grid3X3' },
    { id: 'technology', name: 'Technology', icon: 'Code' },
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'arts', name: 'Arts', icon: 'Palette' },
    { id: 'science', name: 'Science', icon: 'Atom' },
    { id: 'health', name: 'Health', icon: 'Heart' },
    { id: 'language', name: 'Language', icon: 'Globe' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest', icon: 'Clock' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'DollarSign' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'DollarSign' }
  ];

  const mockCourses = [
    {
      id: 1,
      title: "Complete React Development Bootcamp",
      instructor: "Sarah Johnson",
      category: "technology",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      duration: "42 hours",
      difficulty: "Intermediate",
      enrollmentCount: 15420,
      price: 89.99,
      originalPrice: 199.99,
      isEnrolled: false,
      isBestseller: true,
      description: `Master React from fundamentals to advanced concepts including hooks, context, Redux, and modern development practices. Build real-world projects and deploy to production.

Key learning outcomes include component architecture, state management, API integration, and performance optimization techniques.`,
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
      language: 'English',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      instructor: "Michael Chen",
      category: "business",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      rating: 4.6,
      reviewCount: 1923,
      duration: "28 hours",
      difficulty: "Beginner",
      enrollmentCount: 8765,
      price: 69.99,
      originalPrice: 149.99,
      isEnrolled: true,
      isBestseller: false,
      description: `Comprehensive digital marketing course covering SEO, social media marketing, email campaigns, and analytics. Learn to create effective marketing strategies that drive results.

Master Google Ads, Facebook advertising, content marketing, and conversion optimization to grow your business or career.`,
      tags: ['Marketing', 'SEO', 'Social Media', 'Analytics'],
      language: 'English',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: "Watercolor Painting for Beginners",
      instructor: "Emma Rodriguez",
      category: "arts",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      rating: 4.9,
      reviewCount: 756,
      duration: "18 hours",
      difficulty: "Beginner",
      enrollmentCount: 3421,
      price: 49.99,
      originalPrice: 99.99,
      isEnrolled: false,
      isBestseller: false,
      description: `Learn the fundamentals of watercolor painting with step-by-step tutorials. From basic techniques to creating beautiful landscapes and portraits.

Explore color theory, brush techniques, composition, and develop your unique artistic style through guided practice sessions.`,
      tags: ['Watercolor', 'Painting', 'Art', 'Creative'],
      language: 'English',
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      title: "Data Science with Python",
      instructor: "Dr. James Wilson",
      category: "technology",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      rating: 4.7,
      reviewCount: 3156,
      duration: "65 hours",
      difficulty: "Advanced",
      enrollmentCount: 12890,
      price: 129.99,
      originalPrice: 249.99,
      isEnrolled: false,
      isBestseller: true,
      description: `Complete data science curriculum covering Python programming, machine learning, data visualization, and statistical analysis. Work with real datasets and build predictive models.

Master pandas, NumPy, scikit-learn, and TensorFlow to become a proficient data scientist ready for industry challenges.`,
      tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
      language: 'English',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      title: "Human Anatomy and Physiology",
      instructor: "Dr. Lisa Thompson",
      category: "science",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      rating: 4.5,
      reviewCount: 1234,
      duration: "45 hours",
      difficulty: "Intermediate",
      enrollmentCount: 5678,
      price: 79.99,
      originalPrice: 159.99,
      isEnrolled: false,
      isBestseller: false,
      description: `Comprehensive study of human body systems including cardiovascular, respiratory, nervous, and musculoskeletal systems. Perfect for healthcare students and professionals.

Interactive 3D models, case studies, and practical applications help you understand complex anatomical structures and physiological processes.`,
      tags: ['Anatomy', 'Physiology', 'Healthcare', 'Medicine'],
      language: 'English',
      lastUpdated: '2024-01-05'
    },
    {
      id: 6,
      title: "Spanish for Travelers",
      instructor: "Carlos Mendoza",
      category: "language",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      rating: 4.4,
      reviewCount: 892,
      duration: "25 hours",
      difficulty: "Beginner",
      enrollmentCount: 4321,
      price: 39.99,
      originalPrice: 79.99,
      isEnrolled: true,
      isBestseller: false,
      description: `Learn essential Spanish phrases and vocabulary for travel. Focus on practical conversations for hotels, restaurants, transportation, and emergency situations.

Interactive exercises, pronunciation guides, and cultural insights help you communicate confidently during your travels.`,
      tags: ['Spanish', 'Travel', 'Language', 'Conversation'],
      language: 'English',
      lastUpdated: '2024-01-03'
    },
    {
      id: 7,
      title: "Entrepreneurship Fundamentals",
      instructor: "Robert Kim",
      category: "business",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      rating: 4.6,
      reviewCount: 1567,
      duration: "32 hours",
      difficulty: "Intermediate",
      enrollmentCount: 7890,
      price: 99.99,
      originalPrice: 199.99,
      isEnrolled: false,
      isBestseller: true,
      description: `Learn how to start and grow a successful business from idea to execution. Covers business planning, funding, marketing, and scaling strategies.

Real case studies, templates, and frameworks help you develop a solid foundation for your entrepreneurial journey.`,
      tags: ['Entrepreneurship', 'Business', 'Startup', 'Strategy'],
      language: 'English',
      lastUpdated: '2024-01-14'
    },
    {
      id: 8,
      title: "Mindfulness and Meditation",
      instructor: "Dr. Anna Patel",
      category: "health",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      rating: 4.8,
      reviewCount: 2103,
      duration: "20 hours",
      difficulty: "Beginner",
      enrollmentCount: 9876,
      price: 59.99,
      originalPrice: 119.99,
      isEnrolled: false,
      isBestseller: false,
      description: `Discover the power of mindfulness and meditation for stress reduction, improved focus, and overall well-being. Guided sessions and practical techniques for daily life.

Learn various meditation styles, breathing exercises, and mindfulness practices that you can integrate into your busy schedule.`,
      tags: ['Mindfulness', 'Meditation', 'Wellness', 'Mental Health'],
      language: 'English',
      lastUpdated: '2024-01-07'
    }
  ];

  const recentSearches = [
    'React development',
    'Digital marketing',
    'Python programming',
    'Graphic design'
  ];

  const searchSuggestions = [
    'React hooks tutorial',
    'React native development',
    'React testing library',
    'React performance optimization'
  ];

  useEffect(() => {
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  useEffect(() => {
    filterAndSortCourses();
  }, [searchQuery, selectedCategory, sortBy, activeFilters, courses]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreCourses();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const filterAndSortCourses = () => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => 
        course.category === selectedCategory.toLowerCase()
      );
    }

    // Apply advanced filters
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      filtered = filtered.filter(course => course.price >= min && course.price <= max);
    }

    if (activeFilters.difficulty && activeFilters.difficulty.length > 0) {
      filtered = filtered.filter(course => 
        activeFilters.difficulty.includes(course.difficulty)
      );
    }

    if (activeFilters.duration) {
      filtered = filtered.filter(course => {
        const hours = parseInt(course.duration);
        switch (activeFilters.duration) {
          case 'short': return hours <= 10;
          case 'medium': return hours > 10 && hours <= 30;
          case 'long': return hours > 30;
          default: return true;
        }
      });
    }

    if (activeFilters.rating) {
      filtered = filtered.filter(course => course.rating >= activeFilters.rating);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.enrollmentCount - a.enrollmentCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  };

  const loadMoreCourses = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
      // For demo, stop loading after page 3
      if (page >= 2) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSearchSuggestions(false);
    searchInputRef.current?.blur();
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterApply = (filters) => {
    setActiveFilters(filters);
    setShowFilterPanel(false);
  };

  const handleFilterRemove = (filterType, value = null) => {
    const newFilters = { ...activeFilters };
    if (value) {
      if (Array.isArray(newFilters[filterType])) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        if (newFilters[filterType].length === 0) {
          delete newFilters[filterType];
        }
      }
    } else {
      delete newFilters[filterType];
    }
    setActiveFilters(newFilters);
  };

  const handleCourseEnroll = (courseId) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isEnrolled: true, enrollmentCount: course.enrollmentCount + 1 }
        : course
    ));
  };

  const handleCourseView = (courseId) => {
    // Navigate to course details or start studying
    navigate('/flashcard-study-interface', { state: { courseId } });
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length;
  };

  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="flex items-center space-x-2">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      <NavigationBridge />
      <StudySessionOverlay />

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8 md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 text-base"
                />
              </div>
            </form>

            {/* Search Suggestions */}
            {showSearchSuggestions && (
              <SearchSuggestions
                suggestions={searchQuery ? searchSuggestions : recentSearches}
                recentSearches={recentSearches}
                onSelect={(suggestion) => {
                  setSearchQuery(suggestion);
                  setShowSearchSuggestions(false);
                }}
                onClose={() => setShowSearchSuggestions(false)}
              />
            )}
          </div>

          {/* Category Chips */}
          <div className="mb-6">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-150 ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white' :'bg-surface border border-border text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilterPanel(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors duration-150"
              >
                <Icon name="Filter" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Filter</span>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
                  <span className="text-sm font-medium text-text-secondary">
                    {sortOptions.find(option => option.value === sortBy)?.label}
                  </span>
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </button>

                {showSortDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                          sortBy === option.value ? 'bg-primary-50 text-primary-700' : 'text-text-secondary'
                        }`}
                      >
                        <Icon name={option.icon} size={16} />
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-sm text-text-secondary">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Active Filters */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(activeFilters).map(([filterType, value]) => {
                if (Array.isArray(value)) {
                  return value.map((item) => (
                    <div
                      key={`${filterType}-${item}`}
                      className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => handleFilterRemove(filterType, item)}
                        className="hover:bg-primary-200 rounded-full p-0.5 transition-colors duration-150"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ));
                } else {
                  return (
                    <div
                      key={filterType}
                      className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                    >
                      <span>
                        {filterType === 'priceRange' ? `$${value[0]} - $${value[1]}` : 
                         filterType === 'rating' ? `${value}+ stars` : 
                         value}
                      </span>
                      <button
                        onClick={() => handleFilterRemove(filterType)}
                        className="hover:bg-primary-200 rounded-full p-0.5 transition-colors duration-150"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  );
                }
              })}
              <button
                onClick={() => setActiveFilters({})}
                className="text-text-tertiary hover:text-text-secondary text-sm underline transition-colors duration-150"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleCourseEnroll}
                onView={handleCourseView}
              />
            ))}
            {loading && renderSkeletonCards()}
          </div>

          {/* Load More Trigger */}
          {hasMore && (
            <div ref={observerRef} className="h-20 flex items-center justify-center">
              {loading && (
                <div className="flex items-center space-x-2 text-text-secondary">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading more courses...</span>
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {filteredCourses.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-text-tertiary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                No courses found
              </h3>
              <p className="text-text-secondary mb-4">
                Try adjusting your search criteria or browse different categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setActiveFilters({});
                }}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-150"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onApply={handleFilterApply}
        activeFilters={activeFilters}
      />

      <BottomTabNavigation />

      {/* Click outside to close dropdowns */}
      {(showSortDropdown || showSearchSuggestions) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSortDropdown(false);
            setShowSearchSuggestions(false);
          }}
        />
      )}
    </div>
  );
};

export default CourseLibrary;
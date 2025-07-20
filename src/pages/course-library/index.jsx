import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';

import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';
import CourseCard from './components/CourseCard';
import FilterPanel from './components/FilterPanel';

// Category Selection Modal
const CategorySelectionModal = ({ isOpen, onClose, onSelectCategory, categories, selectedCategory }) => {
  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-border dark:border-dark-border max-w-lg w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                  Kategorie wählen
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Entdecke Kurse nach Interessensgebiet
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCategorySelect(category)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-200 group ${
                  selectedCategory === category.id ? 'bg-surface-secondary dark:bg-dark-surface-secondary' : 'hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-secondary dark:bg-dark-surface-secondary flex items-center justify-center border border-border/20 dark:border-dark-border/20">
                    <Icon 
                      name={category.icon} 
                      size={20} 
                      className="text-text-secondary dark:text-dark-text-secondary group-hover:scale-110 transition-transform" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">
                      {category.name}
                    </h4>
                    <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mt-1">
                      {category.count} Kurse verfügbar
                    </p>
                  </div>
                  {selectedCategory === category.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  )}
                  <Icon name="ChevronRight" size={16} className="text-text-tertiary dark:text-dark-text-tertiary group-hover:text-text-primary dark:group-hover:text-dark-text-primary transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Course Card Component
const EnhancedCourseCard = ({ course, index, onEnroll, onView }) => {
  const navigate = useNavigate();

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return {
          label: 'Anfänger',
          color: 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary',
          icon: 'Play'
        };
      case 'intermediate':
        return {
          label: 'Fortgeschritten',
          color: 'bg-primary/10 dark:bg-primary/20 text-primary',
          icon: 'TrendingUp'
        };
      case 'advanced':
        return {
          label: 'Experte',
          color: 'bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary',
          icon: 'Star'
        };
      default:
        return {
          label: difficulty,
          color: 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary',
          icon: 'Book'
        };
    }
  };

  const getDiscountPercentage = () => {
    if (course.originalPrice > course.price) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const difficultyConfig = getDifficultyConfig(course.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl border border-border/20 dark:border-dark-border/20 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={() => navigate(`/course-details/${course.id}`)}
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          placeholder="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
        />
        
        {/* Overlay with Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute top-4 left-4 right-4">
            <div className="flex items-center justify-between">
              {/* Left Badges */}
              <div className="flex flex-col space-y-2">
                {course.isBestseller && (
                  <div className="flex items-center space-x-1 bg-primary backdrop-blur-md px-2 py-1 rounded-full">
                    <Icon name="Trophy" size={10} className="text-white" />
                    <span className="text-xs font-medium text-white">Bestseller</span>
                  </div>
                )}
                {course.isEnrolled && (
                  <div className="flex items-center space-x-1 bg-surface-secondary dark:bg-dark-surface-secondary backdrop-blur-md px-2 py-1 rounded-full">
                    <Icon name="CheckCircle" size={10} className="text-text-primary dark:text-dark-text-primary" />
                    <span className="text-xs font-medium text-text-primary dark:text-dark-text-primary">Eingeschrieben</span>
                  </div>
                )}

              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                <span className="text-white text-xs font-medium">{course.rating}</span>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full backdrop-blur-md ${difficultyConfig.color}`}>
              <Icon name={difficultyConfig.icon} size={10} />
              <span className="text-xs font-medium">{difficultyConfig.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Instructor */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            von {course.instructor}
          </p>
        </div>

        {/* Course Stats */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{course.enrollmentCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MessageSquare" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{course.reviewCount}</span>
          </div>
        </div>



        {/* Action Buttons */}
        <div className="space-y-2">
          {course.isEnrolled ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCourseView(course.id);
              }}
              className="px-3 py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-600 transition-colors flex items-center space-x-1"
            >
              <Icon name="Play" size={12} />
              <span>Weiter</span>
            </button>
          ) : (
                            <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnroll(course.id);
                  }}
                  className="px-3 py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-600 transition-colors flex items-center space-x-1"
                >
                  <Icon name="BookOpen" size={12} />
                  <span>Einschreiben</span>
                </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CourseLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [showSortModal, setShowSortModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const categories = [
    { id: 'all', name: 'Alle Kurse', icon: 'Grid3X3', count: 245, color: 'from-surface-secondary to-surface-tertiary' },
    { id: 'technology', name: 'Technologie', icon: 'Code', count: 89, color: 'from-primary to-primary-600' },
    { id: 'business', name: 'Business', icon: 'Briefcase', count: 67, color: 'from-primary to-primary-600' },
    { id: 'arts', name: 'Kunst', icon: 'Palette', count: 34, color: 'from-primary to-primary-600' },
    { id: 'science', name: 'Wissenschaft', icon: 'Atom', count: 28, color: 'from-primary to-primary-600' },
    { id: 'health', name: 'Gesundheit', icon: 'Heart', count: 15, color: 'from-primary to-primary-600' },
    { id: 'language', name: 'Sprachen', icon: 'Globe', count: 12, color: 'from-primary to-primary-600' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Beliebtheit', icon: 'TrendingUp' },
    { value: 'rating', label: 'Beste Bewertung', icon: 'Star' },
    { value: 'newest', label: 'Neueste', icon: 'Clock' },
    { value: 'price-low', label: 'Preis: Niedrig zu Hoch', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Preis: Hoch zu Niedrig', icon: 'ArrowDown' }
  ];

  const mockCourses = [
    {
      id: 1,
      title: "Kompletter React Entwickler Bootcamp",
      instructor: "Sarah Johnson",
      category: "technology",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      duration: "42 Stunden",
      difficulty: "Intermediate",
      enrollmentCount: 15420,
      price: 89.99,
      originalPrice: 199.99,
      isEnrolled: false,
      isBestseller: true,
      description: `Meistere React von den Grundlagen bis zu fortgeschrittenen Konzepten einschließlich Hooks, Context, Redux und modernen Entwicklungspraktiken.`,
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
      language: 'Deutsch',
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
      duration: "28 Stunden",
      difficulty: "Beginner",
      enrollmentCount: 8765,
      price: 69.99,
      originalPrice: 149.99,
      isEnrolled: true,
      isBestseller: false,
      description: `Umfassender Digital-Marketing-Kurs mit SEO, Social Media Marketing, E-Mail-Kampagnen und Analytics.`,
      tags: ['Marketing', 'SEO', 'Social Media', 'Analytics'],
      language: 'Deutsch',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: "Aquarell-Malerei für Anfänger",
      instructor: "Emma Rodriguez",
      category: "arts",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      rating: 4.9,
      reviewCount: 756,
      duration: "18 Stunden",
      difficulty: "Beginner",
      enrollmentCount: 3421,
      price: 49.99,
      originalPrice: 99.99,
      isEnrolled: false,
      isBestseller: false,
      description: `Lerne die Grundlagen der Aquarell-Malerei mit Schritt-für-Schritt-Anleitungen.`,
      tags: ['Aquarell', 'Malerei', 'Kunst', 'Kreativ'],
      language: 'Deutsch',
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      title: "Data Science mit Python",
      instructor: "Dr. James Wilson",
      category: "technology",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      rating: 4.7,
      reviewCount: 3156,
      duration: "65 Stunden",
      difficulty: "Advanced",
      enrollmentCount: 12890,
      price: 129.99,
      originalPrice: 249.99,
      isEnrolled: false,
      isBestseller: true,
      description: `Vollständiger Data Science Lehrplan mit Python-Programmierung, Machine Learning und Datenvisualisierung.`,
      tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
      language: 'Deutsch',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      title: "Anatomie und Physiologie des Menschen",
      instructor: "Dr. Lisa Thompson",
      category: "science",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      rating: 4.5,
      reviewCount: 1234,
      duration: "45 Stunden",
      difficulty: "Intermediate",
      enrollmentCount: 5678,
      price: 79.99,
      originalPrice: 159.99,
      isEnrolled: false,
      isBestseller: false,
      description: `Umfassende Studie der menschlichen Körpersysteme einschließlich Herz-Kreislauf-, Atmungs-, Nerven- und Bewegungsapparat.`,
      tags: ['Anatomie', 'Physiologie', 'Gesundheitswesen', 'Medizin'],
      language: 'Deutsch',
      lastUpdated: '2024-01-05'
    },
    {
      id: 6,
      title: "Spanisch für Reisende",
      instructor: "Carlos Mendoza",
      category: "language",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      rating: 4.4,
      reviewCount: 892,
      duration: "25 Stunden",
      difficulty: "Beginner",
      enrollmentCount: 4321,
      price: 39.99,
      originalPrice: 79.99,
      isEnrolled: false,
      isBestseller: false,
      description: `Lerne wichtige spanische Phrasen und Vokabeln für Reisen. Fokus auf praktische Gespräche.`,
      tags: ['Spanisch', 'Reisen', 'Sprache', 'Konversation'],
      language: 'Deutsch',
      lastUpdated: '2024-01-03'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const getFilteredCourses = () => {
    let filtered = [...courses];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
        default:
          return b.enrollmentCount - a.enrollmentCount;
      }
    });

    return filtered;
  };

  const handleCourseEnroll = (courseId) => {
    // Auto-enroll and start learning immediately
    // In production, this would make an API call to enroll the user
    console.log(`Enrolling user in course ${courseId}`);
    
    // Simulate enrollment success and redirect to learning
    navigate(`/course/${courseId}/learn`);
  };

  const handleCourseView = (courseId) => {
    navigate(`/course/${courseId}/learn`);
  };

  const handleHeaderSearch = (query) => {
    setSearchQuery(query);
  };

  const getCategoryStats = () => {
    const totalCourses = courses.length;
    const categoryCount = categories.find(cat => cat.id === selectedCategory)?.count || 0;
    
    return { totalCourses, categoryCount };
  };

  const stats = getCategoryStats();
  const filteredCourses = getFilteredCourses();

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary dark:text-dark-text-secondary">Lade Kurse...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader onSearchChange={handleHeaderSearch} />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full bg-surface dark:bg-dark-surface"
        >
          <div className="px-4 py-6 space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative px-6 py-16 md:px-12 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Icon Container */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center justify-center mb-8"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                        <Icon name="BookOpen" size={36} className="text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-primary/10 rounded-full animate-pulse animation-delay-300"></div>
                    </div>
                  </motion.div>

                  {/* Heading */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary dark:text-dark-text-primary mb-6 leading-tight">
                      Entdecke deine 
                      <span className="block text-primary bg-primary/5 dark:bg-primary/10 px-4 py-2 rounded-2xl mt-2 inline-block">
                        Lernreise
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
                      Über <span className="font-semibold text-primary">245 Kurse</span> von Branchenexperten. 
                      Lerne flexibel und erweitere deine Fähigkeiten mit hochwertigen Inhalten.
                    </p>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                  >
                    <button
                      onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group px-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <Icon name="Search" size={20} />
                      <span>Kurse entdecken</span>
                      <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => setShowCategoryModal(true)}
                      className="group px-8 py-4 bg-surface-secondary dark:bg-dark-surface-secondary border-2 border-border/20 dark:border-dark-border/20 text-text-primary dark:text-dark-text-primary rounded-2xl font-semibold hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary hover:border-primary/30 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Icon name="Filter" size={20} />
                      <span>Kategorien durchsuchen</span>
                    </button>
                  </motion.div>

                  {/* Enhanced Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="hidden md:grid md:grid-cols-4 gap-4 md:gap-6"
                  >
                    {[
                      { icon: 'BookOpen', number: '245+', label: 'Kurse verfügbar', color: 'text-primary' },
                      { icon: 'Users', number: '15k+', label: 'Aktive Lernende', color: 'text-primary' },
                      { icon: 'Star', number: '4.8', label: 'Durchschnittsbewertung', color: 'text-primary' },
                      { icon: 'Award', number: '50+', label: 'Experte Instruktoren', color: 'text-primary' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="bg-surface-secondary/60 dark:bg-dark-surface-secondary/60 backdrop-blur-sm rounded-2xl p-6 border border-border/10 dark:border-dark-border/10 hover:bg-surface-secondary/80 dark:hover:bg-dark-surface-secondary/80 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                            <Icon name={stat.icon} size={20} className={stat.color} />
                          </div>
                          <p className="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
                            {stat.number}
                          </p>
                          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary font-medium">
                            {stat.label}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Popular Topics Pills - Hidden on Mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-12 hidden md:block"
                  >
                    <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mb-4 font-medium">
                      Beliebte Themen entdecken:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        { name: 'React', icon: 'Code' },
                        { name: 'Python', icon: 'Terminal' },
                        { name: 'Design', icon: 'Palette' },
                        { name: 'Business', icon: 'Briefcase' },
                        { name: 'Marketing', icon: 'TrendingUp' },
                        { name: 'Data Science', icon: 'BarChart' }
                      ].map((topic, index) => (
                        <motion.button
                          key={topic.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSearchQuery(topic.name)}
                          className="flex items-center space-x-2 px-4 py-2 bg-surface-secondary/70 dark:bg-dark-surface-secondary/70 backdrop-blur-sm border border-border/10 dark:border-dark-border/10 text-text-secondary dark:text-dark-text-secondary rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-sm font-medium"
                        >
                          <Icon name={topic.icon} size={14} />
                          <span>{topic.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" 
                />
                <input
                  type="text"
                  placeholder="Kurse, Instruktoren oder Themen durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex space-x-3">
                {/* Category Filter */}
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="flex-1 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl p-4 flex items-center justify-between hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Icon name="Grid3X3" size={16} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary dark:text-dark-text-primary text-sm">
                        {categories.find(cat => cat.id === selectedCategory)?.name || 'Alle Kurse'}
                      </p>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        {filteredCourses.length} Kurs{filteredCourses.length !== 1 ? 'e' : ''}
                      </p>
                    </div>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                </button>

                {/* Sort Filter */}
                <button
                  onClick={() => setShowSortModal(true)}
                  className="flex-1 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl p-4 flex items-center justify-between hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
                      <Icon name="ArrowUpDown" size={16} className="text-text-secondary dark:text-dark-text-secondary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                        Sortieren nach
                      </p>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        {sortOptions.find(opt => opt.value === sortBy)?.label}
                      </p>
                    </div>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                </button>
              </div>
            </motion.div>

            {/* Featured Courses Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                    Empfohlene Kurse
                  </h2>
                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                    Von Experten ausgewählt
                  </p>
                </div>
                <button className="hidden md:flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors">
                  <span className="text-sm font-medium">Alle anzeigen</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              
              {/* Mobile: Vertical Stack with Enhanced Cards */}
              <div className="md:hidden space-y-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-surface dark:bg-dark-surface rounded-3xl border border-border/20 dark:border-dark-border/20 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(`/course-details/${course.id}`)}
                  >
                    <div className="grid grid-cols-3 gap-4 p-4">
                      {/* Course Image */}
                      <div className="relative col-span-1">
                        <div className="aspect-square bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl overflow-hidden">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            placeholder="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
                          />
                          
                          {/* Badge */}
                          <div className="absolute top-2 left-2">
                            {course.isBestseller && (
                              <div className="bg-primary backdrop-blur-md px-2 py-1 rounded-full">
                                <span className="text-xs font-medium text-white">Top</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="col-span-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                              {course.category}
                            </span>
                            {course.rating && (
                              <div className="flex items-center space-x-1">
                                <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                                <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                  {course.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          
                          <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-2">
                            {course.instructor}
                          </p>
                          
                          <div className="flex items-center space-x-2 text-xs text-text-tertiary dark:text-dark-text-tertiary mb-2">
                            <span>{course.duration}</span>
                            <span>•</span>
                            <span>{course.difficulty}</span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              course.isEnrolled ? handleCourseView(course.id) : handleCourseEnroll(course.id);
                            }}
                            className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-600 transition-colors"
                          >
                            {course.isEnrolled ? 'Weiter' : 'Jetzt'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.filter(course => course.isBestseller).slice(0, 3).map((course, index) => (
                  <EnhancedCourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    onEnroll={handleCourseEnroll}
                    onView={handleCourseView}
                  />
                ))}
              </div>
            </motion.div>

            {/* All Courses Grid */}
            <AnimatePresence mode="wait">
              {filteredCourses.length > 0 ? (
                <motion.div
                  key="courses-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="BookOpen" size={20} className="text-blue-500" />
                    <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                      Alle Kurse
                    </h2>
                    <span className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                      ({filteredCourses.length})
                    </span>
                  </div>
                  
                  {/* Desktop Grid */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course, index) => (
                      <EnhancedCourseCard
                        key={course.id}
                        course={course}
                        index={index}
                        onEnroll={handleCourseEnroll}
                        onView={handleCourseView}
                      />
                    ))}
                  </div>

                  {/* Mobile List */}
                  <div className="md:hidden space-y-6">
                    {filteredCourses.map((course, index) => (
                      <EnhancedCourseCard
                        key={course.id}
                        course={course}
                        index={index}
                        onEnroll={handleCourseEnroll}
                        onView={handleCourseView}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="no-courses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 rounded-3xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 flex items-center justify-center mx-auto mb-6">
                    <Icon name="Search" size={32} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    Keine Kurse gefunden
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                    {searchQuery ? 'Versuche einen anderen Suchbegriff' : 'Keine Kurse in dieser Kategorie'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    <Icon name="RotateCcw" size={16} />
                    <span>Filter zurücksetzen</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Category Selection Modal */}
      <CategorySelectionModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={setSelectedCategory}
        categories={categories}
        selectedCategory={selectedCategory}
      />

      {/* Sort Selection Modal */}
      <CategorySelectionModal
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        onSelectCategory={(sortValue) => setSortBy(sortValue)}
        categories={sortOptions.map(opt => ({
          id: opt.value,
          name: opt.label,
          icon: opt.icon,
          count: '',
          color: 'from-blue-500 to-purple-500'
        }))}
        selectedCategory={sortBy}
      />

      {/* Navigation */}
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default CourseLibrary;
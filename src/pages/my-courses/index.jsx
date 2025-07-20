import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';

import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

// Course Categories Modal
const CategorySelectionModal = ({ isOpen, onClose, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'all',
      title: 'Alle Kurse',
      description: 'Alle deine eingeschriebenen Kurse anzeigen',
      icon: 'BookOpen',
      color: 'text-text-primary dark:text-dark-text-primary'
    },
    {
      id: 'in-progress',
      title: 'In Bearbeitung',
      description: 'Kurse, die du gerade lernst',
      icon: 'Play',
      color: 'text-text-primary dark:text-dark-text-primary'
    },
    {
      id: 'completed',
      title: 'Abgeschlossen',
      description: 'Kurse, die du erfolgreich beendet hast',
      icon: 'CheckCircle',
      color: 'text-text-primary dark:text-dark-text-primary'
    },
    {
      id: 'bookmarked',
      title: 'Favoriten',
      description: 'Deine markierten Lieblingskurse',
      icon: 'Heart',
      color: 'text-text-primary dark:text-dark-text-primary'
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
                  Kurs-Kategorie wählen
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Filter deine Kurse nach Kategorie
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
          <div className="p-6 space-y-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCategorySelect(category)}
                className="w-full p-4 rounded-2xl text-left transition-all duration-200 hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 flex items-center justify-center">
                    <Icon 
                      name={category.icon} 
                      size={20} 
                      className={`${category.color} group-hover:scale-110 transition-transform`} 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">
                      {category.title}
                    </h4>
                    <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mt-1">
                      {category.description}
                    </p>
                  </div>
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

// Course Card Component
const CourseCard = ({ course, index, onContinue, onViewCertificate, onViewDetails }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Abgeschlossen',
          color: 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary',
          icon: 'CheckCircle'
        };
      case 'in-progress':
        return {
          label: 'In Bearbeitung',
          color: 'bg-primary/10 dark:bg-primary/20 text-primary',
          icon: 'Play'
        };
      default:
        return {
          label: 'Nicht begonnen',
          color: 'bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary',
          icon: 'Clock'
        };
    }
  };

  const statusConfig = getStatusConfig(course.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl border border-border/20 dark:border-dark-border/20 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          placeholder="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
        />
        
        {/* Overlay with Progress */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-md ${statusConfig.color}`}>
                <Icon name={statusConfig.icon} size={12} />
                <span className="text-xs font-medium">{statusConfig.label}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                <span className="text-white text-xs font-medium">{course.rating}</span>
              </div>
            </div>

            {/* Progress Bar */}
            {course.status === 'in-progress' && (
              <div className="w-full bg-black/20 backdrop-blur-md rounded-full h-2">
                <motion.div 
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Instructor */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary line-clamp-2 mb-2">
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
            <Icon name="Award" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{course.difficulty}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {course.status === 'completed' ? (
            <div className="space-y-2">
              <button
                onClick={() => onViewCertificate(course.id)}
                className="w-full bg-primary text-white px-4 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="Award" size={16} />
                <span>Zertifikat ansehen</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onContinue(course.id)}
                  className="bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-primary dark:text-dark-text-primary px-4 py-3 rounded-2xl font-medium hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Icon name="RotateCcw" size={14} />
                  <span>Wiederholen</span>
                </button>
                <button
                  onClick={() => onViewDetails(course.id)}
                  className="bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-primary dark:text-dark-text-primary px-4 py-3 rounded-2xl font-medium hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Icon name="Info" size={14} />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => onContinue(course.id)}
                className="w-full bg-primary text-white px-4 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name={course.progress > 0 ? "Play" : "BookOpen"} size={16} />
                <span>{course.progress > 0 ? 'Weiter lernen' : 'Kurs starten'}</span>
              </button>
              <button
                onClick={() => onViewDetails(course.id)}
                className="w-full bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-primary dark:text-dark-text-primary px-4 py-3 rounded-2xl font-medium hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="Info" size={16} />
                <span>Kursdetails ansehen</span>
              </button>
              {course.progress > 0 && (
                <div className="text-center">
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    {course.progress}% abgeschlossen • {course.completedLessons}/{course.totalLessons} Lektionen
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MyCourses = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock enrolled courses data
  const mockEnrolledCourses = [
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      instructor: "Michael Chen",
      category: "business",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      rating: 4.6,
      reviewCount: 1923,
      duration: "28 Stunden",
      difficulty: "Anfänger",
      enrollmentCount: 8765,
      price: 69.99,
      originalPrice: 149.99,
      isEnrolled: true,
      isBestseller: false,
      progress: 75,
      lastAccessed: '2024-01-15',
      enrolledDate: '2023-12-01',
      status: 'in-progress',
      description: `Umfassender Digital-Marketing-Kurs mit SEO, Social Media Marketing, E-Mail-Kampagnen und Analytics. Lerne effektive Marketing-Strategien zu entwickeln.`,
      tags: ['Marketing', 'SEO', 'Social Media', 'Analytics'],
      completedLessons: 21,
      totalLessons: 28,
      nextLesson: 'Erweiterte Google Ads Strategien'
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
      difficulty: "Anfänger",
      enrollmentCount: 4321,
      price: 39.99,
      originalPrice: 79.99,
      isEnrolled: true,
      isBestseller: false,
      progress: 100,
      lastAccessed: '2024-01-10',
      enrolledDate: '2023-11-15',
      status: 'completed',
      description: `Lerne wichtige spanische Phrasen und Vokabeln für Reisen. Fokus auf praktische Gespräche für Hotels, Restaurants und Transport.`,
      tags: ['Spanisch', 'Reisen', 'Sprache', 'Konversation'],
      completedLessons: 20,
      totalLessons: 20,
      certificateEarned: true
    },
    {
      id: 8,
      title: "Einführung in Machine Learning",
      instructor: "Dr. Sarah Kim",
      category: "technology",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      rating: 4.9,
      reviewCount: 1234,
      duration: "35 Stunden",
      difficulty: "Fortgeschritten",
      enrollmentCount: 6789,
      price: 99.99,
      originalPrice: 179.99,
      isEnrolled: true,
      isBestseller: true,
      progress: 25,
      lastAccessed: '2024-01-08',
      enrolledDate: '2024-01-01',
      status: 'in-progress',
      description: `Umfassende Einführung in Machine Learning Konzepte, Algorithmen und praktische Umsetzung mit Python.`,
      tags: ['Machine Learning', 'Python', 'KI', 'Data Science'],
      completedLessons: 6,
      totalLessons: 24,
      nextLesson: 'Lineare Regression Deep Dive'
    },
    {
      id: 9,
      title: "React.js Vollständiger Kurs",
      instructor: "John Smith",
      category: "technology",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      rating: 4.8,
      reviewCount: 2156,
      duration: "42 Stunden",
      difficulty: "Fortgeschritten",
      enrollmentCount: 12543,
      price: 89.99,
      originalPrice: 179.99,
      isEnrolled: true,
      isBestseller: true,
      progress: 0,
      lastAccessed: null,
      enrolledDate: '2024-01-20',
      status: 'not-started',
      description: `Vollständiger React.js Kurs von den Grundlagen bis zu fortgeschrittenen Konzepten.`,
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
      completedLessons: 0,
      totalLessons: 35,
      nextLesson: 'React Grundlagen'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setEnrolledCourses(mockEnrolledCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const getFilteredCourses = () => {
    let filtered = [...enrolledCourses];

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(course => course.status === activeCategory);
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

    return filtered;
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/course/${courseId}/learn`);
  };

  const handleCourseDetails = (courseId) => {
            navigate(`/course-details/${courseId}`);
  };

  const handleViewCertificate = (courseId) => {
    navigate(`/study-certificates/${courseId}`);
  };

  const getCategoryStats = () => {
    const total = enrolledCourses.length;
    const completed = enrolledCourses.filter(c => c.status === 'completed').length;
    const inProgress = enrolledCourses.filter(c => c.status === 'in-progress').length;
    const totalHours = enrolledCourses.reduce((sum, course) => {
      const hours = parseInt(course.duration.split(' ')[0]);
      return sum + hours;
    }, 0);

    return { total, completed, inProgress, totalHours };
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
          <p className="text-text-secondary dark:text-dark-text-secondary">Lade deine Kurse...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full bg-surface dark:bg-dark-surface"
        >
          <div className="px-4 py-6 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="BookOpen" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Meine Kurse
              </h1>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                Setze deine Lernreise fort und erreiche deine Ziele
              </p>
              
              {/* Quick Stats */}
              <div className="hidden md:grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{stats.total}</p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Gesamt</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{stats.completed}</p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Abgeschlossen</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{stats.totalHours}h</p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Stunden</p>
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
                  placeholder="Kurse durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
                />
              </div>

              {/* Category Filter Button */}
              <button
                onClick={() => setShowCategoryModal(true)}
                className="w-full bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl p-4 flex items-center justify-between hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Icon name="Filter" size={16} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">
                      Kategorie: {activeCategory === 'all' ? 'Alle Kurse' : 
                                  activeCategory === 'in-progress' ? 'In Bearbeitung' :
                                  activeCategory === 'completed' ? 'Abgeschlossen' : 'Favoriten'}
                    </p>
                    <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                      {filteredCourses.length} Kurs{filteredCourses.length !== 1 ? 'e' : ''}
                    </p>
                  </div>
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </button>
            </motion.div>

            {/* Courses Grid */}
            <AnimatePresence mode="wait">
              {filteredCourses.length > 0 ? (
                <motion.div
                  key="courses-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {filteredCourses.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                      onContinue={handleContinueLearning}
                      onViewCertificate={handleViewCertificate}
                      onViewDetails={handleCourseDetails}
                    />
                  ))}
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
                    onClick={() => navigate('/course-library')}
                    className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    <Icon name="Search" size={16} />
                    <span>Weitere Kurse entdecken</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Browse More Courses CTA */}
            {filteredCourses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center pt-8"
              >
                <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl p-8 border border-border/20 dark:border-dark-border/20">
                  <Icon name="Sparkles" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    Bereit für mehr Wissen?
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                    Entdecke Tausende von Kursen und erweitere deine Fähigkeiten
                  </p>
                  <button
                    onClick={() => navigate('/course-library')}
                    className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    <Icon name="Search" size={16} />
                    <span>Weitere Kurse entdecken</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Category Selection Modal */}
      <CategorySelectionModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={setActiveCategory}
      />

      {/* Navigation */}
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default MyCourses; 
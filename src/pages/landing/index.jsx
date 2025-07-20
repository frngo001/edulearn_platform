import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Icon from 'components/AppIcon';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const coreFeatures = [
    {
      icon: 'Brain',
      title: 'KI-gestützter Lernassistent',
      description: 'Erhalten Sie personalisierte Lernunterstützung mit unserem fortschrittlichen KI-Chat-System, das sich an Ihren Lernstil anpasst und sofortige Antworten liefert.',
      gradient: 'from-blue-500 to-purple-600',
      features: ['24/7 KI-Tutor', 'Sofortige Fragen & Antworten', 'Personalisierte Erklärungen', 'Multi-Themen-Support']
    },
    {
      icon: 'Layers',
      title: 'Intelligentes Karteikarten-System',
      description: 'Erstellen, lernen und verwalten Sie Karteikarten mit KI-gestützter Generierung aus Dokumenten, Texteingaben oder Datei-Uploads.',
      gradient: 'from-green-500 to-teal-600',
      features: ['KI-Inhaltsgenerierung', 'Datei-Upload-Support', 'Bearbeiten & Exportieren', 'Zufälliger Lernmodus']
    },
    {
      icon: 'BookOpen',
      title: 'Umfassende Kursbibliothek',
      description: 'Zugriff auf eine gut organisierte Bibliothek von Kursen in verschiedenen Fächern mit strukturierten Lernpfaden und Fortschrittsverfolgung.',
      gradient: 'from-orange-500 to-red-600',
      features: ['Kuratierte Inhalte', 'Fortschrittsverfolgung', 'Strukturierte Pfade', 'Multi-Fach-Support']
    },
    {
      icon: 'TrendingUp',
      title: 'Erweiterte Fortschrittsanalyse',
      description: 'Verfolgen Sie Ihre Lernreise mit umfassenden Analysen, Streak-Monitoring und Leistungseinblicken in allen Fächern.',
      gradient: 'from-emerald-500 to-green-600',
      features: ['Lernanalysen', 'Streak-Verfolgung', 'Leistungseinblicke', 'Zielüberwachung']
    },
    {
      icon: 'Calendar',
      title: 'Intelligente Planung & Terminierung',
      description: 'Planen Sie Ihre Lernsitzungen mit intelligenter Terminplanung, Aufgabenverwaltung und Deadline-Tracking für optimale Produktivität.',
      gradient: 'from-blue-500 to-indigo-600',
      features: ['Lernplanung', 'Aufgabenverwaltung', 'Deadline-Tracking', 'Kalender-Integration']
    },
    {
      icon: 'FileText',
      title: 'Intelligente Notizen',
      description: 'Erfassen, organisieren und verbessern Sie Ihre Notizen mit KI-gestützten Funktionen, intelligentem Tagging und nahtloser Integration.',
      gradient: 'from-purple-500 to-pink-600',
      features: ['KI-Notizverbesserung', 'Intelligente Organisation', 'Tag-System', 'Schnellerfassung']
    },
    {
      icon: 'User',
      title: 'Erweiterte Profilverwaltung',
      description: 'Vollständige Profilanpassung mit 7 umfassenden Tabs, die jeden Aspekt Ihrer Lernerfahrung abdecken.',
      gradient: 'from-pink-500 to-rose-600',
      features: ['7 Einstellungs-Tabs', 'Theme-Anpassung', 'Datenschutz-Kontrollen', 'Achievement-System']
    },
    {
      icon: 'Eye',
      title: 'Barrierefreiheit & Inklusion',
      description: 'Mit Fokus auf Barrierefreiheit entwickelt, mit Screenreader-Support, hohen Kontrastmodi und anpassbaren Oberflächenoptionen.',
      gradient: 'from-indigo-500 to-blue-600',
      features: ['Screenreader-Support', 'Hoher Kontrast-Modus', 'Schriftgrößen-Kontrollen', 'Tastatur-Navigation']
    },
    {
      icon: 'Bell',
      title: 'Intelligente Benachrichtigungen',
      description: 'Bleiben Sie auf Kurs mit unserem intelligenten Benachrichtigungssystem für E-Mail, Push und In-App-Benachrichtigungen für optimales Lernen.',
      gradient: 'from-violet-500 to-purple-600',
      features: ['Lernerinnerungen', 'Achievement-Benachrichtigungen', 'Fortschritts-Updates', 'Individuelle Einstellungen']
    }
  ];

  const advancedFeatures = [
    {
      icon: 'Timer',
      title: 'Pomodoro Timer',
      description: 'Built-in draggable timer with customizable intervals, break reminders, and session tracking for focused study.',
      category: 'Productivity'
    },
    {
      icon: 'BarChart3',
      title: 'Study Analytics Dashboard',
      description: 'Comprehensive analytics with time tracking, subject breakdowns, and performance trends visualization.',
      category: 'Analytics'
    },
    {
      icon: 'Target',
      title: 'Goal Setting & Tracking',
      description: 'Set daily, weekly, and monthly study goals with progress monitoring and achievement celebrations.',
      category: 'Goal Management'
    },
    {
      icon: 'Calendar',
      title: 'Study Calendar',
      description: 'Visual calendar with study sessions, deadlines, exam dates, and intelligent scheduling suggestions.',
      category: 'Planning'
    },
    {
      icon: 'CheckSquare',
      title: 'Task Management',
      description: 'Create, organize, and track study tasks with priority levels, due dates, and completion tracking.',
      category: 'Organization'
    },
    {
      icon: 'BookMarked',
      title: 'Note Organization',
      description: 'Hierarchical note structure with folders, tags, search functionality, and cross-referencing.',
      category: 'Notes'
    },
    {
      icon: 'Palette',
      title: 'Theme Customization',
      description: 'Choose from Light, Dark, or System theme modes with instant switching and persistent preferences.',
      category: 'Personalization'
    },
    {
      icon: 'Upload',
      title: 'File Processing',
      description: 'Upload TXT, PDF, DOC, DOCX, MD files with drag & drop interface and AI content extraction.',
      category: 'Content Import'
    },
    {
      icon: 'Award',
      title: 'Achievement System',
      description: 'Unlock achievements like "7-Day Streak", "Early Bird", and "Course Master" to stay motivated.',
      category: 'Gamification'
    },
    {
      icon: 'Shield',
      title: 'Privacy & Security',
      description: 'Complete privacy controls with profile visibility settings, 2FA support, and data export options.',
      category: 'Security'
    },
    {
      icon: 'Shuffle',
      title: 'Random Study Mode',
      description: 'Study flashcards in random order with visual shuffle indicators and algorithm-based selection.',
      category: 'Study Tools'
    },
    {
      icon: 'Zap',
      title: 'Quick Actions',
      description: 'Rapid access to frequently used features with keyboard shortcuts and smart suggestions.',
      category: 'Efficiency'
    }
  ];

  const productivityFeatures = [
    {
      icon: 'Timer',
      title: 'Pomodoro Timer',
      description: 'Focus with time-tested intervals',
      details: ['25/5/15 minute cycles', 'Customizable intervals', 'Background operation', 'Session statistics']
    },
    {
      icon: 'TrendingUp',
      title: 'Progress Analytics',
      description: 'Track your learning journey',
      details: ['Daily/Weekly/Monthly views', 'Subject breakdowns', 'Streak tracking', 'Performance trends']
    },
    {
      icon: 'Calendar',
      title: 'Study Planning',
      description: 'Organize your learning schedule',
      details: ['Calendar integration', 'Deadline management', 'Task prioritization', 'Smart scheduling']
    },
    {
      icon: 'FileText',
      title: 'Smart Notes',
      description: 'Capture and enhance your thoughts',
      details: ['AI-powered organization', 'Tag system', 'Quick capture', 'Cross-referencing']
    }
  ];

  const profileTabs = [
    { id: 'profile', label: 'Profile', icon: 'User', color: 'blue', description: 'Personal info, social links, avatar customization' },
    { id: 'study', label: 'Study', icon: 'BookOpen', color: 'green', description: 'Study preferences, goals, environment settings' },
    { id: 'achievements', label: 'Achievements', icon: 'Award', color: 'yellow', description: 'Achievement grid with earned/locked status tracking' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', color: 'purple', description: 'Email, push, and in-app notification controls' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield', color: 'red', description: 'Security settings, data export, visibility controls' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Eye', color: 'indigo', description: 'Font size, contrast, motion, screen reader support' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings', color: 'gray', description: 'Theme modes, language, performance settings' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      company: 'MIT',
      avatar: 'SC',
      content: 'The comprehensive feature set is incredible! From the 7-tab profile system to AI flashcards and progress analytics, EduLearn has everything I need for academic success.',
      rating: 5,
      feature: 'Complete Platform'
    },
    {
      name: 'Marcus Johnson',
      role: 'Medical Student',
      company: 'Harvard Medical',
      avatar: 'MJ',
      content: 'The Pomodoro timer and progress tracking keep me focused and motivated. Being able to upload PDFs and get instant AI flashcards saves me 15+ hours every week.',
      rating: 5,
      feature: 'Productivity & AI'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Engineering Student',
      company: 'Stanford',
      avatar: 'ER',
      content: 'The note-taking system with AI organization and the planning features have revolutionized my study routine. The accessibility features make it comfortable for long sessions.',
      rating: 5,
      feature: 'Notes & Planning'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '2M+', label: 'Flashcards Generated' },
    { number: '500K+', label: 'Files Processed' },
    { number: '1M+', label: 'Study Sessions' },
    { number: '99.2%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Icon name="Brain" size={16} className="text-white md:w-5 md:h-5" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">EduLearn</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Funktionen</a>
              <a href="#productivity" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Produktivität</a>
              <a href="#profile-system" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Profil-System</a>
              <a href="#accessibility" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Barrierefreiheit</a>
              <Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Anmelden</Link>
              <Link
                to="/ai-chat-assistant"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Loslegen
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Link
                to="/ai-chat-assistant"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium"
              >
                Start
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:pt-32 md:pb-20 md:px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 text-xs md:text-sm font-medium mb-6 md:mb-8">
              <Icon name="Sparkles" size={14} className="mr-1.5 md:mr-2 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Jetzt mit 7-Tab-Profil-System & erweiterte Barrierefreiheit</span>
              <span className="sm:hidden">Fortschrittliche KI-Lernplattform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight px-2">
              <span className="block sm:inline">Die umfassendste</span>
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
                KI-Lernplattform
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
              Vollständiges Lern-Ökosystem mit KI-gestützten Karteikarten, umfassendem Profil-Management, 
              Barrierefreiheits-Features und personalisierten Lernerfahrungen. Alles was Sie zum Erfolg brauchen.
            </p>

            {/* Dynamic Analytics Dashboard */}
            <div className="mb-8 md:mb-12 max-w-6xl mx-auto px-2">
              <motion.div
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon name="BarChart3" size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Live Platform Analytics</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Real-time learning insights</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Live</span>
                  </div>
                </div>

                {/* Mobile: Carousel Layout */}
                <div className="md:hidden">
                  <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* Learning Progress Card */}
                    <div className="flex-none w-72 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 snap-center">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="Upload" size={16} className="text-blue-600" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">AI Processing</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">89%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '89%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        ></motion.div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">12,847 files processed</div>
                    </div>

                    {/* User Engagement Card */}
                    <div className="flex-none w-72 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 snap-center">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="User" size={16} className="text-purple-600" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">Profile Usage</span>
                        </div>
                        <span className="text-lg font-bold text-purple-600">7/7</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <motion.div 
                            key={i}
                            className="h-6 bg-gradient-to-t from-purple-500 to-purple-400 rounded"
                            initial={{ height: 0 }}
                            whileInView={{ height: Math.random() * 20 + 10 }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.5 }}
                          ></motion.div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">All tabs actively used</div>
                    </div>

                    {/* Study Performance Card */}
                    <div className="flex-none w-72 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 snap-center">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="Timer" size={16} className="text-green-600" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">Study Time</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">+24%</span>
                      </div>
                      <div className="flex items-end space-x-1 h-12 mb-2">
                        {[65, 78, 56, 89, 94, 87, 95].map((height, i) => (
                          <motion.div 
                            key={i}
                            className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-sm"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.5 }}
                          ></motion.div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Avg. 3.2h daily sessions</div>
                    </div>

                    {/* Accessibility Score Card */}
                    <div className="flex-none w-72 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 snap-center">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="Eye" size={16} className="text-orange-600" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">Accessibility</span>
                        </div>
                        <span className="text-lg font-bold text-orange-600">100%</span>
                      </div>
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gray-200 dark:text-gray-600"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="100, 100"
                            strokeLinecap="round"
                            className="text-orange-600"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: "100, 100" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">WCAG 2.1 AA compliant</div>
                    </div>
                  </div>

                  {/* Mobile Scroll Indicators */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Learning Progress Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Upload" size={20} className="text-blue-600" />
                        <span className="font-semibold text-gray-900 dark:text-white">AI Processing</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-3">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '89%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      ></motion.div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">12,847 files processed today</div>
                  </div>

                  {/* User Engagement Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={20} className="text-purple-600" />
                        <span className="font-semibold text-gray-900 dark:text-white">Profile Usage</span>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">7/7</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-3">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          className="h-8 bg-gradient-to-t from-purple-500 to-purple-400 rounded"
                          initial={{ height: 0 }}
                          whileInView={{ height: Math.random() * 20 + 15 }}
                          transition={{ duration: 0.8, delay: i * 0.1 + 0.5 }}
                        ></motion.div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">All tabs actively used</div>
                  </div>

                  {/* Study Performance Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Timer" size={20} className="text-green-600" />
                        <span className="font-semibold text-gray-900 dark:text-white">Study Time</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">+24%</span>
                    </div>
                    <div className="flex items-end space-x-1 h-16 mb-3">
                      {[65, 78, 56, 89, 94, 87, 95].map((height, i) => (
                        <motion.div 
                          key={i}
                          className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-sm"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 + 0.5 }}
                        ></motion.div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg. 3.2h daily sessions</div>
                  </div>

                  {/* Accessibility Score Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Eye" size={20} className="text-orange-600" />
                        <span className="font-semibold text-gray-900 dark:text-white">Accessibility</span>
                      </div>
                      <span className="text-2xl font-bold text-orange-600">100%</span>
                    </div>
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray-200 dark:text-gray-600"
                        />
                        <motion.path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="100, 100"
                          strokeLinecap="round"
                          className="text-orange-600"
                          initial={{ strokeDasharray: "0, 100" }}
                          whileInView={{ strokeDasharray: "100, 100" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center">WCAG 2.1 AA compliant</div>
                  </div>
                </div>

                {/* Bottom Metrics Row */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <motion.div 
                        className="text-2xl md:text-3xl font-bold text-blue-600 mb-1"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        12.8k
                      </motion.div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Files Processed</div>
                    </div>
                    <div>
                      <motion.div 
                        className="text-2xl md:text-3xl font-bold text-purple-600 mb-1"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        95%
                      </motion.div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">User Satisfaction</div>
                    </div>
                    <div>
                      <motion.div 
                        className="text-2xl md:text-3xl font-bold text-green-600 mb-1"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        3.2h
                      </motion.div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Daily Learning</div>
                    </div>
                    <div>
                      <motion.div 
                        className="text-2xl md:text-3xl font-bold text-orange-600 mb-1"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        100%
                      </motion.div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Accessible</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4">
              <Link
                to="/ai-chat-assistant"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base md:text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
              >
                <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
                <span>Start Learning Free</span>
              </Link>
              
              <Link
                to="/user-profile-settings"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-base md:text-lg font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Settings" size={18} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Explore Profile System</span>
                <span className="sm:hidden">Profile System</span>
              </Link>
            </div>

            {/* Product Preview - AI Chat Interface */}
            <div className="relative max-w-6xl mx-auto px-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl md:rounded-3xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center justify-between px-3 py-2 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">app.edulearn.com/ai-chat-assistant</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon name="Brain" size={10} className="text-white md:w-3 md:h-3" />
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Chat Interface Preview */}
                <div className="p-4 md:p-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-lg px-4 py-3 md:px-6 md:py-4 max-w-xs md:max-w-md">
                        <p className="text-xs md:text-sm">Please create flashcards from my uploaded biology notes about photosynthesis</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl rounded-tl-lg px-4 py-3 md:px-6 md:py-4 max-w-sm md:max-w-lg">
                        <p className="text-xs md:text-sm mb-3">I've analyzed your biology notes and created 12 flashcards about photosynthesis. Here's what I've generated:</p>
                        <div className="space-y-2 mb-3">
                          <div className="bg-white dark:bg-gray-600 rounded-lg p-2 md:p-3 border-l-4 border-green-500">
                            <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Flashcard 1</div>
                            <div className="text-xs md:text-sm font-medium">What is the overall equation for photosynthesis?</div>
                          </div>
                          <div className="bg-white dark:bg-gray-600 rounded-lg p-2 md:p-3 border-l-4 border-blue-500">
                            <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Flashcard 2</div>
                            <div className="text-xs md:text-sm font-medium">What are the two main stages of photosynthesis?</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          <span className="px-2 py-1 md:px-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">12 Cards Created</span>
                          <span className="px-2 py-1 md:px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Export Available</span>
                          <span className="px-2 py-1 md:px-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs hidden sm:inline">Random Mode</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 md:p-4 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center space-x-2 md:space-x-3 text-blue-600 dark:text-blue-400">
                          <Icon name="Upload" size={14} className="md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm font-medium">File processing complete • Ready to study</span>
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-xs sm:text-sm md:text-base px-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section - OpenAI Inspired */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">excel</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              AI-powered tools that adapt to your learning style and accelerate your academic journey
            </p>
          </div>

          {/* Mobile Carousel, Desktop Grid */}
          <div className="md:hidden">
            {/* Mobile Carousel */}
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {coreFeatures.slice(0, 6).map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-500 flex-none w-80 snap-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Icon */}
                    <div className={`relative w-16 h-16 rounded-2xl mb-6 overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name={feature.icon} size={24} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {feature.title}
                      </h3>
                      
                      <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-2">
                        {feature.features.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {coreFeatures.slice(0, 6).map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {coreFeatures.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Gradient Orb Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-6 md:mb-8 overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-100 group-hover:opacity-90 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name={feature.icon} size={28} className="text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.features.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Icon name="ArrowRight" size={16} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore All Features
            </button>
          </div>
        </div>
      </section>

      {/* Productivity Features Showcase - OpenAI Inspired */}
      <section id="productivity" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              Boost Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Productivity</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Professional tools that transform how you study, plan, and achieve your academic goals
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {productivityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-500 flex-none w-72 snap-center overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <div className="relative">
                      {/* Icon Container */}
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <Icon name={feature.icon} size={24} className="text-white" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {feature.title}
                      </h3>
                      
                      <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Feature Details */}
                      <div className="space-y-3">
                        {feature.details.slice(0, 3).map((detail, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {productivityFeatures.map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Large Feature Cards */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
            {productivityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl md:rounded-[2rem] p-8 md:p-12 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-700 hover:shadow-3xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 overflow-hidden"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon Container */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon name={feature.icon} size={32} className="text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <div className="space-y-4">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:w-3 group-hover:h-3 transition-all duration-300"></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Arrow */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Icon name="ArrowRight" size={20} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Productivity Impact Metrics */}
          <div className="relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            
            <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Proven Impact on Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Real results from students using our productivity tools
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                  { value: "25%", label: "Faster Learning", color: "emerald" },
                  { value: "1M+", label: "Study Sessions", color: "blue" },
                  { value: "89%", label: "Goal Achievement", color: "purple" },
                  { value: "2.5h", label: "Avg Daily Study", color: "orange" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`text-3xl md:text-5xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile System Showcase */}
      <section id="profile-system" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 px-2">
              Complete <span className="text-purple-600">Profile Management</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
              7 comprehensive tabs covering every aspect of your learning experience, from personal settings to advanced accessibility features.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Tab Navigation Preview */}
              <div className="p-4 md:p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-3">
                  {profileTabs.map((tab, index) => (
                    <motion.div
                      key={tab.id}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        activeFeature === index
                          ? `border-${tab.color}-500 bg-${tab.color}-50 dark:bg-${tab.color}-900/20`
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center mb-1 md:mb-2 ${
                          activeFeature === index
                            ? `bg-${tab.color}-500 text-white`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          <Icon name={tab.icon} size={14} className="md:w-4 md:h-4" />
                        </div>
                        <h4 className={`font-medium text-xs md:text-sm ${
                          activeFeature === index
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {tab.label}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Active Tab Content */}
              <div className="p-4 md:p-8">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-${profileTabs[activeFeature].color}-500 to-${profileTabs[activeFeature].color}-600 rounded-xl md:rounded-2xl flex items-center justify-center`}>
                      <Icon name={profileTabs[activeFeature].icon} size={20} className="text-white md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                        {profileTabs[activeFeature].label} Settings
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg leading-relaxed">
                        {profileTabs[activeFeature].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Grid - OpenAI Inspired */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Features</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge technology that sets EduLearn apart from other learning platforms
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {advancedFeatures.slice(0, 8).map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-500 flex-none w-64 snap-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wide mb-4">
                      {feature.category}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Icon name={feature.icon} size={18} className="text-white" />
                      </div>
                      
                      <h3 className="text-base font-bold text-gray-900 dark:text-white flex-1">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center space-x-1 mt-6">
                {Array.from({ length: Math.ceil(advancedFeatures.slice(0, 8).length / 3) }).map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wide mb-4 md:mb-6">
                  {feature.category}
                </div>

                {/* Icon */}
                <div className="flex items-center space-x-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon name={feature.icon} size={24} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                    <Icon name="ArrowRight" size={16} className="text-white" />
                  </div>
                </div>

                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to experience advanced learning?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of students already using these cutting-edge features
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accessibility Highlight - Modern Design */}
      <section id="accessibility" className="relative py-16 md:py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Icon name="Shield" size={16} className="text-purple-300 mr-2" />
              <span className="text-purple-200 text-sm font-medium">WCAG 2.1 AA Compliant</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Built for{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  Everyone
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full"></div>
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive accessibility features ensure EduLearn works perfectly for users with diverse needs and preferences.
            </p>
          </motion.div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                  {
                    icon: 'Eye',
                    title: 'Visual Accessibility',
                    description: 'Enhanced visual experience for all users',
                    features: ['High contrast mode', 'Adjustable font sizes', 'Color blind support', 'Reduced motion'],
                    color: 'from-blue-500 to-cyan-500',
                    bgColor: 'from-blue-500/20 to-cyan-500/20'
                  },
                  {
                    icon: 'Volume2',
                    title: 'Screen Readers',
                    description: 'Full compatibility with assistive technologies',
                    features: ['NVDA compatibility', 'JAWS support', 'VoiceOver optimized', 'Enhanced ARIA'],
                    color: 'from-purple-500 to-pink-500',
                    bgColor: 'from-purple-500/20 to-pink-500/20'
                  },
                  {
                    icon: 'Keyboard',
                    title: 'Keyboard Navigation',
                    description: 'Complete control without a mouse',
                    features: ['Full keyboard nav', 'Enhanced focus', 'Skip links', 'Logical tab order'],
                    color: 'from-green-500 to-emerald-500',
                    bgColor: 'from-green-500/20 to-emerald-500/20'
                  },
                  {
                    icon: 'Settings',
                    title: 'Customization',
                    description: 'Personalize your learning environment',
                    features: ['Theme selection', 'Layout preferences', 'Animation controls', 'Notifications'],
                    color: 'from-orange-500 to-red-500',
                    bgColor: 'from-orange-500/20 to-red-500/20'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex-none w-80 snap-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="relative group">
                      {/* Card Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Main Card */}
                      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
                        {/* Icon Container */}
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500`}>
                            <Icon name={item.icon} size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                              {item.description}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="space-y-2">
                            {item.features.map((feature, idx) => (
                              <motion.div 
                                key={idx} 
                                className="flex items-center space-x-2 text-slate-300 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                              >
                                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${item.color} rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300`}></div>
                                <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                            <Icon name="ArrowRight" size={14} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-white/30 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: 'Eye',
                title: 'Visual Accessibility',
                description: 'Enhanced visual experience for all users',
                features: ['High contrast mode', 'Adjustable font sizes', 'Color blind support', 'Reduced motion options'],
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                icon: 'Volume2',
                title: 'Screen Readers',
                description: 'Full compatibility with assistive technologies',
                features: ['NVDA compatibility', 'JAWS support', 'VoiceOver optimized', 'Enhanced ARIA labels'],
                color: 'from-purple-500 to-pink-500',
                bgColor: 'from-purple-500/20 to-pink-500/20'
              },
              {
                icon: 'Keyboard',
                title: 'Keyboard Navigation',
                description: 'Complete control without a mouse',
                features: ['Full keyboard navigation', 'Enhanced focus indicators', 'Skip links', 'Logical tab order'],
                color: 'from-green-500 to-emerald-500',
                bgColor: 'from-green-500/20 to-emerald-500/20'
              },
              {
                icon: 'Settings',
                title: 'Customization',
                description: 'Personalize your learning environment',
                features: ['Theme selection', 'Layout preferences', 'Animation controls', 'Notification settings'],
                color: 'from-orange-500 to-red-500',
                bgColor: 'from-orange-500/20 to-red-500/20'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Main Card */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon name={item.icon} size={28} className="text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {item.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center space-x-3 text-slate-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full group-hover:w-2.5 group-hover:h-2.5 transition-all duration-300`}></div>
                          <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon name="ArrowRight" size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Experience inclusive learning today
                  </h3>
                  <p className="text-slate-300">
                    Join thousands of users who rely on our accessibility features.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                    Try Accessibility Features
                  </button>
                  <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Modern Design */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-6">
              <Icon name="Heart" size={16} className="text-red-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Trusted by 50,000+ Students</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Loved by students at{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                  top universities
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-full transform scale-x-0 animate-pulse"></div>
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See how our comprehensive feature set is transforming learning experiences worldwide.
            </p>
          </motion.div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="flex-none w-80 snap-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="relative group h-full">
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Main Card */}
                      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 shadow-lg hover:shadow-2xl group-hover:transform group-hover:scale-[1.02] h-full flex flex-col">
                        
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 text-6xl text-blue-500/10 dark:text-blue-400/10 font-serif leading-none">"</div>
                        
                        {/* Rating & Feature Badge */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: 180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                              >
                                <Icon name="Star" size={18} className="text-yellow-400 fill-current drop-shadow-sm" />
                              </motion.div>
                            ))}
                          </div>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200/50 dark:border-blue-700/50">
                            {testimonial.feature}
                          </span>
                        </div>
                        
                        {/* Testimonial Content */}
                        <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed font-medium flex-grow">
                          "{testimonial.content}"
                        </blockquote>
                        
                        {/* Author */}
                        <div className="flex items-center mt-auto">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                              <span className="text-white font-bold text-sm">
                                {testimonial.avatar}
                              </span>
                            </div>
                            {/* Avatar Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white text-base">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.role} • {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col">
                  
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-8xl text-blue-500/10 dark:text-blue-400/10 font-serif leading-none">"</div>
                  
                  {/* Rating & Feature Badge */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: 180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                        >
                          <Icon name="Star" size={20} className="text-yellow-400 fill-current drop-shadow-sm" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200/50 dark:border-blue-700/50 uppercase tracking-wide">
                      {testimonial.feature}
                    </span>
                  </div>
                  
                  {/* Testimonial Content */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed font-medium flex-grow">
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center mt-auto">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <span className="text-white font-bold text-lg">
                          {testimonial.avatar}
                        </span>
                      </div>
                      {/* Avatar Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <motion.div 
            className="mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                <div>
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold text-blue-600 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    50k+
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">Active Students</div>
                </div>
                <div>
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold text-purple-600 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    98%
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
                </div>
                <div>
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold text-green-600 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    200+
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">Universities</div>
                </div>
                <div>
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold text-orange-600 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    24/7
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">AI Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Modern Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10"></div>
          
          {/* Animated Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/30 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon name="Zap" size={16} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Simple Process</span>
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gray-900 dark:text-white">Get started in </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                3 simple steps
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From setup to mastery with our comprehensive platform. AI does the heavy lifting while you focus on learning.
            </motion.p>
          </div>

          {/* Steps Content */}
          <div className="max-w-6xl mx-auto">
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                {[
                  {
                    step: '01',
                    title: 'Setup Your Profile',
                    description: 'Configure your 7-tab profile system with study preferences, accessibility settings, and theme customization for the perfect learning environment.',
                    icon: 'User',
                    gradient: 'from-blue-500 to-cyan-500',
                    bgGradient: 'from-blue-50 to-cyan-50',
                    darkBgGradient: 'from-blue-950/50 to-cyan-950/50',
                    borderColor: 'border-blue-200/50 dark:border-blue-700/30'
                  },
                  {
                    step: '02',
                    title: 'Upload & Generate Content',
                    description: 'Upload files or input text, and watch our AI create personalized flashcards, summaries, and study materials with edit and export capabilities.',
                    icon: 'Brain',
                    gradient: 'from-purple-500 to-pink-500',
                    bgGradient: 'from-purple-50 to-pink-50',
                    darkBgGradient: 'from-purple-950/50 to-pink-950/50',
                    borderColor: 'border-purple-200/50 dark:border-purple-700/30'
                  },
                  {
                    step: '03',
                    title: 'Learn & Achieve',
                    description: 'Study with random mode, track achievements, get AI assistance, and monitor progress with comprehensive analytics and notifications.',
                    icon: 'Target',
                    gradient: 'from-emerald-500 to-teal-500',
                    bgGradient: 'from-emerald-50 to-teal-50',
                    darkBgGradient: 'from-emerald-950/50 to-teal-950/50',
                    borderColor: 'border-emerald-200/50 dark:border-emerald-700/30'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`min-w-[300px] bg-gradient-to-br ${item.bgGradient} dark:${item.darkBgGradient} backdrop-blur-sm rounded-3xl p-6 border ${item.borderColor} snap-center relative overflow-hidden`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Background Glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${item.gradient} rounded-full opacity-10 blur-2xl`}></div>
                    
                    {/* Step Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-white text-xs font-bold`}>
                        STEP {item.step}
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon name={item.icon} size={20} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: '01',
                  title: 'Setup Your Profile',
                  description: 'Configure your 7-tab profile system with study preferences, accessibility settings, and theme customization for the perfect learning environment.',
                  icon: 'User',
                  gradient: 'from-blue-500 to-cyan-500',
                  bgGradient: 'from-blue-50 to-cyan-50',
                  darkBgGradient: 'from-blue-950/50 to-cyan-950/50',
                  borderColor: 'border-blue-200/50 dark:border-blue-700/30'
                },
                {
                  step: '02',
                  title: 'Upload & Generate Content',
                  description: 'Upload files or input text, and watch our AI create personalized flashcards, summaries, and study materials with edit and export capabilities.',
                  icon: 'Brain',
                  gradient: 'from-purple-500 to-pink-500',
                  bgGradient: 'from-purple-50 to-pink-50',
                  darkBgGradient: 'from-purple-950/50 to-pink-950/50',
                  borderColor: 'border-purple-200/50 dark:border-purple-700/30'
                },
                {
                  step: '03',
                  title: 'Learn & Achieve',
                  description: 'Study with random mode, track achievements, get AI assistance, and monitor progress with comprehensive analytics and notifications.',
                  icon: 'Target',
                  gradient: 'from-emerald-500 to-teal-500',
                  bgGradient: 'from-emerald-50 to-teal-50',
                  darkBgGradient: 'from-emerald-950/50 to-teal-950/50',
                  borderColor: 'border-emerald-200/50 dark:border-emerald-700/30'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`group bg-gradient-to-br ${item.bgGradient} dark:${item.darkBgGradient} backdrop-blur-sm rounded-3xl p-8 border ${item.borderColor} hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5 transition-all duration-500 relative overflow-hidden`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Connection Line */}
                  {index < 2 && (
                    <div className="absolute top-16 left-full w-8 lg:w-12 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600 z-0 hidden lg:block"></div>
                  )}

                  {/* Background Glow */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${item.gradient} rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} text-white text-sm font-bold shadow-lg`}>
                      STEP {item.step}
                    </div>
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon name={item.icon} size={24} className="text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
                    {item.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    className={`absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ x: 10 }}
                    whileHover={{ x: 0 }}
                  >
                    <Icon name="ArrowRight" size={16} className="text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/registration-screen"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
            >
              <span>Start Your Journey</span>
              <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 px-2">
            Ready to experience the most complete learning platform?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-12 max-w-4xl mx-auto px-2">
            Join over 50,000 students using our comprehensive AI-powered platform with 7-tab profile system, 
            accessibility features, and everything you need to excel in your studies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              to="/ai-chat-assistant"
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-white text-blue-600 text-base md:text-lg font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2 md:space-x-3"
            >
              <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
              <span>Start Learning Free</span>
            </Link>
            
            <div className="text-blue-100 text-xs md:text-sm space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                <Icon name="Check" size={14} className="md:w-4 md:h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                <Icon name="Check" size={14} className="md:w-4 md:h-4" />
                <span>Full accessibility support</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Icon name="Check" size={14} className="md:w-4 md:h-4" />
                <span>Complete profile system included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 bg-gray-900 dark:bg-black px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-2 md:mr-3">
                  <Icon name="Brain" size={16} className="text-white md:w-5 md:h-5" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-white">EduLearn</span>
              </div>
              <p className="text-gray-400 mb-6 md:mb-8 max-w-md text-sm md:text-lg leading-relaxed">
                The most comprehensive AI-powered learning platform with advanced accessibility features, 
                complete profile management, and personalized study experiences for every learner.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                {['Github', 'Twitter', 'Linkedin', 'Mail'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                  >
                    <Icon name={social} size={16} className="md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4 md:mb-6 text-base md:text-lg">Core Features</h5>
              <ul className="space-y-2 md:space-y-4">
                <li><Link to="/ai-chat-assistant" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">AI Chat Assistant</Link></li>
                <li><Link to="/flashcards" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Smart Flashcards</Link></li>
                <li><Link to="/course-library" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Course Library</Link></li>
                <li><Link to="/study-progress" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Progress Analytics</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4 md:mb-6 text-base md:text-lg">Productivity</h5>
              <ul className="space-y-2 md:space-y-4">
                <li><Link to="/study-timer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Pomodoro Timer</Link></li>
                <li><Link to="/study-schedule" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Study Planning</Link></li>
                <li><Link to="/study-notes" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Smart Notes</Link></li>
                <li><Link to="/user-profile-settings" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Profile System</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 mb-4 md:mb-0 text-xs md:text-sm text-center md:text-left">
                © 2024 EduLearn. All rights reserved. Built with accessibility in mind.
              </div>
              <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
                <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors duration-200">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';


const StudyBookmarks = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, alphabetical, category
  const [viewMode, setViewMode] = useState('cards'); // cards, list
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock bookmarks data with simplified colors
  const bookmarks = [
    {
      id: 1,
      title: 'MDN Web Docs - JavaScript Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
      description: 'Comprehensive JavaScript documentation and tutorials from Mozilla',
      category: 'documentation',
      tags: ['javascript', 'reference', 'documentation'],
      dateAdded: '2024-01-15T10:30:00Z',
      lastVisited: '2024-01-16T14:20:00Z',
      visitCount: 15,
      isFavorite: true,
      thumbnail: 'bg-primary',
      domain: 'developer.mozilla.org',
      type: 'documentation'
    },
    {
      id: 2,
      title: 'React Official Documentation',
      url: 'https://react.dev',
      description: 'Official React documentation with guides, API reference, and tutorials',
      category: 'documentation',
      tags: ['react', 'frontend', 'documentation'],
      dateAdded: '2024-01-14T09:15:00Z',
      lastVisited: '2024-01-15T16:30:00Z',
      visitCount: 23,
      isFavorite: true,
      thumbnail: 'bg-gray-600',
      domain: 'react.dev',
      type: 'documentation'
    },
    {
      id: 3,
      title: 'CSS Tricks - Complete Guide to Grid',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      description: 'A comprehensive guide to CSS Grid layout system',
      category: 'tutorial',
      tags: ['css', 'grid', 'layout', 'tutorial'],
      dateAdded: '2024-01-13T16:20:00Z',
      lastVisited: '2024-01-14T10:15:00Z',
      visitCount: 8,
      isFavorite: false,
      thumbnail: 'bg-primary',
      domain: 'css-tricks.com',
      type: 'tutorial'
    },
    {
      id: 4,
      title: 'Python.org - Beginner\'s Guide',
      url: 'https://wiki.python.org/moin/BeginnersGuide',
      description: 'Official Python beginner\'s guide with learning resources',
      category: 'tutorial',
      tags: ['python', 'beginner', 'tutorial'],
      dateAdded: '2024-01-12T13:45:00Z',
      lastVisited: '2024-01-13T11:20:00Z',
      visitCount: 5,
      isFavorite: false,
      thumbnail: 'bg-gray-600',
      domain: 'python.org',
      type: 'tutorial'
    },
    {
      id: 5,
      title: 'GitHub - Algorithm Visualizations',
      url: 'https://github.com/algorithm-visualizer/algorithm-visualizer',
      description: 'Interactive algorithm visualizations for learning data structures',
      category: 'tool',
      tags: ['algorithms', 'visualization', 'github', 'learning'],
      dateAdded: '2024-01-11T11:30:00Z',
      lastVisited: '2024-01-12T15:45:00Z',
      visitCount: 12,
      isFavorite: true,
      thumbnail: 'bg-primary',
      domain: 'github.com',
      type: 'tool'
    },
    {
      id: 6,
      title: 'Coursera - Machine Learning Course',
      url: 'https://www.coursera.org/learn/machine-learning',
      description: 'Andrew Ng\'s famous machine learning course on Coursera',
      category: 'course',
      tags: ['machine learning', 'coursera', 'andrew ng'],
      dateAdded: '2024-01-10T15:00:00Z',
      lastVisited: '2024-01-11T09:30:00Z',
      visitCount: 3,
      isFavorite: false,
      thumbnail: 'bg-gray-600',
      domain: 'coursera.org',
      type: 'course'
    },
    {
      id: 7,
      title: 'Stack Overflow - JavaScript Questions',
      url: 'https://stackoverflow.com/questions/tagged/javascript',
      description: 'JavaScript questions and answers on Stack Overflow',
      category: 'reference',
      tags: ['javascript', 'qa', 'stackoverflow'],
      dateAdded: '2024-01-09T14:15:00Z',
      lastVisited: '2024-01-16T12:00:00Z',
      visitCount: 28,
      isFavorite: false,
      thumbnail: 'bg-gray-900 dark:bg-gray-100',
      domain: 'stackoverflow.com',
      type: 'reference'
    },
    {
      id: 8,
      title: 'Figma Design Resources',
      url: 'https://www.figma.com/community',
      description: 'Community design resources, templates, and UI kits',
      category: 'tool',
      tags: ['design', 'figma', 'ui', 'resources'],
      dateAdded: '2024-01-08T10:45:00Z',
      lastVisited: '2024-01-10T16:20:00Z',
      visitCount: 7,
      isFavorite: true,
      thumbnail: 'bg-primary',
      domain: 'figma.com',
      type: 'tool'
    }
  ];

  const categories = [
    { id: 'all', label: 'Alle Lesezeichen', icon: 'Bookmark', count: bookmarks.length },
    { id: 'favorites', label: 'Favoriten', icon: 'Heart', count: bookmarks.filter(b => b.isFavorite).length },
    { id: 'documentation', label: 'Dokumentation', icon: 'FileText', count: bookmarks.filter(b => b.category === 'documentation').length },
    { id: 'tutorial', label: 'Tutorials', icon: 'PlayCircle', count: bookmarks.filter(b => b.category === 'tutorial').length },
    { id: 'tool', label: 'Tools', icon: 'Wrench', count: bookmarks.filter(b => b.category === 'tool').length },
    { id: 'course', label: 'Kurse', icon: 'GraduationCap', count: bookmarks.filter(b => b.category === 'course').length },
    { id: 'reference', label: 'Referenz', icon: 'Book', count: bookmarks.filter(b => b.category === 'reference').length }
  ];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesCategory = selectedCategory === 'all' || 
                          selectedCategory === 'favorites' && bookmark.isFavorite ||
                          bookmark.category === selectedCategory;
    
    const matchesSearch = searchQuery === '' || 
                         bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'recent':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatLastVisited = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Heute';
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `vor ${diffDays} Tagen`;
    return formatDate(dateString);
  };

  const toggleFavorite = (bookmarkId) => {
    // Toggle favorite functionality placeholder
    console.log('Toggling favorite for bookmark:', bookmarkId);
  };

  const openBookmark = (bookmark) => {
    // Open bookmark functionality
    window.open(bookmark.url, '_blank');
    console.log('Opening bookmark:', bookmark.title);
  };

  const deleteBookmarks = () => {
    // Delete selected bookmarks functionality
    console.log('Deleting bookmarks:', selectedBookmarks);
    setSelectedBookmarks([]);
  };

  const exportBookmarks = () => {
    // Export bookmarks functionality
    console.log('Exporting bookmarks');
  };

  const toggleBookmarkSelection = (bookmarkId) => {
    setSelectedBookmarks(prev => 
      prev.includes(bookmarkId) 
        ? prev.filter(id => id !== bookmarkId)
        : [...prev, bookmarkId]
    );
  };

  const handleAddBookmark = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Close mobile categories when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileCategories && !event.target.closest('.mobile-categories-container')) {
        setShowMobileCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileCategories]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="px-4 py-8 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <motion.div
                className="text-center hidden md:block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                  Lern-Lesezeichen
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Organisiere und greife auf deine gespeicherten Lernressourcen mit einem eleganten Interface zu
                </p>
              </motion.div>
            </div>

            {/* Search and Controls */}
            <motion.div 
              className="flex flex-col gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Search Bar */}
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Lesezeichen, Beschreibungen oder Tags durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-0 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary shadow-sm font-medium transition-all duration-200"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border-0 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary shadow-sm font-medium transition-all duration-200"
                >
                  <option value="recent">Neueste zuerst</option>
                  <option value="alphabetical">Alphabetisch</option>
                  <option value="category">Nach Kategorie</option>
                </select>

                <div className="flex gap-3">
                  <button
                    onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                    className="flex-1 md:flex-none px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 shadow-sm active:scale-95"
                  >
                    <Icon name={viewMode === 'cards' ? 'List' : 'Grid3X3'} size={20} />
                  </button>

                  <button
                    onClick={exportBookmarks}
                    className="flex-1 md:flex-none px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 shadow-sm active:scale-95"
                  >
                    <Icon name="Download" size={20} />
                  </button>

                  <button 
                    onClick={handleAddBookmark}
                    disabled={isLoading}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary/25 font-bold active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Icon name="Plus" size={20} />
                    )}
                    <span className="hidden md:block">Lesezeichen</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Mobile Category Dropdown */}
              <div className="lg:hidden mobile-categories-container relative">
                <motion.button
                  onClick={() => setShowMobileCategories(!showMobileCategories)}
                  className="flex items-center justify-between w-full px-4 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-gray-900 dark:text-white font-bold"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={categories.find(c => c.id === selectedCategory)?.icon || 'Bookmark'} size={18} />
                    <span className="text-sm">{categories.find(c => c.id === selectedCategory)?.label}</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-black text-gray-600 dark:text-gray-400">
                      {categories.find(c => c.id === selectedCategory)?.count}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: showMobileCategories ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ChevronDown" size={18} className="text-gray-500" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showMobileCategories && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-0 overflow-hidden z-10"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {categories.map((category, index) => (
                        <motion.button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setShowMobileCategories(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
                            selectedCategory === category.id
                              ? 'bg-primary text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-center gap-3">
                            <Icon name={category.icon} size={16} />
                            <span className="font-bold text-sm">{category.label}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-black ${
                            selectedCategory === category.id
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {category.count}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Categories Sidebar */}
              <motion.div 
                className="hidden lg:block lg:col-span-1"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-0 sticky top-8">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 tracking-tight">Kategorien</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={category.icon} size={16} />
                          <span>{category.label}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${
                          selectedCategory === category.id
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {category.count}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {selectedBookmarks.length > 0 && (
                    <motion.div 
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4">
                        {selectedBookmarks.length} ausgewählt
                      </h4>
                      <div className="space-y-3">
                        <button
                          onClick={deleteBookmarks}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 text-sm font-bold active:scale-95"
                        >
                          <Icon name="Trash2" size={14} />
                          Löschen
                        </button>
                        <button
                          onClick={() => setSelectedBookmarks([])}
                          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-sm font-bold active:scale-95"
                        >
                          Auswahl aufheben
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Bookmarks Grid/List */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {sortedBookmarks.length > 0 ? (
                    <motion.div 
                      className={viewMode === 'cards' 
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6' 
                        : 'space-y-4'
                      }
                      key={selectedCategory + viewMode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {sortedBookmarks.map((bookmark, index) => (
                        <motion.div
                          key={bookmark.id}
                          className={`bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer ${
                            selectedBookmarks.includes(bookmark.id) ? 'ring-2 ring-primary ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900' : ''
                          }`}
                          initial={{ opacity: 0, y: 40, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -2, scale: 1.01 }}
                          onClick={() => openBookmark(bookmark)}
                        >
                          {viewMode === 'cards' ? (
                            <>
                              {/* Card View */}
                              <div className={`h-12 md:h-16 ${bookmark.thumbnail} relative`}>
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                                  <span className="text-white text-xs font-bold bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                                    {bookmark.domain}
                                  </span>
                                  <div className="flex gap-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmarkSelection(bookmark.id);
                                      }}
                                      className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-200 ${
                                        selectedBookmarks.includes(bookmark.id)
                                          ? 'bg-primary text-white'
                                          : 'bg-black/30 text-white hover:bg-black/50'
                                      }`}
                                    >
                                      <Icon name="Check" size={12} />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(bookmark.id);
                                      }}
                                      className="w-6 h-6 flex items-center justify-center bg-black/30 text-white hover:bg-black/50 rounded-lg transition-all duration-200"
                                    >
                                      <Icon 
                                        name="Heart" 
                                        size={12} 
                                        className={bookmark.isFavorite ? 'fill-current text-red-400' : ''} 
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 md:p-6">
                                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-200 leading-tight">
                                  {bookmark.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                                  {bookmark.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  {bookmark.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {bookmark.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-bold">
                                      +{bookmark.tags.length - 3}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500 dark:text-gray-400 font-bold">
                                    {formatLastVisited(bookmark.lastVisited)}
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400 font-bold">
                                    {bookmark.visitCount} Besuche
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            /* List View */
                            <div className="p-4 md:p-6">
                              <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 ${bookmark.thumbnail} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                  <Icon name="Bookmark" size={20} className="text-white" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200 leading-tight">
                                      {bookmark.title}
                                    </h3>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleBookmarkSelection(bookmark.id);
                                        }}
                                        className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 ${
                                          selectedBookmarks.includes(bookmark.id)
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                      >
                                        <Icon name="Check" size={14} />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavorite(bookmark.id);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200"
                                      >
                                        <Icon 
                                          name="Heart" 
                                          size={14} 
                                          className={bookmark.isFavorite ? 'fill-current text-red-400' : ''} 
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                                    {bookmark.description}
                                  </p>

                                  <div className="flex flex-wrap items-center gap-4 text-xs">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">
                                      {bookmark.domain}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">
                                      {formatLastVisited(bookmark.lastVisited)}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 font-bold">
                                      {bookmark.visitCount} Besuche
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="text-center py-20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Icon name="Bookmark" size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                        Keine Lesezeichen gefunden
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {searchQuery ? `Keine Ergebnisse für "${searchQuery}"` : 
                         selectedCategory === 'all' ? 'Du hast noch keine Lesezeichen erstellt.' : 
                         `Keine ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} vorhanden.`}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyBookmarks; 
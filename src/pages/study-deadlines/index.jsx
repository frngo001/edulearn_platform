import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';


const StudyDeadlines = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddDeadline, setShowAddDeadline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mock deadlines data with simplified colors
  const deadlines = [
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      course: "Web Development Bootcamp",
      dueDate: "2024-01-18",
      dueTime: "23:59",
      priority: "high",
      type: "quiz",
      progress: 0,
      estimatedTime: "45 min",
      description: "Complete the final quiz covering variables, functions, and DOM manipulation",
      status: "pending"
    },
    {
      id: 2,
      title: "React Project Submission",
      course: "Frontend Development",
      dueDate: "2024-01-20",
      dueTime: "18:00",
      priority: "high",
      type: "project",
      progress: 65,
      estimatedTime: "4 hours",
      description: "Build a todo app using React hooks and local storage",
      status: "in-progress"
    },
    {
      id: 3,
      title: "CSS Grid Assignment",
      course: "Web Design Essentials",
      dueDate: "2024-01-16",
      dueTime: "12:00",
      priority: "medium",
      type: "assignment",
      progress: 100,
      estimatedTime: "2 hours",
      description: "Create a responsive layout using CSS Grid",
      status: "completed"
    },
    {
      id: 4,
      title: "Python Data Structures Test",
      course: "Python Programming",
      dueDate: "2024-01-22",
      dueTime: "15:30",
      priority: "medium",
      type: "test",
      progress: 25,
      estimatedTime: "90 min",
      description: "Test on lists, dictionaries, and sets",
      status: "in-progress"
    },
    {
      id: 5,
      title: "Database Design Essay",
      course: "Database Management",
      dueDate: "2024-01-15",
      dueTime: "23:59",
      priority: "low",
      type: "essay",
      progress: 0,
      estimatedTime: "3 hours",
      description: "Write about normalization techniques",
      status: "overdue"
    },
    {
      id: 6,
      title: "Node.js API Documentation",
      course: "Backend Development",
      dueDate: "2024-01-25",
      dueTime: "17:00",
      priority: "low",
      type: "documentation",
      progress: 10,
      estimatedTime: "2.5 hours",
      description: "Document all API endpoints and usage examples",
      status: "pending"
    }
  ];

  const filters = [
    { id: 'all', label: 'Alle', count: deadlines.length },
    { id: 'pending', label: 'Offen', count: deadlines.filter(d => d.status === 'pending').length },
    { id: 'in-progress', label: 'In Arbeit', count: deadlines.filter(d => d.status === 'in-progress').length },
    { id: 'overdue', label: 'Überfällig', count: deadlines.filter(d => d.status === 'overdue').length },
    { id: 'completed', label: 'Erledigt', count: deadlines.filter(d => d.status === 'completed').length }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800';
      case 'medium': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700';
      case 'low': return 'text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-700';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-primary bg-primary/10';
      case 'in-progress': return 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800';
      case 'completed': return 'text-primary bg-primary/10';
      case 'overdue': return 'text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz': return 'HelpCircle';
      case 'test': return 'FileText';
      case 'assignment': return 'Edit';
      case 'project': return 'Folder';
      case 'essay': return 'PenTool';
      case 'documentation': return 'Book';
      default: return 'Calendar';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDueDate = (dueDate, dueTime) => {
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Heute um ${dueTime}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Morgen um ${dueTime}`;
    } else {
      return `${date.toLocaleDateString('de-DE', { 
        day: 'numeric',
        month: 'short' 
      })} um ${dueTime}`;
    }
  };

  const filteredDeadlines = selectedFilter === 'all' 
    ? deadlines 
    : deadlines.filter(deadline => deadline.status === selectedFilter);

  const sortedDeadlines = filteredDeadlines.sort((a, b) => {
    if (a.status === 'overdue' && b.status !== 'overdue') return -1;
    if (b.status === 'overdue' && a.status !== 'overdue') return 1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const upcomingCount = deadlines.filter(d => d.status === 'pending' || d.status === 'in-progress').length;
  const overdueCount = deadlines.filter(d => d.status === 'overdue').length;
  const completedThisWeek = deadlines.filter(d => d.status === 'completed').length;

  const handleAddDeadline = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowAddDeadline(false);
  };

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileFilters && !event.target.closest('.mobile-filters-container')) {
        setShowMobileFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileFilters]);

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
                  Fristen & Deadlines
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Verwalte deine Abgabetermine und bleibe immer im Zeitplan mit einem eleganten Interface
                </p>
              </motion.div>
            </div>



            {/* Filters and Add Button */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              {/* Mobile Filter Dropdown */}
              <div className="lg:hidden mobile-filters-container relative w-full">
                <motion.button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center justify-between w-full px-4 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-gray-900 dark:text-white font-bold"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{filters.find(f => f.id === selectedFilter)?.label}</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-black text-gray-600 dark:text-gray-400">
                      {filters.find(f => f.id === selectedFilter)?.count}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: showMobileFilters ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ChevronDown" size={18} className="text-gray-500" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showMobileFilters && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-0 overflow-hidden z-10"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {filters.map((filter, index) => (
                        <motion.button
                          key={filter.id}
                          onClick={() => {
                            setSelectedFilter(filter.id);
                            setShowMobileFilters(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
                            selectedFilter === filter.id
                              ? 'bg-primary text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <span className="font-bold text-sm">{filter.label}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-black ${
                            selectedFilter === filter.id
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {filter.count}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Filter Buttons */}
              <motion.div 
                className="hidden lg:flex flex-wrap gap-3"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {filters.map((filter, index) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                      selectedFilter === filter.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      selectedFilter === filter.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {filter.count}
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              <motion.button
                onClick={() => setShowAddDeadline(true)}
                className="w-full lg:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary/25 font-bold active:scale-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Icon name="Plus" size={20} />
                <span>Neue Frist</span>
              </motion.button>
            </div>

            {/* Deadlines List */}
            <AnimatePresence mode="wait">
              <motion.div 
                className="space-y-6"
                key={selectedFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {sortedDeadlines.map((deadline, index) => (
                  <motion.div
                    key={deadline.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                                         <div className="flex flex-col gap-4">
                       <div className="flex items-start gap-4 flex-1">
                         <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-200 ${
                           deadline.status === 'completed' 
                             ? 'bg-primary text-white shadow-primary/25' 
                             : deadline.status === 'overdue'
                             ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-gray-900/25'
                             : 'bg-primary text-white shadow-primary/25'
                         }`}>
                           <Icon name={getTypeIcon(deadline.type)} size={20} className="md:hidden" />
                           <Icon name={getTypeIcon(deadline.type)} size={24} className="hidden md:block" />
                         </div>
                         
                         <div className="flex-1 min-w-0">
                           <div className="flex flex-col gap-2 mb-3">
                             <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200 leading-tight">
                               {deadline.title}
                             </h3>
                             <div className="flex flex-wrap items-center gap-2">
                               <span className={`inline-flex px-3 py-1 rounded-xl text-xs font-black ${getPriorityColor(deadline.priority)}`}>
                                 {deadline.priority === 'high' ? 'Hoch' : deadline.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                               </span>
                               <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold ${getStatusColor(deadline.status)}`}>
                                 <Icon name={
                                   deadline.status === 'completed' ? 'Check' :
                                   deadline.status === 'overdue' ? 'AlertTriangle' :
                                   deadline.status === 'in-progress' ? 'Clock' : 'Calendar'
                                 } size={12} />
                                 <span>
                                   {deadline.status === 'completed' ? 'Erledigt' :
                                    deadline.status === 'overdue' ? 'Überfällig' :
                                    deadline.status === 'in-progress' ? 'In Arbeit' : 'Offen'}
                                 </span>
                               </span>
                             </div>
                           </div>
                           
                           <p className="text-gray-600 dark:text-gray-400 font-medium mb-2 text-sm">
                             {deadline.course}
                           </p>
                           
                           <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm">
                             {deadline.description}
                           </p>

                           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                             <div className="text-left">
                               <p className={`text-sm font-black mb-1 ${
                                 deadline.status === 'overdue' 
                                   ? 'text-gray-900 dark:text-white' 
                                   : getDaysUntilDue(deadline.dueDate) <= 1
                                   ? 'text-gray-700 dark:text-gray-300'
                                   : 'text-gray-900 dark:text-white'
                               }`}>
                                 {formatDueDate(deadline.dueDate, deadline.dueTime)}
                               </p>
                               <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                 Dauer: {deadline.estimatedTime}
                               </p>
                             </div>

                             <div className="flex gap-2">
                               {deadline.status !== 'completed' && (
                                 <button className="w-10 h-10 flex items-center justify-center text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-xl transition-all duration-200 active:scale-95">
                                   <Icon name="Play" size={16} />
                                 </button>
                               )}
                               <button className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 active:scale-95">
                                 <Icon name="Edit" size={16} />
                               </button>
                               <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 active:scale-95">
                                 <Icon name="Trash2" size={16} />
                               </button>
                             </div>
                           </div>

                           {deadline.progress > 0 && deadline.status !== 'completed' && (
                             <div className="space-y-2 mt-4">
                               <div className="flex justify-between items-center">
                                 <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Fortschritt</span>
                                 <span className="text-xs font-black text-primary">
                                   {deadline.progress}%
                                 </span>
                               </div>
                               <div className="relative bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                 <motion.div
                                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-700 rounded-full shadow-sm"
                                   initial={{ width: 0 }}
                                   animate={{ width: `${deadline.progress}%` }}
                                   transition={{ duration: 1.5, delay: 0.8 + index * 0.2, ease: "easeOut" }}
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                     </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {sortedDeadlines.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Calendar" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                  Keine Fristen gefunden
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {selectedFilter === 'all' ? 'Du hast noch keine Fristen erstellt.' : `Keine ${filters.find(f => f.id === selectedFilter)?.label.toLowerCase()} Fristen vorhanden.`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Add Deadline Modal */}
      <AnimatePresence>
        {showAddDeadline && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddDeadline(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Neue Frist erstellen
                </h2>
                <button
                  onClick={() => setShowAddDeadline(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 active:scale-95"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Titel der Aufgabe
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                      placeholder="z.B. JavaScript Quiz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Kurs/Fach
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                      placeholder="z.B. Web Development"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Fälligkeitsdatum
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Uhrzeit
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Priorität
                    </label>
                    <select className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200">
                      <option value="high">Hoch</option>
                      <option value="medium">Mittel</option>
                      <option value="low">Niedrig</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                    Beschreibung
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 resize-none"
                    placeholder="Beschreibe die Aufgabe und wichtige Details..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowAddDeadline(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-bold active:scale-95"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleAddDeadline}
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-all duration-200 font-bold shadow-lg shadow-primary/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Erstellen...</span>
                    </>
                  ) : (
                    'Frist erstellen'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyDeadlines; 
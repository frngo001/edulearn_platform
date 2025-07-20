import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';


const StudyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    course: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'lesson',
    location: '',
    description: '',
    recurring: false,
    priority: 'medium'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock calendar data with simplified colors
  const studyEvents = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      course: "Web Development",
      date: "2024-01-15",
      startTime: "09:00",
      endTime: "10:30",
      type: "lesson",
      status: "completed",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "React Components Quiz",
      course: "Frontend Development", 
      date: "2024-01-16",
      startTime: "14:00",
      endTime: "15:00",
      type: "quiz",
      status: "upcoming",
      color: "bg-gray-600"
    },
    {
      id: 3,
      title: "Python Project Review",
      course: "Python Programming",
      date: "2024-01-17",
      startTime: "16:00",
      endTime: "17:30",
      type: "review",
      status: "upcoming",
      color: "bg-primary"
    },
    {
      id: 4,
      title: "Study Group - CSS Grid",
      course: "Web Design",
      date: "2024-01-18",
      startTime: "19:00",
      endTime: "20:30",
      type: "group",
      status: "upcoming",
      color: "bg-gray-600"
    },
    {
      id: 5,
      title: "Algorithm Practice",
      course: "Computer Science",
      date: "2024-01-19",
      startTime: "10:00",
      endTime: "12:00",
      type: "practice",
      status: "upcoming",
      color: "bg-primary"
    },
    {
      id: 6,
      title: "Database Assignment Due",
      course: "Database Management",
      date: "2024-01-20",
      startTime: "23:59",
      endTime: "23:59",
      type: "deadline",
      status: "upcoming",
      color: "bg-gray-900 dark:bg-gray-100"
    }
  ];

  // Initialize events state
  useEffect(() => {
    setEvents(studyEvents);
  }, []);

  const goals = [
    { id: 1, title: "Complete 5 lessons this week", progress: 80, target: 5, current: 4 },
    { id: 2, title: "Study 10 hours this week", progress: 60, target: 10, current: 6 },
    { id: 3, title: "Finish React course", progress: 75, target: 100, current: 75 }
  ];

  const eventTypes = [
    { id: 'lesson', label: 'Lesson', icon: 'BookOpen', color: 'bg-primary' },
    { id: 'quiz', label: 'Quiz', icon: 'HelpCircle', color: 'bg-gray-600' },
    { id: 'review', label: 'Review', icon: 'Eye', color: 'bg-primary' },
    { id: 'group', label: 'Study Group', icon: 'Users', color: 'bg-gray-600' },
    { id: 'practice', label: 'Practice', icon: 'Code', color: 'bg-primary' },
    { id: 'deadline', label: 'Deadline', icon: 'Clock', color: 'bg-gray-900 dark:bg-gray-100' },
    { id: 'meeting', label: 'Meeting', icon: 'MessageSquare', color: 'bg-gray-600' },
    { id: 'project', label: 'Project', icon: 'Folder', color: 'bg-primary' }
  ];

  const priorityOptions = [
    { id: 'high', label: 'High Priority', color: 'text-gray-900 dark:text-white' },
    { id: 'medium', label: 'Medium Priority', color: 'text-gray-600 dark:text-gray-400' },
    { id: 'low', label: 'Low Priority', color: 'text-gray-500 dark:text-gray-500' }
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!newEvent.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!newEvent.course.trim()) {
      errors.course = 'Course/Subject is required';
    }
    
    if (!newEvent.date) {
      errors.date = 'Date is required';
    }
    
    if (!newEvent.startTime) {
      errors.startTime = 'Start time is required';
    }
    
    if (!newEvent.endTime) {
      errors.endTime = 'End time is required';
    }
    
    if (newEvent.startTime && newEvent.endTime && newEvent.startTime >= newEvent.endTime) {
      errors.endTime = 'End time must be after start time';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'bg-gray-600';
  };

  const handleAddEvent = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const eventType = eventTypes.find(t => t.id === newEvent.type);
    
    const event = {
      id: Date.now(),
      title: newEvent.title,
      course: newEvent.course,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      type: newEvent.type,
      status: 'upcoming',
      color: eventType.color,
      location: newEvent.location,
      description: newEvent.description,
      recurring: newEvent.recurring,
      priority: newEvent.priority
    };

    setEvents(prev => [...prev, event]);
    handleCloseModal();
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setShowAddEvent(false);
    setNewEvent({
      title: '',
      course: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'lesson',
      location: '',
      description: '',
      recurring: false,
      priority: 'medium'
    });
    setFormErrors({});
    setIsLoading(false);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  };

  const getDayEvents = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const selectDate = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const getEventTypeIcon = (type) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.icon : 'Calendar';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-primary';
      case 'upcoming':
        return 'text-gray-600 dark:text-gray-400';
      case 'in-progress':
        return 'text-gray-900 dark:text-white';
      default:
        return 'text-gray-500 dark:text-gray-500';
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 md:h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getDayEvents(day);
      const todayClass = isToday(day) ? 'bg-primary text-white shadow-lg shadow-primary/25' : '';
      const selectedClass = isSelected(day) ? 'ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : '';

      days.push(
        <motion.div
          key={day}
          className={`h-20 md:h-24 border-0 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 rounded-2xl group ${todayClass} ${selectedClass}`}
          onClick={() => selectDate(day)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: day * 0.02 }}
        >
          <div className={`text-sm font-bold mb-2 ${isToday(day) ? 'text-white' : 'text-gray-900 dark:text-white'} group-hover:scale-110 transition-transform duration-200`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 1).map((event, index) => (
              <motion.div
                key={event.id}
                className={`text-xs px-2 py-1 rounded-lg text-white truncate font-medium ${event.color} shadow-sm`}
                title={event.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {event.title}
              </motion.div>
            ))}
            {dayEvents.length > 1 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                +{dayEvents.length - 1} mehr
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

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
                  Lernkalender
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Plane und verfolge deine Lernsessions mit einem eleganten, minimalistischen Interface
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Main Calendar */}
              <div className="xl:col-span-3">
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-0 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Calendar Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-6">
                      <motion.h2 
                        className="text-3xl font-black text-gray-900 dark:text-white tracking-tight"
                        key={currentDate.getMonth()}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {getMonthName(currentDate)}
                      </motion.h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateMonth(-1)}
                          className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                        >
                          <Icon name="ChevronLeft" size={20} className="text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => navigateMonth(1)}
                          className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                        >
                          <Icon name="ChevronRight" size={20} className="text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-200 active:scale-95"
                      >
                        Heute
                      </button>
                      <button
                        onClick={() => setShowAddEvent(true)}
                        className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-all duration-200 font-bold shadow-lg shadow-primary/25 active:scale-95"
                      >
                        <Icon name="Plus" size={18} />
                        <span>Neuer Termin</span>
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-6 backdrop-blur-sm">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-4 mb-6">
                      {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day, index) => (
                        <motion.div
                          key={day}
                          className="text-center py-3"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <span className="text-sm font-black text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                            {day}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-4">
                      {renderCalendarDays()}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Elegant Sidebar */}
              <div className="space-y-6">
                {/* Selected Date Events */}
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    {selectedDate.toLocaleDateString('de-DE', { 
                      weekday: 'long', 
                      day: 'numeric',
                      month: 'long'
                    })}
                  </h3>
                  
                  <AnimatePresence mode="wait">
                    {selectedDateEvents.length > 0 ? (
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {selectedDateEvents.map((event, index) => (
                          <motion.div
                            key={event.id}
                            className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${event.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                <Icon name={getEventTypeIcon(event.type)} size={18} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors duration-200">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {event.course}
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full font-bold text-gray-700 dark:text-gray-300">
                                    {event.startTime} - {event.endTime}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full font-bold ${getStatusColor(event.status)} bg-current bg-opacity-10`}>
                                    {event.status === 'completed' ? 'Abgeschlossen' : 'Geplant'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4">
                          <Icon name="Calendar" size={24} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Keine Termine geplant</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Weekly Goals */}
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Wochenziele</h3>
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name="Target" size={16} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {goals.map((goal, index) => (
                      <motion.div
                        key={goal.id}
                        className="space-y-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {goal.title}
                          </span>
                          <span className="text-sm font-black text-primary">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-700 rounded-full shadow-sm"
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </div>
                        <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
                          {goal.progress}% abgeschlossen
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                  className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-xl border-0 text-white"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-lg font-black mb-6 tracking-tight">Diese Woche</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Termine', value: '12', icon: 'Calendar' },
                      { label: 'Stunden', value: '8.5', icon: 'Clock' },
                      { label: 'Kurse', value: '4', icon: 'BookOpen' },
                      { label: 'Ziele', value: '75%', icon: 'Target' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Icon name={stat.icon} size={16} className="text-white" />
                        </div>
                        <div className="text-2xl font-black mb-1">{stat.value}</div>
                        <div className="text-xs font-bold text-white/70">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddEvent && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
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
                  Neuer Termin
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 active:scale-95"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Titel
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                      placeholder="z.B. JavaScript Fundamentals"
                    />
                    {formErrors.title && (
                      <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Kurs
                    </label>
                    <input
                      type="text"
                      value={newEvent.course}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                      placeholder="z.B. Web Development"
                    />
                    {formErrors.course && (
                      <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.course}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Datum
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Startzeit
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                    />
                    {formErrors.startTime && (
                      <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.startTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                      Endzeit
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                    />
                    {formErrors.endTime && (
                      <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.endTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                    Typ
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {eventTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleInputChange('type', type.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                          newEvent.type === type.id
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-primary'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon name={type.icon} size={20} />
                          <span className="text-xs font-bold">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-bold active:scale-95"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleAddEvent}
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-all duration-200 font-bold shadow-lg shadow-primary/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Speichern...</span>
                    </>
                  ) : (
                    'Termin erstellen'
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

export default StudyCalendar; 
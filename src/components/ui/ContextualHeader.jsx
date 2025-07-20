import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Image from '../AppImage';
import { useUserProfile } from '../../lib/hooks/useUserProfile';
import { useAuth } from '../../lib/AuthContext';

const ContextualHeader = ({ 
  onSearchChange, 
  showRecentChats, 
  setShowRecentChats, 
  chats, 
  currentChatId, 
  onSelectChat, 
  onNewChat, 
  RecentChatsDropdown 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { userProfile } = useUserProfile();
  const { signOut } = useAuth();

  // Study Session State
  const [isStudySession, setIsStudySession] = useState(false);
  const [sessionData, setSessionData] = useState({
    progress: 0,
    currentCard: 1,
    totalCards: 20,
    timeElapsed: 0,
    isPaused: false,
    sessionType: 'flashcard'
  });

  // Check if current page is a study session
  useEffect(() => {
    const studyPaths = ['/flashcard-study-interface', '/ai-chat-assistant'];
    setIsStudySession(studyPaths.includes(location.pathname));
    
    if (location.pathname === '/flashcard-study-interface') {
      setSessionData(prev => ({ ...prev, sessionType: 'flashcard' }));
    } else if (location.pathname === '/ai-chat-assistant') {
      setSessionData(prev => ({ ...prev, sessionType: 'ai-chat' }));
    }
  }, [location.pathname]);

  // Timer effect for study sessions
  useEffect(() => {
    let interval;
    if (isStudySession && !sessionData.isPaused) {
      interval = setInterval(() => {
        setSessionData(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudySession, sessionData.isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    const newPausedState = !sessionData.isPaused;
    setSessionData(prev => ({ ...prev, isPaused: newPausedState }));
    // Update localStorage to communicate with StudySessionOverlay
    localStorage.setItem('study-session-paused', newPausedState.toString());
  };

  // Listen for resume events from StudySessionOverlay
  useEffect(() => {
    const handleResume = () => {
      setSessionData(prev => ({ ...prev, isPaused: false }));
    };

    window.addEventListener('study-session-resume', handleResume);
    return () => window.removeEventListener('study-session-resume', handleResume);
  }, []);

  const handleNext = () => {
    if (sessionData.currentCard < sessionData.totalCards) {
      setSessionData(prev => ({
        ...prev,
        currentCard: prev.currentCard + 1,
        progress: ((prev.currentCard + 1) / prev.totalCards) * 100
      }));
    }
  };

  const handlePrevious = () => {
    if (sessionData.currentCard > 1) {
      setSessionData(prev => ({
        ...prev,
        currentCard: prev.currentCard - 1,
        progress: ((prev.currentCard - 1) / prev.totalCards) * 100
      }));
    }
  };

  const handleExitStudy = () => {
    const confirmExit = window.confirm('Are you sure you want to exit the study session? Your progress will be saved.');
    if (confirmExit) {
      navigate('/dashboard');
    }
  };

  const getHeaderConfig = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Your learning overview',
          showSearch: false,
          showBreadcrumb: false,
          actions: [
            { 
              icon: 'Bell', 
              label: 'Notifications', 
              onClick: () => setShowNotifications(!showNotifications),
              badge: 3
            }
          ]
        };
      case '/my-courses':
        return {
          title: '',
          subtitle: '',
          showSearch: false,
          showBreadcrumb: false,
          hideLogo: true,
          hideProfile: true,
          actions: [
            { 
              icon: 'Search',
              label: 'Neue Kurse', 
              onClick: () => navigate('/course-library') 
            }
          ]
        };
      case '/course-library':
        return {
          title: '',
          subtitle: '',
          showSearch: false,
          showBreadcrumb: false,
          hideLogo: true,
          hideProfile: true,
          actions: [
            { 
              icon: 'BookOpen',
              label: 'Meine Kurse', 
              onClick: () => navigate('/my-courses') 
            }
          ]
        };
      case '/flashcards':
        return {
          title: '',
          subtitle: '',
          showSearch: false,
          showBreadcrumb: false,
          hideLogo: true,
          hideProfile: true,
          actions: [
            { 
              icon: 'Sparkles',
              label: 'KI Generator ausprobieren', 
              onClick: () => {
                // Trigger AI modal from flashcards page
                const event = new CustomEvent('openAIModal');
                window.dispatchEvent(event);
              }
            }
          ]
        };
      case '/flashcard-study-interface':
        return {
          title: 'Study Mode',
          subtitle: 'Flashcard Learning Session',
          showSearch: false,
          showBreadcrumb: false,
          actions: []
        };
      case '/ai-chat-assistant':
        return {
          title: 'AI Assistant',
          subtitle: 'Your learning companion',
          showSearch: false,
          showBreadcrumb: false,
          actions: []
        };
      case '/user-profile-settings':
        return {
          title: 'Profile Settings',
          subtitle: 'Manage your account',
          showSearch: false,
          showBreadcrumb: true,
          breadcrumb: [
            { label: 'Home', path: '/dashboard' },
            { label: 'Settings', path: '/user-profile-settings' }
          ],
          actions: []
        };
      default:
        return {
          title: 'EduLearn',
          subtitle: 'Learning Platform',
          showSearch: false,
          showBreadcrumb: false,
          actions: []
        };
    }
  };

  const config = getHeaderConfig();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Call the onSearchChange callback if provided (for course library page)
      if (onSearchChange) {
        onSearchChange(searchQuery.trim());
      }
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    // Call the onSearchChange callback immediately for real-time search
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
      if (onSearchChange) {
        onSearchChange('');
      }
    }
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Course Complete",
      message: "You completed React Fundamentals!",
      time: "2 minutes ago",
      icon: "Trophy",
      color: "text-yellow-500"
    },
    {
      id: 2,
      title: "New Assignment",
      message: "Python Project is now available",
      time: "1 hour ago",
      icon: "BookOpen",
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "Study Reminder",
      message: "Time for your daily practice",
      time: "3 hours ago",
      icon: "Clock",
      color: "text-green-500"
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowNotifications(false);
        setShowProfile(false);
      }
      if (showMobileMenu && !event.target.closest('[data-mobile-menu]') && !event.target.closest('button[aria-label="Menu"]')) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center space-x-3">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Menu"
            >
              <Icon name={showMobileMenu ? "X" : "Menu"} size={20} className="text-gray-600 dark:text-gray-300" />
            </button>

            {/* App Logo - Hide on AI Chat Assistant page, Dashboard page and when hideLogo is true */}
            {location.pathname !== '/ai-chat-assistant' && location.pathname !== '/dashboard' && !config.hideLogo && (
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-3 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <Icon name="Brain" size={20} className="text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    EduLearn
                  </div>
                </div>
              </motion.button>
            )}

            {/* AI Chat Assistant Title - Only on AI Chat page */}
            {location.pathname === '/ai-chat-assistant' && (
              <div className="flex-1 md:flex-none text-center md:text-left">
                <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  AI Assistant
                </h1>
              </div>
            )}

            {/* Breadcrumb Navigation */}
            {config.showBreadcrumb && config.breadcrumb && (
              <nav className="hidden md:flex items-center space-x-2 ml-6">
                {config.breadcrumb.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Icon name="ChevronRight" size={14} className="text-gray-400 dark:text-gray-500" />
                    )}
                    <button
                      onClick={() => navigate(item.path)}
                      className={`text-sm transition-colors duration-150 ${
                        index === config.breadcrumb.length - 1
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            )}
          </div>

          {/* Study Session Controls - Center (Desktop only) */}
          {isStudySession && (
            <div className="hidden lg:flex items-center space-x-6">
              {/* Timer and Progress */}
              <div className="flex items-center space-x-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                {/* Timer */}
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                    {formatTime(sessionData.timeElapsed)}
                  </span>
                </div>

                {/* Progress for Flashcards */}
                {sessionData.sessionType === 'flashcard' && (
                  <>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {sessionData.currentCard} / {sessionData.totalCards}
                      </span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${sessionData.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}

                {/* Session Type */}
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={sessionData.sessionType === 'flashcard' ? 'CreditCard' : 'MessageSquare'} 
                    size={16} 
                    className="text-blue-600 dark:text-blue-400" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {sessionData.sessionType === 'flashcard' ? 'Flashcards' : 'AI Chat'}
                  </span>
                </div>

                {/* Pause Indicator */}
                {sessionData.isPaused && (
                  <>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-orange-600 dark:text-orange-400">
                        Paused
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Study Controls */}
              <div className="flex items-center space-x-2">
                {/* Previous Button - Only for flashcards */}
                {sessionData.sessionType === 'flashcard' && (
                  <button
                    onClick={handlePrevious}
                    disabled={sessionData.currentCard === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous card"
                  >
                    <Icon name="ChevronLeft" size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                )}

                {/* Pause/Play Button */}
                <button
                  onClick={handlePause}
                  className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150"
                  aria-label={sessionData.isPaused ? 'Resume' : 'Pause'}
                >
                  <Icon 
                    name={sessionData.isPaused ? 'Play' : 'Pause'} 
                    size={18} 
                  />
                </button>

                {/* Next Button - Only for flashcards */}
                {sessionData.sessionType === 'flashcard' && (
                  <button
                    onClick={handleNext}
                    disabled={sessionData.currentCard === sessionData.totalCards}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next card"
                  >
                    <Icon name="ChevronRight" size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                )}

                {/* Exit Button */}
                <button
                  onClick={handleExitStudy}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors duration-150"
                  aria-label="Exit session"
                >
                  <Icon name="X" size={18} className="text-gray-600 dark:text-gray-300 hover:text-red-500" />
                </button>
              </div>
            </div>
          )}

          {/* Search Bar - Desktop (only when not in study session) */}
          {config.showSearch && !isStudySession && (
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                  />
                  <input
                    type="text"
                    placeholder={config.searchPlaceholder || 'Search...'}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-1">
                      <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded">
                        ⌘K
                      </kbd>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Page Title - Mobile (only when not in study session and not AI Chat and not Dashboard and title exists) */}
          {!isStudySession && location.pathname !== '/ai-chat-assistant' && location.pathname !== '/dashboard' && config.title && (
            <div className="flex-1 md:hidden text-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {config.title}
              </h1>
            </div>
          )}

          {/* Empty space for My Courses page - Mobile */}
          {location.pathname === '/my-courses' && (
            <div className="flex-1 md:hidden"></div>
          )}

          {/* Study Session Title - Mobile (Only for Flashcards) */}
          {isStudySession && sessionData.sessionType === 'flashcard' && (
            <div className="flex-1 lg:hidden">
              <div className="text-center">
                <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {config.title}
                </h1>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{formatTime(sessionData.timeElapsed)}</span>
                  <span>•</span>
                  <span>{sessionData.currentCard}/{sessionData.totalCards}</span>
                  {sessionData.isPaused && (
                    <>
                      <span>•</span>
                      <span className="text-orange-500">Paused</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search Toggle */}
            {config.showSearch && !isStudySession && (
              <button
                onClick={toggleSearch}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                aria-label="Toggle search"
              >
                <Icon name="Search" size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            )}

            {/* Mobile Stop Timer Button - Only on Mobile Study Sessions */}
            {isStudySession && (
              <button
                onClick={handlePause}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                aria-label={sessionData.isPaused ? "Resume timer" : "Pause timer"}
              >
                <Icon 
                  name={sessionData.isPaused ? "Play" : "Pause"} 
                  size={20} 
                  className={`${sessionData.isPaused ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'} transition-colors duration-150`} 
                />
              </button>
            )}

            {/* AI Chat Assistant Buttons - Only on Mobile */}
            {location.pathname === '/ai-chat-assistant' && (
              <>
                {/* Recent Chats Button */}
                <div className="relative recent-chats-container md:hidden">
                  <button
                    onClick={() => setShowRecentChats && setShowRecentChats(!showRecentChats)}
                    className={`p-2 rounded-xl transition-colors duration-150 ${
                      showRecentChats 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-label="Recent conversations"
                  >
                    <Icon name="Clock" size={20} />
                  </button>

                  {/* Recent Chats Dropdown */}
                  {RecentChatsDropdown && (
                    <RecentChatsDropdown
                      isOpen={showRecentChats}
                      onClose={() => setShowRecentChats && setShowRecentChats(false)}
                      chats={chats}
                      currentChatId={currentChatId}
                      onSelectChat={onSelectChat}
                      onNewChat={onNewChat}
                    />
                  )}
                </div>

                {/* Edit Button - AI Chat Assistant Style */}
                <button
                  onClick={() => onNewChat && onNewChat()}
                  className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  aria-label="Edit chat"
                >
                  <Icon name="Edit" size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </>
            )}

            {/* Action Buttons - Hide some on mobile for study sessions */}
            {config.actions.filter((action, index) => 
              !isStudySession || index < 1 // Show only first action in study sessions on mobile
            ).map((action, index) => (
              <div key={index} className="relative dropdown-container">
                <button
                  onClick={action.onClick}
                  className={`relative transition-all duration-200 group ${
                    action.icon 
                      ? 'p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700' 
                      : 'px-3 py-2 md:px-4 text-xs md:text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105'
                  }`}
                  aria-label={action.label}
                >
                  {action.icon ? (
                    <Icon 
                      name={action.icon} 
                      size={20} 
                      className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-150" 
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{action.label}</span>
                      <Icon 
                        name="ArrowRight" 
                        size={14} 
                        className="text-white group-hover:translate-x-0.5 transition-transform duration-200" 
                      />
                    </div>
                  )}
                  {action.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {action.badge}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {action.icon === 'Bell' && showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${notification.color}`}>
                              <Icon name={notification.icon} size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {notification.title}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Profile Dropdown - Hide on AI Chat Assistant page, Dashboard page and when hideProfile is true */}
            {location.pathname !== '/ai-chat-assistant' && location.pathname !== '/dashboard' && !config.hideProfile && (
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 group"
                  aria-label="Profile menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden ring-2 ring-white dark:ring-gray-800 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-150">
                    {userProfile?.avatar_url ? (
                      <Image
                        src={userProfile.avatar_url}
                        alt={userProfile.full_name || 'Profile'}
                        className="w-full h-full object-cover"
                        placeholder="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      />
                    ) : (
                      <Icon name="User" size={16} className="text-white" />
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {userProfile?.full_name || userProfile?.username || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userProfile?.email || 'user@edulearn.com'}
                    </p>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-gray-400 dark:text-gray-500 hidden lg:block" />
                </button>

                {/* Profile Dropdown Menu */}
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                          {userProfile?.avatar_url ? (
                            <Image
                              src={userProfile.avatar_url}
                              alt={userProfile.full_name || 'Profile'}
                              className="w-full h-full object-cover"
                              placeholder="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            />
                          ) : (
                            <Icon name="User" size={20} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {userProfile?.full_name || userProfile?.username || 'User'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {userProfile?.email || 'user@edulearn.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/user-profile-settings');
                          setShowProfile(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <Icon name="User" size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">Profile Settings</span>
                      </button>
                      <button
                        onClick={() => console.log('Preferences')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <Icon name="Settings" size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">Preferences</span>
                      </button>
                      <button
                        onClick={() => console.log('Help')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <Icon name="HelpCircle" size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">Help & Support</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                      <button
                        onClick={() => console.log('Sign out')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 text-red-600 dark:text-red-400"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {config.showSearch && showSearch && !isStudySession && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3"
        >
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
              />
              <input
                type="text"
                placeholder={config.searchPlaceholder || 'Search...'}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                autoFocus
              />
            </div>
          </form>
        </motion.div>
      )}

      {/* Mobile Navigation Sidebar Overlay - Google AI Studio Style */}
      {showMobileMenu && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="md:hidden fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
            data-mobile-menu
          >
            <GoogleAIStudioMobileNav onClose={() => setShowMobileMenu(false)} />
          </motion.div>
        </>
      )}
    </motion.header>
  );
};

// Google AI Studio Style Mobile Navigation
const GoogleAIStudioMobileNav = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useUserProfile();
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Complete navigation items based on all available routes
  const navigationSections = [
    {
      title: "Lernen",
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'Home',
          route: '/dashboard',
          description: 'Übersicht'
        },
        {
          id: 'course-library',
          label: 'Kursbibliothek',
          icon: 'BookOpen',
          route: '/course-library',
          description: 'Kurse entdecken'
        },
        {
          id: 'my-courses',
          label: 'Meine Kurse',
          icon: 'User',
          route: '/my-courses',
          description: 'Eingeschriebene Kurse'
        },
        {
          id: 'flashcards',
          label: 'Lernkarten',
          icon: 'Brain',
          route: '/flashcards',
          description: 'Intelligente Karten'
        },
        {
          id: 'ai-chat-assistant',
          label: 'KI-Assistent',
          icon: 'MessageSquare',
          route: '/ai-chat-assistant',
          description: 'Chat-Hilfe'
        }
      ]
    },
    {
      title: "Planung",
      items: [
        {
          id: 'study-schedule',
          label: 'Zeitplan',
          icon: 'CalendarDays',
          route: '/study-schedule',
          description: 'Lernplanung'
        },
        {
          id: 'study-calendar',
          label: 'Kalender',
          icon: 'Calendar',
          route: '/study-calendar',
          description: 'Termine verwalten'
        },
        {
          id: 'study-deadlines',
          label: 'Fristen',
          icon: 'Clock',
          route: '/study-deadlines',
          description: 'Wichtige Termine'
        },
        {
          id: 'learning-goals',
          label: 'Lernziele',
          icon: 'Target',
          route: '/learning-goals',
          description: 'Ziele setzen'
        }
      ]
    },
    {
      title: "Tools",
      items: [
        {
          id: 'study-notes',
          label: 'Notizen',
          icon: 'FileText',
          route: '/study-notes',
          description: 'Intelligente Notizen'
        },
        {
          id: 'study-timer',
          label: 'Timer',
          icon: 'Timer',
          route: '/study-timer',
          description: 'Pomodoro Timer'
        },
        {
          id: 'study-bookmarks',
          label: 'Lesezeichen',
          icon: 'Bookmark',
          route: '/study-bookmarks',
          description: 'Gespeicherte Inhalte'
        }
      ]
    },
    {
      title: "Fortschritt",
      items: [
        {
          id: 'study-progress',
          label: 'Lernfortschritt',
          icon: 'TrendingUp',
          route: '/study-progress',
          description: 'Fortschritt verfolgen'
        },
        {
          id: 'study-achievements',
          label: 'Erfolge',
          icon: 'Award',
          route: '/study-achievements',
          description: 'Errungenschaften'
        },
        {
          id: 'study-statistics',
          label: 'Statistiken',
          icon: 'BarChart3',
          route: '/study-statistics',
          description: 'Lernstatistiken'
        },
        {
          id: 'study-certificates',
          label: 'Zertifikate',
          icon: 'Medal',
          route: '/study-certificates',
          description: 'Abschlüsse'
        }
      ]
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
    onClose();
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      navigate('/signin');
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header - AI Assistant Style */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="Brain" size={18} className="text-white" />
            </motion.div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">EduLearn</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Lernplattform</p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="X" size={18} className="text-gray-500 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Navigation Content - AI Assistant Style */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {navigationSections.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => {
                  const isActive = isActiveRoute(item.route);
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item.route)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 text-left group ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-100 dark:border-blue-800/30'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-800/30 shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                      }`}>
                        <Icon 
                          name={item.icon} 
                          size={18} 
                          className={`transition-colors ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block font-medium text-base truncate ${
                          isActive
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {item.label}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.description}
                        </span>
                      </div>
                      {isActive && (
                        <motion.div 
                          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Actions - AI Assistant Style */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-2">
        <motion.button
          onClick={() => handleNavigation('/user-profile-settings')}
          className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-left group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 flex items-center justify-center transition-colors">
            <Icon name="Settings" size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          </div>
          <div className="flex-1">
            <span className="block font-medium text-gray-900 dark:text-white text-base">Einstellungen</span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">Profil & Präferenzen</span>
          </div>
        </motion.button>
        
        <motion.button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isLoggingOut ? 1 : 1.02 }}
          whileTap={{ scale: isLoggingOut ? 1 : 0.98 }}
        >
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 flex items-center justify-center transition-colors">
            {isLoggingOut ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon name="LogOut" size={18} className="text-red-600 dark:text-red-400" />
            )}
          </div>
          <div className="flex-1">
            <span className="block font-medium text-red-600 dark:text-red-400 text-base">
              {isLoggingOut ? 'Abmelden...' : 'Abmelden'}
            </span>
            <span className="block text-xs text-red-500 dark:text-red-500">
              {isLoggingOut ? 'Bitte warten...' : 'Sicher abmelden'}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default ContextualHeader;
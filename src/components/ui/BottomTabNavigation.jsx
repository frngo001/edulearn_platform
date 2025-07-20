import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import { useUserProfile } from '../../lib/hooks/useUserProfile';
import { useAuth } from '../../lib/AuthContext';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const { userProfile } = useUserProfile();
  const { signOut } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      
      // Show confirmation dialog
      const confirmLogout = window.confirm('Sind Sie sicher, dass Sie sich abmelden möchten? Sie müssen sich erneut anmelden, um auf Ihr Konto zuzugreifen.');
      if (!confirmLogout) {
        setIsLoggingOut(false);
        return;
      }

      // Use the auth context logout
      const { error } = await signOut();
      
      if (error) {
        console.error('Logout error:', error);
        alert('Abmelden fehlgeschlagen. Bitte versuchen Sie es erneut oder aktualisieren Sie die Seite.');
        setIsLoggingOut(false);
        return;
      }

      // Clear any local storage or session data
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (storageError) {
        console.warn('Storage clear error (this is usually fine):', storageError);
      }

      // Show success message briefly before redirect
      console.log('✅ Logout successful - redirecting to sign in...');
      
      // Navigate to logout route which will handle the final redirect
      navigate('/logout');
      
    } catch (error) {
      console.error('Logout error:', error);
      alert('Ein unerwarteter Fehler ist während des Abmeldens aufgetreten. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.');
      setIsLoggingOut(false);
    }
  };

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      route: '/dashboard',
      color: 'blue'
    },
    {
      id: 'courses',
      label: 'Kurse',
      icon: 'BookOpen',
      route: '/course-library',
      color: 'purple'
    },
    {
      id: 'flashcards',
      label: 'Karten',
      icon: 'Brain',
      route: '/flashcards',
      color: 'green'
    },
    {
      id: 'ai-chat',
      label: 'KI-Chat',
      icon: 'MessageSquare',
      route: '/ai-chat-assistant',
      color: 'orange'
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: 'User',
      route: '/user-profile-settings',
      color: 'indigo'
    }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    
    if (currentPath === '/dashboard') return 'dashboard';
    if (currentPath === '/my-courses' || currentPath === '/course-library') return 'courses';
    
    // Study section routes
    if (currentPath === '/flashcard-study-interface' || 
        currentPath === '/ai-chat-assistant' ||
        currentPath === '/study-notes' ||
        currentPath === '/study-timer') return 'flashcards';
    
    // Progress section routes
    if (currentPath === '/study-progress' ||
        currentPath === '/study-achievements' ||
        currentPath === '/study-statistics' ||
        currentPath === '/study-certificates') return 'progress';
    
    // Learning Goals route
    if (currentPath === '/learning-goals') return 'goals';
    
    // Planning section routes
    if (currentPath === '/study-schedule' ||
        currentPath === '/study-calendar' ||
        currentPath === '/study-deadlines' ||
        currentPath === '/study-bookmarks') return 'planning';
    
    // Settings section routes
    if (currentPath === '/user-profile-settings') return 'profile';
    
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (item) => {
    if (item.subItems && item.subItems.length > 0) {
      if (isMobile) {
        // On mobile, navigate to default route
        navigate(item.route);
      } else {
        // On desktop, toggle the expanded state to show/hide sub-items
        setExpandedItem(expandedItem === item.id ? null : item.id);
      }
      return;
    }
    
    // For other items, navigate normally
    navigate(item.route);
    setExpandedItem(null); // Close any expanded items
  };

  const handleSubItemClick = (route) => {
    navigate(route);
  };

  // Hide navigation on registration screen
  if (location.pathname === '/registration-screen') {
    return null;
  }

  // Mobile Bottom Tab Navigation - Hidden (using hamburger menu instead)
  if (isMobile) {
    return null; // Remove bottom tab navigation on mobile
  }

  // Desktop Sidebar Navigation
  return (
    <nav 
      className={`fixed left-0 top-16 bottom-0 bg-surface dark:bg-dark-surface border-r border-border dark:border-dark-border z-90 flex flex-col transition-all duration-150 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scrollable content area */}
      <div className={`flex-1 overflow-y-auto transition-all duration-150 ${isHovered ? 'p-6' : 'p-4'}`}>
        {/* Navigation Items */}
        <div className="space-y-2">
          {tabs.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleTabClick(item)}
                  className={`w-full flex items-center rounded-lg transition-all duration-150 group ${
                    isHovered ? 'justify-between px-4 py-3' : 'justify-center p-3'
                  } ${
                    isActive 
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-white shadow-sm' 
                      : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-primary dark:hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isHovered ? 'space-x-3' : ''}`}>
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={`transition-colors duration-150 flex-shrink-0 ${
                        isActive ? 'text-primary-700 dark:text-white' : 'text-current'
                      }`}
                    />
                    <span className={`font-medium font-caption transition-opacity duration-150 ${
                      isHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 transition-opacity duration-150 ${
                    isHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    {item.badge && (
                      <span className="bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className={`transition-transform duration-150 ${
                          (expandedItem === item.id || isActive) ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    )}
                  </div>
                </button>

                {/* Sub-items for expandable sections */}
                {item.subItems && item.subItems.length > 0 && isHovered && (expandedItem === item.id || isActive) && (
                  <div className="mt-2 ml-4 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.route;
                      
                      return (
                        <button
                          key={subItem.route}
                          onClick={() => handleSubItemClick(subItem.route)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors duration-150 ${
                            isSubActive 
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-white' 
                              : 'text-text-tertiary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-text-secondary dark:hover:text-gray-200'
                          }`}
                        >
                          <Icon 
                            name={subItem.icon} 
                            size={16} 
                            className="text-current"
                          />
                          <span className="text-sm font-caption">
                            {subItem.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions - Show icons when collapsed, full content when expanded */}
        <div className="mt-8 pt-6">
          {isHovered ? (
            <>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 font-caption">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/flashcard-study-interface')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-text-secondary dark:text-dark-text-secondary hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-700 dark:hover:text-accent-400 transition-colors duration-150"
                >
                  <Icon name="Play" size={16} />
                  <span className="text-sm font-caption">Start Study</span>
                </button>
                <button
                  onClick={() => navigate('/study-notes')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-text-secondary dark:text-dark-text-secondary hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-150"
                >
                  <Icon name="FileText" size={16} />
                  <span className="text-sm font-caption">Quick Notes</span>
                </button>
                <button
                  onClick={() => navigate('/study-timer')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-text-secondary dark:text-dark-text-secondary hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150"
                >
                  <Icon name="Timer" size={16} />
                  <span className="text-sm font-caption">Start Timer</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3 flex flex-col items-center">
              <button
                onClick={() => navigate('/flashcard-study-interface')}
                className="p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-700 dark:hover:text-accent-400 transition-colors duration-150"
                aria-label="Start Study"
              >
                <Icon name="Play" size={16} />
              </button>
              <button
                onClick={() => navigate('/study-notes')}
                className="p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-150"
                aria-label="Quick Notes"
              >
                <Icon name="FileText" size={16} />
              </button>
              <button
                onClick={() => navigate('/study-timer')}
                className="p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150"
                aria-label="Start Timer"
              >
                <Icon name="Timer" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button - Fixed at the bottom */}
      <div className={`transition-all duration-150 ${isHovered ? 'p-6' : 'p-4'}`}>
        {isHovered ? (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon 
              name={isLoggingOut ? "Loader2" : "LogOut"} 
              size={20} 
              className={isLoggingOut ? 'animate-spin' : ''}
            />
            <span className="font-medium font-caption">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isLoggingOut ? 'Logging out...' : 'Logout'}
            >
              <Icon 
                name={isLoggingOut ? "Loader2" : "LogOut"} 
                size={20} 
                className={isLoggingOut ? 'animate-spin' : ''}
              />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;
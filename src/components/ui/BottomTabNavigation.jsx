import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      route: '/dashboard',
      badge: null
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: 'BookOpen',
      route: '/course-library',
      badge: null
    },
    {
      id: 'study',
      label: 'Study',
      icon: 'Brain',
      route: '/flashcard-study-interface',
      badge: 3,
      subItems: [
        { label: 'Flashcards', route: '/flashcard-study-interface', icon: 'CreditCard' },
        { label: 'AI Assistant', route: '/ai-chat-assistant', icon: 'MessageSquare' }
      ]
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      route: '/user-profile-settings',
      badge: null
    }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    
    if (currentPath === '/dashboard') return 'dashboard';
    if (currentPath === '/course-library') return 'courses';
    if (currentPath === '/flashcard-study-interface' || currentPath === '/ai-chat-assistant') return 'study';
    if (currentPath === '/user-profile-settings' || currentPath === '/registration-screen') return 'profile';
    
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (item) => {
    if (item.id === 'study' && !isMobile) {
      // On desktop, show study options
      return;
    }
    navigate(item.route);
  };

  const handleStudySubItemClick = (route) => {
    navigate(route);
  };

  // Hide navigation on registration screen
  if (location.pathname === '/registration-screen') {
    return null;
  }

  // Mobile Bottom Tab Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100 h-18">
        <div className="flex items-center justify-around h-full px-2">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors duration-150 ${
                  isActive 
                    ? 'text-primary' :'text-text-tertiary hover:text-text-secondary'
                }`}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`transition-colors duration-150 ${
                      isActive ? 'text-primary' : 'text-current'
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-caption ${
                  isActive ? 'font-medium text-primary' : 'text-current'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <nav className="fixed left-0 top-16 bottom-0 w-64 bg-surface border-r border-border z-90 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleTabClick(item)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-150 group ${
                    isActive 
                      ? 'bg-primary-100 text-primary-700 shadow-sm' 
                      : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={`transition-colors duration-150 ${
                        isActive ? 'text-primary-700' : 'text-current'
                      }`}
                    />
                    <span className="font-medium font-caption">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
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
                          isActive ? 'rotate-180' : 'group-hover:rotate-180'
                        }`}
                      />
                    )}
                  </div>
                </button>

                {/* Study Sub-items */}
                {item.id === 'study' && isActive && item.subItems && (
                  <div className="mt-2 ml-4 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.route;
                      
                      return (
                        <button
                          key={subItem.route}
                          onClick={() => handleStudySubItemClick(subItem.route)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors duration-150 ${
                            isSubActive 
                              ? 'bg-primary-50 text-primary-600' :'text-text-tertiary hover:bg-gray-50 hover:text-text-secondary'
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

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-text-secondary mb-3 font-caption">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/flashcard-study-interface')}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-text-secondary hover:bg-accent-50 hover:text-accent-700 transition-colors duration-150"
            >
              <Icon name="Play" size={16} />
              <span className="text-sm font-caption">Start Study</span>
            </button>
            <button
              onClick={() => navigate('/ai-chat-assistant')}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-text-secondary hover:bg-secondary-50 hover:text-secondary-700 transition-colors duration-150"
            >
              <Icon name="MessageSquare" size={16} />
              <span className="text-sm font-caption">Ask AI</span>
            </button>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary font-caption">
              Today's Progress
            </span>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <span className="text-xs text-text-secondary font-caption">
            68% of daily goal completed
          </span>
        </div>
      </div>
    </nav>
  );
};

export default BottomTabNavigation;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ContextualHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const getHeaderConfig = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'Dashboard',
          showSearch: false,
          actions: [
            { icon: 'Bell', label: 'Notifications', onClick: () => console.log('Notifications') },
            { icon: 'Settings', label: 'Settings', onClick: () => navigate('/user-profile-settings') }
          ]
        };
      case '/course-library':
        return {
          title: 'Course Library',
          showSearch: true,
          searchPlaceholder: 'Search courses...',
          actions: [
            { icon: 'Filter', label: 'Filter', onClick: () => console.log('Filter') },
            { icon: 'Grid3X3', label: 'View', onClick: () => console.log('Change view') }
          ]
        };
      case '/flashcard-study-interface':
        return {
          title: 'Study Session',
          showSearch: false,
          actions: [
            { icon: 'Pause', label: 'Pause', onClick: () => console.log('Pause study') },
            { icon: 'X', label: 'Exit', onClick: () => navigate('/dashboard') }
          ]
        };
      case '/ai-chat-assistant':
        return {
          title: 'AI Assistant',
          showSearch: false,
          actions: [
            { icon: 'MessageSquare', label: 'New Chat', onClick: () => console.log('New chat') },
            { icon: 'X', label: 'Exit', onClick: () => navigate('/dashboard') }
          ]
        };
      case '/user-profile-settings':
        return {
          title: 'Profile Settings',
          showSearch: false,
          actions: [
            { icon: 'Save', label: 'Save', onClick: () => console.log('Save settings') }
          ]
        };
      case '/registration-screen':
        return {
          title: 'Welcome',
          showSearch: false,
          actions: []
        };
      default:
        return {
          title: 'EduLearn',
          showSearch: false,
          actions: []
        };
    }
  };

  const config = getHeaderConfig();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <span className="text-xl font-heading font-semibold text-text-primary hidden sm:block">
              EduLearn
            </span>
          </div>
          {config.title !== 'EduLearn' && (
            <>
              <Icon name="ChevronRight" size={16} className="text-text-tertiary hidden sm:block" />
              <span className="text-lg font-heading font-medium text-text-primary hidden sm:block">
                {config.title}
              </span>
            </>
          )}
        </div>

        {/* Search Bar - Desktop */}
        {config.showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
                />
                <input
                  type="text"
                  placeholder={config.searchPlaceholder || 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
                />
              </div>
            </form>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Toggle */}
          {config.showSearch && (
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
              aria-label="Toggle search"
            >
              <Icon name="Search" size={20} className="text-text-secondary" />
            </button>
          )}

          {/* Action Buttons */}
          {config.actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 group"
              aria-label={action.label}
            >
              <Icon 
                name={action.icon} 
                size={20} 
                className="text-text-secondary group-hover:text-text-primary transition-colors duration-150" 
              />
            </button>
          ))}

          {/* Profile Avatar */}
          <button
            onClick={() => navigate('/user-profile-settings')}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:scale-105 transition-transform duration-150"
            aria-label="Profile"
          >
            <Icon name="User" size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {config.showSearch && showSearch && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
              />
              <input
                type="text"
                placeholder={config.searchPlaceholder || 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default ContextualHeader;
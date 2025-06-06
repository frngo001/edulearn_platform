import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'browse-courses',
      title: 'Browse Courses',
      description: 'Explore new learning opportunities',
      icon: 'Search',
      color: 'primary',
      route: '/course-library'
    },
    {
      id: 'create-flashcards',
      title: 'Create Flashcards',
      description: 'Generate cards from your notes',
      icon: 'Plus',
      color: 'secondary',
      route: '/flashcard-study-interface'
    },
    {
      id: 'ai-chat',
      title: 'Start AI Chat',
      description: 'Get instant help and answers',
      icon: 'MessageSquare',
      color: 'accent',
      route: '/ai-chat-assistant'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-100',
        text: 'text-primary-700',
        hover: 'hover:bg-primary-200',
        button: 'bg-primary hover:bg-primary-700'
      },
      secondary: {
        bg: 'bg-secondary-100',
        text: 'text-secondary-700',
        hover: 'hover:bg-secondary-200',
        button: 'bg-secondary hover:bg-secondary-700'
      },
      accent: {
        bg: 'bg-accent-100',
        text: 'text-accent-700',
        hover: 'hover:bg-accent-200',
        button: 'bg-accent hover:bg-accent-700'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
        Quick Actions
      </h2>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden space-y-4">
        {actions.map((action) => {
          const colors = getColorClasses(action.color);
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.route)}
              className={`w-full ${colors.bg} ${colors.hover} rounded-lg p-4 transition-colors duration-200 text-left`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${colors.button} text-white rounded-lg flex items-center justify-center`}>
                  <Icon name={action.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-heading font-semibold ${colors.text} mb-1`}>
                    {action.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {action.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={20} className="text-text-tertiary" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const colors = getColorClasses(action.color);
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.route)}
              className={`${colors.bg} ${colors.hover} rounded-lg p-6 transition-all duration-200 text-center group hover:scale-105`}
            >
              <div className={`w-16 h-16 ${colors.button} text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={28} />
              </div>
              <h3 className={`font-heading font-semibold ${colors.text} mb-2`}>
                {action.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Additional quick actions for desktop */}
      <div className="hidden lg:block mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/user-profile-settings')}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-left"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={16} className="text-text-secondary" />
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm">Settings</p>
              <p className="text-xs text-text-tertiary">Manage your profile</p>
            </div>
          </button>

          <button
            onClick={() => console.log('View progress')}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-left"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={16} className="text-text-secondary" />
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm">Progress</p>
              <p className="text-xs text-text-tertiary">View detailed stats</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
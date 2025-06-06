import React from 'react';
import Icon from 'components/AppIcon';

const StatisticsCards = ({ stats }) => {
  const statisticsData = [
    {
      id: 'study-time',
      title: 'Weekly Study Time',
      value: stats.studyTime,
      unit: 'minutes',
      change: '+12%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'primary',
      target: 300,
      description: 'This week vs last week'
    },
    {
      id: 'courses-completed',
      title: 'Courses Completed',
      value: stats.coursesCompleted,
      unit: 'courses',
      change: '+1',
      changeType: 'positive',
      icon: 'Trophy',
      color: 'accent',
      target: 5,
      description: 'This month'
    },
    {
      id: 'flashcards-mastered',
      title: 'Flashcards Mastered',
      value: stats.flashcardsMastered,
      unit: 'cards',
      change: '+23',
      changeType: 'positive',
      icon: 'CreditCard',
      color: 'secondary',
      target: 200,
      description: 'This week'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-100',
        text: 'text-primary-700',
        icon: 'text-primary-600'
      },
      secondary: {
        bg: 'bg-secondary-100',
        text: 'text-secondary-700',
        icon: 'text-secondary-600'
      },
      accent: {
        bg: 'bg-accent-100',
        text: 'text-accent-700',
        icon: 'text-accent-600'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatValue = (value, unit) => {
    if (unit === 'minutes' && value >= 60) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hours}h ${minutes}m`;
    }
    return `${value} ${unit}`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
        Your Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statisticsData.map((stat) => {
          const colors = getColorClasses(stat.color);
          const progressPercentage = Math.min((stat.value / stat.target) * 100, 100);
          
          return (
            <div key={stat.id} className="bg-white border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon name={stat.icon} size={20} className={colors.icon} />
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ?'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                }`}>
                  {stat.change}
                </div>
              </div>

              {/* Value */}
              <div className="mb-3">
                <div className="text-2xl font-heading font-bold text-text-primary mb-1">
                  {formatValue(stat.value, stat.unit)}
                </div>
                <h3 className="text-sm font-medium text-text-secondary">
                  {stat.title}
                </h3>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-text-tertiary mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      stat.color === 'primary' ? 'bg-primary' :
                      stat.color === 'secondary'? 'bg-secondary' : 'bg-accent'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-text-tertiary">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-white" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">Great Progress!</h4>
            <p className="text-sm text-text-secondary">
              You're ahead of your weekly goals. Keep up the excellent work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;
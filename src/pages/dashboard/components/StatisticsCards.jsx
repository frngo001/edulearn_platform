import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const StatisticsCards = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);

  const stats = {
    week: {
      studyTime: 285,
      coursesCompleted: 3,
      flashcardsMastered: 147,
      streak: 12,
      averageScore: 87,
      totalSessions: 24
    },
    month: {
      studyTime: 1240,
      coursesCompleted: 8,
      flashcardsMastered: 543,
      streak: 12,
      averageScore: 89,
      totalSessions: 96
    },
    year: {
      studyTime: 14850,
      coursesCompleted: 45,
      flashcardsMastered: 2847,
      streak: 12,
      averageScore: 91,
      totalSessions: 1152
    }
  };

  const currentStats = stats[timeRange];

  const cards = [
    {
      id: 'study-time',
      title: 'Lernzeit',
      value: `${currentStats.studyTime}min`,
      change: '+12%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'blue',
      description: timeRange === 'week' ? 'Diese Woche' : timeRange === 'month' ? 'Diesen Monat' : 'Dieses Jahr'
    },
    {
      id: 'courses',
      title: 'Abgeschlossene Kurse',
      value: currentStats.coursesCompleted,
      change: '+3',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'green',
      description: timeRange === 'week' ? 'Diese Woche' : timeRange === 'month' ? 'Diesen Monat' : 'Dieses Jahr'
    },
    {
      id: 'flashcards',
      title: 'Gemeisterte Karten',
      value: currentStats.flashcardsMastered,
      change: '+23',
      changeType: 'positive',
      icon: 'Brain',
      color: 'purple',
      description: timeRange === 'week' ? 'Diese Woche' : timeRange === 'month' ? 'Diesen Monat' : 'Dieses Jahr'
    },
    {
      id: 'streak',
      title: 'Lern-Serie',
      value: `${currentStats.streak} Tage`,
      change: '+2',
      changeType: 'positive',
      icon: 'Flame',
      color: 'orange',
      description: 'Aktuelle Serie'
    },
    {
      id: 'average-score',
      title: 'Durchschnittsscore',
      value: `${currentStats.averageScore}%`,
      change: '+5%',
      changeType: 'positive',
      icon: 'Target',
      color: 'indigo',
      description: timeRange === 'week' ? 'Diese Woche' : timeRange === 'month' ? 'Diesen Monat' : 'Dieses Jahr'
    },
    {
      id: 'sessions',
      title: 'Lernsitzungen',
      value: currentStats.totalSessions,
      change: '+8',
      changeType: 'positive',
      icon: 'Activity',
      color: 'teal',
      description: timeRange === 'week' ? 'Diese Woche' : timeRange === 'month' ? 'Diesen Monat' : 'Dieses Jahr'
    }
  ];

  const timeRangeOptions = [
    { value: 'week', label: 'Diese Woche' },
    { value: 'month', label: 'Diesen Monat' },
    { value: 'year', label: 'Dieses Jahr' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary',
        text: 'text-primary-700 dark:text-primary-400',
        icon: 'text-white'
      },
      secondary: {
        bg: 'bg-secondary',
        text: 'text-secondary-700 dark:text-secondary-400',
        icon: 'text-white'
      },
      accent: {
        bg: 'bg-accent',
        text: 'text-accent-700 dark:text-accent-400',
        icon: 'text-white'
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
    <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-4 sm:mb-6">
        Deine Statistiken
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card) => {
          const colors = getColorClasses(card.color);
          const progressPercentage = Math.min((card.value / 300) * 100, 100);
          
          return (
            <div key={card.id} className="bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg p-3 sm:p-4 hover:shadow-md dark:hover:shadow-xl transition-shadow duration-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon name={card.icon} size={16} className={colors.icon} />
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  card.changeType === 'positive' 
                    ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400' 
                    : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'
                }`}>
                  {card.change}
                </div>
              </div>

              {/* Value */}
              <div className="mb-3">
                <div className="text-xl sm:text-2xl font-heading font-bold text-text-primary dark:text-dark-text-primary mb-1">
                  {formatValue(card.value, 'min')}
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                  {card.title}
                </h3>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-text-tertiary dark:text-dark-text-tertiary mb-1">
                  <span>Fortschritt</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      card.color === 'primary' ? 'bg-primary' :
                      card.color === 'secondary'? 'bg-secondary' : 'bg-accent'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary insights */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary dark:text-dark-text-primary text-sm sm:text-base">Großartige Fortschritte!</h4>
            <p className="text-xs sm:text-sm text-text-secondary dark:text-dark-text-secondary">
              Du bist weit vorankommen. Halt die gute Arbeit bei!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;
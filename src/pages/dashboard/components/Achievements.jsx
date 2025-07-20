import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('recent');

  const categories = [
    { id: 'recent', label: 'Recent', icon: 'Clock' },
    { id: 'learning', label: 'Learning', icon: 'BookOpen' },
    { id: 'streak', label: 'Streaks', icon: 'Flame' },
    { id: 'social', label: 'Social', icon: 'Users' }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Week Complete",
      description: "Completed your first week of learning",
      icon: "Trophy",
      color: "from-yellow-400 to-orange-500",
      earnedDate: "2024-01-15",
      category: "learning",
      isEarned: true,
      rarity: "common"
    },
    {
      id: 2,
      title: "Night Owl",
      description: "Studied after 10 PM for 5 consecutive days",
      icon: "Moon",
      color: "from-indigo-500 to-purple-600",
      earnedDate: "2024-01-20",
      category: "streak",
      isEarned: true,
      rarity: "rare"
    },
    {
      id: 3,
      title: "Speed Learner",
      description: "Completed 10 lessons in a single day",
      icon: "Zap",
      color: "from-blue-500 to-cyan-500",
      earnedDate: "2024-01-18",
      category: "learning",
      isEarned: true,
      rarity: "epic"
    },
    {
      id: 4,
      title: "Helping Hand",
      description: "Helped 5 fellow students in the community",
      icon: "Heart",
      color: "from-pink-500 to-rose-500",
      earnedDate: null,
      category: "social",
      isEarned: false,
      progress: 60,
      target: 5,
      current: 3,
      rarity: "rare"
    },
    {
      id: 5,
      title: "Code Master",
      description: "Completed 100 coding challenges",
      icon: "Code",
      color: "from-green-500 to-teal-500",
      earnedDate: null,
      category: "learning",
      isEarned: false,
      progress: 75,
      target: 100,
      current: 75,
      rarity: "legendary"
    },
    {
      id: 6,
      title: "30-Day Streak",
      description: "Maintained a 30-day learning streak",
      icon: "Flame",
      color: "from-orange-500 to-red-500",
      earnedDate: null,
      category: "streak",
      isEarned: false,
      progress: 40,
      target: 30,
      current: 12,
      rarity: "epic"
    }
  ];

  const getFilteredAchievements = () => {
    if (selectedCategory === 'recent') {
      return achievements.filter(achievement => achievement.isEarned).slice(0, 3);
    }
    return achievements.filter(achievement => achievement.category === selectedCategory);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 dark:text-gray-400';
      case 'rare': return 'text-blue-600 dark:text-blue-400';
      case 'epic': return 'text-purple-600 dark:text-purple-400';
      case 'legendary': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 dark:border-gray-600';
      case 'rare': return 'border-blue-300 dark:border-blue-600';
      case 'epic': return 'border-purple-300 dark:border-purple-600';
      case 'legendary': return 'border-yellow-300 dark:border-yellow-600';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const totalEarned = achievements.filter(a => a.isEarned).length;
  const totalAchievements = achievements.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Icon name="Award" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {totalEarned} of {totalAchievements} unlocked
            </p>
          </div>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((totalEarned / totalAchievements) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(totalEarned / totalAchievements) * 100}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Icon name={category.icon} size={16} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        {getFilteredAchievements().map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative group border-2 rounded-xl p-4 transition-all duration-200 ${
              achievement.isEarned 
                ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg` 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900'
            }`}
          >
            {/* Rarity Indicator */}
            {achievement.isEarned && (
              <div className={`absolute top-2 right-2 text-xs font-bold uppercase tracking-wider ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity}
              </div>
            )}

            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                achievement.isEarned 
                  ? `bg-gradient-to-r ${achievement.color} shadow-lg` 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                <Icon 
                  name={achievement.icon} 
                  size={24} 
                  className={achievement.isEarned ? 'text-white' : 'text-gray-400 dark:text-gray-500'} 
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      achievement.isEarned 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.isEarned 
                        ? 'text-gray-600 dark:text-gray-300' 
                        : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  
                  {achievement.isEarned ? (
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 mb-1">
                        <Icon name="Check" size={16} />
                        <span className="text-xs font-medium">Earned</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(achievement.earnedDate)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {achievement.progress}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.current}/{achievement.target}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress for unearned achievements */}
                {!achievement.isEarned && achievement.progress && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {achievements.filter(a => a.isEarned && a.rarity === 'legendary').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Legendary</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {achievements.filter(a => a.isEarned && a.rarity === 'epic').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Epic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {achievements.filter(a => a.isEarned && a.rarity === 'rare').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Rare</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements; 
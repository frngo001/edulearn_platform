import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

const StudyAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCelebration, setShowCelebration] = useState(false);

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Erste Schritte",
      description: "Deine erste Lektion abgeschlossen",
      icon: "Play",
      category: "beginner",
      unlocked: true,
      unlockedDate: "2024-01-10",
      progress: 100,
      requirement: "1 Lektion abschließen",
      points: 10,
      rarity: "common"
    },
    {
      id: 2,
      title: "Lernstreak",
      description: "7 Tage in Folge gelernt",
      icon: "Flame",
      category: "consistency",
      unlocked: true,
      unlockedDate: "2024-01-15",
      progress: 100,
      requirement: "7 Tage am Stück lernen",
      points: 50,
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Schnelllerner",
      description: "5 Lektionen an einem Tag abgeschlossen",
      icon: "Zap",
      category: "speed",
      unlocked: true,
      unlockedDate: "2024-01-12",
      progress: 100,
      requirement: "5 Lektionen an einem Tag",
      points: 30,
      rarity: "uncommon"
    },
    {
      id: 4,
      title: "Wissenssucher",
      description: "50 Lektionen insgesamt abgeschlossen",
      icon: "BookOpen",
      category: "progress",
      unlocked: false,
      progress: 76,
      requirement: "50 Lektionen abschließen (38/50)",
      points: 100,
      rarity: "rare"
    },
    {
      id: 5,
      title: "Nachteule",
      description: "Nach 22:00 Uhr gelernt",
      icon: "Moon",
      category: "special",
      unlocked: true,
      unlockedDate: "2024-01-08",
      progress: 100,
      requirement: "Nach 22:00 Uhr lernen",
      points: 20,
      rarity: "common"
    },
    {
      id: 6,
      title: "Frühaufsteher",
      description: "Vor 7:00 Uhr gelernt",
      icon: "Sun",
      category: "special",
      unlocked: false,
      progress: 0,
      requirement: "Vor 7:00 Uhr lernen",
      points: 25,
      rarity: "uncommon"
    },
    {
      id: 7,
      title: "Perfekte Woche",
      description: "Alle Tagesziele einer Woche erreicht",
      icon: "Target",
      category: "consistency",
      unlocked: false,
      progress: 42,
      requirement: "Tagesziele erreichen (3/7 Tage)",
      points: 75,
      rarity: "rare"
    },
    {
      id: 8,
      title: "Kursmeister",
      description: "Deinen ersten Kurs abgeschlossen",
      icon: "Award",
      category: "progress",
      unlocked: true,
      unlockedDate: "2024-01-14",
      progress: 100,
      requirement: "1 Kurs abschließen",
      points: 150,
      rarity: "epic"
    },
    {
      id: 9,
      title: "Marathon-Lerner",
      description: "4+ Stunden an einem Tag gelernt",
      icon: "Clock",
      category: "endurance",
      unlocked: false,
      progress: 65,
      requirement: "4+ Stunden lernen (2,6/4 Stunden)",
      points: 80,
      rarity: "rare"
    },
    {
      id: 10,
      title: "Sozialer Lerner",
      description: "An einer Gruppenlern-Session teilgenommen",
      icon: "Users",
      category: "social",
      unlocked: false,
      progress: 0,
      requirement: "An einer Gruppenlernsession teilnehmen",
      points: 40,
      rarity: "uncommon"
    }
  ];

  const categories = [
    { id: 'all', label: 'Alle', icon: 'Grid3X3' },
    { id: 'beginner', label: 'Anfänger', icon: 'Star' },
    { id: 'progress', label: 'Fortschritt', icon: 'TrendingUp' },
    { id: 'consistency', label: 'Konstanz', icon: 'Calendar' },
    { id: 'speed', label: 'Geschwindigkeit', icon: 'Zap' },
    { id: 'endurance', label: 'Ausdauer', icon: 'Clock' },
    { id: 'special', label: 'Spezial', icon: 'Sparkles' },
    { id: 'social', label: 'Sozial', icon: 'Users' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface';
      case 'uncommon': return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10';
      case 'rare': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10';
      case 'epic': return 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10';
      case 'legendary': return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10';
      default: return 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface';
    }
  };

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-secondary dark:text-dark-text-secondary';
      case 'uncommon': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'rare': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'epic': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-secondary dark:text-dark-text-secondary';
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case 'common': return 'Häufig';
      case 'uncommon': return 'Ungewöhnlich';
      case 'rare': return 'Selten';
      case 'epic': return 'Episch';
      case 'legendary': return 'Legendär';
      default: return 'Häufig';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const totalAchievements = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="p-4 space-y-6 max-w-7xl mx-auto md:p-6 lg:p-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary md:text-3xl">
                Erfolge
              </h1>
              <p className="text-base text-text-secondary dark:text-dark-text-secondary md:text-lg">
                Feiere deine Lernerfolge und schalte neue Belohnungen frei
              </p>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="Trophy" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                      {unlockedCount}/{totalAchievements}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      Erfolge freigeschaltet
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="Star" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                      {totalPoints}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      Gesammelte Punkte
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                      {progressPercentage}%
                    </p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      Gesamtfortschritt
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
          >
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                  }`}
                >
                  <Icon name={category.icon} size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`${getRarityColor(achievement.rarity)} rounded-2xl p-4 border transition-all duration-200 ${
                  achievement.unlocked ? 'active:scale-95' : 'opacity-60'
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-primary text-white' 
                          : 'bg-surface-secondary dark:bg-dark-surface-secondary'
                      }`}>
                        <Icon 
                          name={achievement.unlocked ? achievement.icon : 'Lock'} 
                          size={20} 
                          className={achievement.unlocked ? 'text-white' : 'text-text-tertiary dark:text-dark-text-tertiary'}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getRarityBadgeColor(achievement.rarity)}`}>
                        {getRarityLabel(achievement.rarity)}
                      </span>
                      {achievement.unlocked && (
                        <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                          {achievement.points} Pkt
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress or Completion Info */}
                  {achievement.unlocked ? (
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        Freigeschaltet am {formatDate(achievement.unlockedDate)}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary dark:text-dark-text-secondary">
                          Fortschritt
                        </span>
                        <span className="font-medium text-text-primary dark:text-dark-text-primary">
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Requirement */}
                  <div className="p-3 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl">
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium">Anforderung:</span> {achievement.requirement}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trophy" size={24} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Keine Erfolge in dieser Kategorie
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Wähle eine andere Kategorie oder arbeite an deinen Lernzielen
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudyAchievements; 
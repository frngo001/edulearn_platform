import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();
  const [hoveredAction, setHoveredAction] = useState(null);

  const mobileActions = [
    {
      id: 'browse-courses',
      title: 'Kurse entdecken',
      icon: 'Search',
      gradient: 'from-blue-500 to-cyan-500',
      route: '/course-library'
    },
    {
      id: 'create-flashcards',
      title: 'Lernkarten',
      icon: 'Brain',
      gradient: 'from-purple-500 to-pink-500',
      route: '/flashcards'
    },
    {
      id: 'ai-chat',
      title: 'KI-Assistent',
      icon: 'MessageSquare',
      gradient: 'from-emerald-500 to-teal-500',
      route: '/ai-chat-assistant'
    },
    {
      id: 'quick-notes',
      title: 'Notizen',
      icon: 'FileText',
      gradient: 'from-orange-500 to-red-500',
      route: '/study-notes'
    }
  ];

  const primaryActions = [
    {
      id: 'browse-courses',
      title: 'Kurse entdecken',
      description: 'Neue Lernmöglichkeiten entdecken',
      icon: 'Search',
      gradient: 'from-blue-500 to-cyan-500',
      route: '/course-library',
      stats: '2.847 Kurse verfügbar'
    },
    {
      id: 'create-flashcards',
      title: 'Lernkarten erstellen',
      description: 'Sofort Lernkarten generieren',
      icon: 'Brain',
      gradient: 'from-purple-500 to-pink-500',
      route: '/flashcards',
      stats: '147 Karten erstellt'
    },
    {
      id: 'ai-chat',
      title: 'KI-Assistent',
      description: 'Sofortige Hilfe und Antworten',
      icon: 'MessageSquare',
      gradient: 'from-emerald-500 to-teal-500',
      route: '/ai-chat-assistant',
      stats: 'Immer verfügbar'
    }
  ];

  const secondaryActions = [
    {
      id: 'learning-goals',
      title: 'Lernziele',
      description: 'Ziele setzen und verfolgen',
      icon: 'Target',
      route: '/learning-goals'
    },
    {
      id: 'profile-settings',
      title: 'Profil-Einstellungen',
      description: 'Konto verwalten',
      icon: 'Settings',
      route: '/user-profile-settings'
    },
    {
      id: 'progress-stats',
      title: 'Fortschritt-Statistiken',
      description: 'Detaillierte Analysen anzeigen',
      icon: 'BarChart3',
      route: '/study-progress'
    },
    {
      id: 'certificates',
      title: 'Zertifikate',
      description: 'Errungenschaften anzeigen',
      icon: 'Award',
      route: '/study-certificates'
    },
    {
      id: 'bookmarks',
      title: 'Lesezeichen',
      description: 'Gespeicherte Inhalte',
      icon: 'Bookmark',
      route: '/study-bookmarks'
    }
  ];

  const quickTools = [
    {
      id: 'notes',
      title: 'Notizen',
      icon: 'FileText',
      action: () => navigate('/study-notes')
    },
    {
      id: 'timer',
      title: 'Lern-Timer',
      icon: 'Timer',
      action: () => navigate('/study-timer')
    },
    {
      id: 'calendar',
      title: 'Zeitplan',
      icon: 'Calendar',
      action: () => navigate('/study-calendar')
    }
  ];

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden" data-testid="quick-actions">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Schnellzugriff
          </h2>
          <Icon name="Zap" size={18} className="text-yellow-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {mobileActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={() => navigate(action.route)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-3`}>
                  <Icon name={action.icon} size={22} className="text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                  {action.title}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block space-y-6" data-testid="quick-actions">
      {/* Primary Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Schnellzugriff
          </h2>
          <Icon name="Zap" size={20} className="text-yellow-500" />
        </div>

        <div className="space-y-4">
          {primaryActions.map((action, index) => (
            <motion.button
              key={action.id}
              data-testid={`primary-action-${action.id}`}
              onClick={() => navigate(action.route)}
              onHoverStart={() => setHoveredAction(action.id)}
              onHoverEnd={() => setHoveredAction(null)}
              className="w-full group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`bg-gradient-to-r ${action.gradient} p-[1px] rounded-xl transition-all duration-300 ${
                hoveredAction === action.id ? 'shadow-lg scale-102' : ''
              }`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 h-full">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-200 ${
                      hoveredAction === action.id ? 'scale-110' : ''
                    }`}>
                      <Icon name={action.icon} size={24} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {action.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {action.stats}
                      </p>
                    </div>
                    <Icon 
                      name="ChevronRight" 
                      size={20} 
                      className={`text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ${
                        hoveredAction === action.id ? 'translate-x-1' : ''
                      }`} 
                    />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weitere Optionen
          </h3>
          <Icon name="Grid3X3" size={18} className="text-gray-500 dark:text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {secondaryActions.map((action, index) => (
            <motion.button
              key={action.id}
              data-testid={`secondary-action-${action.id}`}
              onClick={() => navigate(action.route)}
              className="group bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl p-4 transition-all duration-200 text-left"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-start space-y-2">
                <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <Icon name={action.icon} size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Tools */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Schnell-Tools
          </h3>
          <Icon name="Wrench" size={18} className="text-gray-500 dark:text-gray-400" />
        </div>

        <div className="flex space-x-3">
          {quickTools.map((tool, index) => (
            <motion.button
              key={tool.id}
              data-testid={`quick-tool-${tool.id}`}
              onClick={tool.action}
              className="flex-1 group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl p-3 transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <Icon name={tool.icon} size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                  {tool.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Study Streak Card */}
      <motion.div 
        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Flame" size={24} className="text-orange-200" />
              <h3 className="text-lg font-bold">Lern-Serie</h3>
            </div>
            <p className="text-orange-100 text-sm mb-1">Halte das Momentum aufrecht!</p>
            <p className="text-2xl font-bold">12 Tage</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default QuickActions;
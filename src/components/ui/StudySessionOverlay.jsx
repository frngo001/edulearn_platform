import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';

const StudySessionOverlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isStudySession, setIsStudySession] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const studyPaths = ['/flashcard-study-interface', '/ai-chat-assistant'];
    setIsStudySession(studyPaths.includes(location.pathname));
  }, [location.pathname]);

  // Listen for pause state changes from the header
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'study-session-paused') {
        setIsPaused(e.newValue === 'true');
      }
    };

    // Check initial state
    const pausedState = localStorage.getItem('study-session-paused');
    setIsPaused(pausedState === 'true');

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleResume = () => {
    setIsPaused(false);
    localStorage.setItem('study-session-paused', 'false');
    // Trigger a custom event to notify the header
    window.dispatchEvent(new CustomEvent('study-session-resume'));
  };

  if (!isStudySession || isMobile) {
    return null; // Hide on mobile, show only on desktop
  }

  return (
    <AnimatePresence>
      {/* Study Session Pause Overlay */}
      {isPaused && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-center">
              {/* Pause Icon */}
              <motion.div 
                className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon name="Pause" size={32} className="text-orange-600 dark:text-orange-400" />
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Study Session Paused
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Take a well-deserved break! Your progress is automatically saved. 
                Click resume when you're ready to continue your learning journey.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={handleResume}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Icon name="Play" size={20} />
                  <span>Resume Study Session</span>
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-xl transition-colors duration-200 font-medium"
                >
                  Exit to Dashboard
                </button>
              </motion.div>

              {/* Tips */}
              <motion.div 
                className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Study Tip
                    </p>
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      Taking regular breaks helps improve focus and retention. Consider the Pomodoro Technique: 25 minutes of study followed by a 5-minute break.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudySessionOverlay;
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const AuthToggle = ({ 
  mode = 'signin', // 'signin' or 'signup'
  className = '',
  variant = 'header', // 'header', 'card', 'inline'
  showIcon = true,
  customText = null
}) => {
  const navigate = useNavigate();

  const config = {
    signin: {
      text: customText || "Don't have an account?",
      actionText: "Sign up",
      actionRoute: "/registration",
      icon: "UserPlus",
      description: "Join thousands of learners",
      bgGradient: "from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20",
      iconBg: "bg-primary-100 dark:bg-primary-900/30",
      iconColor: "text-primary-600 dark:text-primary-400"
    },
    signup: {
      text: customText || "Already have an account?",
      actionText: "Sign in", 
      actionRoute: "/signin",
      icon: "LogIn",
      description: "Welcome back!",
      bgGradient: "from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20",
      iconBg: "bg-secondary-100 dark:bg-secondary-900/30",
      iconColor: "text-secondary-600 dark:text-secondary-400"
    }
  };

  const currentConfig = config[mode];

  const handleClick = () => {
    navigate(currentConfig.actionRoute);
  };

  // Header variant (simple, minimal)
  if (variant === 'header') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`${className}`}
      >
        <div className="flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group">
          {/* Question and Description */}
          <div className="flex flex-col">
            <span className="text-text-secondary dark:text-dark-text-secondary text-sm leading-tight">
              {currentConfig.text}
            </span>
            <span className="text-text-tertiary dark:text-dark-text-tertiary text-xs leading-tight">
              {currentConfig.description}
            </span>
          </div>
          
          {/* Separator */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-60"></div>
          
          {/* Action Button */}
          <motion.button
            onClick={handleClick}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon 
              name={currentConfig.icon} 
              size={14} 
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span>{currentConfig.actionText}</span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Card variant (enhanced with background and icon)
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`bg-gradient-to-r ${currentConfig.bgGradient} rounded-xl p-6 border border-border/50 dark:border-dark-border/50 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showIcon && (
              <div className={`w-12 h-12 ${currentConfig.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon 
                  name={currentConfig.icon} 
                  size={20} 
                  className={currentConfig.iconColor}
                />
              </div>
            )}
            <div>
              <p className="text-text-primary dark:text-dark-text-primary font-medium">
                {currentConfig.text}
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                {currentConfig.description}
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleClick}
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>{currentConfig.actionText}</span>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Inline variant (stylized text with better visual hierarchy)
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`text-center ${className}`}
      >
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="text-text-secondary dark:text-dark-text-secondary">
            {currentConfig.text}
          </span>
          <motion.button
            onClick={handleClick}
            className="relative text-primary hover:text-primary-700 font-semibold transition-all duration-200 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentConfig.actionText}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out" />
          </motion.button>
        </div>
        
        {/* Optional: Add a subtle separator line */}
        <div className="flex items-center justify-center mt-4 mb-2">
          <div className="h-px bg-gradient-to-r from-transparent via-border dark:via-dark-border to-transparent w-full max-w-xs" />
        </div>
        
        <p className="text-text-tertiary dark:text-dark-text-tertiary text-xs">
          {currentConfig.description}
        </p>
      </motion.div>
    );
  }

  // Default fallback (header variant)
  return (
    <motion.button
      onClick={handleClick}
      className={`text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-200 font-medium ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {currentConfig.text} <span className="text-primary font-semibold">{currentConfig.actionText}</span>
    </motion.button>
  );
};

export default AuthToggle; 
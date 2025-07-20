import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating orbs animation variants
  const orbVariants = {
    animate: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const quickActions = [
    {
      icon: 'MessageSquare',
      title: 'AI Chat',
      description: 'Hilfe von unserem KI-Assistenten',
      route: '/ai-chat-assistant',
      gradient: 'from-blue-500 to-purple-600',
      hoverGradient: 'from-blue-600 to-purple-700'
    },
    {
      icon: 'Layers',
      title: 'Karteikarten',
      description: 'Lernen mit smarten Karteikarten',
      route: '/flashcards',
      gradient: 'from-green-500 to-teal-600',
      hoverGradient: 'from-green-600 to-teal-700'
    },
    {
      icon: 'BookOpen',
      title: 'Kursbibliothek',
      description: 'Entdecke verfügbare Kurse',
      route: '/course-library',
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'from-orange-600 to-red-700'
    },
    {
      icon: 'User',
      title: 'Anmelden',
      description: 'Zugang zu deinem Konto',
      route: '/signin',
      gradient: 'from-purple-500 to-pink-600',
      hoverGradient: 'from-purple-600 to-pink-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Floating geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236B7280%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Dynamic mouse-following element */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-10 opacity-20"
        animate={{
          x: mousePosition.x * 8,
          y: mousePosition.y * 8,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15
        }}
      />

      {/* Navigation */}
      <nav className="relative z-20 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <motion.div 
                className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="Brain" size={16} className="text-white md:w-5 md:h-5" />
              </motion.div>
              <span className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">EduLearn</span>
            </Link>
            
            <div className="flex items-center space-x-3 md:space-x-6">
              <Link
                to="/signin"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm md:text-base"
              >
                Anmelden
              </Link>
              <Link
                to="/registration-screen"
                className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm md:text-base"
              >
                Registrieren
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-4xl text-center">
          {/* 404 Illustration with Animation */}
          <motion.div 
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Large 404 Text with Gradient */}
            <motion.div 
              className="relative inline-block"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.div
                className="text-6xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-6 select-none"
                animate={{
                  backgroundPosition: isHovering ? ['0%', '100%'] : ['0%', '50%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                404
              </motion.div>
              
              {/* Floating icons around 404 */}
              <motion.div
                className="absolute -top-4 -left-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                variants={orbVariants}
                animate="animate"
              >
                <Icon name="Search" size={20} className="text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -top-2 -right-6 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center"
                variants={orbVariants}
                animate="animate"
                transition={{ delay: 1 }}
              >
                <Icon name="AlertTriangle" size={16} className="text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center"
                variants={orbVariants}
                animate="animate"
                transition={{ delay: 2 }}
              >
                <Icon name="MapPin" size={22} className="text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Oops! Seite nicht gefunden
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Die Seite, die Sie suchen, konnte nicht gefunden werden. Sie wurde möglicherweise verschoben, 
              gelöscht, oder Sie haben eine falsche URL eingegeben.
            </p>
          </motion.div>

          {/* Action Buttons with Enhanced Animation */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base md:text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
              >
                <Icon name="Home" size={18} className="md:w-5 md:h-5" />
                <span>Zur Startseite</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-base md:text-lg font-semibold rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="ArrowLeft" size={18} className="md:w-5 md:h-5" />
                <span>Zurück</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced Helpful Links Section */}
          <motion.div 
            className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8 md:pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6 md:mb-8">
              Versuchen Sie stattdessen diese beliebten Seiten:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.route}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={action.route}
                    className="group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-2xl block overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    {/* Icon with enhanced animation */}
                    <motion.div 
                      className={`relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:${action.hoverGradient} transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon name={action.icon} size={20} className="text-white md:w-6 md:h-6" />
                    </motion.div>
                    
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {action.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {action.description}
                    </p>

                    {/* Hover arrow indicator */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <Icon name="ArrowUpRight" size={16} className="text-gray-400" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Stats Animation */}
          <motion.div 
            className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { number: '50K+', label: 'Aktive Nutzer' },
              { number: '1M+', label: 'Karteikarten erstellt' },
              { number: '24/7', label: 'KI-Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-gray-200/50 dark:border-gray-700/50 py-6 md:py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <Link to="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Nutzungsbedingungen
            </Link>
            <Link to="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Datenschutzerklärung
            </Link>
            <a href="mailto:support@edulearn.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Support kontaktieren
            </a>
          </div>
          <div className="mt-4 text-xs md:text-sm text-gray-400 dark:text-gray-500">
            © 2024 EduLearn. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound; 
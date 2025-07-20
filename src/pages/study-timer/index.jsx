import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

const StudyTimer = () => {
  const [timerMode, setTimerMode] = useState('pomodoro'); // pomodoro, custom, stopwatch
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [currentSession, setCurrentSession] = useState(1);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('JavaScript');
  const [sessionType, setSessionType] = useState('focus'); // focus, short-break, long-break
  const [selectedSound, setSelectedSound] = useState(null);
  const [soundVolume, setSoundVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const intervalRef = useRef(null);

  const pomodoroSettings = {
    focus: 25 * 60,      // 25 minutes
    shortBreak: 5 * 60,  // 5 minutes
    longBreak: 15 * 60   // 15 minutes
  };

  const subjects = [
    { id: 'javascript', name: 'JavaScript', icon: 'Code', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' },
    { id: 'react', name: 'React', icon: 'Atom', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { id: 'python', name: 'Python', icon: 'FileCode', color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
    { id: 'css', name: 'CSS', icon: 'Palette', color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { id: 'database', name: 'Database', icon: 'Database', color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
    { id: 'algorithms', name: 'Algorithms', icon: 'Brain', color: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' },
    { id: 'uiux', name: 'UI/UX', icon: 'Figma', color: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
    { id: 'nodejs', name: 'Node.js', icon: 'Server', color: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' }
  ];

  const focusSounds = [
    { id: 'rain', name: 'Regen', icon: 'CloudRain', description: 'Beruhigende Regentropfen', color: 'bg-blue-500' },
    { id: 'forest', name: 'Wald', icon: 'Trees', description: 'Vogelgezwitscher & Wind', color: 'bg-green-500' },
    { id: 'ocean', name: 'Ozean', icon: 'Waves', description: 'Sanfte Meereswellen', color: 'bg-cyan-500' },
    { id: 'whitenoise', name: 'Weißes Rauschen', icon: 'Volume2', description: 'Konstantes Rauschen', color: 'bg-gray-500' },
    { id: 'cafe', name: 'Café Atmosphäre', icon: 'Coffee', description: 'Gemurmel & Kaffeemaschinen', color: 'bg-amber-500' },
    { id: 'fire', name: 'Kaminfeuer', icon: 'Flame', description: 'Knisterndes Feuer', color: 'bg-orange-500' }
  ];

  // Enhanced session data with more details
  const todaysSessions = [
    { id: 1, subject: 'JavaScript', duration: 25, type: 'focus', completedAt: '09:30', productivity: 92, startTime: '09:05' },
    { id: 2, subject: 'JavaScript', duration: 5, type: 'break', completedAt: '09:55', productivity: null, startTime: '09:30' },
    { id: 3, subject: 'React', duration: 25, type: 'focus', completedAt: '10:20', productivity: 88, startTime: '09:55' },
    { id: 4, subject: 'React', duration: 5, type: 'break', completedAt: '10:45', productivity: null, startTime: '10:20' },
    { id: 5, subject: 'CSS', duration: 25, type: 'focus', completedAt: '11:10', productivity: 95, startTime: '10:45' },
    { id: 6, subject: 'CSS', duration: 15, type: 'long-break', completedAt: '11:35', productivity: null, startTime: '11:10' },
    { id: 7, subject: 'Python', duration: 25, type: 'focus', completedAt: '12:00', productivity: 90, startTime: '11:35' }
  ];

  const weeklyStats = {
    totalHours: 28.5,
    focusSessions: 47,
    averageSession: 24,
    longestStreak: 8,
    productivity: 91,
    dailyGoal: 6,
    completedToday: 5
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    setCompletedSessions(prev => prev + 1);
    
    // Auto-switch between focus and break sessions
    if (timerMode === 'pomodoro') {
      if (sessionType === 'focus') {
        const isLongBreak = (completedSessions + 1) % 4 === 0;
        const nextType = isLongBreak ? 'long-break' : 'short-break';
        setSessionType(nextType);
        setTime(pomodoroSettings[nextType === 'long-break' ? 'longBreak' : 'shortBreak']);
        setInitialTime(pomodoroSettings[nextType === 'long-break' ? 'longBreak' : 'shortBreak']);
      } else {
        setSessionType('focus');
        setTime(pomodoroSettings.focus);
        setInitialTime(pomodoroSettings.focus);
        setCurrentSession(prev => prev + 1);
      }
    }
    
    // Notification (placeholder)
    console.log('Timer completed!');
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const setCustomTime = (minutes) => {
    const seconds = minutes * 60;
    setTime(seconds);
    setInitialTime(seconds);
    setTimerMode('custom');
    setSessionType('custom');
    setIsRunning(false);
  };

  const setPomodoroMode = (type) => {
    setTimerMode('pomodoro');
    setSessionType(type);
    const timeValue = pomodoroSettings[type === 'focus' ? 'focus' : type === 'short-break' ? 'shortBreak' : 'longBreak'];
    setTime(timeValue);
    setInitialTime(timeValue);
    setIsRunning(false);
  };

  const handleSoundSelect = (soundId) => {
    if (selectedSound === soundId) {
      // Toggle play/pause for current sound
      setIsPlaying(!isPlaying);
    } else {
      // Select new sound and start playing
      setSelectedSound(soundId);
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (initialTime === 0) return 0;
    return ((initialTime - time) / initialTime) * 100;
  };

  const getSessionTypeLabel = () => {
    switch (sessionType) {
      case 'focus': return 'Fokuszeit';
      case 'short-break': return 'Kurze Pause';
      case 'long-break': return 'Lange Pause';
      case 'custom': return 'Benutzerdefiniert';
      default: return 'Timer';
    }
  };

  const getSessionTypeIcon = () => {
    switch (sessionType) {
      case 'focus': return 'Brain';
      case 'short-break': return 'Coffee';
      case 'long-break': return 'Moon';
      case 'custom': return 'Clock';
      default: return 'Timer';
    }
  };

  const getSelectedSubject = () => {
    return subjects.find(s => s.name === selectedSubject) || subjects[0];
  };

  const getProductivityColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const CircularProgress = ({ progress, size = 280, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-surface-secondary dark:text-dark-surface-secondary"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-primary"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="text-6xl font-bold text-text-primary dark:text-dark-text-primary mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {formatTime(time)}
            </motion.div>
            <div className="flex items-center justify-center space-x-2 text-text-secondary dark:text-dark-text-secondary">
              <Icon name={getSessionTypeIcon()} size={16} />
              <span className="text-sm font-medium">{getSessionTypeLabel()}</span>
            </div>
            <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-1">
              Session {currentSession}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dynamic Sessions Timeline Chart
  const SessionsTimelineChart = ({ sessions }) => {
    const maxDuration = Math.max(...sessions.map(s => s.duration));
    const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    
    return (
      <div className="space-y-4">
        {/* Timeline Header */}
        <div className="flex items-center justify-between text-sm text-text-secondary dark:text-dark-text-secondary">
          <span>Heute: {sessions.length} Sessions</span>
          <span>Total: {Math.floor(totalTime / 60)}h {totalTime % 60}min</span>
        </div>
        
        {/* Interactive Timeline */}
        <div className="space-y-3">
          {sessions.map((session, index) => {
            const widthPercentage = (session.duration / maxDuration) * 100;
            const isActive = index === sessions.length - 1;
            
            return (
              <motion.div
                key={session.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-surface-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all duration-200">
                  {/* Time indicator */}
                  <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary w-12">
                    {session.startTime}
                  </div>
                  
                  {/* Session bar */}
                  <div className="flex-1 relative">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        session.type === 'focus' ? 'bg-blue-500' : 
                        session.type === 'break' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                      <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                        {session.subject}
                      </span>
                      {session.productivity && (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getProductivityColor(session.productivity)} bg-surface dark:bg-dark-surface`}>
                          {session.productivity}%
                        </span>
                      )}
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-surface dark:bg-dark-surface rounded-full h-2 relative overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          session.type === 'focus' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                          session.type === 'break' ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                          'bg-gradient-to-r from-purple-400 to-purple-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                      
                      {/* Animated pulse for active session */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-full"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    
                    {/* Duration label */}
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        {session.duration}min
                      </span>
                      <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        {session.completedAt}
                      </span>
                    </div>
                  </div>
                  
                  {/* Session type icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    session.type === 'focus' ? 'bg-blue-100 dark:bg-blue-900/20' : 
                    session.type === 'break' ? 'bg-green-100 dark:bg-green-900/20' : 
                    'bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    <Icon 
                      name={session.type === 'focus' ? 'Brain' : session.type === 'break' ? 'Coffee' : 'Moon'} 
                      size={14}
                      className={
                        session.type === 'focus' ? 'text-blue-600 dark:text-blue-400' : 
                        session.type === 'break' ? 'text-green-600 dark:text-green-400' : 
                        'text-purple-600 dark:text-purple-400'
                      }
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/20 dark:border-dark-border/20">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {sessions.filter(s => s.type === 'focus').length}
            </div>
            <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Fokus</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {sessions.filter(s => s.type === 'break').length}
            </div>
            <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Pausen</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
              {Math.round(sessions.filter(s => s.productivity).reduce((sum, s) => sum + s.productivity, 0) / sessions.filter(s => s.productivity).length) || 0}%
            </div>
            <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Ø Produktivität</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="p-4 space-y-6 max-w-7xl mx-auto md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2 mb-8 hidden md:block"
          >
            <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary md:text-4xl">
              Study Timer
            </h1>
            <p className="text-base text-text-secondary dark:text-dark-text-secondary md:text-lg">
              Fokussiere dich mit der Pomodoro-Technik und benutzerdefinierten Timern
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Timer Section */}
            <div className="lg:col-span-8 space-y-6">
              {/* Timer Mode Selector */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                    Timer Modus
                  </h3>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-200"
                  >
                    <Icon name="Settings" size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { type: 'focus', label: 'Fokus', duration: '25 min', icon: 'Brain', color: 'blue' },
                    { type: 'short-break', label: 'Kurze Pause', duration: '5 min', icon: 'Coffee', color: 'green' },
                    { type: 'long-break', label: 'Lange Pause', duration: '15 min', icon: 'Moon', color: 'purple' }
                  ].map((mode) => (
                    <motion.button
                      key={mode.type}
                      onClick={() => setPomodoroMode(mode.type)}
                      className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                        sessionType === mode.type && timerMode === 'pomodoro'
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary border border-border/10 dark:border-dark-border/10'
                      }`}
                      whileHover={{ scale: sessionType === mode.type && timerMode === 'pomodoro' ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 bg-surface dark:bg-dark-surface rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Icon name={mode.icon} size={24} className={sessionType === mode.type && timerMode === 'pomodoro' ? 'text-primary' : 'text-text-tertiary dark:text-dark-text-tertiary'} />
                      </div>
                      <div className="font-semibold mb-1">{mode.label}</div>
                      <div className="text-sm opacity-75">{mode.duration}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Main Timer Display */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-8 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-center">
                  {/* Subject Badge */}
                  <motion.div 
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 ${getSelectedSubject().color}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Icon name={getSelectedSubject().icon} size={16} />
                    <span className="text-sm font-medium">{selectedSubject}</span>
                  </motion.div>

                  {/* Circular Progress Timer */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                  >
                    <CircularProgress progress={getProgress()} />
                  </motion.div>

                  {/* Timer Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <motion.button
                      onClick={resetTimer}
                      className="p-4 bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-2xl transition-all duration-200 border border-border/10 dark:border-dark-border/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon name="RotateCcw" size={24} />
                    </motion.button>
                    
                    <motion.button
                      onClick={isRunning ? pauseTimer : startTimer}
                      className={`px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg ${
                        isRunning 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={isRunning ? 'Pause' : 'Play'} size={24} />
                        <span className="text-lg">{isRunning ? 'Pausieren' : 'Starten'}</span>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setTime(time + 300)} // Add 5 minutes
                      disabled={isRunning}
                      className="p-4 bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-2xl transition-all duration-200 disabled:opacity-50 border border-border/10 dark:border-dark-border/10"
                      whileHover={{ scale: isRunning ? 1 : 1.05 }}
                      whileTap={{ scale: isRunning ? 1 : 0.95 }}
                    >
                      <Icon name="Plus" size={24} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Timer Options */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Schnelle Timer
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[5, 10, 15, 30, 45, 60, 90, 120].map((minutes) => (
                    <motion.button
                      key={minutes}
                      onClick={() => setCustomTime(minutes)}
                      className="p-4 text-center bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-200 border border-border/10 dark:border-dark-border/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-semibold">{minutes}min</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Daily Progress */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Heute's Fortschritt
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Sessions</span>
                    <span className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                      {weeklyStats.completedToday}/{weeklyStats.dailyGoal}
                    </span>
                  </div>
                  <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-3">
                    <motion.div
                      className="bg-primary h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(weeklyStats.completedToday / weeklyStats.dailyGoal) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-center text-sm text-text-secondary dark:text-dark-text-secondary">
                    {Math.round((weeklyStats.completedToday / weeklyStats.dailyGoal) * 100)}% des Tagesziels erreicht
                  </div>
                </div>
              </motion.div>

              {/* Subject Selector */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Lernfach
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {subjects.map((subject) => (
                    <motion.button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.name)}
                      className={`p-3 rounded-xl text-center transition-all duration-200 ${
                        selectedSubject === subject.name
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon name={subject.icon} size={20} className="mx-auto mb-1" />
                      <div className="text-xs font-medium">{subject.name}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Focus Sounds */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                    Fokus Sounds
                  </h3>
                  {selectedSound && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                      >
                        <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} />
                      </button>
                      <button
                        onClick={() => {setSelectedSound(null); setIsPlaying(false);}}
                        className="p-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary rounded-lg hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-200"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  {focusSounds.map((sound) => (
                    <motion.button
                      key={sound.id}
                      onClick={() => handleSoundSelect(sound.id)}
                      className={`w-full flex items-center space-x-3 p-3 text-left rounded-xl transition-all duration-200 ${
                        selectedSound === sound.id
                          ? `${sound.color} text-white shadow-lg`
                          : 'bg-surface-secondary dark:bg-dark-surface-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedSound === sound.id 
                          ? 'bg-white/20' 
                          : 'bg-surface dark:bg-dark-surface'
                      }`}>
                        <Icon 
                          name={sound.icon} 
                          size={18} 
                          className={selectedSound === sound.id ? 'text-white' : 'text-text-tertiary dark:text-dark-text-tertiary'} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          selectedSound === sound.id 
                            ? 'text-white' 
                            : 'text-text-primary dark:text-dark-text-primary'
                        }`}>
                          {sound.name}
                        </div>
                        <div className={`text-xs ${
                          selectedSound === sound.id 
                            ? 'text-white/80' 
                            : 'text-text-secondary dark:text-dark-text-secondary'
                        }`}>
                          {sound.description}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedSound === sound.id && isPlaying && (
                          <motion.div
                            className="flex space-x-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1 h-4 bg-white rounded-full"
                                animate={{
                                  scaleY: [1, 2, 1],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        {selectedSound === sound.id && (
                          <Icon name={isPlaying ? 'Volume2' : 'VolumeX'} size={16} className="text-white" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Volume Control */}
                <AnimatePresence>
                  {selectedSound && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border/20 dark:border-dark-border/20 pt-4"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Volume1" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                        <div className="flex-1 relative">
                          {/* Background track */}
                          <div className="w-full h-2 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full"></div>
                          {/* Progress track */}
                          <div 
                            className="absolute top-0 left-0 h-2 bg-primary rounded-full transition-all duration-200"
                            style={{ width: `${soundVolume}%` }}
                          ></div>
                          {/* Slider input */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={soundVolume}
                            onChange={(e) => setSoundVolume(e.target.value)}
                            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                          />
                          {/* Custom thumb */}
                          <div 
                            className="absolute top-1/2 w-4 h-4 bg-primary border-2 border-white dark:border-dark-surface rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-200 pointer-events-none"
                            style={{ left: `calc(${soundVolume}% - 8px)` }}
                          ></div>
                        </div>
                        <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary w-8">
                          {soundVolume}%
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Weekly Stats */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Diese Woche
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Stunden', value: `${weeklyStats.totalHours}h`, icon: 'Clock', color: 'text-blue-600 dark:text-blue-400' },
                    { label: 'Sessions', value: weeklyStats.focusSessions, icon: 'Target', color: 'text-green-600 dark:text-green-400' },
                    { label: 'Ø Session', value: `${weeklyStats.averageSession}m`, icon: 'BarChart3', color: 'text-purple-600 dark:text-purple-400' },
                    { label: 'Streak', value: weeklyStats.longestStreak, icon: 'Flame', color: 'text-orange-600 dark:text-orange-400' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="text-center p-3 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                      <Icon name={stat.icon} size={20} className={`mx-auto mb-2 ${stat.color}`} />
                      <div className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Dynamic Today's Sessions Timeline */}
              <motion.div 
                className="bg-surface dark:bg-dark-surface rounded-3xl p-6 border border-border/20 dark:border-dark-border/20 shadow-elevation-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Heutige Sessions
                </h3>
                <div className="max-h-80 overflow-y-auto scrollbar-hide">
                  <SessionsTimelineChart sessions={todaysSessions} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyTimer; 
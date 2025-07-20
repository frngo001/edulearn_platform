import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

const StudyProgress = () => {
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('hours');

  // Mock progress data - replace with actual API calls
  const progressData = {
    totalStudyHours: 127.5,
    currentStreak: 12,
    longestStreak: 28,
    completedCourses: 8,
    totalCourses: 15,
    skillsLearned: 24,
    weeklyGoal: 10, // hours
    weeklyProgress: 8.5, // hours
    monthlyGoal: 40, // hours
    monthlyProgress: 32.8, // hours
    yearlyGoal: 500, // hours
    yearlyProgress: 387.2, // hours
    monthlyStats: {
      studyDays: 22,
      totalDays: 30,
      avgDailyHours: 2.3,
      completedLessons: 45
    },
    yearlyStats: {
      studyDays: 287,
      totalDays: 365,
      avgDailyHours: 2.1,
      completedLessons: 532,
      coursesCompleted: 8,
      certificatesEarned: 3
    },
    recentActivity: [
      { date: '2024-01-15', hours: 2.5, lessons: 3, subject: 'JavaScript' },
      { date: '2024-01-14', hours: 1.8, lessons: 2, subject: 'React' },
      { date: '2024-01-13', hours: 3.2, lessons: 4, subject: 'Python' },
      { date: '2024-01-12', hours: 1.5, lessons: 2, subject: 'CSS' },
      { date: '2024-01-11', hours: 2.1, lessons: 3, subject: 'HTML' }
    ]
  };

  const weeklyData = [
    { day: 'Mo', hours: 2.5, target: 1.5, lessons: 3 },
    { day: 'Di', hours: 1.8, target: 1.5, lessons: 2 },
    { day: 'Mi', hours: 3.2, target: 1.5, lessons: 4 },
    { day: 'Do', hours: 1.5, target: 1.5, lessons: 2 },
    { day: 'Fr', hours: 2.1, target: 1.5, lessons: 3 },
    { day: 'Sa', hours: 0.8, target: 1.5, lessons: 1 },
    { day: 'So', hours: 1.2, target: 1.5, lessons: 2 }
  ];

  const monthlyData = [
    { period: 'Woche 1', hours: 12.5, target: 10, lessons: 18 },
    { period: 'Woche 2', hours: 15.2, target: 10, lessons: 22 },
    { period: 'Woche 3', hours: 18.7, target: 10, lessons: 25 },
    { period: 'Woche 4', hours: 14.3, target: 10, lessons: 20 }
  ];

  const yearlyData = [
    { period: 'Jan', hours: 45.2, target: 40, lessons: 65 },
    { period: 'Feb', hours: 38.7, target: 40, lessons: 58 },
    { period: 'Mär', hours: 42.1, target: 40, lessons: 62 },
    { period: 'Apr', hours: 35.8, target: 40, lessons: 52 },
    { period: 'Mai', hours: 48.3, target: 40, lessons: 72 },
    { period: 'Jun', hours: 41.9, target: 40, lessons: 61 },
    { period: 'Jul', hours: 39.4, target: 40, lessons: 58 },
    { period: 'Aug', hours: 44.2, target: 40, lessons: 65 },
    { period: 'Sep', hours: 37.6, target: 40, lessons: 55 },
    { period: 'Okt', hours: 43.8, target: 40, lessons: 64 },
    { period: 'Nov', hours: 35.2, target: 40, lessons: 51 },
    { period: 'Dez', hours: 32.8, target: 40, lessons: 48 }
  ];

  const skillProgress = [
    { skill: 'JavaScript', progress: 85, level: 'Fortgeschritten', hours: 45.2, color: '#3B82F6' },
    { skill: 'React', progress: 72, level: 'Mittel', hours: 32.8, color: '#10B981' },
    { skill: 'Python', progress: 90, level: 'Fortgeschritten', hours: 38.5, color: '#F59E0B' },
    { skill: 'CSS', progress: 65, level: 'Mittel', hours: 28.3, color: '#EF4444' },
    { skill: 'Node.js', progress: 45, level: 'Anfänger', hours: 18.7, color: '#8B5CF6' }
  ];

  const metrics = [
    { id: 'hours', label: 'Stunden', icon: 'Clock' },
    { id: 'lessons', label: 'Lektionen', icon: 'BookOpen' },
    { id: 'target', label: 'Ziel', icon: 'Target' }
  ];

  // Get current data based on time range
  const getCurrentData = () => {
    switch (timeRange) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  // Get current progress and goal
  const getCurrentProgress = () => {
    switch (timeRange) {
      case 'week':
        return {
          current: progressData.weeklyProgress,
          goal: progressData.weeklyGoal,
          label: 'Wöchentliches Ziel'
        };
      case 'month':
        return {
          current: progressData.monthlyProgress,
          goal: progressData.monthlyGoal,
          label: 'Monatliches Ziel'
        };
      case 'year':
        return {
          current: progressData.yearlyProgress,
          goal: progressData.yearlyGoal,
          label: 'Jährliches Ziel'
        };
      default:
        return {
          current: progressData.weeklyProgress,
          goal: progressData.weeklyGoal,
          label: 'Wöchentliches Ziel'
        };
    }
  };

  // Get chart title based on time range
  const getChartTitle = () => {
    switch (timeRange) {
      case 'week':
        return 'Wöchentlicher Lernfortschritt';
      case 'month':
        return 'Monatlicher Lernfortschritt';
      case 'year':
        return 'Jährlicher Lernfortschritt';
      default:
        return 'Wöchentlicher Lernfortschritt';
    }
  };

  // Get max value for progress bar calculation
  const getMaxValue = () => {
    const data = getCurrentData();
    const maxHours = Math.max(...data.map(item => item.hours));
    return Math.max(maxHours * 1.2, 50); // Add 20% padding or minimum 50
  };

  // Get metrics based on time range
  const getCurrentMetrics = () => {
    const baseMetrics = [
      {
        title: 'Lernstunden',
        value: progressData.totalStudyHours,
        unit: 'Std',
        icon: 'Clock',
        change: '+12%'
      },
      {
        title: 'Aktuelle Streak',
        value: progressData.currentStreak,
        unit: 'Tage',
        icon: 'Flame',
        change: '+3 Tage'
      },
      {
        title: 'Kurse abgeschlossen',
        value: progressData.completedCourses,
        unit: `von ${progressData.totalCourses}`,
        icon: 'BookOpen',
        change: '+2 diesen Monat'
      },
      {
        title: 'Skills gelernt',
        value: progressData.skillsLearned,
        unit: 'Skills',
        icon: 'Award',
        change: '+5 diesen Monat'
      }
    ];

    // Modify first metric based on time range
    switch (timeRange) {
      case 'week':
        baseMetrics[0] = {
          ...baseMetrics[0],
          title: 'Wöchentlich',
          value: progressData.weeklyProgress,
          change: '+8%'
        };
        break;
      case 'month':
        baseMetrics[0] = {
          ...baseMetrics[0],
          title: 'Monatlich',
          value: progressData.monthlyProgress,
          change: '+15%'
        };
        break;
      case 'year':
        baseMetrics[0] = {
          ...baseMetrics[0],
          title: 'Jährlich',
          value: progressData.yearlyProgress,
          change: '+22%'
        };
        break;
    }

    return baseMetrics;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 dark:text-green-400';
    if (progress >= 60) return 'text-blue-600 dark:text-blue-400';
    if (progress >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Fortgeschritten': return 'text-green-600 dark:text-green-400';
      case 'Mittel': return 'text-blue-600 dark:text-blue-400';
      case 'Anfänger': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-text-secondary dark:text-dark-text-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  // Interactive Chart Components
  const InteractiveProgressChart = ({ data, metric }) => {
    const maxValue = Math.max(...data.map(d => d[metric] || 0));
    const chartHeight = 200;
    const chartWidth = 400;
    const padding = 40;

    const getXPosition = (index) => {
      return padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
    };

    const getYPosition = (value) => {
      return chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));
    };

    const pathData = data.map((point, index) => {
      const x = getXPosition(index);
      const y = getYPosition(point[metric] || 0);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Target line path
    const targetValue = data[0]?.target || 0;
    const targetY = getYPosition(targetValue);
    const targetPath = `M ${padding} ${targetY} L ${chartWidth - padding} ${targetY}`;

    return (
      <div className="relative">
        <svg 
          width="100%" 
          height={chartHeight} 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={padding}
              y1={chartHeight - padding - ratio * (chartHeight - 2 * padding)}
              x2={chartWidth - padding}
              y2={chartHeight - padding - ratio * (chartHeight - 2 * padding)}
              stroke="currentColor"
              strokeWidth="1"
              className="text-border/20 dark:text-dark-border/20"
            />
          ))}

          {/* Target line */}
          {metric === 'hours' && targetValue > 0 && (
            <path
              d={targetPath}
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="opacity-60"
            />
          )}

          {/* Area under curve */}
          <path
            d={`${pathData} L ${getXPosition(data.length - 1)} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
            fill="url(#progressGradient)"
            className="opacity-20"
          />

          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
            className="drop-shadow-sm"
          />

          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={getXPosition(index)}
              cy={getYPosition(point[metric] || 0)}
              r={hoveredDataPoint === index ? "6" : "4"}
              fill="rgb(59, 130, 246)"
              className="cursor-pointer transition-all duration-200 drop-shadow-sm"
              onMouseEnter={() => setHoveredDataPoint(index)}
              onMouseLeave={() => setHoveredDataPoint(null)}
            />
          ))}

          {/* X-axis labels */}
          {data.map((point, index) => (
            <text
              key={index}
              x={getXPosition(index)}
              y={chartHeight - 10}
              textAnchor="middle"
              className="text-xs fill-text-secondary dark:fill-dark-text-secondary"
            >
              {point.day || point.period}
            </text>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hover tooltip */}
        {hoveredDataPoint !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bg-surface dark:bg-dark-surface border border-border/20 dark:border-dark-border/20 rounded-xl p-3 shadow-lg pointer-events-none z-10"
            style={{
              left: `${(getXPosition(hoveredDataPoint) / chartWidth) * 100}%`,
              top: `${(getYPosition(data[hoveredDataPoint][metric] || 0) / chartHeight) * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="text-sm">
              <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                {data[hoveredDataPoint].day || data[hoveredDataPoint].period}
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {metric === 'hours' && `${data[hoveredDataPoint][metric]}h`}
                {metric === 'lessons' && `${data[hoveredDataPoint][metric]} Lektionen`}
                {metric === 'target' && `Ziel: ${data[hoveredDataPoint][metric]}h`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const InteractiveSkillsChart = ({ data }) => {
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 100;
    const minRadius = 20;
    
    // Calculate angles for each skill (evenly distributed)
    const angleStep = (2 * Math.PI) / data.length;
    
    const getSkillPosition = (index, progress) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const radius = minRadius + (progress / 100) * (maxRadius - minRadius);
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        angle: angle
      };
    };

    const getAxisEndPosition = (index) => {
      const angle = index * angleStep - Math.PI / 2;
      return {
        x: centerX + maxRadius * Math.cos(angle),
        y: centerY + maxRadius * Math.sin(angle)
      };
    };

    // Create radar chart path
    const radarPath = data.map((skill, index) => {
      const pos = getSkillPosition(index, skill.progress);
      return `${index === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`;
    }).join(' ') + ' Z';

    return (
      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8">
        <div className="relative">
          <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
            {/* Background circles */}
            {[20, 40, 60, 80, 100].map((percentage) => (
              <circle
                key={percentage}
                cx={centerX}
                cy={centerY}
                r={minRadius + (percentage / 100) * (maxRadius - minRadius)}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border/20 dark:text-dark-border/20"
              />
            ))}

            {/* Axis lines */}
            {data.map((skill, index) => {
              const endPos = getAxisEndPosition(index);
              return (
                <line
                  key={`axis-${index}`}
                  x1={centerX}
                  y1={centerY}
                  x2={endPos.x}
                  y2={endPos.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border/30 dark:text-dark-border/30"
                />
              );
            })}

            {/* Radar area */}
            <motion.path
              d={radarPath}
              fill="url(#radarGradient)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              className="opacity-30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Skill points */}
            {data.map((skill, index) => {
              const pos = getSkillPosition(index, skill.progress);
              const isSelected = selectedSkill === skill.skill;
              
              return (
                <g key={skill.skill}>
                  {/* Skill point */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? "8" : "6"}
                    fill={skill.color}
                    className="cursor-pointer drop-shadow-sm"
                    onMouseEnter={() => setSelectedSkill(skill.skill)}
                    onMouseLeave={() => setSelectedSkill(null)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.3 }}
                  />
                  
                  {/* Skill label */}
                  <motion.text
                    x={pos.x + (pos.x > centerX ? 15 : -15)}
                    y={pos.y + 5}
                    textAnchor={pos.x > centerX ? "start" : "end"}
                    className="text-xs font-medium fill-text-primary dark:fill-dark-text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                  >
                    {skill.skill}
                  </motion.text>
                  
                  {/* Progress text */}
                  <motion.text
                    x={pos.x + (pos.x > centerX ? 15 : -15)}
                    y={pos.y + 18}
                    textAnchor={pos.x > centerX ? "start" : "end"}
                    className="text-xs fill-text-secondary dark:fill-dark-text-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.7, duration: 0.3 }}
                  >
                    {skill.progress}%
                  </motion.text>

                  {/* Animated pulse effect for selected skill */}
                  {isSelected && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r="12"
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="2"
                      className="opacity-50"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </g>
              );
            })}

            {/* Center point */}
            <circle
              cx={centerX}
              cy={centerY}
              r="4"
              fill="rgb(59, 130, 246)"
              className="drop-shadow-sm"
            />

            {/* Gradient definitions */}
            <defs>
              <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Skills Legend with Progress Bars */}
        <div className="space-y-4 min-w-0 flex-1">
          {data.map((skill, index) => (
            <motion.div
              key={skill.skill}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                selectedSkill === skill.skill
                  ? 'bg-surface-secondary dark:bg-dark-surface-secondary border-primary/30 dark:border-primary/30'
                  : 'bg-surface dark:bg-dark-surface border-border/20 dark:border-dark-border/20 hover:border-border/40 dark:hover:border-dark-border/40'
              }`}
              onMouseEnter={() => setSelectedSkill(skill.skill)}
              onMouseLeave={() => setSelectedSkill(null)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">
                    {skill.skill}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-text-primary dark:text-dark-text-primary">
                    {skill.progress}%
                  </span>
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary block">
                    {skill.hours}h
                  </span>
                </div>
              </div>
              
              {/* Animated progress bar */}
              <div className="relative">
                <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full relative overflow-hidden"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const InteractiveActivityChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.hours));
    
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                  {formatDate(item.date)}
                </span>
                <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                  {item.subject}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <span>{item.hours}h</span>
                <span>•</span>
                <span>{item.lessons} Lektionen</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full relative overflow-hidden group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.hours / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const currentProgress = getCurrentProgress();
  const currentMetrics = getCurrentMetrics();

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
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary md:text-3xl">
                    Lernfortschritt
                  </h1>
                  <p className="text-base text-text-secondary dark:text-dark-text-secondary md:text-lg">
                    Verfolge deine Lernfortschritte und Statistiken
                  </p>
                </div>
              </div>

            {/* Time Range Selector */}
              <div className="bg-surface dark:bg-dark-surface rounded-2xl p-1 border border-border/20 dark:border-dark-border/20">
                <div className="flex">
                  {[
                    { key: 'week', label: 'Woche' },
                    { key: 'month', label: 'Monat' },
                    { key: 'year', label: 'Jahr' }
                  ].map((option) => (
                  <button
                      key={option.key}
                      onClick={() => setTimeRange(option.key)}
                      className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                        timeRange === option.key
                          ? 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary'
                          : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                      }`}
                    >
                      {option.label}
                  </button>
                ))}
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {currentMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                      <Icon name={metric.icon} size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary truncate">
                        {metric.title}
                      </p>
                      <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                        {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
                        <span className="text-xs font-normal text-text-secondary dark:text-dark-text-secondary ml-1">
                          {metric.unit}
                    </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Progress Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
          >
            <div className="flex flex-col space-y-4 mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {getChartTitle()}
              </h3>
              
              {/* Time Range Selector */}
              <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-1">
                <div className="flex">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        timeRange === range
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                      }`}
                    >
                      {range === 'week' ? 'Woche' : range === 'month' ? 'Monat' : 'Jahr'}
                    </button>
                  ))}
                </div>
                      </div>
                    </div>

            {/* Metric Selector */}
            <div className="mb-6">
              <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-1">
                <div className="flex">
                  {metrics.map((metric) => (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 md:px-4 ${
                        selectedMetric === metric.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                      }`}
                    >
                      <Icon name={metric.icon} size={14} />
                      <span>{metric.label}</span>
                    </button>
                  ))}
                </div>
                  </div>
                </div>

            <InteractiveProgressChart data={getCurrentData()} metric={selectedMetric} />
              </motion.div>

          {/* Current Goal Progress */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {currentProgress.label}
              </h3>
              <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {currentProgress.current.toFixed(1)}h / {currentProgress.goal}h
                          </span>
                        </div>
            <div className="space-y-2">
              <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentProgress.current / currentProgress.goal) * 100, 100)}%` }}
                        />
                      </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary dark:text-dark-text-secondary">
                  Fortschritt
                </span>
                <span className="font-medium text-text-primary dark:text-dark-text-primary">
                  {Math.round((currentProgress.current / currentProgress.goal) * 100)}%
                </span>
                </div>
            </div>
          </motion.div>

          {/* Interactive Skills Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
          >
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-6">
              Skills Fortschritt
            </h3>
            <InteractiveSkillsChart data={skillProgress} />
          </motion.div>

          {/* Interactive Activity Chart */}
                  <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
          >
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-6">
              Letzte Aktivitäten
            </h3>
            <InteractiveActivityChart data={progressData.recentActivity} />
            </motion.div>
        </div>
      </main>
    </div>
  );
};

export default StudyProgress; 
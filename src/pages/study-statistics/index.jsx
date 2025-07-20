import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

const StudyStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('hours');
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock statistics data with colors for charts
  const statisticsData = {
    week: {
      overview: {
        totalHours: 13.2,
        sessionsCompleted: 18,
        averageSession: 0.7,
        streakDays: 5,
        coursesActive: 3,
        lessonsCompleted: 24
      },
      subjectBreakdown: [
        { subject: 'JavaScript', hours: 4.2, lessons: 8, progress: 78, color: '#3B82F6' },
        { subject: 'React', hours: 3.7, lessons: 6, progress: 65, color: '#10B981' },
        { subject: 'Python', hours: 2.8, lessons: 5, progress: 72, color: '#F59E0B' },
        { subject: 'CSS', hours: 2.5, lessons: 5, progress: 85, color: '#EF4444' }
      ],
      trends: [
        { period: 'Mo', hours: 2.5, sessions: 3, completion: 85 },
        { period: 'Di', hours: 1.8, sessions: 2, completion: 78 },
        { period: 'Mi', hours: 3.2, sessions: 4, completion: 92 },
        { period: 'Do', hours: 1.5, sessions: 2, completion: 88 },
        { period: 'Fr', hours: 2.1, sessions: 3, completion: 90 },
        { period: 'Sa', hours: 0.8, sessions: 2, completion: 75 },
        { period: 'So', hours: 1.3, sessions: 2, completion: 80 }
      ],
      timeDistribution: [
        { timeSlot: '6-9 Uhr', hours: 2.5, percentage: 18.9 },
        { timeSlot: '9-12 Uhr', hours: 4.2, percentage: 31.8 },
        { timeSlot: '12-15 Uhr', hours: 2.1, percentage: 15.9 },
        { timeSlot: '15-18 Uhr', hours: 2.8, percentage: 21.2 },
        { timeSlot: '18-21 Uhr', hours: 1.4, percentage: 10.6 },
        { timeSlot: '21-24 Uhr', hours: 0.2, percentage: 1.5 }
      ],
      performanceMetrics: {
        accuracy: 87.5,
        speed: 78.2,
        retention: 92.1,
        consistency: 85.7
      },
      comparison: {
        current: { hours: 13.2, lessons: 24, courses: 3 },
        previous: { hours: 11.8, lessons: 21, courses: 2 },
        growth: { hours: 11.9, lessons: 14.3, courses: 50 }
      }
    },
    month: {
      overview: {
        totalHours: 76.5,
        sessionsCompleted: 145,
        averageSession: 1.3,
        streakDays: 12,
        coursesActive: 6,
        lessonsCompleted: 248
      },
      subjectBreakdown: [
        { subject: 'JavaScript', hours: 22.2, lessons: 35, progress: 78, color: '#3B82F6' },
        { subject: 'React', hours: 18.7, lessons: 28, progress: 65, color: '#10B981' },
        { subject: 'Python', hours: 15.1, lessons: 22, progress: 72, color: '#F59E0B' },
        { subject: 'CSS', hours: 12.9, lessons: 18, progress: 85, color: '#EF4444' },
        { subject: 'Node.js', hours: 7.6, lessons: 12, progress: 45, color: '#8B5CF6' }
      ],
      trends: [
        { period: 'KW 1', hours: 12.5, sessions: 18, completion: 85 },
        { period: 'KW 2', hours: 15.2, sessions: 22, completion: 78 },
        { period: 'KW 3', hours: 18.7, sessions: 25, completion: 92 },
        { period: 'KW 4', hours: 14.3, sessions: 20, completion: 88 },
        { period: 'KW 5', hours: 15.8, sessions: 24, completion: 90 }
      ],
      timeDistribution: [
        { timeSlot: '6-9 Uhr', hours: 12.5, percentage: 16.3 },
        { timeSlot: '9-12 Uhr', hours: 22.2, percentage: 29.0 },
        { timeSlot: '12-15 Uhr', hours: 14.1, percentage: 18.4 },
        { timeSlot: '15-18 Uhr', hours: 16.7, percentage: 21.8 },
        { timeSlot: '18-21 Uhr', hours: 8.4, percentage: 11.0 },
        { timeSlot: '21-24 Uhr', hours: 2.6, percentage: 3.4 }
      ],
      performanceMetrics: {
        accuracy: 89.2,
        speed: 82.1,
        retention: 91.8,
        consistency: 87.3
      },
      comparison: {
        current: { hours: 76.5, lessons: 248, courses: 6 },
        previous: { hours: 68.2, lessons: 215, courses: 5 },
        growth: { hours: 12.2, lessons: 15.3, courses: 20 }
      }
    },
    quarter: {
      overview: {
        totalHours: 287.3,
        sessionsCompleted: 456,
        averageSession: 1.6,
        streakDays: 28,
        coursesActive: 8,
        lessonsCompleted: 742
      },
      subjectBreakdown: [
        { subject: 'JavaScript', hours: 75.2, lessons: 142, progress: 85, color: '#3B82F6' },
        { subject: 'React', hours: 68.7, lessons: 128, progress: 78, color: '#10B981' },
        { subject: 'Python', hours: 55.1, lessons: 98, progress: 82, color: '#F59E0B' },
        { subject: 'CSS', hours: 42.9, lessons: 76, progress: 88, color: '#EF4444' },
        { subject: 'Node.js', hours: 32.4, lessons: 58, progress: 65, color: '#8B5CF6' },
        { subject: 'Database', hours: 13.0, lessons: 24, progress: 42, color: '#EC4899' }
      ],
      trends: [
        { period: 'Monat 1', hours: 92.5, sessions: 148, completion: 85 },
        { period: 'Monat 2', hours: 98.2, sessions: 162, completion: 88 },
        { period: 'Monat 3', hours: 96.6, sessions: 146, completion: 87 }
      ],
      timeDistribution: [
        { timeSlot: '6-9 Uhr', hours: 48.5, percentage: 16.9 },
        { timeSlot: '9-12 Uhr', hours: 82.2, percentage: 28.6 },
        { timeSlot: '12-15 Uhr', hours: 52.1, percentage: 18.1 },
        { timeSlot: '15-18 Uhr', hours: 64.7, percentage: 22.5 },
        { timeSlot: '18-21 Uhr', hours: 32.4, percentage: 11.3 },
        { timeSlot: '21-24 Uhr', hours: 7.4, percentage: 2.6 }
      ],
      performanceMetrics: {
        accuracy: 91.5,
        speed: 85.2,
        retention: 93.8,
        consistency: 89.4
      },
      comparison: {
        current: { hours: 287.3, lessons: 742, courses: 8 },
        previous: { hours: 248.7, lessons: 628, courses: 6 },
        growth: { hours: 15.5, lessons: 18.2, courses: 33.3 }
      }
    },
    year: {
      overview: {
        totalHours: 1247.8,
        sessionsCompleted: 1823,
        averageSession: 1.4,
        streakDays: 45,
        coursesActive: 12,
        lessonsCompleted: 2946
      },
      subjectBreakdown: [
        { subject: 'JavaScript', hours: 312.2, lessons: 567, progress: 92, color: '#3B82F6' },
        { subject: 'React', hours: 278.7, lessons: 498, progress: 88, color: '#10B981' },
        { subject: 'Python', hours: 235.1, lessons: 421, progress: 85, color: '#F59E0B' },
        { subject: 'CSS', hours: 186.9, lessons: 334, progress: 90, color: '#EF4444' },
        { subject: 'Node.js', hours: 142.4, lessons: 256, progress: 75, color: '#8B5CF6' },
        { subject: 'Database', hours: 92.5, lessons: 164, progress: 68, color: '#EC4899' }
      ],
      trends: [
        { period: 'Jan', hours: 89.2, sessions: 128, completion: 82 },
        { period: 'Feb', hours: 94.7, sessions: 142, completion: 85 },
        { period: 'Mär', hours: 108.1, sessions: 156, completion: 88 },
        { period: 'Apr', hours: 98.8, sessions: 145, completion: 86 },
        { period: 'Mai', hours: 112.3, sessions: 168, completion: 90 },
        { period: 'Jun', hours: 105.9, sessions: 154, completion: 87 },
        { period: 'Jul', hours: 101.4, sessions: 148, completion: 84 },
        { period: 'Aug', hours: 116.2, sessions: 172, completion: 91 },
        { period: 'Sep', hours: 97.6, sessions: 142, completion: 83 },
        { period: 'Okt', hours: 108.8, sessions: 159, completion: 89 },
        { period: 'Nov', hours: 102.3, sessions: 151, completion: 86 },
        { period: 'Dez', hours: 112.5, sessions: 158, completion: 88 }
      ],
      timeDistribution: [
        { timeSlot: '6-9 Uhr', hours: 198.5, percentage: 15.9 },
        { timeSlot: '9-12 Uhr', hours: 362.2, percentage: 29.0 },
        { timeSlot: '12-15 Uhr', hours: 236.1, percentage: 18.9 },
        { timeSlot: '15-18 Uhr', hours: 274.7, percentage: 22.0 },
        { timeSlot: '18-21 Uhr', hours: 137.4, percentage: 11.0 },
        { timeSlot: '21-24 Uhr', hours: 38.9, percentage: 3.1 }
      ],
      performanceMetrics: {
        accuracy: 93.2,
        speed: 88.7,
        retention: 95.1,
        consistency: 91.8
      },
      comparison: {
        current: { hours: 1247.8, lessons: 2946, courses: 12 },
        previous: { hours: 987.3, lessons: 2342, courses: 9 },
        growth: { hours: 26.4, lessons: 25.8, courses: 33.3 }
      }
    }
  };

  const periods = [
    { id: 'week', label: 'Woche' },
    { id: 'month', label: 'Monat' },
    { id: 'quarter', label: 'Quartal' },
    { id: 'year', label: 'Jahr' }
  ];

  const metrics = [
    { id: 'hours', label: 'Stunden', icon: 'Clock' },
    { id: 'sessions', label: 'Sessions', icon: 'Play' },
    { id: 'completion', label: 'Abschluss', icon: 'CheckCircle' }
  ];

  const getCurrentData = () => {
    return statisticsData[selectedPeriod];
  };

  const getTrendsTitle = () => {
    switch (selectedPeriod) {
      case 'week': return 'Wöchentliche Trends';
      case 'month': return 'Monatliche Trends';
      case 'quarter': return 'Quartalsweise Trends';
      case 'year': return 'Jährliche Trends';
      default: return 'Trends';
    }
  };

  const getComparisonTitle = () => {
    switch (selectedPeriod) {
      case 'week': return 'Vergleich zur Vorwoche';
      case 'month': return 'Vergleich zum Vormonat';
      case 'quarter': return 'Vergleich zum Vorquartal';
      case 'year': return 'Vergleich zum Vorjahr';
      default: return 'Vergleich';
    }
  };

  const getComparisonSubtitle = (type) => {
    const labels = {
      hours: 'Lernstunden',
      lessons: 'Lektionen',
      courses: 'Kurse'
    };
    return labels[type] || type;
  };

  const getPerformanceColor = (value) => {
    if (value >= 90) return 'text-green-600 dark:text-green-400';
    if (value >= 80) return 'text-blue-600 dark:text-blue-400';
    if (value >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGrowthIcon = (growth) => {
    return growth > 0 ? 'TrendingUp' : growth < 0 ? 'TrendingDown' : 'Minus';
  };

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'text-green-600 dark:text-green-400' : 
           growth < 0 ? 'text-red-600 dark:text-red-400' : 
           'text-text-secondary dark:text-dark-text-secondary';
  };

  // Interactive Chart Components
  const InteractiveTrendsChart = ({ data, metric }) => {
    const maxValue = Math.max(...data.map(d => d[metric]));
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
      const y = getYPosition(point[metric]);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

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

          {/* Area under curve */}
          <path
            d={`${pathData} L ${getXPosition(data.length - 1)} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
            fill="url(#gradient)"
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
              cy={getYPosition(point[metric])}
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
              {point.period}
            </text>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
              top: `${(getYPosition(data[hoveredDataPoint][metric]) / chartHeight) * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="text-sm">
              <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                {data[hoveredDataPoint].period}
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {metric === 'hours' && `${data[hoveredDataPoint][metric]}h`}
                {metric === 'sessions' && `${data[hoveredDataPoint][metric]} Sessions`}
                {metric === 'completion' && `${data[hoveredDataPoint][metric]}%`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };



  const InteractivePieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.hours, 0);
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    let cumulativePercentage = 0;

    const createArcPath = (startAngle, endAngle, radius, centerX, centerY) => {
      const start = polarToCartesian(centerX, centerY, radius, endAngle);
      const end = polarToCartesian(centerX, centerY, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    return (
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-6">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const percentage = (item.hours / total) * 100;
              const startAngle = cumulativePercentage * 3.6;
              const endAngle = (cumulativePercentage + percentage) * 3.6;
              
              const path = createArcPath(startAngle, endAngle, radius, centerX, centerY);
              cumulativePercentage += percentage;

              return (
                <path
                  key={item.subject}
                  d={path}
                  fill={item.color}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSubject === item.subject ? 'opacity-100 drop-shadow-lg' : 'opacity-80 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setSelectedSubject(item.subject)}
                  onMouseLeave={() => setSelectedSubject(null)}
                />
              );
            })}
            
            {/* Center circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r="30"
              fill="currentColor"
              className="text-surface dark:text-dark-surface"
            />
            
            {/* Center text */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              className="text-sm font-bold fill-text-primary dark:fill-dark-text-primary"
            >
              {total.toFixed(1)}h
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              className="text-xs fill-text-secondary dark:fill-dark-text-secondary"
            >
              Gesamt
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item) => (
            <motion.div
              key={item.subject}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedSubject === item.subject 
                  ? 'bg-surface-secondary dark:bg-dark-surface-secondary' 
                  : 'hover:bg-surface-secondary/50 dark:hover:bg-dark-surface-secondary/50'
              }`}
              onMouseEnter={() => setSelectedSubject(item.subject)}
              onMouseLeave={() => setSelectedSubject(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                  {item.subject}
                </p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                  {item.hours}h • {((item.hours / total) * 100).toFixed(1)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const InteractiveBarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.percentage));
    
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.timeSlot}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                {item.timeSlot}
              </span>
              <div className="flex items-center space-x-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <span>{item.hours}h</span>
                <span>•</span>
                <span>{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full relative overflow-hidden group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.percentage / maxValue) * 100}%` }}
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

  const currentData = getCurrentData();

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="p-4 space-y-6 max-w-7xl mx-auto md:p-6 lg:p-8">
            {/* Header */}
          <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            className="space-y-2 hidden md:block"
          >
            <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary md:text-3xl">
              Lernstatistiken
            </h1>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Detaillierte Analyse deines Lernfortschritts mit interaktiven Diagrammen
            </p>
          </motion.div>

            {/* Period Selector */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
            >
            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-1 border border-border/20 dark:border-dark-border/20">
              <div className="flex">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 md:px-6 ${
                      selectedPeriod === period.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Selector */}
            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-1 border border-border/20 dark:border-dark-border/20">
              <div className="flex">
                {metrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 md:px-4 ${
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
            </motion.div>

            {/* Overview Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-6"
          >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Stunden</span>
                </div>
                <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  {currentData.overview.totalHours}h
                          </p>
                        </div>
            </motion.div>

                        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Sessions</span>
                      </div>
                <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  {currentData.overview.sessionsCompleted}
                </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="BarChart3" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Ø Session</span>
                </div>
                <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  {currentData.overview.averageSession}h
                </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Flame" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Streak</span>
                </div>
                <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  {currentData.overview.streakDays}
                </p>
              </div>
            </motion.div>

                            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Kurse</span>
                          </div>
                <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  {currentData.overview.coursesActive}
                </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckSquare" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Lektionen</span>
                </div>
                <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  {currentData.overview.lessonsCompleted}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Trends Chart */}
                        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
          >
            <div className="flex flex-col space-y-4 mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {getTrendsTitle()}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <Icon name="TrendingUp" size={16} />
                <span>Interaktives Diagramm</span>
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

            <InteractiveTrendsChart data={currentData.trends} metric={selectedMetric} />
          </motion.div>

          {/* Subject Breakdown & Time Distribution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Interactive Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-6">
                Fächer Aufschlüsselung
              </h3>
              <InteractivePieChart data={currentData.subjectBreakdown} />
            </motion.div>

            {/* Interactive Bar Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-6">
                Zeitverteilung
              </h3>
              <InteractiveBarChart data={currentData.timeDistribution} />
            </motion.div>
              </div>
              
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
          >
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-6">
              Leistungsmetriken
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(currentData.performanceMetrics).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center p-4 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl"
                >
                  <p className={`text-2xl font-bold mb-2 ${getPerformanceColor(value)}`}>
                    {value}%
                  </p>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary capitalize">
                    {key === 'accuracy' && 'Genauigkeit'}
                    {key === 'speed' && 'Geschwindigkeit'}
                    {key === 'retention' && 'Merkfähigkeit'}
                    {key === 'consistency' && 'Konstanz'}
                  </p>
                  <div className="mt-2 w-full bg-surface dark:bg-dark-surface rounded-full h-1">
                    <motion.div
                      className={`h-1 rounded-full ${getPerformanceColor(value).replace('text-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                    />
                      </div>
                </motion.div>
              ))}
                      </div>
          </motion.div>

          {/* Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
          >
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-6">
              {getComparisonTitle()}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {Object.entries(currentData.comparison.current).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-center space-y-2 p-4 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                      {typeof value === 'number' ? value.toFixed(1) : value}
                    </p>
                    <div className={`flex items-center space-x-1 ${getGrowthColor(currentData.comparison.growth[key])}`}>
                      <Icon name={getGrowthIcon(currentData.comparison.growth[key])} size={16} />
                      <span className="text-sm font-medium">
                        {currentData.comparison.growth[key] > 0 ? '+' : ''}{currentData.comparison.growth[key]}%
                        </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {getComparisonSubtitle(key)}
                  </p>
                </motion.div>
                ))}
              </div>
            </motion.div>
        </div>
      </main>
      
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default StudyStatistics; 
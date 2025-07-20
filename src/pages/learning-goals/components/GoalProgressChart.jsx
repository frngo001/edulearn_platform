import React from 'react';
import { motion } from 'framer-motion';

import Icon from 'components/AppIcon';

const GoalProgressChart = ({ goals }) => {
  const getProgressData = () => {
    if (!goals || goals.length === 0) {
      return {
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        total: 0,
        completionRate: 0
      };
    }

    const completed = goals.filter(g => g.status === 'completed').length;
    const inProgress = goals.filter(g => g.status === 'active' && g.progress > 0).length;
    const notStarted = goals.filter(g => g.progress === 0).length;
    const total = goals.length;
    const completionRate = Math.round((completed / total) * 100);

    return { completed, inProgress, notStarted, total, completionRate };
  };

  const data = getProgressData();

  // Simple donut chart data
  const getDonutSegments = () => {
    if (data.total === 0) return [];

    const segments = [];
    const completedPercentage = (data.completed / data.total) * 100;
    const inProgressPercentage = (data.inProgress / data.total) * 100;
    const notStartedPercentage = (data.notStarted / data.total) * 100;

    let currentAngle = 0;

    if (data.completed > 0) {
      segments.push({
        percentage: completedPercentage,
        color: '#10B981', // success color
        label: 'Completed',
        startAngle: currentAngle,
        endAngle: currentAngle + (completedPercentage * 3.6)
      });
      currentAngle += completedPercentage * 3.6;
    }

    if (data.inProgress > 0) {
      segments.push({
        percentage: inProgressPercentage,
        color: '#4F46E5', // primary color
        label: 'In Progress',
        startAngle: currentAngle,
        endAngle: currentAngle + (inProgressPercentage * 3.6)
      });
      currentAngle += inProgressPercentage * 3.6;
    }

    if (data.notStarted > 0) {
      segments.push({
        percentage: notStartedPercentage,
        color: '#9CA3AF', // gray color
        label: 'Not Started',
        startAngle: currentAngle,
        endAngle: currentAngle + (notStartedPercentage * 3.6)
      });
    }

    return segments;
  };

  const segments = getDonutSegments();

  if (data.total === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="BarChart" size={24} className="text-text-tertiary dark:text-dark-text-tertiary" />
        </div>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          No goals to display
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Simple Progress Circle */}
      <div className="relative flex items-center justify-center">
        <div className="w-32 h-32 relative">
          {/* Background circle */}
          <div className="w-full h-full rounded-full border-8 border-surface-secondary dark:border-dark-surface-secondary"></div>
          
          {/* Progress circle */}
          <div 
            className="absolute inset-0 w-full h-full rounded-full border-8 border-transparent"
            style={{
              background: `conic-gradient(
                ${segments.map(segment => 
                  `${segment.color} ${segment.startAngle}deg ${segment.endAngle}deg`
                ).join(', ')}, 
                #E5E7EB ${segments.reduce((sum, s) => sum + (s.endAngle - s.startAngle), 0)}deg 360deg
              )`,
              borderRadius: '50%',
              mask: 'radial-gradient(circle, transparent 60%, black 60%)',
              WebkitMask: 'radial-gradient(circle, transparent 60%, black 60%)'
            }}
          />
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
              {data.completionRate}%
            </span>
            <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
              Complete
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Completed</span>
          </div>
          <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {data.completed}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">In Progress</span>
          </div>
          <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {data.inProgress}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-text-tertiary dark:bg-dark-text-tertiary rounded-full"></div>
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Not Started</span>
          </div>
          <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {data.notStarted}
          </span>
        </motion.div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary dark:text-dark-text-secondary">Overall Progress</span>
          <span className="text-text-primary dark:text-dark-text-primary font-medium">
            {data.completed}/{data.total} goals
          </span>
        </div>
        <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
          <motion.div
            className="bg-success h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${data.completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Average Progress */}
      {goals.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary dark:text-dark-text-secondary">Average Progress</span>
            <span className="text-text-primary dark:text-dark-text-primary font-medium">
              {Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%
            </span>
          </div>
          <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%` 
              }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalProgressChart; 
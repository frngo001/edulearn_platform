import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const GoalCard = ({ goal, onUpdate, onDelete }) => {
  const [showMilestones, setShowMilestones] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { 
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-300',
        border: 'border-red-200 dark:border-red-700',
        dot: 'bg-red-500'
      };
      case 'medium': return { 
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-700',
        dot: 'bg-blue-500'
      };
      case 'low': return { 
        bg: 'bg-slate-100 dark:bg-slate-900/20',
        text: 'text-slate-600 dark:text-slate-300',
        border: 'border-slate-300 dark:border-slate-700',
        dot: 'bg-slate-500'
      };
      default: return { 
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-600 dark:text-gray-300',
        border: 'border-gray-300 dark:border-gray-600',
        dot: 'bg-gray-500'
      };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'development': return 'Code';
      case 'design': return 'Palette';
      case 'data-science': return 'BarChart';
      case 'cloud': return 'Cloud';
      case 'marketing': return 'TrendingUp';
      case 'business': return 'Briefcase';
      default: return 'Book';
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case 'development': return 'from-blue-500 to-blue-600';
      case 'design': return 'from-purple-500 to-purple-600';
      case 'data-science': return 'from-indigo-500 to-indigo-600';
      case 'cloud': return 'from-slate-500 to-slate-600';
      case 'marketing': return 'from-violet-500 to-violet-600';
      case 'business': return 'from-gray-500 to-gray-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', color: 'text-red-600 dark:text-red-400' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-orange-600 dark:text-orange-400' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-yellow-600 dark:text-yellow-400' };
    } else if (diffDays <= 7) {
      return { text: `${diffDays} days left`, color: 'text-yellow-600 dark:text-yellow-400' };
    } else {
      return { text: `${diffDays} days left`, color: 'text-green-600 dark:text-green-400' };
    }
  };

  const completedMilestones = goal.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = goal.milestones?.length || 0;
  const priorityColors = getPriorityColor(goal.priority);
  const dueDateInfo = formatDate(goal.targetDate);

  const handleProgressUpdate = (newProgress) => {
    onUpdate(goal.id, { progress: Math.min(100, Math.max(0, newProgress)) });
  };

  const handleStatusToggle = () => {
    const newStatus = goal.status === 'active' ? 'paused' : 'active';
    onUpdate(goal.id, { status: newStatus });
  };

  const handleMilestoneToggle = (milestoneId) => {
    const updatedMilestones = goal.milestones.map(milestone =>
      milestone.id === milestoneId
        ? { ...milestone, completed: !milestone.completed }
        : milestone
    );
    
    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
    
    onUpdate(goal.id, { 
      milestones: updatedMilestones,
      progress: newProgress,
      status: newProgress === 100 ? 'completed' : 'active'
    });
  };

  const getProgressColor = () => {
    if (goal.status === 'completed') return 'from-emerald-500 to-emerald-600';
    if (goal.progress >= 75) return 'from-blue-500 to-blue-600';
    if (goal.progress >= 50) return 'from-purple-500 to-purple-600';
    return 'from-slate-400 to-slate-500';
  };

  return (
    <motion.div
      layout
      className="h-[400px] w-full" // Fixed height for consistency
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
        {/* Header with gradient background */}
        <div className={`relative h-24 bg-gradient-to-r ${getCategoryGradient(goal.category)} p-6 flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Icon name={getCategoryIcon(goal.category)} size={24} className="text-white drop-shadow-sm" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg line-clamp-1 drop-shadow-sm">
                {goal.title}
              </h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${priorityColors.dot} shadow-sm`}></div>
                <span className="text-white/90 text-sm font-medium capitalize drop-shadow-sm">
                  {goal.priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full border-2 border-white/30 ${
              goal.status === 'completed' ? 'bg-emerald-400' : 
              goal.status === 'active' ? 'bg-blue-400' : 'bg-yellow-400'
            } shadow-lg`}></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between h-[calc(100%-6rem)]">
          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
              {goal.description}
            </p>
          </div>

          {/* Progress section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                Progress
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {goal.progress}%
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                <motion.div
                  className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor()} shadow-sm`}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Milestones indicator */}
            {totalMilestones > 0 && (
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {completedMilestones}/{totalMilestones} milestones
                </span>
                <button
                  onClick={() => setShowMilestones(!showMilestones)}
                  className="text-xs bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 hover:border-blue-400 px-2 py-1 rounded-md font-medium transition-all"
                >
                  {showMilestones ? 'Hide' : 'Show'} details
                </button>
              </div>
            )}
          </div>

          {/* Milestones (expandable) */}
          <AnimatePresence>
            {showMilestones && totalMilestones > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600"
              >
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {goal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-2">
                      <button
                        onClick={() => handleMilestoneToggle(milestone.id)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          milestone.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                            : 'bg-white border-gray-400 hover:border-blue-500 shadow-sm'
                        }`}
                      >
                        {milestone.completed && <Icon name="Check" size={10} />}
                      </button>
                      <span className={`text-xs flex-1 ${
                        milestone.completed 
                          ? 'text-gray-500 dark:text-gray-500 line-through' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-auto">
            {/* Due date */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-gray-500 dark:text-gray-400" />
                <span className={`text-xs font-medium ${dueDateInfo.color}`}>
                  {dueDateInfo.text}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Created {new Date(goal.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {goal.status !== 'completed' && (
                  <>
                    <Button
                      onClick={() => handleProgressUpdate(goal.progress + 10)}
                      className="text-xs px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all shadow-sm font-medium"
                    >
                      +10%
                    </Button>
                    <Button
                      onClick={() => handleProgressUpdate(goal.progress + 25)}
                      className="text-xs px-3 py-2 bg-slate-500 text-white hover:bg-slate-600 rounded-lg transition-all shadow-sm font-medium"
                    >
                      +25%
                    </Button>
                  </>
                )}
                {goal.status === 'completed' && (
                  <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    <Icon name="CheckCircle" size={14} />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleStatusToggle}
                  className={`p-2 rounded-lg transition-all hover:scale-105 shadow-sm border-2 ${
                    goal.status === 'active' 
                      ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                      : 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <Icon name={goal.status === 'active' ? 'Pause' : 'Play'} size={14} />
                </Button>
                <Button
                  onClick={() => onDelete(goal.id)}
                  className="p-2 rounded-lg bg-red-100 border-2 border-red-300 text-red-700 hover:bg-red-200 transition-all hover:scale-105 shadow-sm"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalCard; 
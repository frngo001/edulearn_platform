import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const LearningGoals = () => {
  const navigate = useNavigate();
  const [expandedGoal, setExpandedGoal] = useState(null);

  const goals = [
    {
      id: 1,
      title: "Master React Hooks",
      description: "Complete advanced React concepts and build 3 projects",
      progress: 75,
      totalTasks: 12,
      completedTasks: 9,
      deadline: "2024-02-15",
      category: "Frontend Development",
      color: "from-blue-500 to-cyan-500",
      icon: "Code",
      subtasks: [
        { id: 1, name: "Learn useState and useEffect", completed: true },
        { id: 2, name: "Master useContext and useReducer", completed: true },
        { id: 3, name: "Build a Todo App with hooks", completed: true },
        { id: 4, name: "Learn custom hooks", completed: false }
      ]
    },
    {
      id: 2,
      title: "Complete Python Certification",
      description: "Finish all modules and pass the final assessment",
      progress: 45,
      totalTasks: 8,
      completedTasks: 4,
      deadline: "2024-03-01",
      category: "Programming",
      color: "from-green-500 to-teal-500",
      icon: "BookOpen",
      subtasks: [
        { id: 1, name: "Data structures and algorithms", completed: true },
        { id: 2, name: "Object-oriented programming", completed: true },
        { id: 3, name: "Web scraping with Python", completed: false },
        { id: 4, name: "Final project submission", completed: false }
      ]
    },
    {
      id: 3,
      title: "UI/UX Design Portfolio",
      description: "Create 5 professional design projects for portfolio",
      progress: 60,
      totalTasks: 5,
      completedTasks: 3,
      deadline: "2024-02-28",
      category: "Design",
      color: "from-purple-500 to-pink-500",
      icon: "Palette",
      subtasks: [
        { id: 1, name: "Mobile app design", completed: true },
        { id: 2, name: "Website redesign project", completed: true },
        { id: 3, name: "Logo and branding suite", completed: true },
        { id: 4, name: "Dashboard interface design", completed: false }
      ]
    }
  ];

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (deadline) => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  const getDeadlineColor = (deadline) => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return "text-red-600 dark:text-red-400";
    if (days <= 3) return "text-orange-600 dark:text-orange-400";
    if (days <= 7) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Icon name="Target" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Goals</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Track your progress and stay motivated</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/learning-goals')}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div 
              className="p-5 cursor-pointer"
              onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon name={goal.icon} size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {goal.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {goal.category}
                      </span>
                      <span className={`font-medium ${getDeadlineColor(goal.deadline)}`}>
                        {formatDeadline(goal.deadline)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {goal.progress}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {goal.completedTasks}/{goal.totalTasks} tasks
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className={`bg-gradient-to-r ${goal.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  ></motion.div>
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <div className="flex justify-center">
                <Icon 
                  name={expandedGoal === goal.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-gray-400 dark:text-gray-500" 
                />
              </div>
            </div>

            {/* Expanded Content */}
            {expandedGoal === goal.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-5"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Subtasks</h4>
                <div className="space-y-2">
                  {goal.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        subtask.completed 
                          ? `bg-gradient-to-r ${goal.color} border-transparent` 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {subtask.completed && (
                          <Icon name="Check" size={12} className="text-white" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        subtask.completed 
                          ? 'text-gray-500 dark:text-gray-400 line-through' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {subtask.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button className={`bg-gradient-to-r ${goal.color} text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow duration-200`}>
                    Continue Learning
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add New Goal Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Plus" size={20} />
          <span className="font-medium">Add New Goal</span>
        </div>
      </motion.button>
    </div>
  );
};

export default LearningGoals; 
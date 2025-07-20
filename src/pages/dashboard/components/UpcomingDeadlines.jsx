import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const UpcomingDeadlines = () => {
  const navigate = useNavigate();

  const deadlines = [
    {
      id: 1,
      title: "React Quiz",
      course: "Advanced React Development",
      dueDate: "2024-01-15",
      dueTime: "11:59 PM",
      priority: "high",
      type: "quiz",
      progress: 0
    },
    {
      id: 2,
      title: "ML Assignment",
      course: "Machine Learning Fundamentals",
      dueDate: "2024-01-18",
      dueTime: "5:00 PM",
      priority: "medium",
      type: "assignment",
      progress: 45
    },
    {
      id: 3,
      title: "Design Project",
      course: "UI/UX Design Principles",
      dueDate: "2024-01-22",
      dueTime: "2:00 PM",
      priority: "low",
      type: "project",
      progress: 80
    }
  ];

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays < 0) return "Overdue";
    return `${diffDays} days left`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error dark:text-error-400 bg-error-100 dark:bg-error-900/30';
      case 'medium':
        return 'text-warning dark:text-warning-400 bg-warning-100 dark:bg-warning-900/30';
      case 'low':
        return 'text-success dark:text-success-400 bg-success-100 dark:bg-success-900/30';
      default:
        return 'text-text-secondary dark:text-dark-text-secondary bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz':
        return 'HelpCircle';
      case 'assignment':
        return 'FileText';
      case 'project':
        return 'Folder';
      default:
        return 'Calendar';
    }
  };

  const handleDeadlineClick = (deadline) => {
    // Navigate to specific course or assignment
    navigate('/course-library');
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Deadlines
          </h3>
          <button 
            onClick={() => navigate('/course-library')}
            className="text-primary hover:text-primary-700 text-sm font-medium"
          >
            See All
          </button>
        </div>

        <div className="space-y-2">
          {deadlines.slice(0, 2).map((deadline) => (
            <div 
              key={deadline.id}
              onClick={() => handleDeadlineClick(deadline)}
              className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${
                    deadline.priority === 'high' ? 'bg-red-500' :
                    deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {deadline.title}
                  </h4>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {getDaysUntilDue(deadline.dueDate)}
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                {deadline.course}
              </p>

              {deadline.progress > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full"
                      style={{ width: `${deadline.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {deadline.progress}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Upcoming Deadlines
          </h3>
          <button 
            onClick={() => navigate('/course-library')}
            className="text-primary hover:text-primary-700 dark:text-white dark:hover:text-gray-200 text-sm font-medium transition-colors duration-150"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <div 
              key={deadline.id}
              onClick={() => handleDeadlineClick(deadline)}
              className="p-3 border border-border dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getTypeIcon(deadline.type)} 
                    size={16} 
                    className="text-text-secondary dark:text-dark-text-secondary" 
                  />
                  <h4 className="font-medium text-text-primary dark:text-dark-text-primary text-sm">
                    {deadline.title}
                  </h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(deadline.priority)}`}>
                  {deadline.priority}
                </span>
              </div>

              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-2">
                {deadline.course}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-text-tertiary dark:text-dark-text-tertiary">
                    {getDaysUntilDue(deadline.dueDate)}
                  </span>
                </div>
                
                {deadline.progress > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full"
                        style={{ width: `${deadline.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-text-tertiary dark:text-dark-text-tertiary">
                      {deadline.progress}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {deadlines.length === 0 && (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Calendar" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
            </div>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              No upcoming deadlines
            </p>
          </div>
        )}

        {/* Quick add reminder */}
        <button
          onClick={() => console.log('Add reminder')}
          className="w-full mt-4 p-2 border-2 border-dashed border-border dark:border-dark-border rounded-lg text-text-secondary dark:text-dark-text-secondary hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors duration-150 text-sm"
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Plus" size={16} />
            <span>Add Reminder</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default UpcomingDeadlines;
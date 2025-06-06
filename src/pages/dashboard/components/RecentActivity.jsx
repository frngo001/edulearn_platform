import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "achievement",
      title: "Course Completed",
      description: "Finished \'JavaScript Fundamentals'",
      timestamp: "2 hours ago",
      icon: "Trophy",
      iconColor: "text-accent",
      iconBg: "bg-accent-100"
    },
    {
      id: 2,
      type: "flashcard",
      title: "Flashcard Session",
      description: "Mastered 15 cards in React Concepts",
      timestamp: "4 hours ago",
      icon: "CreditCard",
      iconColor: "text-primary",
      iconBg: "bg-primary-100"
    },
    {
      id: 3,
      type: "milestone",
      title: "Learning Streak",
      description: "Reached 12-day study streak",
      timestamp: "Yesterday",
      icon: "Flame",
      iconColor: "text-error",
      iconBg: "bg-error-100"
    },
    {
      id: 4,
      type: "course",
      title: "New Course Started",
      description: "Enrolled in \'Advanced CSS Techniques'",
      timestamp: "2 days ago",
      icon: "BookOpen",
      iconColor: "text-secondary",
      iconBg: "bg-secondary-100"
    },
    {
      id: 5,
      type: "ai_chat",
      title: "AI Assistant Session",
      description: "Got help with React hooks concepts",
      timestamp: "3 days ago",
      icon: "MessageSquare",
      iconColor: "text-success",
      iconBg: "bg-success-100"
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Recent Activity
        </h2>
        <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={20} className={activity.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary mb-1">
                {activity.title}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {activity.description}
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} className="text-text-tertiary" />
                <span className="text-xs text-text-tertiary">
                  {activity.timestamp}
                </span>
              </div>
            </div>

            <button className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-150 opacity-0 group-hover:opacity-100">
              <Icon name="MoreHorizontal" size={16} className="text-text-tertiary" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty state for when no activities */}
      {activities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-text-tertiary" />
          </div>
          <h3 className="font-medium text-text-primary mb-2">
            No recent activity
          </h3>
          <p className="text-sm text-text-secondary">
            Start learning to see your activity here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
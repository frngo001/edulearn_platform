import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentWeek = [];

  // Generate current week dates
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    currentWeek.push(date);
  }

  const events = [
    {
      id: 1,
      title: "React Workshop",
      time: "10:00 AM",
      duration: "2h",
      day: 1, // Monday
      type: "live",
      color: "from-blue-500 to-cyan-500",
      instructor: "Sarah Chen"
    },
    {
      id: 2,
      title: "Python Study Session",
      time: "2:00 PM",
      duration: "1.5h",
      day: 2, // Tuesday
      type: "self-study",
      color: "from-green-500 to-teal-500",
      progress: 60
    },
    {
      id: 3,
      title: "Design Review",
      time: "11:00 AM",
      duration: "1h",
      day: 3, // Wednesday
      type: "meeting",
      color: "from-purple-500 to-pink-500",
      participants: 5
    },
    {
      id: 4,
      title: "Algorithm Practice",
      time: "4:00 PM",
      duration: "1h",
      day: 4, // Thursday
      type: "practice",
      color: "from-orange-500 to-red-500",
      difficulty: "Hard"
    },
    {
      id: 5,
      title: "Project Deadline",
      time: "6:00 PM",
      duration: "All day",
      day: 5, // Friday
      type: "deadline",
      color: "from-red-500 to-pink-500",
      priority: "high"
    }
  ];

  const getTodayEvents = () => {
    return events.filter(event => event.day === selectedDay);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'live': return 'Video';
      case 'self-study': return 'BookOpen';
      case 'meeting': return 'Users';
      case 'practice': return 'Code';
      case 'deadline': return 'AlertCircle';
      default: return 'Calendar';
    }
  };

  const getEventTypeLabel = (type) => {
    switch (type) {
      case 'live': return 'Live Session';
      case 'self-study': return 'Self Study';
      case 'meeting': return 'Meeting';
      case 'practice': return 'Practice';
      case 'deadline': return 'Deadline';
      default: return 'Event';
    }
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const hasEvents = (dayIndex) => {
    return events.some(event => event.day === dayIndex);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">This Week</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Your learning schedule</p>
          </div>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
          View Calendar
        </button>
      </div>

      {/* Week Navigation */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {currentWeek.map((date, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedDay(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-3 rounded-xl text-center transition-all duration-200 ${
              selectedDay === index
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : isToday(date)
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="text-xs font-medium mb-1">{days[index]}</div>
            <div className="text-lg font-bold">{date.getDate()}</div>
            
            {/* Event indicator */}
            {hasEvents(index) && (
              <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                selectedDay === index ? 'bg-white' : 'bg-blue-500'
              }`}></div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Today's Events */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          {selectedDay === today.getDay() ? "Today's Schedule" : `${days[selectedDay]}'s Schedule`}
        </h3>
        
        {getTodayEvents().length > 0 ? (
          <div className="space-y-3">
            {getTodayEvents().map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${event.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={getEventIcon(event.type)} size={16} className="text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {event.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {event.time}
                      </span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>

                    {/* Event-specific details */}
                    {event.instructor && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        with {event.instructor}
                      </p>
                    )}
                    {event.progress && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div 
                            className={`bg-gradient-to-r ${event.color} h-1.5 rounded-full`}
                            style={{ width: `${event.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {event.progress}%
                        </span>
                      </div>
                    )}
                    {event.participants && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {event.participants} participants
                      </p>
                    )}
                    {event.priority === 'high' && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="AlertTriangle" size={12} className="text-red-500" />
                        <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                          High Priority
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Calendar" size={24} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No events scheduled for this day
            </p>
            <button className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              Add Event
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{events.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Live Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">12h</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Study Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule; 
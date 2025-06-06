import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import RecentActivity from './components/RecentActivity';
import ContinueLearning from './components/ContinueLearning';
import QuickActions from './components/QuickActions';
import StatisticsCards from './components/StatisticsCards';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import RecommendedCourses from './components/RecommendedCourses';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    currentStreak: 12,
    todayGoal: {
      completed: 68,
      total: 100,
      studyTime: 45,
      targetTime: 60
    },
    weeklyStats: {
      studyTime: 285,
      coursesCompleted: 3,
      flashcardsMastered: 147
    }
  };

  // Mock recent courses data
  const recentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Chen",
      progress: 75,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      lastAccessed: "2 hours ago",
      nextLesson: "Custom Hooks Deep Dive",
      estimatedTime: "25 min"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Rodriguez",
      progress: 42,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      lastAccessed: "Yesterday",
      nextLesson: "Neural Networks Basics",
      estimatedTime: "35 min"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Emma Thompson",
      progress: 88,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      lastAccessed: "3 days ago",
      nextLesson: "Accessibility Guidelines",
      estimatedTime: "20 min"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ContextualHeader />
        <div className="pt-16 pb-20 md:pb-4 md:pl-64">
          <div className="p-4 lg:p-6">
            {/* Loading skeleton */}
            <div className="space-y-6">
              <div className="skeleton h-20 w-full rounded-lg"></div>
              <div className="skeleton h-32 w-full rounded-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="skeleton h-24 rounded-lg"></div>
                <div className="skeleton h-24 rounded-lg"></div>
                <div className="skeleton h-24 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-64">
        <div className="p-4 lg:p-6">
          {/* Pull to refresh indicator */}
          {refreshing && (
            <div className="fixed top-16 left-0 right-0 bg-primary text-white text-center py-2 z-50">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                <span className="text-sm font-medium">Refreshing...</span>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-heading font-bold mb-2">
                    {getGreeting()}, {userData.name}! 👋
                  </h1>
                  <p className="text-primary-100 mb-4 font-body">
                    Ready to continue your learning journey?
                  </p>
                  
                  {/* Streak Counter */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Flame" size={20} className="text-accent" />
                      <span className="font-semibold">{userData.currentStreak} day streak</span>
                    </div>
                    <div className="w-px h-4 bg-primary-300"></div>
                    <div className="text-sm text-primary-100">
                      Keep it up!
                    </div>
                  </div>
                </div>
                
                <div className="hidden sm:block">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <Image
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Today's Progress */}
              <div className="mt-6 bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Today's Goal</span>
                  <span className="text-sm">{userData.todayGoal.studyTime}/{userData.todayGoal.targetTime} min</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                  <div 
                    className="bg-accent h-3 rounded-full transition-all duration-500"
                    style={{ width: `${userData.todayGoal.completed}%` }}
                  ></div>
                </div>
                <div className="text-sm text-primary-100 mt-1">
                  {userData.todayGoal.completed}% completed
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Continue Learning */}
                <ContinueLearning courses={recentCourses} />

                {/* Quick Actions */}
                <QuickActions />

                {/* Statistics Cards */}
                <StatisticsCards stats={userData.weeklyStats} />

                {/* Recent Activity */}
                <RecentActivity />
              </div>

              {/* Sidebar - Desktop Only */}
              <div className="hidden lg:block space-y-6">
                {/* Upcoming Deadlines */}
                <UpcomingDeadlines />

                {/* Recommended Courses */}
                <RecommendedCourses />

                {/* Study Reminder */}
                <div className="bg-surface rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-accent-700" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        Study Reminder
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Daily goal progress
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Study time</span>
                      <span className="font-medium text-text-primary">
                        {userData.todayGoal.studyTime} min
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Remaining</span>
                      <span className="font-medium text-accent-700">
                        {userData.todayGoal.targetTime - userData.todayGoal.studyTime} min
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/flashcard-study-interface')}
                    className="w-full mt-4 bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-700 transition-colors duration-200 font-medium"
                  >
                    Continue Studying
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import { useUserProfile } from 'lib/hooks/useUserProfile';
import RecentActivity from './components/RecentActivity';
import ContinueLearning from './components/ContinueLearning';
import QuickActions from './components/QuickActions';
import StatisticsCards from './components/StatisticsCards';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import RecommendedCourses from './components/RecommendedCourses';
import LearningGoals from './components/LearningGoals';
import WeeklySchedule from './components/WeeklySchedule';
import Achievements from './components/Achievements';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userProfile, isLoading: profileLoading } = useUserProfile();

  // Mock data that would come from API in production
  const dashboardData = {
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

  // Combine user profile with dashboard data
  const userData = {
    name: userProfile?.full_name || userProfile?.username || "User",
    avatar: userProfile?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    ...dashboardData
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
    if (hour < 12) return "Guten Morgen";
    if (hour < 17) return "Guten Tag";
    return "Guten Abend";
  };

  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ContextualHeader />
        <div className="pt-16 pb-20 md:pb-4 md:pl-16">
          <div className="p-6 lg:p-8">
            {/* Loading skeleton */}
            <div className="space-y-6">
              <div className="h-20 w-full rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="h-32 w-full rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ContextualHeader />
      
      <main className="pt-16 pb-4 md:pl-16">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Pull to refresh indicator */}
          {refreshing && (
            <div className="fixed top-16 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 z-50">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                <span className="text-sm font-medium">Refreshing...</span>
              </div>
            </div>
          )}

          <div className="w-full">
            {/* Mobile Optimized Header */}
            <div className="md:hidden mb-4">
              {/* Compact Welcome */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-3 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h1 className="text-lg font-bold mb-1">
                      {getGreeting()}, {userData.name}! 👋
                    </h1>
                    <p className="text-blue-100 text-sm opacity-90">
                      Bereit zum Lernen?
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 p-0.5 flex items-center justify-center">
                    <AppImage
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-11 h-11 rounded-full object-cover"
                      placeholder="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    />
                  </div>
                </div>
                
                {/* Compact Progress */}
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} className="text-orange-400" />
                      <span className="font-medium text-sm">Heutiges Ziel</span>
                    </div>
                    <span className="text-blue-100 text-sm">{userData.todayGoal.completed}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${userData.todayGoal.completed}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="Flame" size={16} className="text-orange-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{userData.currentStreak}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tage Serie</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="Clock" size={16} className="text-blue-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{userData.weeklyStats.studyTime}m</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Diese Woche</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="BookOpen" size={16} className="text-green-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{userData.weeklyStats.coursesCompleted}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Kurse</div>
                </div>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 sm:p-6 mb-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">
                    {getGreeting()}, {userData.name}! 👋
                  </h1>
                  <p className="text-blue-100 mb-4 text-sm sm:text-base">
                    Ready to continue your learning journey?
                  </p>
                  
                  {/* Streak Counter */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <Icon name="Flame" size={20} className="text-orange-400" />
                      <span className="font-semibold text-base sm:text-lg">{userData.currentStreak} day streak</span>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-blue-300"></div>
                    <div className="text-blue-100 text-sm sm:text-base">
                      Keep it up!
                    </div>
                  </div>
                </div>
                
                <div className="hidden sm:block">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white bg-opacity-20 p-1 flex items-center justify-center">
                    <AppImage
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-14 h-14 sm:w-18 sm:h-18 rounded-full object-cover"
                      placeholder="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    />
                  </div>
                </div>
              </div>

              {/* Today's Progress */}
              <div className="mt-4 sm:mt-6 bg-white bg-opacity-10 rounded-xl p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                  <span className="font-semibold text-base sm:text-lg">Today's Goal</span>
                  <span className="text-blue-100 text-sm sm:text-base">{userData.todayGoal.studyTime}/{userData.todayGoal.targetTime} min</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-3 sm:h-4">
                  <div 
                    className="bg-orange-400 h-3 sm:h-4 rounded-full transition-all duration-500"
                    style={{ width: `${userData.todayGoal.completed}%` }}
                  ></div>
                </div>
                <div className="text-blue-100 mt-1 text-xs sm:text-sm">
                  {userData.todayGoal.completed}% completed
                </div>
              </div>
            </div>

            {/* Mobile-First Layout */}
            <div className="md:hidden space-y-4">
              {/* Continue Learning - Most Important */}
              <ContinueLearning courses={recentCourses} />

              {/* Quick Actions - Easy Access */}
              <QuickActions />

              {/* Upcoming Deadlines - Critical Info */}
              <UpcomingDeadlines />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                {/* Continue Learning */}
                <ContinueLearning courses={recentCourses} />

                {/* Statistics Cards */}
                <StatisticsCards stats={userData.weeklyStats} />

                {/* Learning Goals */}
                <LearningGoals />

                {/* Two Column Layout for Middle Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Weekly Schedule */}
                  <WeeklySchedule />
                  
                  {/* Achievements */}
                  <Achievements />
                </div>

                {/* Recent Activity */}
                <RecentActivity />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Quick Actions */}
                <QuickActions />

                {/* Upcoming Deadlines */}
                <UpcomingDeadlines />

                {/* Recommended Courses */}
                <RecommendedCourses />
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
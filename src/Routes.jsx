import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import PublicRoute from "components/PublicRoute";

// Page imports
import LandingPage from "pages/landing";
import RegistrationScreen from "pages/registration-screen";
import SignIn from "pages/signin";
import Logout from "pages/logout";
import Dashboard from "pages/dashboard";
import CourseLibrary from "pages/course-library";
import MyCourses from "pages/my-courses";
import CourseDetails from "pages/course-details";
import CourseLearning from "pages/course-learning";
import AiChatAssistant from "pages/ai-chat-assistant";
import Flashcards from "pages/flashcards";
import UserProfileSettings from "pages/user-profile-settings";
import TermsOfService from "pages/terms-of-service";
import PrivacyPolicy from "pages/privacy-policy";
import NotFound from "pages/not-found";
import LearningGoals from "pages/learning-goals";

// Study feature pages
import StudyProgress from "pages/study-progress";
import StudyAchievements from "pages/study-achievements";
import StudyDeadlines from "pages/study-deadlines";
import StudyStatistics from "pages/study-statistics";
import StudyCalendar from "pages/study-calendar";
import StudyNotes from "pages/study-notes";
import StudyTimer from "pages/study-timer";
import StudySchedule from "pages/study-schedule";
import StudyCertificates from "pages/study-certificates";
import StudyBookmarks from "pages/study-bookmarks";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Landing page - public route */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />
          
          {/* Public routes - accessible without authentication */}
          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          <Route 
            path="/registration" 
            element={
              <PublicRoute>
                <RegistrationScreen />
              </PublicRoute>
            } 
          />
          <Route 
            path="/registration-screen" 
            element={
              <PublicRoute>
                <RegistrationScreen />
              </PublicRoute>
            } 
          />
          
          {/* Logout route - accessible to everyone */}
          <Route path="/logout" element={<Logout />} />
          
          {/* Public legal pages - accessible to everyone */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course-library" 
            element={
              <ProtectedRoute>
                <CourseLibrary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-courses" 
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course-details/:courseId" 
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:courseId/learn/:lessonId" 
            element={
              <ProtectedRoute>
                <CourseLearning />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:courseId/learn" 
            element={
              <ProtectedRoute>
                <CourseLearning />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/ai-chat-assistant" 
            element={
              <ProtectedRoute>
                <AiChatAssistant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-profile-settings" 
            element={
              <ProtectedRoute>
                <UserProfileSettings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/flashcards" 
            element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/flashcard-study-interface" 
            element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/learning-goals" 
            element={
              <ProtectedRoute>
                <LearningGoals />
              </ProtectedRoute>
            } 
          />
          
          {/* Study feature routes */}
          <Route 
            path="/study-progress" 
            element={
              <ProtectedRoute>
                <StudyProgress />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-achievements" 
            element={
              <ProtectedRoute>
                <StudyAchievements />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-deadlines" 
            element={
              <ProtectedRoute>
                <StudyDeadlines />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-statistics" 
            element={
              <ProtectedRoute>
                <StudyStatistics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-calendar" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StudyCalendar />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-notes" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StudyNotes />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-timer" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StudyTimer />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-schedule" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StudySchedule />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-certificates" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StudyCertificates />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/study-bookmarks" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StudyBookmarks />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Page - accessible to everyone */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
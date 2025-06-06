import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import RegistrationScreen from "pages/registration-screen";
import Dashboard from "pages/dashboard";
import CourseLibrary from "pages/course-library";
import AiChatAssistant from "pages/ai-chat-assistant";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<RegistrationScreen />} />
          <Route path="/registration-screen" element={<RegistrationScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course-library" element={<CourseLibrary />} />
          <Route path="/ai-chat-assistant" element={<AiChatAssistant />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
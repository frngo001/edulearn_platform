import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBridge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState('');
  const [showQuickReturn, setShowQuickReturn] = useState(false);

  useEffect(() => {
    const studyPaths = ['/flashcard-study-interface', '/ai-chat-assistant'];
    const isEnteringStudy = studyPaths.includes(location.pathname) && !studyPaths.includes(previousPath);
    const isLeavingStudy = !studyPaths.includes(location.pathname) && studyPaths.includes(previousPath);

    if (isEnteringStudy || isLeavingStudy) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
    }

    // Show quick return button when in study mode
    setShowQuickReturn(studyPaths.includes(location.pathname));

    setPreviousPath(location.pathname);
  }, [location.pathname, previousPath]);

  const getReturnDestination = () => {
    // Determine the best return destination based on user context
    if (previousPath && !['/flashcard-study-interface', '/ai-chat-assistant'].includes(previousPath)) {
      return previousPath;
    }
    return '/dashboard';
  };

  const handleQuickReturn = () => {
    const destination = getReturnDestination();
    navigate(destination);
  };

  const getStudyContext = () => {
    switch (location.pathname) {
      case '/flashcard-study-interface':
        return {
          title: 'Flashcard Study',
          icon: 'CreditCard',
          description: 'Active learning session'
        };
      case '/ai-chat-assistant':
        return {
          title: 'AI Assistant',
          icon: 'MessageSquare',
          description: 'Getting help from AI'
        };
      default:
        return null;
    }
  };

  const studyContext = getStudyContext();

  // Transition overlay
  if (isTransitioning) {
    return (
      <div className="fixed inset-0 bg-background z-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Icon name="BookOpen" size={24} className="text-white" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Quick return button for study sessions
  if (showQuickReturn && studyContext) {
    return (
      <div className="fixed top-4 left-4 z-90">
        <button
          onClick={handleQuickReturn}
          className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-3 py-2 shadow-md hover:shadow-lg transition-all duration-200 group"
          aria-label="Return to previous page"
        >
          <Icon 
            name="ArrowLeft" 
            size={16} 
            className="text-text-secondary group-hover:text-primary transition-colors duration-150" 
          />
          <span className="text-sm font-caption text-text-secondary group-hover:text-text-primary transition-colors duration-150">
            Back
          </span>
        </button>
      </div>
    );
  }

  return null;
};

export default NavigationBridge;
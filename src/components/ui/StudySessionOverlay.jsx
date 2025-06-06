import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const StudySessionOverlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isStudySession, setIsStudySession] = useState(false);
  const [sessionData, setSessionData] = useState({
    progress: 0,
    currentCard: 1,
    totalCards: 20,
    timeElapsed: 0,
    isPaused: false,
    sessionType: 'flashcard'
  });

  useEffect(() => {
    const studyPaths = ['/flashcard-study-interface', '/ai-chat-assistant'];
    setIsStudySession(studyPaths.includes(location.pathname));
    
    if (location.pathname === '/flashcard-study-interface') {
      setSessionData(prev => ({ ...prev, sessionType: 'flashcard' }));
    } else if (location.pathname === '/ai-chat-assistant') {
      setSessionData(prev => ({ ...prev, sessionType: 'ai-chat' }));
    }
  }, [location.pathname]);

  useEffect(() => {
    let interval;
    if (isStudySession && !sessionData.isPaused) {
      interval = setInterval(() => {
        setSessionData(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudySession, sessionData.isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    setSessionData(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleNext = () => {
    if (sessionData.currentCard < sessionData.totalCards) {
      setSessionData(prev => ({
        ...prev,
        currentCard: prev.currentCard + 1,
        progress: ((prev.currentCard + 1) / prev.totalCards) * 100
      }));
    }
  };

  const handlePrevious = () => {
    if (sessionData.currentCard > 1) {
      setSessionData(prev => ({
        ...prev,
        currentCard: prev.currentCard - 1,
        progress: ((prev.currentCard - 1) / prev.totalCards) * 100
      }));
    }
  };

  const handleExit = () => {
    const confirmExit = window.confirm('Are you sure you want to exit the study session? Your progress will be saved.');
    if (confirmExit) {
      navigate('/dashboard');
    }
  };

  const handleSettings = () => {
    console.log('Study session settings');
  };

  if (!isStudySession) {
    return null;
  }

  return (
    <>
      {/* Study Session Controls */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-surface rounded-full shadow-lg border border-border px-6 py-3 flex items-center space-x-4">
          {/* Previous Button */}
          {sessionData.sessionType === 'flashcard' && (
            <button
              onClick={handlePrevious}
              disabled={sessionData.currentCard === 1}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous card"
            >
              <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
            </button>
          )}

          {/* Pause/Play Button */}
          <button
            onClick={handlePause}
            className="p-3 rounded-full bg-primary text-white hover:bg-primary-700 transition-colors duration-150 shadow-md"
            aria-label={sessionData.isPaused ? 'Resume' : 'Pause'}
          >
            <Icon 
              name={sessionData.isPaused ? 'Play' : 'Pause'} 
              size={20} 
            />
          </button>

          {/* Next Button */}
          {sessionData.sessionType === 'flashcard' && (
            <button
              onClick={handleNext}
              disabled={sessionData.currentCard === sessionData.totalCards}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next card"
            >
              <Icon name="ChevronRight" size={20} className="text-text-secondary" />
            </button>
          )}

          {/* Settings Button */}
          <button
            onClick={handleSettings}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
            aria-label="Settings"
          >
            <Icon name="Settings" size={20} className="text-text-secondary" />
          </button>

          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="p-2 rounded-full hover:bg-error-50 hover:text-error transition-colors duration-150"
            aria-label="Exit session"
          >
            <Icon name="X" size={20} className="text-text-secondary hover:text-error" />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-surface rounded-lg shadow-md border border-border px-4 py-2 flex items-center space-x-4">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-tertiary" />
            <span className="text-sm font-mono text-text-secondary">
              {formatTime(sessionData.timeElapsed)}
            </span>
          </div>

          {/* Progress for Flashcards */}
          {sessionData.sessionType === 'flashcard' && (
            <>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-caption text-text-secondary">
                  {sessionData.currentCard} / {sessionData.totalCards}
                </span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${sessionData.progress}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}

          {/* Session Type Indicator */}
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={sessionData.sessionType === 'flashcard' ? 'CreditCard' : 'MessageSquare'} 
              size={16} 
              className="text-primary" 
            />
            <span className="text-sm font-caption text-text-secondary">
              {sessionData.sessionType === 'flashcard' ? 'Flashcards' : 'AI Chat'}
            </span>
          </div>

          {/* Pause Indicator */}
          {sessionData.isPaused && (
            <>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm font-caption text-warning">
                  Paused
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Quick Actions */}
      <div className="fixed top-20 right-4 z-50 md:hidden">
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleSettings}
            className="p-3 bg-surface rounded-full shadow-md border border-border hover:bg-gray-50 transition-colors duration-150"
            aria-label="Settings"
          >
            <Icon name="Settings" size={20} className="text-text-secondary" />
          </button>
          <button
            onClick={handleExit}
            className="p-3 bg-surface rounded-full shadow-md border border-border hover:bg-error-50 hover:text-error transition-colors duration-150"
            aria-label="Exit"
          >
            <Icon name="X" size={20} className="text-text-secondary hover:text-error" />
          </button>
        </div>
      </div>

      {/* Study Session Overlay Background */}
      {sessionData.isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40 flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-xl p-6 max-w-sm mx-4">
            <div className="text-center">
              <Icon name="Pause" size={48} className="text-warning mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                Study Session Paused
              </h3>
              <p className="text-text-secondary mb-4 font-body">
                Take a break! Click resume when you're ready to continue.
              </p>
              <button
                onClick={handlePause}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-150 font-medium"
              >
                Resume Study Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudySessionOverlay;
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SuccessMessage = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-background to-primary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Icon name="Check" size={48} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Welcome to EduLearn!
          </h1>
          
          <p className="text-text-secondary mb-6 font-body">
            Your account has been created successfully. We've sent a verification email to confirm your account.
          </p>
        </div>

        {/* Email Verification Notice */}
        <div className="bg-surface rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={24} className="text-secondary" />
            </div>
          </div>
          
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            Check Your Email
          </h3>
          
          <p className="text-sm text-text-secondary mb-4">
            We've sent a verification link to your email address. Please click the link to activate your account and start learning.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-text-tertiary">
            <Icon name="Clock" size={14} />
            <span>Didn't receive the email? Check your spam folder</span>
          </div>
        </div>

        {/* Redirect Notice */}
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-primary-700">
            <Icon name="ArrowRight" size={16} />
            <span className="text-sm font-medium">
              Redirecting to dashboard in {countdown} seconds...
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
            Go to Dashboard
          </button>
          
          <button className="w-full bg-surface border border-border text-text-primary py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
            Resend Verification Email
          </button>
        </div>

        {/* Welcome Tips */}
        <div className="mt-8 text-left">
          <h4 className="font-heading font-semibold text-text-primary mb-3 text-center">
            Get Started with EduLearn
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="BookOpen" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Explore Courses</p>
                <p className="text-xs text-text-secondary">Browse our extensive library of courses</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="MessageSquare" size={12} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">AI Assistant</p>
                <p className="text-xs text-text-secondary">Get help from our intelligent learning assistant</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="CreditCard" size={12} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Study with Flashcards</p>
                <p className="text-xs text-text-secondary">Create and practice with interactive flashcards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
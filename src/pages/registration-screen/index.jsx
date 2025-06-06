import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import SocialRegistration from './components/SocialRegistration';
import SuccessMessage from './components/SuccessMessage';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Learning Preferences
    subjects: [],
    experienceLevel: '',
    learningGoals: '',
    
    // Step 3: Terms and Preferences
    acceptTerms: false,
    emailNotifications: true,
    marketingEmails: false
  });

  const totalSteps = 3;

  const handleStepComplete = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete registration
      setIsComplete(true);
      // Simulate API call delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSocialRegistration = (provider) => {
    console.log(`Registering with ${provider}`);
    // Simulate social registration
    setIsComplete(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (isComplete) {
    return <SuccessMessage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                EduLearn
              </span>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-150 font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Join EduLearn
            </h1>
            <p className="text-text-secondary font-body">
              Start your learning journey with personalized courses and AI assistance
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Registration Card */}
          <div className="bg-surface rounded-xl shadow-lg border border-border p-6 sm:p-8 mb-6">
            <RegistrationForm
              currentStep={currentStep}
              formData={formData}
              onStepComplete={handleStepComplete}
              onStepBack={handleStepBack}
            />
          </div>

          {/* Social Registration */}
          {currentStep === 1 && (
            <SocialRegistration onSocialRegister={handleSocialRegistration} />
          )}

          {/* Footer Links */}
          <div className="text-center text-sm text-text-tertiary">
            <p>
              By creating an account, you agree to our{' '}
              <button className="text-primary hover:text-primary-700 underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationScreen;
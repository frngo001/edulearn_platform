import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import SocialRegistration from './components/SocialRegistration';
import { useAuth } from '../../lib/AuthContext';
import Icon from 'components/AppIcon';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, isAuthenticated, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  // Check if user is already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleStepComplete = async (stepData) => {
    setError(null);
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete registration with email/password
      setIsLoading(true);
      try {
        const result = await signUpWithEmail(
          updatedData.email,
          updatedData.password,
          {
            metadata: {
              full_name: updatedData.fullName,
              subjects: updatedData.subjects,
              experience_level: updatedData.experienceLevel,
              learning_goals: updatedData.learningGoals,
              email_notifications: updatedData.emailNotifications,
              marketing_emails: updatedData.marketingEmails
            }
          }
        );

        if (result.error) {
          // Translate error messages to German
          let errorMessage = result.error.message;
          if (errorMessage?.includes('Email rate limit exceeded')) {
            errorMessage = 'E-Mail-Limit überschritten. Bitte warten Sie einen Moment und versuchen Sie es erneut.';
          } else if (errorMessage?.includes('Password should be at least')) {
            errorMessage = 'Das Passwort sollte mindestens 6 Zeichen lang sein.';
          } else if (errorMessage?.includes('User already registered')) {
            errorMessage = 'Diese E-Mail-Adresse ist bereits registriert. Versuchen Sie sich anzumelden.';
          } else if (errorMessage?.includes('Invalid email')) {
            errorMessage = 'Ungültige E-Mail-Adresse. Bitte überprüfen Sie Ihre Eingabe.';
          }
          setError(errorMessage);
          return;
        }

        // Registration successful
        if (result.data?.user) {
          console.log('Registration successful:', result.data.user);
          setRegistrationSuccess(true);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setError(null); // Clear errors when going back
    }
  };

  const handleSocialRegistration = (provider, data) => {
    console.log(`Social registration with ${provider}:`, data);
    // OAuth will handle the redirect automatically
    // This callback is for additional logic if needed
  };

  const handleSocialError = (errorMessage) => {
    setError(errorMessage);
  };

  // Show success message
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 md:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Icon name="Check" size={24} className="text-green-600 dark:text-green-400 md:w-8 md:h-8" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Willkommen bei EduLearn!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
            Ihr Konto wurde erfolgreich erstellt. Sie können sich jetzt anmelden und Ihre Lernreise beginnen.
          </p>
          
          <button
            onClick={() => navigate('/signin')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 md:py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold transform hover:scale-[1.02] text-sm md:text-base"
          >
            Zur Anmeldung
          </button>
          
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-center sm:space-x-6 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Shield" size={14} className="md:w-4 md:h-4" />
                <span>Sicheres Konto</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Users" size={14} className="md:w-4 md:h-4" />
                <span>50.000+ Studenten beitreten</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation - Mobile Optimized */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Icon name="Brain" size={16} className="text-white md:w-5 md:h-5" />
              </div>
              <span className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">EduLearn</span>
            </Link>
            
            <div className="flex items-center">
              <Link
                to="/signin"
                className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="hidden sm:inline">Bereits ein Konto? Anmelden</span>
                <span className="sm:hidden">Anmelden</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Mobile Optimized */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-md w-full space-y-6 md:space-y-8">
          {/* Header - Mobile Optimized */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Konto erstellen
            </h1>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300">
              Treten Sie tausenden von Studenten bei, die mit KI lernen
            </p>
          </div>

          {/* Progress Indicator - Mobile Optimized */}
          <div className="flex justify-center">
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
            />
          </div>

          {/* Error Display - Mobile Optimized */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 md:p-4">
              <div className="flex items-start space-x-2 md:space-x-3">
                <Icon name="AlertCircle" size={18} className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-red-700 dark:text-red-300 text-sm md:text-base leading-relaxed">{error}</span>
              </div>
            </div>
          )}

          {/* Registration Form - Mobile Optimized */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <RegistrationForm
              currentStep={currentStep}
              formData={formData}
              onStepComplete={handleStepComplete}
              onStepBack={handleStepBack}
              isLoading={isLoading}
              totalSteps={totalSteps}
            />

            {currentStep === 1 && (
              <>
                {/* Social Registration - Mobile Optimized */}
                <div className="mt-5 md:mt-6">
                  <SocialRegistration
                    onSuccess={handleSocialRegistration}
                    onError={handleSocialError}
                    mode="signup"
                  />
                </div>
              </>
            )}
          </div>

          {/* Trust Indicators - Mobile Optimized */}
          <div className="text-center pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-col items-center space-y-1">
                <Icon name="Shield" size={14} className="md:w-4 md:h-4" />
                <span>Sicher & Privat</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Icon name="Zap" size={14} className="md:w-4 md:h-4" />
                <span>KI-gestützt</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Icon name="Heart" size={14} className="md:w-4 md:h-4" />
                <span>Kostenlos starten</span>
              </div>
            </div>
          </div>

          {/* Legal - Mobile Optimized */}
          <div className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Durch die Erstellung eines Kontos stimmen Sie unseren{' '}
            <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
              Nutzungsbedingungen
            </Link>
            {' '}und unserer{' '}
            <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
              Datenschutzerklärung
            </Link>
            {' '}zu.
          </div>

          {/* Sign In Link - Mobile Optimized */}
          <div className="text-center pt-4">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Bereits ein Konto?{' '}
              <Link 
                to="/signin" 
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
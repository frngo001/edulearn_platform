import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../lib/AuthContext';
import SocialRegistration from '../registration-screen/components/SocialRegistration';
import Icon from 'components/AppIcon';

const SignIn = () => {
  const navigate = useNavigate();
  const { signInWithEmail, isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error } = await signInWithEmail(
        formData.email,
        formData.password
      );

      if (error) {
        // Provide more specific error messages in German
        if (error.message?.includes('Email not confirmed')) {
          setError('Bitte bestätigen Sie Ihre E-Mail-Adresse vor der Anmeldung. Überprüfen Sie Ihr Postfach auf die Bestätigungs-E-Mail.');
        } else if (error.message?.includes('Invalid login credentials')) {
          setError('Ungültige E-Mail-Adresse oder Passwort. Bitte überprüfen Sie Ihre Anmeldedaten.');
        } else if (error.message?.includes('Too many requests')) {
          setError('Zu viele Anmeldeversuche. Bitte warten Sie einen Moment und versuchen Sie es erneut.');
        } else {
          setError(error.message || 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
      } else {
        // Success - navigation will be handled by the auth context and useEffect
        console.log('Sign in successful');
      }
    } catch (error) {
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider, data) => {
    console.log(`Social sign in with ${provider}:`, data);
    // OAuth will handle the redirect automatically
  };

  const handleSocialError = (errorMessage) => {
    setError(errorMessage);
  };

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
                to="/"
                className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <Icon name="ArrowLeft" size={16} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline">Zurück zur Startseite</span>
                <span className="sm:hidden">Zurück</span>
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
              Willkommen zurück
            </h1>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300">
              Melden Sie sich in Ihrem Konto an, um weiterzulernen
            </p>
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

          {/* Sign In Form - Mobile Optimized */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 md:py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 md:py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Geben Sie Ihr Passwort ein"
                />
              </div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm md:text-base text-gray-700 dark:text-gray-300">
                    Angemeldet bleiben
                  </label>
                </div>

                <div className="text-sm md:text-base">
                  <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Passwort vergessen?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm md:text-base rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Anmeldung läuft...</span>
                  </>
                ) : (
                  <>
                    <span>Anmelden</span>
                    <Icon name="ArrowRight" size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Social Sign In - Mobile Optimized */}
            <div className="mt-6 md:mt-8">
              <SocialRegistration
                onSuccess={handleSocialSignIn}
                onError={handleSocialError}
                mode="signin"
              />
            </div>
          </div>

          {/* Trust Indicators - Mobile Optimized */}
          <div className="text-center pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:items-center sm:justify-center sm:space-x-6 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Shield" size={14} className="md:w-4 md:h-4" />
                <span>Sichere Anmeldung</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Users" size={14} className="md:w-4 md:h-4" />
                <span>50.000+ Studenten</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Star" size={14} className="md:w-4 md:h-4" />
                <span>4,9/5 Bewertung</span>
              </div>
            </div>
          </div>

          {/* Registration Link - Mobile Optimized */}
          <div className="text-center pt-4">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Noch kein Konto?{' '}
              <Link 
                to="/registration-screen" 
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 
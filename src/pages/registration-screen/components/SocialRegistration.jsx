import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Icon from 'components/AppIcon';
import { useAuth } from '../../../lib/AuthContext';

// Brand Logo Components
const GoogleLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="mr-2 md:mr-3">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GitHubLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="mr-2 md:mr-3">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const MicrosoftLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="mr-2 md:mr-3">
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M12 1h10v10H12z"/>
    <path fill="#7FBA00" d="M1 12h10v10H1z"/>
    <path fill="#FFB900" d="M12 12h10v10H12z"/>
  </svg>
);

const SocialRegistration = ({ onSocialRegister, onError, mode = 'register' }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const { signInWithGoogle, signInWithGitHub, signInWithMicrosoft } = useAuth();

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      logo: GoogleLogo,
      color: 'hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400',
      bgColor: 'bg-red-500',
      authMethod: signInWithGoogle
    },
    {
      id: 'github',
      name: 'GitHub',
      logo: GitHubLogo,
      iconColor: 'text-gray-900 dark:text-white', // GitHub brand colors
      color: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300',
      bgColor: 'bg-gray-800',
      authMethod: signInWithGitHub
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      logo: MicrosoftLogo,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400',
      bgColor: 'bg-blue-600',
      authMethod: signInWithMicrosoft
    }
  ];

  const handleSocialLogin = async (provider) => {
    if (loadingProvider) return; // Prevent multiple simultaneous requests

    setLoadingProvider(provider.id);

    try {
      const { data, error } = await provider.authMethod();
      
      if (error) {
        console.error(`${provider.name} OAuth error:`, error);
        
        // Handle different types of errors with German messages
        let errorMessage = `Anmeldung mit ${provider.name} fehlgeschlagen`;
        
        if (error.message?.includes('popup_closed_by_user')) {
          errorMessage = 'Anmeldung wurde abgebrochen. Bitte versuchen Sie es erneut.';
        } else if (error.message?.includes('network')) {
          errorMessage = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.';
        } else if (error.message) {
          errorMessage = error.message;
        }

        if (onError) {
          onError(errorMessage);
        } else {
          // Fallback error display
          alert(errorMessage);
        }
      } else {
        // Success - the OAuth flow will redirect to the dashboard
        console.log(`${provider.name} OAuth success:`, data);
        if (onSocialRegister) {
          onSocialRegister(provider.id, data);
        }
      }
    } catch (error) {
      console.error(`Unexpected error during ${provider.name} OAuth:`, error);
      const errorMessage = `Ein unerwarteter Fehler bei der ${provider.name} Anmeldung ist aufgetreten. Bitte versuchen Sie es erneut.`;
      
      if (onError) {
        onError(errorMessage);
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <motion.div 
      className="space-y-3 md:space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Divider - Mobile Optimized */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="px-3 md:px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Oder fortfahren mit
          </span>
        </div>
      </div>

      {/* Social Registration Buttons - Mobile Optimized */}
      <div className="grid grid-cols-1 gap-2 md:gap-3">
        {socialProviders.map((provider) => {
          const LogoComponent = provider.logo;
          return (
            <motion.button
              key={provider.id}
              data-testid={`${provider.id}-signup-btn`}
              onClick={() => handleSocialLogin(provider)}
              disabled={loadingProvider !== null}
              className={`
                w-full flex items-center justify-center px-3 py-3 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 font-medium text-sm md:text-base
                ${loadingProvider === provider.id 
                  ? 'opacity-75 cursor-not-allowed' 
                  : `${provider.color} transform hover:scale-[1.02]`
                }
                ${loadingProvider && loadingProvider !== provider.id ? 'opacity-50' : ''}
              `}
              whileHover={loadingProvider ? {} : { scale: 1.02 }}
              whileTap={loadingProvider ? {} : { scale: 0.98 }}
            >
              {loadingProvider === provider.id ? (
                <>
                  <motion.div
                    className="w-4 h-4 md:w-5 md:h-5 border-2 border-gray-400 dark:border-gray-500 border-t-gray-700 dark:border-t-gray-300 rounded-full mr-2 md:mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-sm md:text-base">Verbindung zu {provider.name}...</span>
                </>
              ) : (
                <>
                  <LogoComponent size={18} />
                  <span className="text-sm md:text-base">Weiter mit {provider.name}</span>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Loading State Indicator - Mobile Optimized */}
      {loadingProvider && (
        <motion.div 
          className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p>Weiterleitung zu {socialProviders.find(p => p.id === loadingProvider)?.name}...</p>
          <p className="text-xs mt-1">
            Wenn sich das Fenster nicht öffnet, überprüfen Sie bitte Ihre Popup-Blocker-Einstellungen.
          </p>
        </motion.div>
      )}

      {/* Security Notice - Mobile Optimized */}
      <div className="mt-4 pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          <Icon name="Shield" size={14} className="md:w-4 md:h-4" />
          <span>Sichere OAuth-Authentifizierung</span>
        </div>
      </div>

      {/* Alternative Login Link */}
      <div className="text-center">
        <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
          {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            className="text-primary hover:text-primary-700 font-medium underline transition-colors duration-150"
            onClick={() => {
              // Navigate to appropriate page based on mode
              window.location.href = mode === 'signin' ? '/registration' : '/signin';
            }}
          >
            {mode === 'signin' ? 'Sign up here' : 'Sign in here'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SocialRegistration;
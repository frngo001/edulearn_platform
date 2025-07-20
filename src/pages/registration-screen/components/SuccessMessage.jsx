import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Icon from 'components/AppIcon';
import { AuthService } from '../../../lib/auth';

const SuccessMessage = ({ userEmail }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleResendVerification = async () => {
    if (!canResend || !userEmail) return;

    setIsResending(true);
    setResendMessage('');

    try {
      const { data, error } = await AuthService.resendVerificationEmail(userEmail);

      if (error) {
        setResendMessage('Failed to resend verification email. Please try again later.');
      } else {
        setResendMessage('Verification email sent successfully! Please check your inbox.');
        setCanResend(false);
        setResendCountdown(60); // 60 second cooldown
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setResendMessage('An error occurred. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-background to-primary-50 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Animation */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Icon name="Check" size={48} className="text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Willkommen bei EduLearn!
          </h1>
          
          <p className="text-text-secondary mb-6 font-body">
            Ihr Konto wurde erfolgreich erstellt. Wir haben eine Bestätigungs-E-Mail an Ihre E-Mail-Adresse gesendet.
          </p>
        </motion.div>

        {/* Email Verification Notice */}
        <motion.div 
          className="bg-surface rounded-lg border border-border p-6 mb-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={24} className="text-secondary" />
            </div>
          </div>
          
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            Überprüfen Sie Ihre E-Mails
          </h3>
          
          <p className="text-sm text-text-secondary mb-4">
            Wir haben einen Bestätigungslink an {userEmail || 'Ihre E-Mail-Adresse'} gesendet. 
            Bitte klicken Sie auf den Link, um Ihr Konto zu aktivieren und mit dem Lernen zu beginnen.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-text-tertiary mb-4">
            <Icon name="Clock" size={14} />
            <span>E-Mail nicht erhalten? Überprüfen Sie Ihren Spam-Ordner</span>
          </div>

          {/* Resend Button */}
          <button
            onClick={handleResendVerification}
            disabled={!canResend || isResending}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              canResend && !isResending
                ? 'bg-secondary-100 text-secondary hover:bg-secondary-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isResending ? (
              <div className="flex items-center justify-center">
                <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                Wird gesendet...
              </div>
            ) : canResend ? (
              'Bestätigungs-E-Mail erneut senden'
            ) : (
              `Erneut senden in ${resendCountdown}s`
            )}
          </button>

          {/* Resend Message */}
          {resendMessage && (
            <motion.div
              className={`mt-3 p-2 rounded text-xs ${
                resendMessage.includes('erfolgreich') || resendMessage.includes('successfully')
                  ? 'bg-success-50 text-success-700 border border-success-200'
                  : 'bg-error-50 text-error-700 border border-error-200'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {resendMessage}
            </motion.div>
          )}
        </motion.div>

        {/* Redirect Notice */}
        <motion.div 
          className="bg-primary-50 rounded-lg p-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-2 text-primary-700">
            <Icon name="ArrowRight" size={16} />
            <span className="text-sm font-medium">
              Weiterleitung zum Dashboard in {countdown} Sekunden...
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="space-y-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <button 
            onClick={handleGoToDashboard}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            Zum Dashboard gehen
          </button>
          
          <button 
            onClick={handleGoToSignIn}
            className="w-full bg-surface border border-border text-text-primary py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Zur Anmeldung zurückkehren
          </button>
        </motion.div>

        {/* Welcome Tips */}
        <motion.div 
          className="text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h4 className="font-heading font-semibold text-text-primary mb-3 text-center">
            Erste Schritte mit EduLearn
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="BookOpen" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Kurse erkunden</p>
                <p className="text-xs text-text-secondary">Durchsuchen Sie unsere umfangreiche Kursbibliothek</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="MessageSquare" size={12} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">KI-Assistent</p>
                <p className="text-xs text-text-secondary">Lassen Sie sich von unserem intelligenten Lernassistenten helfen</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="CreditCard" size={12} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Mit Karteikarten lernen</p>
                <p className="text-xs text-text-secondary">Erstellen und üben Sie mit interaktiven Karteikarten</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessMessage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Icon from 'components/AppIcon';
import { AuthService } from '../../../lib/auth';

const EmailVerificationPending = ({ userEmail, onVerificationComplete }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (checkCount < 20) { // Check for 2 minutes (20 checks * 6 seconds)
        setIsChecking(true);
        try {
          const { isVerified, user } = await AuthService.checkEmailVerification();
          if (isVerified && user) {
            onVerificationComplete?.(user);
            return;
          }
        } catch (error) {
          console.error('Error checking verification:', error);
        } finally {
          setIsChecking(false);
        }
        setCheckCount(prev => prev + 1);
      }
    }, 6000); // Check every 6 seconds

    return () => clearInterval(interval);
  }, [checkCount, onVerificationComplete]);

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
        setResendMessage('E-Mail konnte nicht erneut gesendet werden. Bitte versuchen Sie es später erneut.');
      } else {
        setResendMessage('Bestätigungs-E-Mail erfolgreich gesendet! Bitte überprüfen Sie Ihren Posteingang.');
        setCanResend(false);
        setResendCountdown(60); // 60 second cooldown
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setResendMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsResending(false);
    }
  };

  const handleManualCheck = async () => {
    setIsChecking(true);
    try {
      const { isVerified, user } = await AuthService.checkEmailVerification();
      if (isVerified && user) {
        onVerificationComplete?.(user);
      } else {
        setResendMessage('E-Mail ist noch nicht bestätigt. Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Bestätigungslink.');
      }
    } catch (error) {
      console.error('Error checking verification:', error);
      setResendMessage('Fehler beim Überprüfen der Bestätigung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-background to-primary-50 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Email Icon Animation */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <motion.div
              animate={{ 
                rotate: isChecking ? 360 : 0,
                scale: isChecking ? 1.1 : 1 
              }}
              transition={{ 
                duration: isChecking ? 1 : 0.3,
                repeat: isChecking ? Infinity : 0,
                ease: "linear"
              }}
            >
              <Icon name="Mail" size={48} className="text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">
            E-Mail-Bestätigung erforderlich
          </h1>
          
          <p className="text-text-secondary mb-6 font-body">
            Wir haben eine Bestätigungs-E-Mail an <strong>{userEmail}</strong> gesendet.
          </p>
        </motion.div>

        {/* Email Verification Instructions */}
        <motion.div 
          className="bg-surface rounded-lg border border-border p-6 mb-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="font-heading font-semibold text-text-primary mb-4">
            So bestätigen Sie Ihre E-Mail-Adresse:
          </h3>
          
          <div className="text-left space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">1</span>
              </div>
              <p className="text-sm text-text-secondary">Öffnen Sie Ihren E-Mail-Posteingang</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">2</span>
              </div>
              <p className="text-sm text-text-secondary">Suchen Sie nach einer E-Mail von EduLearn</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">3</span>
              </div>
              <p className="text-sm text-text-secondary">Klicken Sie auf den Bestätigungslink</p>
            </div>
          </div>

          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 text-warning-800">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">Wichtiger Hinweis</span>
            </div>
            <p className="text-xs text-warning-700 mt-1">
              Überprüfen Sie auch Ihren Spam-/Junk-Ordner, falls Sie die E-Mail nicht finden.
            </p>
          </div>

          {/* Auto-check Status */}
          {isChecking && (
            <div className="flex items-center justify-center space-x-2 text-secondary text-sm mb-4">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Überprüfe E-Mail-Bestätigung...</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleManualCheck}
              disabled={isChecking}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium disabled:opacity-50"
            >
              {isChecking ? 'Wird überprüft...' : 'Jetzt überprüfen'}
            </button>
            
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
                'E-Mail erneut senden'
              ) : (
                `Erneut senden in ${resendCountdown}s`
              )}
            </button>
          </div>

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

        {/* Alternative Actions */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <button 
            onClick={handleGoToSignIn}
            className="w-full bg-surface border border-border text-text-primary py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Zur Anmeldung zurückkehren
          </button>
          
          <p className="text-xs text-text-tertiary">
            Nach der Bestätigung können Sie sich mit Ihren Anmeldedaten anmelden.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPending; 
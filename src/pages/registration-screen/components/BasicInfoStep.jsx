import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { useNavigate } from 'react-router-dom';

const BasicInfoStep = ({ formData, errors, onSubmit, isLoading }) => {
  const [localData, setLocalData] = useState({
    fullName: formData.fullName || '',
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
    agreeToTerms: formData.agreeToTerms || false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localData);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: score * 20, label: 'Schwach', color: 'bg-red-500' };
    if (score <= 3) return { strength: score * 20, label: 'Mäßig', color: 'bg-yellow-500' };
    if (score <= 4) return { strength: score * 20, label: 'Gut', color: 'bg-blue-500' };
    return { strength: 100, label: 'Stark', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(localData.password);

  const requirements = [
    { met: localData.password.length >= 8, text: 'Mindestens 8 Zeichen' },
    { met: /[a-z]/.test(localData.password), text: 'Ein Kleinbuchstabe' },
    { met: /[A-Z]/.test(localData.password), text: 'Ein Großbuchstabe' },
    { met: /[0-9]/.test(localData.password), text: 'Eine Zahl' },
    { met: /[^A-Za-z0-9]/.test(localData.password), text: 'Ein Sonderzeichen' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Erstelle dein Konto
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Beginnen wir mit deinen grundlegenden Informationen
        </p>
      </div>

      {/* Full Name - Mobile Optimized */}
      <div>
        <label htmlFor="fullName" className="block text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
          Vollständiger Name *
        </label>
        <div className="relative">
          <Icon 
            name="User" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 md:w-5 md:h-5" 
          />
          <input
            type="text"
            id="fullName"
            value={localData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 md:py-3 text-sm md:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Gib deinen vollständigen Namen ein"
          />
        </div>
        {errors.fullName && (
          <p className="mt-2 text-xs md:text-sm text-red-600 dark:text-red-400 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1 md:w-4 md:h-4" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email - Mobile Optimized */}
      <div>
        <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
          E-Mail-Adresse *
        </label>
        <div className="relative">
          <Icon 
            name="Mail" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 md:w-5 md:h-5" 
          />
          <input
            type="email"
            id="email"
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 md:py-3 text-sm md:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="deine.email@beispiel.com"
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-xs md:text-sm text-red-600 dark:text-red-400 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1 md:w-4 md:h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password - Mobile Optimized */}
      <div>
        <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
          Passwort *
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 md:w-5 md:h-5" 
          />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={localData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 md:py-3 text-sm md:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Erstelle ein sicheres Passwort"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
        
        {/* Password Strength Indicator - Mobile Optimized */}
        {localData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Passwortstärke</span>
              <span className={`text-xs md:text-sm font-medium ${
                passwordStrength.strength <= 40 ? 'text-red-600' :
                passwordStrength.strength <= 60 ? 'text-yellow-600' :
                passwordStrength.strength <= 80 ? 'text-blue-600' : 'text-green-600'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              />
            </div>
          </div>
        )}

        {/* Password Requirements - Mobile Optimized */}
        {localData.password && (
          <div className="mt-3 space-y-1">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center text-xs md:text-sm">
                <Icon 
                  name={req.met ? 'Check' : 'X'} 
                  size={12} 
                  className={`mr-2 md:w-3 md:h-3 ${req.met ? 'text-green-600' : 'text-gray-400 dark:text-gray-500'}`}
                />
                <span className={req.met ? 'text-green-600' : 'text-gray-400 dark:text-gray-500'}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {errors.password && (
          <p className="mt-2 text-xs md:text-sm text-red-600 dark:text-red-400 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1 md:w-4 md:h-4" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password - Mobile Optimized */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
          Passwort bestätigen *
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 md:w-5 md:h-5" 
          />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={localData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 md:py-3 text-sm md:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Gib dein Passwort erneut ein"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-xs md:text-sm text-red-600 dark:text-red-400 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1 md:w-4 md:h-4" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Terms Agreement - Mobile Optimized */}
      <div className="flex items-start space-x-2 md:space-x-3">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={localData.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
          className="mt-0.5 h-4 w-4 md:h-5 md:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="agreeToTerms" className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Ich stimme den{' '}
          <button
            type="button"
            onClick={() => navigate('/terms-of-service')}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
          >
            Nutzungsbedingungen
          </button>
          {' '}und der{' '}
          <button
            type="button"
            onClick={() => navigate('/privacy-policy')}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
          >
            Datenschutzerklärung
          </button>
          {' '}zu
        </label>
      </div>

      {/* Submit Button - Mobile Optimized */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 md:py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm md:text-base transform hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Konto wird erstellt...</span>
          </>
        ) : (
          <>
            <span>Weiter</span>
            <Icon name="ArrowRight" size={16} className="md:w-5 md:h-5" />
          </>
        )}
      </button>

      {/* Sign In Link - Mobile Optimized */}
      <div className="text-center pt-4">
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Bereits ein Konto?{' '}
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Jetzt anmelden
          </button>
        </p>
      </div>
    </form>
  );
};

export default BasicInfoStep;
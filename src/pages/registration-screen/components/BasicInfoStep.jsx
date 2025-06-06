import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BasicInfoStep = ({ formData, errors, onSubmit, isLoading }) => {
  const [localData, setLocalData] = useState({
    fullName: formData.fullName || '',
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (score <= 2) return { strength: score * 20, label: 'Weak', color: 'bg-error' };
    if (score <= 3) return { strength: score * 20, label: 'Fair', color: 'bg-warning' };
    if (score <= 4) return { strength: score * 20, label: 'Good', color: 'bg-secondary' };
    return { strength: 100, label: 'Strong', color: 'bg-success' };
  };

  const passwordStrength = getPasswordStrength(localData.password);

  const requirements = [
    { met: localData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[a-z]/.test(localData.password), text: 'One lowercase letter' },
    { met: /[A-Z]/.test(localData.password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(localData.password), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(localData.password), text: 'One special character' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Create Your Account
        </h2>
        <p className="text-text-secondary font-body">
          Let's start with your basic information
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name *
        </label>
        <div className="relative">
          <Icon 
            name="User" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
          <input
            type="text"
            id="fullName"
            value={localData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.fullName ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Icon 
            name="Mail" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
          <input
            type="email"
            id="email"
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.email ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password *
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={localData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.password ? 'border-error' : 'border-border'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {localData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-secondary">Password strength</span>
              <span className={`text-xs font-medium ${
                passwordStrength.strength <= 40 ? 'text-error' :
                passwordStrength.strength <= 60 ? 'text-warning' :
                passwordStrength.strength <= 80 ? 'text-secondary' : 'text-success'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              />
            </div>
          </div>
        )}

        {/* Password Requirements */}
        {localData.password && (
          <div className="mt-3 space-y-1">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center text-xs">
                <Icon 
                  name={req.met ? 'Check' : 'X'} 
                  size={12} 
                  className={`mr-2 ${req.met ? 'text-success' : 'text-text-tertiary'}`}
                />
                <span className={req.met ? 'text-success' : 'text-text-tertiary'}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={localData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 ${
              errors.confirmPassword ? 'border-error' : 'border-border'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin mr-2" />
            Creating Account...
          </>
        ) : (
          <>
            Continue
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </>
        )}
      </button>
    </form>
  );
};

export default BasicInfoStep;
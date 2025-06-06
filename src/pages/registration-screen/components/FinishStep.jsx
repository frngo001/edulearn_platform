import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FinishStep = ({ formData, errors, onSubmit, onBack, isLoading }) => {
  const [localData, setLocalData] = useState({
    acceptTerms: formData.acceptTerms || false,
    emailNotifications: formData.emailNotifications !== undefined ? formData.emailNotifications : true,
    marketingEmails: formData.marketingEmails || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localData);
  };

  const getSelectedSubjects = () => {
    const subjectLabels = {
      'programming': 'Programming & Development',
      'design': 'Design & Creative',
      'business': 'Business & Marketing',
      'science': 'Science & Technology',
      'language': 'Languages',
      'mathematics': 'Mathematics',
      'arts': 'Arts & Humanities',
      'health': 'Health & Wellness'
    };
    
    return formData.subjects?.map(id => subjectLabels[id]) || [];
  };

  const getExperienceLabel = () => {
    const labels = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return labels[formData.experienceLevel] || '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Almost Done!
        </h2>
        <p className="text-text-secondary font-body">
          Review your information and complete your registration
        </p>
      </div>

      {/* Registration Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <h3 className="font-medium text-text-primary mb-3">Registration Summary</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="User" size={16} className="text-text-tertiary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-text-primary">{formData.fullName}</div>
              <div className="text-xs text-text-secondary">{formData.email}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="BookOpen" size={16} className="text-text-tertiary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-text-primary">Interests</div>
              <div className="text-xs text-text-secondary">
                {getSelectedSubjects().join(', ')}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="TrendingUp" size={16} className="text-text-tertiary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-text-primary">Experience Level</div>
              <div className="text-xs text-text-secondary">{getExperienceLabel()}</div>
            </div>
          </div>

          {formData.learningGoals && (
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={16} className="text-text-tertiary mt-0.5" />
              <div>
                <div className="text-sm font-medium text-text-primary">Learning Goals</div>
                <div className="text-xs text-text-secondary line-clamp-2">
                  {formData.learningGoals}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <button
            type="button"
            onClick={() => setLocalData(prev => ({ ...prev, acceptTerms: !prev.acceptTerms }))}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
              localData.acceptTerms
                ? 'bg-primary border-primary' :'border-gray-300 hover:border-primary'
            }`}
          >
            {localData.acceptTerms && (
              <Icon name="Check" size={12} className="text-white" />
            )}
          </button>
          <div className="flex-1">
            <label className="text-sm text-text-primary cursor-pointer">
              I agree to the{' '}
              <button type="button" className="text-primary hover:text-primary-700 underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </button>{' '}
              *
            </label>
          </div>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.acceptTerms}
          </p>
        )}
      </div>

      {/* Email Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Email Preferences</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm font-medium text-text-primary">
                Course notifications
              </label>
              <p className="text-xs text-text-secondary">
                Get notified about course updates, assignments, and deadlines
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLocalData(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                localData.emailNotifications ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  localData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm font-medium text-text-primary">
                Marketing emails
              </label>
              <p className="text-xs text-text-secondary">
                Receive updates about new courses, features, and special offers
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLocalData(prev => ({ ...prev, marketingEmails: !prev.marketingEmails }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                localData.marketingEmails ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  localData.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-surface border border-border text-text-primary py-3 px-6 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <Icon name="Check" size={20} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default FinishStep;
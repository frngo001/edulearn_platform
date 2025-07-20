import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PreferencesStep = ({ formData, errors, onSubmit, onBack, isLoading }) => {
  const [localData, setLocalData] = useState({
    subjects: formData.subjects || [],
    experienceLevel: formData.experienceLevel || '',
    learningGoals: formData.learningGoals || ''
  });

  const subjects = [
    { id: 'programming', label: 'Programming & Development', icon: 'Code' },
    { id: 'design', label: 'Design & Creative', icon: 'Palette' },
    { id: 'business', label: 'Business & Marketing', icon: 'Briefcase' },
    { id: 'science', label: 'Science & Technology', icon: 'Atom' },
    { id: 'language', label: 'Languages', icon: 'Globe' },
    { id: 'mathematics', label: 'Mathematics', icon: 'Calculator' },
    { id: 'arts', label: 'Arts & Humanities', icon: 'Paintbrush' },
    { id: 'health', label: 'Health & Wellness', icon: 'Heart' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to learning online' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience with online courses' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced online learner' },
    { value: 'expert', label: 'Expert', description: 'Looking for specialized content' }
  ];

  const handleSubjectToggle = (subjectId) => {
    setLocalData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(id => id !== subjectId)
        : [...prev.subjects, subjectId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-2">
          Learning Preferences
        </h2>
        <p className="text-text-secondary dark:text-dark-text-secondary font-body">
          Help us personalize your learning experience
        </p>
      </div>

      {/* Subjects of Interest */}
      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-3">
          What subjects interest you? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              type="button"
              onClick={() => handleSubjectToggle(subject.id)}
              className={`p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-md ${
                localData.subjects.includes(subject.id)
                  ? 'border-primary bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={subject.icon} 
                  size={20} 
                  className={localData.subjects.includes(subject.id) ? 'text-primary' : 'text-text-tertiary dark:text-dark-text-tertiary'}
                />
                <span className="font-medium text-sm">{subject.label}</span>
                {localData.subjects.includes(subject.id) && (
                  <Icon name="Check" size={16} className="text-primary ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.subjects && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.subjects}
          </p>
        )}
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-3">
          What's your experience level? *
        </label>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setLocalData(prev => ({ ...prev, experienceLevel: level.value }))}
              className={`w-full p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-md ${
                localData.experienceLevel === level.value
                  ? 'border-primary bg-primary-50 dark:bg-primary-900/20'
                  : 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${
                    localData.experienceLevel === level.value ? 'text-primary-700 dark:text-primary-400' : 'text-text-primary dark:text-dark-text-primary'
                  }`}>
                    {level.label}
                  </div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                    {level.description}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  localData.experienceLevel === level.value
                    ? 'border-primary bg-primary'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {localData.experienceLevel === level.value && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.experienceLevel && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.experienceLevel}
          </p>
        )}
      </div>

      {/* Learning Goals */}
      <div>
        <label htmlFor="learningGoals" className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
          What are your learning goals? (Optional)
        </label>
        <textarea
          id="learningGoals"
          value={localData.learningGoals}
          onChange={(e) => setLocalData(prev => ({ ...prev, learningGoals: e.target.value }))}
          rows={4}
          className="w-full px-4 py-3 border border-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 resize-none bg-white dark:bg-dark-background text-text-primary dark:text-dark-text-primary"
          placeholder="Tell us about your learning objectives, career goals, or specific skills you want to develop..."
        />
        <div className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
          {localData.learningGoals.length}/500 characters
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center"
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
              Saving...
            </>
          ) : (
            <>
              Continue
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PreferencesStep;
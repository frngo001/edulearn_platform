import React, { useState } from 'react';

import BasicInfoStep from './BasicInfoStep';
import PreferencesStep from './PreferencesStep';
import FinishStep from './FinishStep';

const RegistrationForm = ({ currentStep, formData, onStepComplete, onStepBack }) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = (stepData) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!stepData.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!stepData.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(stepData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!stepData.password) {
        newErrors.password = 'Password is required';
      } else if (stepData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (stepData.password !== stepData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (currentStep === 2) {
      if (!stepData.subjects?.length) {
        newErrors.subjects = 'Please select at least one subject';
      }
      if (!stepData.experienceLevel) {
        newErrors.experienceLevel = 'Please select your experience level';
      }
    } else if (currentStep === 3) {
      if (!stepData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (stepData) => {
    const validationErrors = validateStep(stepData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      onStepComplete(stepData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            errors={errors}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <PreferencesStep
            formData={formData}
            errors={errors}
            onSubmit={handleSubmit}
            onBack={onStepBack}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <FinishStep
            formData={formData}
            errors={errors}
            onSubmit={handleSubmit}
            onBack={onStepBack}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default RegistrationForm;
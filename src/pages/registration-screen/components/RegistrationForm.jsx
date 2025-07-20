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
        newErrors.fullName = 'Vollständiger Name ist erforderlich';
      }
      if (!stepData.email?.trim()) {
        newErrors.email = 'E-Mail-Adresse ist erforderlich';
      } else if (!/\S+@\S+\.\S+/.test(stepData.email)) {
        newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      }
      if (!stepData.password) {
        newErrors.password = 'Passwort ist erforderlich';
      } else if (stepData.password.length < 8) {
        newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
      }
      if (stepData.password !== stepData.confirmPassword) {
        newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
      }
    } else if (currentStep === 2) {
      if (!stepData.subjects?.length) {
        newErrors.subjects = 'Bitte wählen Sie mindestens ein Fach aus';
      }
      if (!stepData.experienceLevel) {
        newErrors.experienceLevel = 'Bitte wählen Sie Ihr Erfahrungslevel aus';
      }
    } else if (currentStep === 3) {
      if (!stepData.acceptTerms) {
        newErrors.acceptTerms = 'Sie müssen die Nutzungsbedingungen akzeptieren';
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
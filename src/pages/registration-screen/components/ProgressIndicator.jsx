import React from 'react';
import Icon from 'components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Basic Info', icon: 'User' },
    { number: 2, title: 'Preferences', icon: 'Settings' },
    { number: 3, title: 'Finish', icon: 'Check' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  step.number < currentStep
                    ? 'bg-success text-white'
                    : step.number === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-text-tertiary dark:text-dark-text-tertiary'
                }`}
              >
                {step.number < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span
                className={`text-xs mt-2 font-caption ${
                  step.number <= currentStep
                    ? 'text-text-primary dark:text-dark-text-primary font-medium'
                    : 'text-text-tertiary dark:text-dark-text-tertiary'
                }`}
              >
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-0.5 transition-all duration-200 ${
                    step.number < currentStep
                      ? 'bg-success'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
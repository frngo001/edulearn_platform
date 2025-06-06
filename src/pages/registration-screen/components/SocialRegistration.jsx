import React from 'react';
import Icon from 'components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-50 hover:border-red-200 hover:text-red-600'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-tertiary font-caption">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Registration Buttons */}
      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSocialRegister(provider.id)}
            className={`w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-surface text-text-secondary transition-all duration-200 font-medium ${provider.color}`}
          >
            <Icon name={provider.icon} size={20} className="mr-3" />
            Continue with {provider.name}
          </button>
        ))}
      </div>

      {/* Alternative Login Link */}
      <div className="text-center">
        <p className="text-sm text-text-tertiary">
          Already have an account?{' '}
          <button className="text-primary hover:text-primary-700 font-medium underline">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;
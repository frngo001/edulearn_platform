import React from 'react';
import { motion } from 'framer-motion';
import AuthToggle from './AuthToggle';

const AuthToggleDemo = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-heading font-bold text-text-primary dark:text-dark-text-primary mb-4">
            AuthToggle Component Variants
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Explore different designs for authentication prompts
          </p>
        </motion.div>

        {/* Header Variants */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Header Variants
          </h2>
          
          <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-6">
            <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
              Sign In Page Header
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
                  <span className="font-semibold">EduLearn</span>
                </div>
                <AuthToggle mode="signin" variant="header" />
              </div>
            </div>
          </div>

          <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-6">
            <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
              Registration Page Header
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
                  <span className="font-semibold">EduLearn</span>
                </div>
                <AuthToggle mode="signup" variant="header" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Variants */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Card Variants
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                Sign In Page Card
              </h3>
              <AuthToggle mode="signin" variant="card" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                Registration Page Card
              </h3>
              <AuthToggle mode="signup" variant="card" />
            </div>
          </div>
        </div>

        {/* Inline Variants */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Inline Variants
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-6">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
                Sign In Page Inline
              </h3>
              <AuthToggle mode="signin" variant="inline" />
            </div>
            
            <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-6">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
                Registration Page Inline
              </h3>
              <AuthToggle mode="signup" variant="inline" />
            </div>
          </div>
        </div>

        {/* Custom Text Examples */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Custom Text Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                Custom Sign In Prompt
              </h3>
              <AuthToggle 
                mode="signin" 
                variant="card" 
                customText="New to EduLearn?"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                Custom Registration Prompt
              </h3>
              <AuthToggle 
                mode="signup" 
                variant="card" 
                customText="Ready to continue learning?"
              />
            </div>
          </div>
        </div>

        {/* Without Icons */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Without Icons
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                Sign In Card (No Icon)
              </h3>
              <AuthToggle 
                mode="signin" 
                variant="card" 
                showIcon={false}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                Registration Card (No Icon)
              </h3>
              <AuthToggle 
                mode="signup" 
                variant="card" 
                showIcon={false}
              />
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border p-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary dark:text-dark-text-primary mb-4">
            Usage Instructions
          </h2>
          <div className="prose prose-sm max-w-none">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-text-secondary dark:text-dark-text-secondary overflow-x-auto">
{`// Header variant (minimal)
<AuthToggle mode="signin" variant="header" />

// Card variant (enhanced with background and icon)
<AuthToggle mode="signup" variant="card" />

// Inline variant (stylized text with visual hierarchy)
<AuthToggle mode="signin" variant="inline" />

// Custom text
<AuthToggle 
  mode="signin" 
  variant="card" 
  customText="New to our platform?"
/>

// Without icon
<AuthToggle 
  mode="signup" 
  variant="card" 
  showIcon={false}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthToggleDemo; 
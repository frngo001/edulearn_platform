import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Icon from 'components/AppIcon';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support.

      Personal Information:
      • Name and contact information (email address, phone number)
      • Account credentials (username, password)
      • Profile information (bio, interests, learning goals)
      • Payment information (processed securely through third-party providers)
      • Course progress and completion data
      • Communications with our support team

      Automatically Collected Information:
      • Device information (IP address, browser type, operating system)
      • Usage data (pages visited, time spent, click patterns)
      • Cookies and similar tracking technologies
      • Log data (access times, error messages)`
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

      • Provide, maintain, and improve our services
      • Process transactions and send related information
      • Send you technical notices, updates, security alerts, and support messages
      • Respond to your comments, questions, and customer service requests
      • Communicate with you about courses, features, surveys, news, updates, and events
      • Monitor and analyze trends, usage, and activities in connection with our services
      • Personalize your learning experience and recommend relevant content
      • Detect, investigate, and prevent fraudulent transactions and other illegal activities
      • Comply with legal obligations and protect our rights and interests`
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

      With Your Consent: We may share your information when you give us explicit consent to do so.

      Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as:
      • Payment processing
      • Email delivery
      • Data analytics
      • Customer support
      • Cloud storage and hosting

      Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.

      Business Transfers: If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.

      Protection of Rights: We may disclose your information to protect the rights, property, or safety of EduLearn, our users, or others.`
    },
    {
      title: "4. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

      • Encryption of data in transit and at rest
      • Regular security assessments and audits
      • Access controls and authentication mechanisms
      • Employee training on data protection and privacy
      • Incident response procedures

      However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.`
    },
    {
      title: "5. Data Retention",
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

      Specifically:
      • Account information: Retained while your account is active and for a reasonable period thereafter
      • Course data: Retained to provide certificates and track learning progress
      • Communication records: Retained for customer service and legal compliance purposes
      • Usage data: May be retained in aggregated and anonymized form for analytics

      You may request deletion of your account and associated data at any time, subject to legal retention requirements.`
    },
    {
      title: "6. Your Rights and Choices",
      content: `Depending on your location, you may have certain rights regarding your personal information:

      Access: You can request access to the personal information we hold about you.

      Correction: You can request that we correct inaccurate or incomplete information.

      Deletion: You can request that we delete your personal information, subject to certain exceptions.

      Portability: You can request a copy of your personal information in a structured, machine-readable format.

      Objection: You can object to our processing of your personal information in certain circumstances.

      Restriction: You can request that we restrict the processing of your personal information.

      To exercise these rights, please contact us using the information provided in the "Contact Us" section.`
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to collect and use personal information about you. Cookies are small data files stored on your device that help us improve our services and your experience.

      Types of cookies we use:
      • Essential cookies: Necessary for the website to function properly
      • Analytics cookies: Help us understand how visitors interact with our website
      • Functional cookies: Remember your preferences and settings
      • Marketing cookies: Used to deliver relevant advertisements

      You can control cookie settings through your browser, but disabling certain cookies may affect the functionality of our services.`
    },
    {
      title: "8. Third-Party Links and Services",
      content: `Our service may contain links to third-party websites, applications, or services that are not owned or controlled by EduLearn. This Privacy Policy does not apply to these third-party services.

      We encourage you to review the privacy policies of any third-party services you visit or use. We are not responsible for the privacy practices or content of these third-party services.`
    },
    {
      title: "9. Children's Privacy",
      content: `EduLearn is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so we can delete such information.

      For users between 13 and 18 years of age, we recommend that a parent or guardian review this Privacy Policy and our Terms of Service before the minor uses our services.`
    },
    {
      title: "10. International Data Transfers",
      content: `Your information, including personal information, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.

      If you are located outside our primary operating jurisdiction and choose to provide information to us, please note that we may transfer the information to our jurisdiction and process it there.

      We will take appropriate steps to ensure that your personal information receives an adequate level of protection in the jurisdictions in which we process it.`
    },
    {
      title: "11. California Privacy Rights",
      content: `If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):

      • The right to know what personal information is collected, used, shared, or sold
      • The right to delete personal information held by businesses
      • The right to opt-out of the sale of personal information
      • The right to non-discrimination for exercising CCPA rights

      We do not sell personal information as defined by the CCPA. To exercise your California privacy rights, please contact us using the information provided below.`
    },
    {
      title: "12. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time. When we make changes, we will notify you by:

      • Posting the updated Privacy Policy on this page
      • Updating the "Last updated" date at the top of this Privacy Policy
      • Sending you an email notification for material changes
      • Displaying a prominent notice on our website

      We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.`
    },
    {
      title: "13. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

      Email: privacy@edulearn.com
      Phone: +1 (555) 123-4567
      Mail: EduLearn Privacy Team
      [Your Company Address]

      Data Protection Officer: dpo@edulearn.com

      We will respond to your inquiry within a reasonable timeframe, typically within 30 days.`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation - Mobile Optimized */}
      <nav className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Go back"
              >
                <Icon name="ArrowLeft" size={18} className="text-gray-600 dark:text-gray-400 md:w-5 md:h-5" />
              </button>
              <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon name="Brain" size={16} className="text-white md:w-5 md:h-5" />
                </div>
                <span className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">EduLearn</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-6">
              <Link
                to="/terms-of-service"
                className="hidden sm:block text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Nutzungsbedingungen
              </Link>
              <Link
                to="/signin"
                className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm md:text-base rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Anmelden
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header - Mobile Optimized */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
              Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 md:p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0 md:w-6 md:h-6" />
                <div className="text-left">
                  <h3 className="text-sm md:text-base font-semibold text-green-900 dark:text-green-300 mb-2">
                    Ihr Datenschutz ist wichtig
                  </h3>
                  <p className="text-sm md:text-base text-green-800 dark:text-green-400 leading-relaxed">
                    Wir verpflichten uns, Ihre Privatsphäre zu schützen und transparent darüber zu sein, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents - Mobile Optimized */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8 mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Inhaltsverzeichnis
            </h2>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.getElementById(`section-${index}`);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Sections - Mobile Optimized */}
          <div className="space-y-6 md:space-y-12">
            {sections.map((section, index) => (
              <div 
                key={index}
                id={`section-${index}`}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                  {section.title}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section - Mobile Optimized */}
          <div className="mt-12 md:mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 md:p-8 text-center text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Fragen zum Datenschutz?
            </h2>
            <p className="text-sm md:text-base text-green-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              Haben Sie Fragen dazu, wie wir mit Ihren Daten umgehen? Unser Datenschutz-Team hilft Ihnen gerne und stellt sicher, dass Ihre Daten geschützt sind.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 items-center justify-center">
              <a
                href="mailto:privacy@edulearn.com"
                className="w-full sm:w-auto px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={16} />
                <span className="text-sm md:text-base">privacy@edulearn.com</span>
              </a>
              <a
                href="tel:+15551234567"
                className="w-full sm:w-auto px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base"
              >
                <Icon name="Phone" size={16} />
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </div>

          {/* Footer - Mobile Optimized */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            <p className="mb-4 text-sm md:text-base">
              © 2024 EduLearn. All rights reserved.
            </p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 items-center justify-center text-xs md:text-sm">
              <Link to="/terms-of-service" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Nutzungsbedingungen
              </Link>
              <Link to="/signin" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Anmelden
              </Link>
              <Link to="/registration" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Registrieren
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 
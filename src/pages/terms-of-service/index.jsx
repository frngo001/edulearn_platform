import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Icon from 'components/AppIcon';

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Annahme der Nutzungsbedingungen",
      content: `Durch den Zugang zu und die Nutzung von EduLearn ("die Plattform") akzeptieren Sie die Bedingungen und Bestimmungen dieser Vereinbarung und erklären sich damit einverstanden, an diese gebunden zu sein. Wenn Sie nicht bereit sind, die oben genannten Bedingungen einzuhalten, nutzen Sie diesen Service bitte nicht.`
    },
    {
      title: "2. Beschreibung des Services",
      content: `EduLearn ist eine Bildungsplattform, die Online-Kurse, Lernmaterialien und Bildungsinhalte bereitstellt. Wir behalten uns das Recht vor, den Service jederzeit ohne Vorankündigung zu ändern, auszusetzen oder einzustellen.`
    },
    {
      title: "3. Benutzerkonten",
      content: `Sie sind dafür verantwortlich, die Vertraulichkeit Ihres Kontos und Passworts zu wahren. Sie erklären sich damit einverstanden, die Verantwortung für alle Aktivitäten zu übernehmen, die unter Ihrem Konto stattfinden. Sie müssen uns unverzüglich über jede unbefugte Nutzung Ihres Kontos informieren.`
    },
    {
      title: "4. User Conduct",
      content: `You agree not to use the service to:
      • Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable
      • Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity
      • Upload, post, or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights
      • Upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, or spam
      • Interfere with or disrupt the service or servers or networks connected to the service`
    },
    {
      title: "5. Content and Intellectual Property",
      content: `All content provided on EduLearn, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of EduLearn or its content suppliers and is protected by copyright and other intellectual property laws.

      You retain ownership of any content you upload to the platform, but by uploading content, you grant EduLearn a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute such content.`
    },
    {
      title: "6. Course Access and Completion",
      content: `Course access is granted for the duration specified in your enrollment. Upon successful completion of a course, you may receive a certificate of completion. These certificates are issued by EduLearn and may not be recognized by all institutions or employers.`
    },
    {
      title: "7. Payment and Refunds",
      content: `Payment for courses must be made in advance. All fees are non-refundable except as required by law or as specifically stated in our refund policy. We reserve the right to change course prices at any time.`
    },
    {
      title: "8. Privacy Policy",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using EduLearn, you agree to the collection and use of information in accordance with our Privacy Policy.`
    },
    {
      title: "9. Disclaimers",
      content: `The information on this platform is provided on an "as is" basis. To the fullest extent permitted by law, EduLearn excludes all representations, warranties, conditions, and terms whether express or implied, statutory or otherwise.

      EduLearn does not warrant that the service will be uninterrupted or error-free, that defects will be corrected, or that the service or server is free of viruses or other harmful components.`
    },
    {
      title: "10. Limitation of Liability",
      content: `In no event shall EduLearn, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.`
    },
    {
      title: "11. Indemnification",
      content: `You agree to defend, indemnify, and hold harmless EduLearn and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).`
    },
    {
      title: "12. Termination",
      content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.

      Upon termination, your right to use the service will cease immediately. If you wish to terminate your account, you may simply discontinue using the service.`
    },
    {
      title: "13. Governing Law",
      content: `These Terms shall be interpreted and governed by the laws of the jurisdiction in which EduLearn operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`
    },
    {
      title: "14. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.`
    },
    {
      title: "15. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at:
      Email: legal@edulearn.com
      Address: EduLearn Legal Department
      [Your Company Address]`
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
                to="/privacy-policy"
                className="hidden sm:block text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Datenschutzerklärung
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
              Nutzungsbedingungen
            </h1>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
              Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 md:p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 md:w-6 md:h-6" />
                <div className="text-left">
                  <h3 className="text-sm md:text-base font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Wichtiger Hinweis
                  </h3>
                  <p className="text-sm md:text-base text-blue-800 dark:text-blue-400 leading-relaxed">
                    Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, bevor Sie EduLearn verwenden. 
                    Durch die Nutzung unserer Plattform stimmen Sie zu, an diese Bedingungen gebunden zu sein.
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
                  className="text-left text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Sections - Mobile Optimized */}
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
          <div className="mt-12 md:mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-center text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Fragen zu unseren Nutzungsbedingungen?
            </h2>
            <p className="text-sm md:text-base text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              Falls Sie Fragen zu diesen Nutzungsbedingungen haben, zögern Sie bitte nicht, unser Rechtsteam zu kontaktieren.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 items-center justify-center">
              <a
                href="mailto:legal@edulearn.com"
                className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={16} />
                <span className="text-sm md:text-base">legal@edulearn.com</span>
              </a>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 text-sm md:text-base"
              >
                Zurück zur Startseite
              </Link>
            </div>
          </div>

          {/* Footer - Mobile Optimized */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            <p className="mb-4 text-sm md:text-base">
              © 2024 EduLearn. All rights reserved.
            </p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 items-center justify-center text-xs md:text-sm">
              <Link to="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Datenschutzerklärung
              </Link>
              <Link to="/signin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Anmelden
              </Link>
              <Link to="/registration" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Registrieren
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService; 
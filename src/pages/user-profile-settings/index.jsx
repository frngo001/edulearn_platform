import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ContextualHeader from 'components/ui/ContextualHeader';

import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';
import { useTheme } from 'lib/ThemeContext';
import { UserProfileAPI } from 'lib/api';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMobileTabs, setShowMobileTabs] = useState(false);

  // Modals
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  const [profileData, setProfileData] = useState({
    // Personal Info
    fullName: 'Franc Schlaumeier',
    username: 'francschlaumeier',
    email: 'felcngongangfanang56@gmail.com',
    bio: 'Leidenschaftlicher Lerner, der neue Technologien erkundet und täglich sein Wissen erweitert.',
    avatarUrl: '',
    phone: '+49 123 456 7890',
    dateOfBirth: '1995-06-15',
    location: 'Berlin, Deutschland',
    timezone: 'Europe/Berlin',
    occupation: 'Software-Entwickler',
    
    // Study Preferences
    studyPreferences: {
      dailyGoalMinutes: 60,
      weeklyGoalDays: 5,
      preferredStudyTime: 'morning',
      difficulty: 'intermediate',
      studyReminders: true,
      pauseBetweenSessions: 15,
      sessionLength: 25,
      backgroundColor: 'default',
      soundEffects: true,
      studyMusic: false
    },

    // Learning Stats
    stats: {
      totalStudyTime: 2340, // minutes
      coursesCompleted: 12,
      currentStreak: 15,
      longestStreak: 42,
      averageSessionTime: 35,
      favoriteSubject: 'React Development',
      totalAchievements: 8,
      xpPoints: 15420
    },

    // Achievements
    achievements: [
      { id: 1, name: '7-Tage-Serie', description: 'Lerne 7 aufeinanderfolgende Tage', earned: true, date: '2024-01-15' },
      { id: 2, name: 'Frühaufsteher', description: 'Absolviere 10 Morgenlern-Sitzungen', earned: true, date: '2024-01-20' },
      { id: 3, name: 'Kurs-Meister', description: 'Schließe 10 Kurse ab', earned: true, date: '2024-01-25' },
      { id: 4, name: 'Lernkarten-Guru', description: 'Erstelle 100 Lernkarten', earned: false },
      { id: 5, name: 'Nachteule', description: 'Absolviere 10 späte Abend-Sitzungen', earned: false },
      { id: 6, name: 'Schnell-Lerner', description: 'Schließe einen Kurs in unter 24 Stunden ab', earned: false }
    ],

    // Notifications
    notifications: {
      email: {
        studyReminders: true,
        courseUpdates: true,
        achievementUnlocks: true,
        weeklyProgress: true,
        marketing: false,
        tips: true
      },
      push: {
        studyReminders: true,
        breakReminders: false,
        achievements: true,
        messages: true,
        courses: false
      },
      inApp: {
        sounds: true,
        animations: true,
        popups: true,
        badges: true
      }
    },

    // Privacy & Security
    privacy: {
      profileVisibility: 'friends',
      showStats: true,
      showProgress: true,
      allowMessages: 'friends',
      twoFactorEnabled: false,
      loginAlerts: true,
      dataCollection: 'essential'
    },

    // Accessibility
    accessibility: {
      fontSize: 'medium',
      highContrast: false,
      reduceMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      colorBlindSupport: false,
      focusIndicators: true
    },

    // Social Links
    socialLinks: {
      website: '',
      linkedin: '',
      github: '',
      twitter: '',
      youtube: '',
      instagram: ''
    },

    // Advanced Settings
    advanced: {
      language: 'de',
      region: 'DE',
      currency: 'EUR',
      dateFormat: 'DD.MM.YYYY',
      timeFormat: '24h',
      autoSave: true,
      offlineMode: true,
      analyticsOptOut: false
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: 'User', color: 'primary', description: 'Persönliche Informationen' },
    { id: 'study', label: 'Lernen', icon: 'BookOpen', color: 'green', description: 'Lerneinstellungen' },
    { id: 'achievements', label: 'Erfolge', icon: 'Award', color: 'yellow', description: 'Errungenschaften' },
    { id: 'notifications', label: 'Benachrichtigungen', icon: 'Bell', color: 'purple', description: 'Mitteilungseinstellungen' },
    { id: 'privacy', label: 'Datenschutz', icon: 'Shield', color: 'red', description: 'Sicherheit & Privatsphäre' },
    { id: 'accessibility', label: 'Barrierefreiheit', icon: 'Eye', color: 'indigo', description: 'Zugänglichkeitsoptionen' },
    { id: 'advanced', label: 'Erweitert', icon: 'Settings', color: 'gray', description: 'Erweiterte Einstellungen' }
  ];

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuccessMessage('Einstellungen erfolgreich gespeichert!');
      setHasChanges(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Fehler beim Speichern der Einstellungen. Bitte versuche es erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  const exportData = (format) => {
    const dataToExport = {
      profile: profileData,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    if (format === 'json') {
      const dataStr = JSON.stringify(dataToExport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `edulearn-profil-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
    setShowExportModal(false);
  };

  // Close mobile tabs when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileTabs && !event.target.closest('.mobile-tabs-container')) {
        setShowMobileTabs(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileTabs]);

  // Profile Tab Component
  const ProfileTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
              <Icon name="User" size={40} className="text-white" />
            </div>
            <motion.button 
              onClick={() => setShowAvatarModal(true)}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-primary rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon name="Camera" size={18} />
            </motion.button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black mb-2">{profileData.fullName}</h2>
            <p className="text-white/80 mb-4 text-lg font-medium">@{profileData.username}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-white/80">
              <span className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>{profileData.location}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Icon name="Briefcase" size={16} />
                <span>{profileData.occupation}</span>
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black">{profileData.stats.xpPoints.toLocaleString()}</div>
            <div className="text-white/80 text-sm font-medium">XP Punkte</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Persönliche Informationen</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Verwalte deine Grunddaten</p>
          </div>
          <Icon name="User" size={24} className="text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Vollständiger Name
            </label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleInputChange('', 'fullName', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Benutzername
            </label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => handleInputChange('', 'username', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('', 'email', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Telefonnummer
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('', 'phone', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Standort
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleInputChange('', 'location', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Beruf
            </label>
            <input
              type="text"
              value={profileData.occupation}
              onChange={(e) => handleInputChange('', 'occupation', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Geburtsdatum
            </label>
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => handleInputChange('', 'dateOfBirth', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Zeitzone
            </label>
            <select
              value={profileData.timezone}
              onChange={(e) => handleInputChange('', 'timezone', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            >
              <option value="Europe/Berlin">Europa/Berlin</option>
              <option value="Europe/London">Europa/London</option>
              <option value="America/New_York">Amerika/New York</option>
              <option value="America/Los_Angeles">Amerika/Los Angeles</option>
              <option value="Asia/Tokyo">Asien/Tokyo</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            Über mich
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('', 'bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-medium"
            placeholder="Erzähle uns etwas über dich..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Soziale Netzwerke</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Verknüpfe deine Profile</p>
          </div>
          <Icon name="Link" size={24} className="text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profileData.socialLinks).map(([platform, url]) => (
            <div key={platform} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center">
                <Icon name={platform === 'website' ? 'Globe' : platform.charAt(0).toUpperCase() + platform.slice(1)} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  {platform === 'website' ? 'Website' : 
                   platform === 'linkedin' ? 'LinkedIn' :
                   platform === 'github' ? 'GitHub' :
                   platform === 'twitter' ? 'Twitter' :
                   platform === 'youtube' ? 'YouTube' :
                   platform === 'instagram' ? 'Instagram' : platform}
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleInputChange('socialLinks', platform, e.target.value)}
                  placeholder={`Deine ${platform} URL`}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Study Tab Component
  const StudyTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Study Statistics */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <h3 className="text-2xl font-black mb-6">Lern-Statistiken</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-black">{Math.round(profileData.stats.totalStudyTime / 60)}h</div>
            <div className="text-green-100 text-sm font-medium">Gesamte Lernzeit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black">{profileData.stats.currentStreak}</div>
            <div className="text-green-100 text-sm font-medium">Aktuelle Serie</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black">{profileData.stats.coursesCompleted}</div>
            <div className="text-green-100 text-sm font-medium">Abgeschlossene Kurse</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black">{profileData.stats.averageSessionTime}m</div>
            <div className="text-green-100 text-sm font-medium">Ø Sitzung</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Study Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Lern-Einstellungen</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Passe deine Lernroutine an</p>
          </div>
          <Icon name="Settings" size={24} className="text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Tägliches Ziel (Minuten)
            </label>
            <input
              type="number"
              value={profileData.studyPreferences.dailyGoalMinutes}
              onChange={(e) => handleInputChange('studyPreferences', 'dailyGoalMinutes', parseInt(e.target.value))}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Wöchentliches Ziel (Tage)
            </label>
            <input
              type="number"
              value={profileData.studyPreferences.weeklyGoalDays}
              onChange={(e) => handleInputChange('studyPreferences', 'weeklyGoalDays', parseInt(e.target.value))}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Bevorzugte Lernzeit
            </label>
            <select
              value={profileData.studyPreferences.preferredStudyTime}
              onChange={(e) => handleInputChange('studyPreferences', 'preferredStudyTime', e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            >
              <option value="morning">Morgen (6-12 Uhr)</option>
              <option value="afternoon">Nachmittag (12-18 Uhr)</option>
              <option value="evening">Abend (18-22 Uhr)</option>
              <option value="night">Nacht (22-2 Uhr)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Sitzungslänge (Minuten)
            </label>
            <input
              type="number"
              value={profileData.studyPreferences.sessionLength}
              onChange={(e) => handleInputChange('studyPreferences', 'sessionLength', parseInt(e.target.value))}
              className="w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
            />
          </div>
        </div>
      </div>

      {/* Study Environment */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Lern-Umgebung</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Optimiere deine Lernatmosphäre</p>
          </div>
          <Icon name="Volume2" size={24} className="text-primary" />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Soundeffekte</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Spiele Töne für Aktionen und Erfolge</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.studyPreferences.soundEffects}
                onChange={(e) => handleInputChange('studyPreferences', 'soundEffects', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Lern-Erinnerungen</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Erhalte Benachrichtigungen zur Lernzeit</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.studyPreferences.studyReminders}
                onChange={(e) => handleInputChange('studyPreferences', 'studyReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Achievements Tab Component
  const AchievementsTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Achievement Overview */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Achievement Progress</h2>
            <p className="text-yellow-100">Keep learning to unlock more achievements!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{profileData.stats.totalAchievements}</div>
            <div className="text-yellow-100">Unlocked</div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileData.achievements.map((achievement) => (
          <motion.div 
            key={achievement.id}
            className={`rounded-2xl p-6 border ${
              achievement.earned 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement.earned 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                <Icon name={achievement.earned ? "Award" : "Lock"} size={20} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${
                  achievement.earned 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.name}
                </h3>
                <p className={`text-sm ${
                  achievement.earned 
                    ? 'text-gray-600 dark:text-gray-300' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && achievement.date && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Notifications Tab Component
  const NotificationsTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Notifications Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={32} />
          <div>
            <h2 className="text-2xl font-bold">Notification Settings</h2>
            <p className="text-purple-100">Customize how and when you receive notifications</p>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Email Notifications</h3>
          <Icon name="Mail" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Study Reminders</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Get reminded when it's time to study</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.email.studyReminders}
                onChange={(e) => handleInputChange('notifications', 'email', {
                  ...profileData.notifications.email,
                  studyReminders: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Course Updates</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">New lessons and course announcements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.email.courseUpdates}
                onChange={(e) => handleInputChange('notifications', 'email', {
                  ...profileData.notifications.email,
                  courseUpdates: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Achievement Unlocks</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Celebrate your learning milestones</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.email.achievementUnlocks}
                onChange={(e) => handleInputChange('notifications', 'email', {
                  ...profileData.notifications.email,
                  achievementUnlocks: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Weekly Progress</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Summary of your learning progress</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.email.weeklyProgress}
                onChange={(e) => handleInputChange('notifications', 'email', {
                  ...profileData.notifications.email,
                  weeklyProgress: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Learning Tips</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Helpful tips and study strategies</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.email.tips}
                onChange={(e) => handleInputChange('notifications', 'email', {
                  ...profileData.notifications.email,
                  tips: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Marketing Updates</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">New features and product announcements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.email.marketing}
                onChange={(e) => handleInputChange('notifications', 'email', {
                  ...profileData.notifications.email,
                  marketing: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Push Notifications</h3>
          <Icon name="Smartphone" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Study Reminders</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Push notifications for study time</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.push.studyReminders}
                onChange={(e) => handleInputChange('notifications', 'push', {
                  ...profileData.notifications.push,
                  studyReminders: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Break Reminders</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reminders to take breaks during study sessions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.push.breakReminders}
                onChange={(e) => handleInputChange('notifications', 'push', {
                  ...profileData.notifications.push,
                  breakReminders: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Achievements</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Instant notifications for unlocked achievements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.push.achievements}
                onChange={(e) => handleInputChange('notifications', 'push', {
                  ...profileData.notifications.push,
                  achievements: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">In-App Experience</h3>
          <Icon name="Monitor" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Sound Effects</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Play sounds for interactions and feedback</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.inApp.sounds}
                onChange={(e) => handleInputChange('notifications', 'inApp', {
                  ...profileData.notifications.inApp,
                  sounds: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Animations</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Enable smooth transitions and animations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.inApp.animations}
                onChange={(e) => handleInputChange('notifications', 'inApp', {
                  ...profileData.notifications.inApp,
                  animations: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Pop-up Messages</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Show helpful tips and guidance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.inApp.popups}
                onChange={(e) => handleInputChange('notifications', 'inApp', {
                  ...profileData.notifications.inApp,
                  popups: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Badge Notifications</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Show unread counts and new content badges</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.notifications.inApp.badges}
                onChange={(e) => handleInputChange('notifications', 'inApp', {
                  ...profileData.notifications.inApp,
                  badges: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Privacy Tab Component
  const PrivacyTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Privacy Overview */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={32} />
          <div>
            <h2 className="text-2xl font-bold">Privacy & Security</h2>
            <p className="text-red-100">Control your data and privacy settings</p>
          </div>
        </div>
      </div>

      {/* Profile Visibility */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Who can see your profile?
            </label>
            <select
              value={profileData.privacy.profileVisibility}
              onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="public">Everyone</option>
              <option value="friends">Friends only</option>
              <option value="private">Only me</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Show Study Statistics</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Allow others to see your learning progress</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.privacy.showStats}
                onChange={(e) => handleInputChange('privacy', 'showStats', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setShow2FAModal(true)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                profileData.privacy.twoFactorEnabled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {profileData.privacy.twoFactorEnabled ? 'Enabled' : 'Enable'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Login Alerts</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Get notified of new login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.privacy.loginAlerts}
                onChange={(e) => handleInputChange('privacy', 'loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Data Management</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Export Your Data</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Download a copy of your profile and learning data</p>
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Export Data
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Accessibility Tab Component
  const AccessibilityTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Accessibility Overview */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Icon name="Eye" size={32} />
          <div>
            <h2 className="text-2xl font-bold">Accessibility Settings</h2>
            <p className="text-indigo-100">Make EduLearn work better for you</p>
          </div>
        </div>
      </div>

      {/* Visual Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Visual Settings</h3>
          <Icon name="Eye" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Font Size
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { value: 'small', label: 'Small', sample: 'Aa' },
                { value: 'medium', label: 'Medium', sample: 'Aa' },
                { value: 'large', label: 'Large', sample: 'Aa' },
                { value: 'extra-large', label: 'Extra Large', sample: 'Aa' }
              ].map((option) => (
                <motion.div
                  key={option.value}
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                    profileData.accessibility.fontSize === option.value
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => handleInputChange('accessibility', 'fontSize', option.value)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-2 font-bold ${
                      option.value === 'small' ? 'text-sm' :
                      option.value === 'medium' ? 'text-base' :
                      option.value === 'large' ? 'text-lg' : 'text-xl'
                    } ${
                      profileData.accessibility.fontSize === option.value
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.sample}
                    </div>
                    <h4 className={`font-medium text-sm ${
                      profileData.accessibility.fontSize === option.value
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {option.label}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">High Contrast Mode</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Increase color contrast for better visibility</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.accessibility.highContrast}
                onChange={(e) => handleInputChange('accessibility', 'highContrast', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Reduce Motion</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Minimize animations and transitions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.accessibility.reduceMotion}
                onChange={(e) => handleInputChange('accessibility', 'reduceMotion', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Color Blind Support</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Enhanced color patterns and indicators</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.accessibility.colorBlindSupport}
                onChange={(e) => handleInputChange('accessibility', 'colorBlindSupport', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation & Interaction */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Navigation & Interaction</h3>
          <Icon name="Navigation" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Keyboard Navigation</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Navigate using keyboard only</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.accessibility.keyboardNavigation}
                onChange={(e) => handleInputChange('accessibility', 'keyboardNavigation', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Enhanced Focus Indicators</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">More visible focus outlines and highlights</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.accessibility.focusIndicators}
                onChange={(e) => handleInputChange('accessibility', 'focusIndicators', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Screen Reader Support */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Screen Reader Support</h3>
          <Icon name="Volume2" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Screen Reader Optimizations</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Enhanced descriptions and ARIA labels</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.accessibility.screenReader}
                onChange={(e) => handleInputChange('accessibility', 'screenReader', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Screen Reader Information</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                  EduLearn works with popular screen readers like NVDA, JAWS, and VoiceOver. 
                  Enable this option for enhanced compatibility and detailed content descriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Advanced Tab Component
  const AdvancedTab = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Advanced Settings Overview */}
      <div className="bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={32} />
          <div>
            <h2 className="text-2xl font-bold">Advanced Settings</h2>
            <p className="text-gray-100">Configure system preferences and advanced options</p>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h3>
          <Icon name="Palette" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Theme Mode
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { 
                  value: 'light', 
                  label: 'Light', 
                  icon: 'Sun',
                  description: 'Always use light theme'
                },
                { 
                  value: 'dark', 
                  label: 'Dark', 
                  icon: 'Moon',
                  description: 'Always use dark theme'
                },
                { 
                  value: 'system', 
                  label: 'System', 
                  icon: 'Monitor',
                  description: 'Follow system preference'
                }
              ].map((option) => (
                <motion.div
                  key={option.value}
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                    theme === option.value
                      ? 'border-gray-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setTheme(option.value)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      theme === option.value
                        ? 'bg-gray-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      <Icon name={option.icon} size={20} />
                    </div>
                    <h4 className={`font-semibold mb-1 ${
                      theme === option.value
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {option.label}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  {theme === option.value && (
                    <motion.div 
                      className="absolute top-2 right-2 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon name="Check" size={12} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">System Preferences</h3>
          <Icon name="Cpu" size={20} className="text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={profileData.advanced.language}
              onChange={(e) => handleInputChange('advanced', 'language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="it">Italiano</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Region
            </label>
            <select
              value={profileData.advanced.region}
              onChange={(e) => handleInputChange('advanced', 'region', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Format
            </label>
            <select
              value={profileData.advanced.dateFormat}
              onChange={(e) => handleInputChange('advanced', 'dateFormat', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Format
            </label>
            <select
              value={profileData.advanced.timeFormat}
              onChange={(e) => handleInputChange('advanced', 'timeFormat', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance & Data</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Auto-Save</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Automatically save your progress while studying</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.advanced.autoSave}
                onChange={(e) => handleInputChange('advanced', 'autoSave', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Offline Mode</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Allow studying when internet connection is unavailable</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.advanced.offlineMode}
                onChange={(e) => handleInputChange('advanced', 'offlineMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Analytics Opt-Out</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Disable anonymous usage analytics collection</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.advanced.analyticsOptOut}
                onChange={(e) => handleInputChange('advanced', 'analyticsOptOut', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'study':
        return <StudyTab />;
      case 'achievements':
        return <AchievementsTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'privacy':
        return <PrivacyTab />;
      case 'accessibility':
        return <AccessibilityTab />;
      case 'advanced':
        return <AdvancedTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ContextualHeader />
      
      <main className="pt-24 pb-20 md:pb-4 md:pl-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-start justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
                  Einstellungen
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Passe deine EduLearn-Erfahrung an
                </p>
              </div>
              <motion.button
                onClick={() => setShowExportModal(true)}
                className="mt-4 sm:mt-0 hidden lg:flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-2xl transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon name="Download" size={18} />
                <span>Alle Daten exportieren</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Success/Error Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div 
                className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center">
                  <Icon name="CheckCircle" size={20} className="text-green-500 dark:text-green-400 mr-3" />
                  <span className="text-green-700 dark:text-green-300 font-medium">{successMessage}</span>
                </div>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div 
                className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center">
                  <Icon name="AlertCircle" size={20} className="text-red-500 dark:text-red-400 mr-3" />
                  <span className="text-red-700 dark:text-red-300 font-medium">{errorMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Tab Selector */}
            <div className="lg:hidden mobile-tabs-container">
              <motion.button
                onClick={() => setShowMobileTabs(!showMobileTabs)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={tabs.find(tab => tab.id === activeTab)?.icon} size={20} className="text-primary" />
                  <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
                </div>
                <motion.div
                  animate={{ rotate: showMobileTabs ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name="ChevronDown" size={20} className="text-gray-400" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {showMobileTabs && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-2"
                  >
                    {tabs.map((tab, index) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setShowMobileTabs(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-primary text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon name={tab.icon} size={18} />
                        <div className="text-left">
                          <div className="font-medium">{tab.label}</div>
                          <div className="text-xs opacity-70">{tab.description}</div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Tab Navigation */}
            <div className="hidden lg:block lg:w-80">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-3">
                <div className="space-y-2">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon name={tab.icon} size={22} />
                      <div className="text-left">
                        <div className="font-bold">{tab.label}</div>
                        <div className="text-sm opacity-70">{tab.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>

          {/* Save Button */}
          <AnimatePresence>
            {hasChanges && (
              <motion.div 
                className="fixed bottom-6 right-6 z-50"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary-700 text-white px-8 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold flex items-center space-x-3 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSaving && <Icon name="Loader2" size={18} className="animate-spin" />}
                  <span>{isSaving ? 'Speichern...' : 'Änderungen speichern'}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 max-w-md w-full p-8"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Download" size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Daten exportieren</h3>
                <p className="text-gray-600 dark:text-gray-400">Wähle das Format für deinen Datenexport:</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <motion.button
                  onClick={() => exportData('json')}
                  className="w-full flex items-center justify-between p-6 border border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900 dark:text-white">JSON Format</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Vollständiger Datenexport</div>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-gray-400" />
                </motion.button>
              </div>
              
              <motion.button
                onClick={() => setShowExportModal(false)}
                className="w-full px-6 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Abbrechen
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default UserProfileSettings;

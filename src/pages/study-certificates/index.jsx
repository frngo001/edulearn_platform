import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

const StudyCertificates = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: 'JavaScript Grundlagen',
      issuer: 'EduLearn Akademie',
      category: 'programming',
      dateEarned: '2024-01-15',
      credentialId: 'EDU-JS-2024-001',
      grade: 'A+',
      score: 95,
      skills: ['Variablen', 'Funktionen', 'DOM Manipulation', 'ES6+'],
      description: 'Umfassendes Verständnis von JavaScript-Grundlagen einschließlich moderner ES6+ Features',
      status: 'earned',
      verificationUrl: 'https://verify.edulearn.com/js-001',
      hours: 40,
      level: 'Anfänger',
      difficulty: 3,
      completionRate: 100
    },
    {
      id: 2,
      title: 'React Development Mastery',
      issuer: 'Tech Institut',
      category: 'frontend',
      dateEarned: '2024-01-10',
      credentialId: 'TI-REACT-2024-087',
      grade: 'A',
      score: 88,
      skills: ['Komponenten', 'Hooks', 'State Management', 'Routing'],
      description: 'Fortgeschrittene React-Entwicklungsfähigkeiten einschließlich Hooks, Context und moderne Patterns',
      status: 'earned',
      verificationUrl: 'https://verify.techinstitute.com/react-087',
      hours: 60,
      level: 'Fortgeschritten',
      difficulty: 4,
      completionRate: 100
    },
    {
      id: 3,
      title: 'Python Datenanalyse',
      issuer: 'Data Science Hub',
      category: 'data-science',
      dateEarned: '2024-01-05',
      credentialId: 'DSH-PY-2024-156',
      grade: 'A+',
      score: 92,
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Datenvisualisierung'],
      description: 'Professionelle Datenanalyse mit Python-Bibliotheken und statistischen Methoden',
      status: 'earned',
      verificationUrl: 'https://verify.datasciencehub.com/py-156',
      hours: 45,
      level: 'Fortgeschritten',
      difficulty: 4,
      completionRate: 100
    },
    {
      id: 4,
      title: 'CSS Erweiterte Layouts',
      issuer: 'Design Akademie',
      category: 'design',
      dateEarned: '2023-12-20',
      credentialId: 'DA-CSS-2023-234',
      grade: 'B+',
      score: 85,
      skills: ['Grid', 'Flexbox', 'Responsive Design', 'Animationen'],
      description: 'Moderne CSS-Layout-Techniken und responsive Design-Prinzipien',
      status: 'earned',
      verificationUrl: 'https://verify.designacademy.com/css-234',
      hours: 30,
      level: 'Fortgeschritten',
      difficulty: 3,
      completionRate: 100
    },
    {
      id: 5,
      title: 'Node.js Backend Development',
      issuer: 'Server Masters',
      category: 'backend',
      dateEarned: null,
      credentialId: null,
      grade: null,
      score: null,
      skills: ['Express.js', 'MongoDB', 'Authentifizierung', 'APIs'],
      description: 'Erstelle skalierbare serverseitige Anwendungen mit Node.js und Express',
      status: 'in-progress',
      progress: 75,
      estimatedCompletion: '2024-02-15',
      hours: 55,
      level: 'Experte',
      difficulty: 5,
      completionRate: 75
    },
    {
      id: 6,
      title: 'UI/UX Design Prinzipien',
      issuer: 'Design Studio',
      category: 'design',
      dateEarned: null,
      credentialId: null,
      grade: null,
      score: null,
      skills: ['User Research', 'Prototyping', 'Design Systems', 'Usability'],
      description: 'Grundlegende Prinzipien des User Interface und User Experience Design',
      status: 'available',
      prerequisites: ['CSS Erweiterte Layouts'],
      hours: 40,
      level: 'Anfänger',
      difficulty: 2,
      completionRate: 0
    }
  ];

  const categories = [
    { id: 'all', label: 'Alle', count: certificates.length, icon: 'Grid3X3' },
    { id: 'earned', label: 'Erworben', count: certificates.filter(c => c.status === 'earned').length, icon: 'Award' },
    { id: 'in-progress', label: 'Aktiv', count: certificates.filter(c => c.status === 'in-progress').length, icon: 'Clock' },
    { id: 'available', label: 'Verfügbar', count: certificates.filter(c => c.status === 'available').length, icon: 'Lock' },
    { id: 'programming', label: 'Code', count: certificates.filter(c => c.category === 'programming').length, icon: 'Code' },
    { id: 'frontend', label: 'Frontend', count: certificates.filter(c => c.category === 'frontend').length, icon: 'Monitor' },
    { id: 'backend', label: 'Backend', count: certificates.filter(c => c.category === 'backend').length, icon: 'Server' },
    { id: 'data-science', label: 'Data', count: certificates.filter(c => c.category === 'data-science').length, icon: 'BarChart3' },
    { id: 'design', label: 'Design', count: certificates.filter(c => c.category === 'design').length, icon: 'Palette' }
  ];

  const stats = {
    totalEarned: certificates.filter(c => c.status === 'earned').length,
    inProgress: certificates.filter(c => c.status === 'in-progress').length,
    totalHours: certificates.filter(c => c.status === 'earned').reduce((sum, c) => sum + c.hours, 0),
    averageScore: Math.round(
      certificates.filter(c => c.score).reduce((sum, c) => sum + c.score, 0) / 
      certificates.filter(c => c.score).length
    )
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesFilter = (() => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'earned' || selectedFilter === 'in-progress' || selectedFilter === 'available') {
        return cert.status === selectedFilter;
      }
      return cert.category === selectedFilter;
    })();
    
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'earned': return 'text-green-600 dark:text-green-400';
      case 'in-progress': return 'text-blue-600 dark:text-blue-400';
      case 'available': return 'text-text-tertiary dark:text-dark-text-tertiary';
      default: return 'text-text-tertiary dark:text-dark-text-tertiary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'earned': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'available': return 'Lock';
      default: return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'earned': return 'Erworben';
      case 'in-progress': return 'In Bearbeitung';
      case 'available': return 'Verfügbar';
      default: return 'Unbekannt';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Anfänger': return 'text-green-600 dark:text-green-400';
      case 'Fortgeschritten': return 'text-blue-600 dark:text-blue-400';
      case 'Experte': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-text-tertiary dark:text-dark-text-tertiary';
    }
  };

  const getDifficultyStars = (difficulty) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name="Star" 
        size={12} 
        className={i < difficulty ? 'text-yellow-500' : 'text-text-tertiary/30 dark:text-dark-text-tertiary/30'} 
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleShare = (certificate) => {
    console.log('Sharing certificate:', certificate.title);
  };

  const handleDownload = (certificate) => {
    console.log('Downloading certificate:', certificate.title);
  };

  const handleVerify = (certificate) => {
    window.open(certificate.verificationUrl, '_blank');
  };

  const CertificateModal = ({ certificate, onClose }) => (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface dark:bg-dark-surface rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {certificate.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary rounded-xl transition-colors duration-200"
              >
                <Icon name="X" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 text-center border border-border/10 dark:border-dark-border/10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                  {certificate.title}
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                  Ausgestellt von {certificate.issuer}
                </p>
                {certificate.status === 'earned' && (
                  <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl">
                    <Icon name="CheckCircle" size={16} />
                    <span className="font-medium">Zertifiziert</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Level:</span>
                        <span className={`font-medium ${getLevelColor(certificate.level)}`}>
                          {certificate.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Dauer:</span>
                        <span className="text-text-primary dark:text-dark-text-primary font-medium">
                          {certificate.hours}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Schwierigkeit:</span>
                        <div className="flex space-x-0.5">
                          {getDifficultyStars(certificate.difficulty)}
                        </div>
                      </div>
                      {certificate.status === 'earned' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-text-secondary dark:text-dark-text-secondary">Erworben:</span>
                            <span className="text-text-primary dark:text-dark-text-primary font-medium">
                              {formatDate(certificate.dateEarned)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary dark:text-dark-text-secondary">Punktzahl:</span>
                            <span className="text-text-primary dark:text-dark-text-primary font-medium">
                              {certificate.score}% ({certificate.grade})
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary text-sm rounded-full border border-border/10 dark:border-dark-border/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Beschreibung</h4>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  {certificate.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-border/10 dark:border-dark-border/10">
                {certificate.status === 'earned' && (
                  <>
                    <button
                      onClick={() => handleVerify(certificate)}
                      className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Icon name="Shield" size={16} />
                      <span>Verifizieren</span>
                    </button>
                    <button
                      onClick={() => handleDownload(certificate)}
                      className="px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors duration-200"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                    <button
                      onClick={() => handleShare(certificate)}
                      className="px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors duration-200"
                    >
                      <Icon name="Share" size={16} />
                    </button>
                  </>
                )}
                {certificate.status === 'in-progress' && (
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Icon name="Play" size={16} />
                    <span>Fortsetzen</span>
                  </button>
                )}
                {certificate.status === 'available' && (
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Icon name="BookOpen" size={16} />
                    <span>Starten</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="p-4 space-y-6 max-w-7xl mx-auto md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary md:text-3xl">
                  Zertifikate
                </h1>
                <p className="text-base text-text-secondary dark:text-dark-text-secondary md:text-lg">
                  Deine Erfolge und erworbenen Zertifizierungen
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" />
                <input
                  type="text"
                  placeholder="Zertifikate durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface dark:bg-dark-surface border border-border/20 dark:border-dark-border/20 rounded-xl text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 md:w-80"
                />
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { label: 'Erworben', value: stats.totalEarned, icon: 'Award', color: 'text-green-600 dark:text-green-400' },
              { label: 'Aktiv', value: stats.inProgress, icon: 'Clock', color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Stunden', value: `${stats.totalHours}h`, icon: 'BookOpen', color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Ø Score', value: `${stats.averageScore}%`, icon: 'Target', color: 'text-orange-600 dark:text-orange-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 hover:shadow-elevation-1 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name={stat.icon} size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary truncate">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {/* Mobile Filter Header */}
            <div className="flex items-center justify-between md:hidden">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Filter
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 bg-surface dark:bg-dark-surface border border-border/20 dark:border-dark-border/20 rounded-xl text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-200"
                >
                  <Icon name={viewMode === 'grid' ? 'List' : 'Grid3X3'} size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Horizontal Scroll Filters */}
            <div className="md:hidden">
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.slice(0, 4).map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedFilter === category.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border/20 dark:border-dark-border/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon name={category.icon} size={16} />
                    <span>{category.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedFilter === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
              
              {/* Mobile Secondary Filters */}
              <div className="flex space-x-2 overflow-x-auto pt-3 pb-2 scrollbar-hide">
                {categories.slice(4).map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedFilter === category.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border/20 dark:border-dark-border/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon name={category.icon} size={14} />
                    <span>{category.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      selectedFilter === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedFilter === category.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary border border-border/20 dark:border-dark-border/20 hover:border-border/40 dark:hover:border-dark-border/40'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name={category.icon} size={16} />
                    <span>{category.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedFilter === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3 bg-surface dark:bg-dark-surface border border-border/20 dark:border-dark-border/20 rounded-xl text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-200"
              >
                <Icon name={viewMode === 'grid' ? 'List' : 'Grid3X3'} size={20} />
              </button>
            </div>
          </motion.div>

          {/* Certificates Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
          }>
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="group bg-surface dark:bg-dark-surface rounded-2xl border border-border/20 dark:border-dark-border/20 overflow-hidden hover:shadow-elevation-1 hover:border-border/40 dark:hover:border-dark-border/40 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCertificate(certificate)}
              >
                {/* Certificate Header */}
                <div className="relative p-6 bg-gradient-to-br from-surface-secondary/50 to-surface-tertiary/30 dark:from-dark-surface-secondary/50 dark:to-dark-surface-tertiary/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      certificate.status === 'earned' ? 'bg-green-100 dark:bg-green-900/20' :
                      certificate.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      'bg-surface-secondary dark:bg-dark-surface-secondary'
                    }`}>
                      <Icon 
                        name={getStatusIcon(certificate.status)} 
                        size={24} 
                        className={getStatusColor(certificate.status)} 
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getLevelColor(certificate.level)}`}>
                        {certificate.level}
                      </span>
                      <div className="flex space-x-0.5">
                        {getDifficultyStars(certificate.difficulty)}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-1 group-hover:text-primary transition-colors duration-200">
                    {certificate.title}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-3">
                    {certificate.issuer}
                  </p>

                  {/* Progress for in-progress certificates */}
                  {certificate.status === 'in-progress' && certificate.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Fortschritt</span>
                        <span className="text-text-primary dark:text-dark-text-primary font-medium">{certificate.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
                        <motion.div 
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${certificate.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Certificate Details */}
                <div className="p-6 space-y-4">
                  <p className="text-text-secondary dark:text-dark-text-secondary text-sm line-clamp-2">
                    {certificate.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary text-xs rounded-full border border-border/10 dark:border-dark-border/10"
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="px-3 py-1 bg-surface-secondary dark:bg-dark-surface-secondary text-text-tertiary dark:text-dark-text-tertiary text-xs rounded-full border border-border/10 dark:border-dark-border/10">
                        +{certificate.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Certificate Info */}
                  <div className="space-y-2 pt-2 border-t border-border/10 dark:border-dark-border/10">
                    {certificate.status === 'earned' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Erworben:</span>
                        <span className="text-text-primary dark:text-dark-text-primary font-medium">
                          {formatDate(certificate.dateEarned)}
                        </span>
                      </div>
                    )}
                    {certificate.status === 'earned' && certificate.score && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Score:</span>
                        <span className="text-text-primary dark:text-dark-text-primary font-medium">
                          {certificate.score}% ({certificate.grade})
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary dark:text-dark-text-secondary">Dauer:</span>
                      <span className="text-text-primary dark:text-dark-text-primary font-medium">
                        {certificate.hours}h
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 pt-2">
                    {certificate.status === 'earned' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify(certificate);
                        }}
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <Icon name="Shield" size={14} />
                        <span>Verifizieren</span>
                      </button>
                    )}
                    {certificate.status === 'in-progress' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <Icon name="Play" size={14} />
                        <span>Fortsetzen</span>
                      </button>
                    )}
                    {certificate.status === 'available' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <Icon name="BookOpen" size={14} />
                        <span>Starten</span>
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCertificate(certificate);
                      }}
                      className="px-3 py-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors duration-200 text-sm"
                    >
                      <Icon name="Eye" size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                Keine Zertifikate gefunden
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Versuche einen anderen Filter oder Suchbegriff
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      <CertificateModal 
        certificate={selectedCertificate} 
        onClose={() => setSelectedCertificate(null)} 
      />
    </div>
  );
};

export default StudyCertificates; 
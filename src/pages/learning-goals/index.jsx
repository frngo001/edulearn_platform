import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

import Button from 'components/ui/Button';
import GoalCard from './components/GoalCard';
import GoalProgressChart from './components/GoalProgressChart';

// Add Goal Modal Component
const AddGoalModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('development');
  const [targetDate, setTargetDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const categories = [
    { id: 'development', label: 'Development', icon: 'Code' },
    { id: 'design', label: 'Design', icon: 'Palette' },
    { id: 'data-science', label: 'Data Science', icon: 'BarChart' },
    { id: 'cloud', label: 'Cloud', icon: 'Cloud' },
    { id: 'business', label: 'Business', icon: 'TrendingUp' },
    { id: 'language', label: 'Language', icon: 'Globe' }
  ];

  const priorities = [
    { id: 'high', label: 'High Priority' },
    { id: 'medium', label: 'Medium Priority' },
    { id: 'low', label: 'Low Priority' }
  ];

  const handleSave = () => {
    if (!title.trim() || !targetDate) return;
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      targetDate,
      priority
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('development');
    setTargetDate('');
    setPriority('medium');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-border dark:border-dark-border max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                  Neues Lernziel
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Erstelle ein neues Lernziel für deine Entwicklung
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Titel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. React Advanced Concepts lernen"
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Beschreibung (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kurze Beschreibung des Lernziels..."
                rows={3}
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-3">
                Kategorie
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center p-3 rounded-xl border transition-all duration-200 ${
                      category === cat.id
                        ? 'border-primary bg-surface-secondary dark:bg-dark-surface-secondary'
                        : 'border-border dark:border-dark-border hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                    }`}
                  >
                    <Icon name={cat.icon} size={16} className="mr-2 text-text-tertiary dark:text-dark-text-tertiary" />
                    <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority & Target Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Priorität
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary"
                >
                  {priorities.map((prio) => (
                    <option key={prio.id} value={prio.id}>{prio.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Zieldatum
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border dark:border-dark-border">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary border border-border dark:border-dark-border rounded-2xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-all duration-200"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={!title.trim() || !targetDate}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Ziel erstellen
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const LearningGoals = () => {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for learning goals
  const mockGoals = [
    {
      id: 1,
      title: "React Advanced Concepts",
      description: "Master advanced React concepts including hooks, context, and performance optimization",
      category: "development",
      progress: 75,
      targetDate: "2024-04-15",
      priority: "high",
      status: "active",
      createdAt: "2024-01-15",
      milestones: [
        { id: 1, title: "Custom Hooks verstehen", completed: true },
        { id: 2, title: "Context API beherrschen", completed: true },
        { id: 3, title: "Performance Optimierung", completed: false },
        { id: 4, title: "Abschlussprojekt", completed: false }
      ]
    },
    {
      id: 2,
      title: "Data Science Grundlagen",
      description: "Starke Grundlage in Statistik, Python und Machine Learning",
      category: "data-science",
      progress: 45,
      targetDate: "2024-06-01",
      priority: "medium",
      status: "active",
      createdAt: "2024-02-01",
      milestones: [
        { id: 1, title: "Python Basics", completed: true },
        { id: 2, title: "Statistik Grundlagen", completed: true },
        { id: 3, title: "Pandas & NumPy", completed: false },
        { id: 4, title: "Machine Learning Intro", completed: false }
      ]
    },
    {
      id: 3,
      title: "UI/UX Design Prinzipien",
      description: "Fähigkeiten in Interface Design, UX Research und Prototyping",
      category: "design",
      progress: 90,
      targetDate: "2024-03-30",
      priority: "low",
      status: "active",
      createdAt: "2024-01-01",
      milestones: [
        { id: 1, title: "Design Grundlagen", completed: true },
        { id: 2, title: "User Research", completed: true },
        { id: 3, title: "Prototyping Tools", completed: true },
        { id: 4, title: "Portfolio Projekt", completed: false }
      ]
    },
    {
      id: 4,
      title: "Cloud Computing Zertifizierung",
      description: "Vorbereitung auf AWS Solutions Architect Zertifizierung",
      category: "cloud",
      progress: 100,
      targetDate: "2024-02-28",
      priority: "high",
      status: "completed",
      createdAt: "2023-12-01",
      milestones: [
        { id: 1, title: "AWS Grundlagen", completed: true },
        { id: 2, title: "EC2 & Storage", completed: true },
        { id: 3, title: "Networking & Security", completed: true },
        { id: 4, title: "Zertifizierungsprüfung", completed: true }
      ]
    }
  ];

  useEffect(() => {
    setGoals(mockGoals);
  }, []);

  const filteredGoals = goals.filter(goal => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return goal.status === 'active';
    if (activeFilter === 'completed') return goal.status === 'completed';
    if (activeFilter === 'high') return goal.priority === 'high';
    return goal.category === activeFilter;
  });

  const handleAddGoal = (newGoal) => {
    const goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      milestones: []
    };
    setGoals([goal, ...goals]);
    setShowAddModal(false);
  };

  const handleUpdateGoal = (goalId, updates) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const filters = [
    { key: 'all', label: 'Alle', icon: 'Target' },
    { key: 'active', label: 'Aktiv', icon: 'Play' },
    { key: 'completed', label: 'Abgeschlossen', icon: 'CheckCircle' },
    { key: 'high', label: 'Hohe Priorität', icon: 'AlertCircle' },
    { key: 'development', label: 'Development', icon: 'Code' },
    { key: 'design', label: 'Design', icon: 'Palette' },
    { key: 'data-science', label: 'Data Science', icon: 'BarChart' },
    { key: 'cloud', label: 'Cloud', icon: 'Cloud' }
  ];

  const getGoalStats = () => {
    const total = goals.length;
    const completed = goals.filter(g => g.status === 'completed').length;
    const active = goals.filter(g => g.status === 'active').length;
    const avgProgress = goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0;
    
    return { total, completed, active, avgProgress };
  };

  const stats = getGoalStats();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-orange-600 dark:text-orange-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-text-tertiary dark:text-dark-text-tertiary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'development': return 'Code';
      case 'design': return 'Palette';
      case 'data-science': return 'BarChart';
      case 'cloud': return 'Cloud';
      case 'business': return 'TrendingUp';
      case 'language': return 'Globe';
      default: return 'Target';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <ContextualHeader />
        <div className="pt-16 pb-20 md:pb-4 md:pl-16">
          <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Loading skeleton */}
              <div className="h-32 w-full rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="p-4 space-y-6 max-w-7xl mx-auto md:p-6 lg:p-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary md:text-3xl">
                    Lernziele
                  </h1>
                  <p className="text-base text-text-secondary dark:text-dark-text-secondary md:text-lg">
                    Verfolge deinen Fortschritt und erreiche deine Lernziele
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 active:scale-95 transition-all duration-200 md:w-auto md:px-6"
                >
                  <Icon name="Plus" size={20} />
                  <span className="font-medium">Neues Ziel</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="Target" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{stats.total}</p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Gesamt</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{stats.active}</p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Aktiv</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{stats.completed}</p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Erledigt</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{stats.avgProgress}%</p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Durchschnitt</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20"
          >
            <div className="flex items-center space-x-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                  }`}
                >
                  <Icon name={filter.icon} size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Goals Grid */}
          <div className="space-y-4">
            {filteredGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 active:scale-95 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getCategoryIcon(goal.category)} 
                          size={16} 
                          className="text-text-tertiary dark:text-dark-text-tertiary" 
                        />
                        <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
                          {goal.title}
                        </h3>
                        <span className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? 'Hoch' : goal.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {goal.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {goal.status === 'completed' && (
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} className="text-green-600 dark:text-green-400" />
                        </div>
                      )}
                      <button className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-lg hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        Fortschritt
                      </span>
                      <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
                        <span className="text-text-secondary dark:text-dark-text-secondary">
                          {formatDate(goal.targetDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckSquare" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
                        <span className="text-text-secondary dark:text-dark-text-secondary">
                          {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} Meilensteine
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGoals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Target" size={24} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Keine Lernziele gefunden
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                Erstelle dein erstes Lernziel, um zu beginnen
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors"
              >
                Erstes Ziel erstellen
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddGoal}
      />
    </div>
  );
};

export default LearningGoals; 
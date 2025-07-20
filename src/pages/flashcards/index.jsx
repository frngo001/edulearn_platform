import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';

import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

// AI Flashcard Creation Modal
const AIFlashcardModal = ({ isOpen, onClose, onSave }) => {
  const [mode, setMode] = useState('text'); // 'text' or 'file'
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleGenerate = async () => {
    if (mode === 'text' && !topic.trim()) return;
    if (mode === 'file' && !fileContent.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedCards = [];
      const sourceContent = mode === 'text' ? topic : (uploadedFile?.name || 'Uploaded Content');
      
      for (let i = 1; i <= count; i++) {
        if (mode === 'text') {
          generatedCards.push({
            id: Date.now() + i,
            front: `${topic} Frage ${i}`,
            back: `Dies ist die KI-generierte Antwort für ${topic} Frage ${i}. Der Inhalt wäre relevant zum Thema und Schwierigkeitsgrad.`,
            deck: topic,
            createdAt: new Date(),
            lastReviewed: null,
            difficulty: 'new'
          });
        } else {
          generatedCards.push({
            id: Date.now() + i,
            front: `Frage ${i} aus ${uploadedFile.name}`,
            back: `KI-generierte Antwort basierend auf dem hochgeladenen Dateiinhalt. Dies würde das Dokument analysieren und relevante Fragen erstellen.`,
            deck: uploadedFile.name.replace(/\.[^/.]+$/, ""),
            createdAt: new Date(),
            lastReviewed: null,
            difficulty: 'new'
          });
        }
      }
      
      generatedCards.forEach(card => onSave(card));
      setIsGenerating(false);
      setTopic('');
      setCount(10);
      setDifficulty('medium');
      setUploadedFile(null);
      setFileContent('');
      setMode('text');
      onClose();
    }, 2000);
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
                  KI Lernkarten Generator
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Erstelle Lernkarten automatisch mit KI
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
            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-3">
                Erstellen aus
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('text')}
                  className={`flex items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
                    mode === 'text'
                      ? 'border-primary bg-surface-secondary dark:bg-dark-surface-secondary'
                      : 'border-border dark:border-dark-border hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                  }`}
                >
                  <Icon name="Type" size={16} className="mr-2 text-text-secondary dark:text-dark-text-secondary" />
                  <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Text/Thema</span>
                </button>
                <button
                  onClick={() => setMode('file')}
                  className={`flex items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
                    mode === 'file'
                      ? 'border-primary bg-surface-secondary dark:bg-dark-surface-secondary'
                      : 'border-border dark:border-dark-border hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                  }`}
                >
                  <Icon name="Upload" size={16} className="mr-2 text-text-secondary dark:text-dark-text-secondary" />
                  <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Datei Upload</span>
                </button>
              </div>
            </div>

            {mode === 'text' ? (
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Thema oder Fachgebiet
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="z.B. JavaScript Funktionen, Zweiter Weltkrieg, Organische Chemie"
                  className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Dokument hochladen
                </label>
                <div className="border-2 border-dashed border-border dark:border-dark-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors duration-200">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Icon name="Upload" size={24} className="text-text-tertiary dark:text-dark-text-tertiary mx-auto mb-3" />
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-2">
                      Klicken zum Hochladen oder Drag & Drop
                    </p>
                    <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      TXT, PDF, DOC, DOCX, MD Dateien unterstützt
                    </p>
                  </label>
                </div>
                {uploadedFile && (
                  <div className="mt-3 p-3 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl flex items-center space-x-2">
                    <Icon name="FileText" size={16} className="text-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-sm text-text-primary dark:text-dark-text-primary truncate">
                      {uploadedFile.name}
                    </span>
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setFileContent('');
                      }}
                      className="text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Anzahl Karten
                </label>
                <select
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary"
                >
                  <option value={5}>5 Karten</option>
                  <option value={10}>10 Karten</option>
                  <option value={15}>15 Karten</option>
                  <option value={20}>20 Karten</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Schwierigkeit
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary"
                >
                  <option value="easy">Einfach</option>
                  <option value="medium">Mittel</option>
                  <option value="hard">Schwer</option>
                </select>
              </div>
            </div>

            {isGenerating && (
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-2 text-primary">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">KI {mode === 'text' ? 'generiert' : 'analysiert Dokument und generiert'} deine Lernkarten...</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                disabled={isGenerating}
                className="flex-1 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors disabled:opacity-50"
              >
                Abbrechen
              </button>
              <button
                onClick={handleGenerate}
                disabled={(mode === 'text' && !topic.trim()) || (mode === 'file' && !fileContent.trim()) || isGenerating}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Icon name="Sparkles" size={16} />
                <span>{isGenerating ? 'Generiere...' : 'Karten generieren'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Edit Flashcard Modal
const EditFlashcardModal = ({ isOpen, onClose, onSave, flashcard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [deck, setDeck] = useState('');

  useEffect(() => {
    if (flashcard) {
      setFront(flashcard.front || '');
      setBack(flashcard.back || '');
      setDeck(flashcard.deck || '');
    }
  }, [flashcard]);

  const handleSave = () => {
    if (front.trim() && back.trim()) {
      onSave({
        ...flashcard,
        front: front.trim(),
        back: back.trim(),
        deck: deck.trim() || 'Standard'
      });
      onClose();
    }
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
                  Lernkarte bearbeiten
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Bearbeite deine Lernkarte
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
            {/* Deck Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Set-Name
              </label>
              <input
                type="text"
                value={deck}
                onChange={(e) => setDeck(e.target.value)}
                placeholder="z.B. JavaScript Grundlagen"
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Front */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Vorderseite (Frage/Begriff)
              </label>
              <textarea
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Gib die Frage oder den Begriff ein..."
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none h-24 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Back */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Rückseite (Antwort/Definition)
              </label>
              <textarea
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="Gib die Antwort oder Definition ein..."
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none h-24 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={!front.trim() || !back.trim()}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Speichern
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Create Flashcard Modal
const CreateFlashcardModal = ({ isOpen, onClose, onSave }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [deck, setDeck] = useState('');

  const handleSave = () => {
    if (front.trim() && back.trim()) {
      onSave({
        id: Date.now(),
        front: front.trim(),
        back: back.trim(),
        deck: deck.trim() || 'Standard',
        createdAt: new Date(),
        lastReviewed: null,
        difficulty: 'new'
      });
      setFront('');
      setBack('');
      setDeck('');
      onClose();
    }
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
                  Neue Lernkarte erstellen
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Erstelle eine neue Lernkarte
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
            {/* Deck Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Set-Name (Optional)
              </label>
              <input
                type="text"
                value={deck}
                onChange={(e) => setDeck(e.target.value)}
                placeholder="z.B. JavaScript Grundlagen"
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Front */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Vorderseite (Frage/Begriff)
              </label>
              <textarea
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Gib die Frage oder den Begriff ein..."
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none h-24 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Back */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Rückseite (Antwort/Definition)
              </label>
              <textarea
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="Gib die Antwort oder Definition ein..."
                className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none h-24 text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={!front.trim() || !back.trim()}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Erstellen
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Learning Mode Component
const LearningMode = ({ flashcards, onBack, deckName, isRandomMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    if (isRandomMode) {
      const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    } else {
      setShuffledCards(flashcards);
    }
  }, [flashcards, isRandomMode]);

  const currentCard = shuffledCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
      setShowAnswer(false);
    }
  };

  const flipCard = () => {
    setFlipped(!flipped);
    setShowAnswer(!showAnswer);
  };

  if (!currentCard) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-20 h-20 bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Icon name="BookOpen" size={24} className="text-text-tertiary dark:text-dark-text-tertiary" />
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
          Keine Karten zum Lernen
        </h3>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-6 text-sm">
          Dieses Set ist leer. Bitte füge Karten hinzu, um zu lernen.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary-600 transition-colors font-medium"
        >
          Zurück zu den Sets
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-4 border-b border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary rounded-xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          
          <div className="text-center flex-1 mx-4">
            <h1 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary truncate">
              {deckName || 'Alle Karten'} {isRandomMode && '(Zufällig)'}
            </h1>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              {currentIndex + 1} / {shuffledCards.length}
            </p>
          </div>

          <div className="w-10"></div> {/* Spacer for balance */}
        </div>

        {/* Mobile Progress Bar */}
        <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors border border-border dark:border-dark-border rounded-2xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Zurück zu den Sets</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
            {deckName || 'Alle Karten'} {isRandomMode && '(Zufällig)'}
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Karte {currentIndex + 1} von {shuffledCards.length}
          </p>
        </div>

        <div className="w-32"></div> {/* Spacer for balance */}
      </div>

      {/* Desktop Progress Bar */}
      <div className="hidden md:block mb-8">
        <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard Container */}
      <div className="flex-1 flex flex-col px-4 md:px-0">
        {/* Mobile Flashcard */}
        <div className="md:hidden flex-1 flex items-center justify-center py-4">
          <div className="w-full max-w-sm" style={{ height: '60vh', minHeight: '300px' }}>
            <motion.div
              className="w-full h-full cursor-pointer"
              onClick={flipCard}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Front of card - Mobile */}
                <div
                  className="absolute inset-0 bg-surface dark:bg-dark-surface rounded-3xl shadow-lg border border-border dark:border-dark-border flex items-center justify-center p-6"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-center w-full">
                    <div className="mb-4">
                      <Icon name="HelpCircle" size={24} className="text-text-tertiary dark:text-dark-text-tertiary mx-auto" />
                    </div>
                    <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 leading-tight">
                      {currentCard.front}
                    </h2>
                    <p className="text-text-secondary dark:text-dark-text-secondary text-xs">
                      Tippen um Antwort zu zeigen
                    </p>
                  </div>
                </div>

                {/* Back of card - Mobile */}
                <div
                  className="absolute inset-0 bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl shadow-lg border border-border dark:border-dark-border flex items-center justify-center p-6"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="text-center w-full">
                    <div className="mb-4">
                      <Icon name="CheckCircle" size={24} className="text-primary mx-auto" />
                    </div>
                    <h2 className="text-base font-bold text-text-primary dark:text-dark-text-primary mb-4 leading-tight">
                      {currentCard.back}
                    </h2>
                    <p className="text-text-secondary dark:text-dark-text-secondary text-xs">
                      Tippen um Frage wieder zu sehen
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Flashcard */}
        <div className="hidden md:block relative mb-8" style={{ height: '400px' }}>
          <motion.div
            className="absolute inset-0 cursor-pointer"
            onClick={flipCard}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Front of card - Desktop */}
              <div
                className="absolute inset-0 bg-surface dark:bg-dark-surface rounded-3xl shadow-xl border border-border dark:border-dark-border flex items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <Icon name="HelpCircle" size={32} className="text-text-tertiary dark:text-dark-text-tertiary mx-auto" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                    {currentCard.front}
                  </h2>
                  <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                    Klicken um Antwort zu zeigen
                  </p>
                </div>
              </div>

              {/* Back of card - Desktop */}
              <div
                className="absolute inset-0 bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl shadow-xl border border-border dark:border-dark-border flex items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <Icon name="CheckCircle" size={32} className="text-primary mx-auto" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                    {currentCard.back}
                  </h2>
                  <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                    Klicken um Frage wieder zu sehen
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden pb-4">
          {/* Main Action Button */}
          <div className="mb-4">
            <button
              onClick={flipCard}
              className="w-full py-4 bg-primary text-white rounded-2xl font-medium text-lg active:scale-95 transition-all duration-200"
            >
              {flipped ? 'Frage zeigen' : 'Antwort zeigen'}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex space-x-3">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 font-medium"
            >
              <Icon name="ChevronLeft" size={18} />
              <span className="text-sm">Vorherige</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === shuffledCards.length - 1}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 font-medium"
            >
              <span className="text-sm">Nächste</span>
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>

          {/* Mobile Study Actions */}
          {showAnswer && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-text-secondary dark:text-dark-text-secondary mb-3 text-center text-sm">
                Wie gut kanntest du das?
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button className="py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl active:scale-95 transition-all duration-200 text-sm font-medium">
                  Schwer
                </button>
                <button className="py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl active:scale-95 transition-all duration-200 text-sm font-medium">
                  Mittel
                </button>
                <button className="py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl active:scale-95 transition-all duration-200 text-sm font-medium">
                  Einfach
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Icon name="ChevronLeft" size={20} />
              <span>Vorherige</span>
            </button>

            <button
              onClick={flipCard}
              className="px-8 py-3 bg-primary text-white rounded-2xl hover:bg-primary-600 transition-colors font-medium"
            >
              {flipped ? 'Frage zeigen' : 'Antwort zeigen'}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === shuffledCards.length - 1}
              className="flex items-center space-x-2 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <span>Nächste</span>
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Desktop Study Actions */}
          {showAnswer && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4">Wie gut kanntest du das?</p>
              <div className="flex items-center justify-center space-x-4">
                <button className="px-4 py-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors">
                  Schwer
                </button>
                <button className="px-4 py-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors">
                  Mittel
                </button>
                <button className="px-4 py-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors">
                  Einfach
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Bestätigen", cancelText = "Abbrechen", isDestructive = false }) => {
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
          className="bg-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-border dark:border-dark-border max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                isDestructive 
                  ? 'bg-red-100 dark:bg-red-900/20' 
                  : 'bg-surface-secondary dark:bg-dark-surface-secondary'
              }`}>
                <Icon 
                  name={isDestructive ? "AlertTriangle" : "HelpCircle"} 
                  size={24} 
                  className={isDestructive ? 'text-red-600 dark:text-red-400' : 'text-text-secondary dark:text-dark-text-secondary'} 
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                {title}
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {message}
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 px-4 py-3 rounded-2xl font-medium transition-colors ${
                  isDestructive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-primary text-white hover:bg-primary-600'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Create Flashcard Set Modal
const CreateSetModal = ({ isOpen, onClose, onCreateSet }) => {
  const [setName, setSetName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [isCreating, setIsCreating] = useState(false);

  const categories = [
    { id: 'general', name: 'Allgemein', icon: 'BookOpen' },
    { id: 'language', name: 'Sprachen', icon: 'Globe' },
    { id: 'science', name: 'Wissenschaft', icon: 'Atom' },
    { id: 'technology', name: 'Technologie', icon: 'Code' },
    { id: 'history', name: 'Geschichte', icon: 'Clock' },
    { id: 'math', name: 'Mathematik', icon: 'Calculator' }
  ];

  const handleCreate = async () => {
    if (!setName.trim()) return;
    
    setIsCreating(true);
    
    // Simulate creation
    setTimeout(() => {
      const newSet = {
        id: Date.now(),
        name: setName,
        description: description || 'Keine Beschreibung',
        category,
        cardCount: 0,
        createdAt: new Date(),
        lastStudied: null,
        progress: 0
      };
      
      onCreateSet(newSet);
      setIsCreating(false);
      setSetName('');
      setDescription('');
      setCategory('general');
      onClose();
    }, 1000);
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
          className="bg-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-border dark:border-dark-border max-w-lg w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                  Neues Kartenset erstellen
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Erstelle ein neues Lernkartenset
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
            {/* Set Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Set-Name
              </label>
              <input
                type="text"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                placeholder="z.B. Spanisch Vokabeln, Chemie Formeln..."
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
                placeholder="Kurze Beschreibung des Kartensets..."
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
                    className={`p-3 rounded-2xl border transition-all duration-200 ${
                      category === cat.id
                        ? 'border-primary bg-surface-secondary dark:bg-dark-surface-secondary'
                        : 'border-border dark:border-dark-border hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-md bg-border dark:bg-dark-border flex items-center justify-center">
                        <Icon name={cat.icon} size={12} className="text-text-tertiary dark:text-dark-text-tertiary" />
                      </div>
                      <span className={`text-sm font-medium ${
                        category === cat.id ? 'text-primary' : 'text-text-primary dark:text-dark-text-primary'
                      }`}>
                        {cat.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

                          {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!setName.trim() || isCreating}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Erstelle...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Plus" size={16} />
                      <span>Erstellen</span>
                    </>
                  )}
                </button>
              </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Edit Set Modal
const EditSetModal = ({ isOpen, onClose, onSaveSet, set }) => {
  const [setName, setSetName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { id: 'general', name: 'Allgemein', icon: 'BookOpen' },
    { id: 'language', name: 'Sprachen', icon: 'Globe' },
    { id: 'science', name: 'Wissenschaft', icon: 'Atom' },
    { id: 'technology', name: 'Technologie', icon: 'Code' },
    { id: 'history', name: 'Geschichte', icon: 'Clock' },
    { id: 'math', name: 'Mathematik', icon: 'Calculator' }
  ];

  // Initialize form with set data when modal opens
  useEffect(() => {
    if (set && isOpen) {
      setSetName(set.name || '');
      setDescription(set.description || '');
      setCategory(set.category || 'general');
    }
  }, [set, isOpen]);

  const handleSave = async () => {
    if (!setName.trim()) return;
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      const updatedSet = {
        ...set,
        name: setName,
        description: description || 'Keine Beschreibung',
        category
      };
      
      onSaveSet(updatedSet);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setSetName('');
    setDescription('');
    setCategory('general');
    onClose();
  };

  if (!isOpen || !set) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-border dark:border-dark-border max-w-lg w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                  Kartenset bearbeiten
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  Bearbeite die Details deines Kartensets
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Set Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Set-Name
              </label>
              <input
                type="text"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                placeholder="z.B. Spanisch Vokabeln, Chemie Formeln..."
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
                placeholder="Kurze Beschreibung des Kartensets..."
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
                    className={`p-3 rounded-2xl border transition-all duration-200 ${
                      category === cat.id
                        ? 'border-primary bg-surface-secondary dark:bg-dark-surface-secondary'
                        : 'border-border dark:border-dark-border hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-md bg-border dark:bg-dark-border flex items-center justify-center">
                        <Icon name={cat.icon} size={12} className="text-text-tertiary dark:text-dark-text-tertiary" />
                      </div>
                      <span className={`text-sm font-medium ${
                        category === cat.id ? 'text-primary' : 'text-text-primary dark:text-dark-text-primary'
                      }`}>
                        {cat.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={!setName.trim() || isSaving}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Speichere...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Save" size={16} />
                    <span>Speichern</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Flashcard Set Card
const FlashcardSetCard = ({ set, index, onStudy, onEdit, onDelete }) => {
  const getCategoryConfig = (categoryId) => {
    const categories = {
      general: { name: 'Allgemein', icon: 'BookOpen' },
      language: { name: 'Sprachen', icon: 'Globe' },
      science: { name: 'Wissenschaft', icon: 'Atom' },
      technology: { name: 'Technologie', icon: 'Code' },
      history: { name: 'Geschichte', icon: 'Clock' },
      math: { name: 'Mathematik', icon: 'Calculator' }
    };
    return categories[categoryId] || categories.general;
  };

  const categoryConfig = getCategoryConfig(set.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-surface dark:bg-dark-surface rounded-3xl border border-border/20 dark:border-dark-border/20 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      {/* Header with Category */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-2xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border flex items-center justify-center">
            <Icon name={categoryConfig.icon} size={16} className="text-text-secondary dark:text-dark-text-secondary" />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(set)}
              className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
            >
              <Icon name="Edit" size={16} />
            </button>
            <button
              onClick={() => onDelete(set.id)}
              className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-red-500 rounded-xl hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-1 line-clamp-1">
            {set.name}
          </h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2">
            {set.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
              {set.cardCount} Karten
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
              {set.progress}% gelernt
            </span>
          </div>
          {set.lastStudied && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
              <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                Vor {Math.floor((Date.now() - new Date(set.lastStudied)) / (1000 * 60 * 60 * 24))} Tagen
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
              Fortschritt
            </span>
            <span className="text-xs font-bold text-text-primary dark:text-dark-text-primary">
              {set.progress}%
            </span>
          </div>
          <div className="w-full bg-surface-secondary dark:bg-dark-surface-secondary rounded-full h-3 overflow-hidden">
            <motion.div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                set.progress === 0 
                  ? 'bg-gray-400' 
                  : set.progress < 25 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                    : set.progress < 50 
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                      : set.progress < 75 
                        ? 'bg-gradient-to-r from-yellow-500 to-blue-500' 
                        : set.progress < 100 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${set.progress}%` }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Shimmer effect for active progress */}
              {set.progress > 0 && (
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              )}
            </motion.div>
          </div>
          
          {/* Progress milestones */}
          <div className="flex justify-between mt-1">
            <div className={`w-1 h-1 rounded-full ${set.progress >= 25 ? 'bg-orange-500' : 'bg-surface-tertiary dark:bg-dark-surface-tertiary'}`}></div>
            <div className={`w-1 h-1 rounded-full ${set.progress >= 50 ? 'bg-yellow-500' : 'bg-surface-tertiary dark:bg-dark-surface-tertiary'}`}></div>
            <div className={`w-1 h-1 rounded-full ${set.progress >= 75 ? 'bg-blue-500' : 'bg-surface-tertiary dark:bg-dark-surface-tertiary'}`}></div>
            <div className={`w-1 h-1 rounded-full ${set.progress >= 100 ? 'bg-green-500' : 'bg-surface-tertiary dark:bg-dark-surface-tertiary'}`}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onStudy(set)}
            className="w-full bg-primary text-white px-4 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="Play" size={16} />
            <span>Lernen starten</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Flashcards = () => {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSetModal, setShowEditSetModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editingSet, setEditingSet] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isLearning, setIsLearning] = useState(false);
  const [learningCards, setLearningCards] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockSets = [
    {
      id: 1,
      name: "Spanisch Grundwortschatz",
      description: "Die wichtigsten 500 spanischen Wörter für Anfänger",
      category: "language",
      cardCount: 127,
      createdAt: new Date('2024-01-15'),
      lastStudied: new Date('2024-01-20'),
      progress: 65
    },
    {
      id: 2,
      name: "React Hooks",
      description: "Alle wichtigen React Hooks mit Beispielen und Anwendungsfällen",
      category: "technology",
      cardCount: 45,
      createdAt: new Date('2024-01-10'),
      lastStudied: new Date('2024-01-18'),
      progress: 80
    },
    {
      id: 3,
      name: "Chemie Formeln",
      description: "Grundlegende chemische Formeln und Reaktionen",
      category: "science",
      cardCount: 89,
      createdAt: new Date('2024-01-05'),
      lastStudied: null,
      progress: 0
    },
    {
      id: 4,
      name: "Weltgeschichte Daten",
      description: "Wichtige Daten und Ereignisse der Weltgeschichte",
      category: "history",
      cardCount: 156,
      createdAt: new Date('2024-01-01'),
      lastStudied: new Date('2024-01-19'),
      progress: 45
    }
  ];

  // Mock flashcards data
  const mockFlashcards = [
    {
      id: 1,
      front: "Was ist React?",
      back: "Eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen",
      deck: "React Hooks",
      createdAt: new Date('2024-01-01'),
      lastReviewed: new Date('2024-01-15'),
      difficulty: 'easy'
    },
    {
      id: 2,
      front: "Was ist JSX?",
      back: "Eine Syntaxerweiterung für JavaScript, die es ermöglicht, HTML-ähnlichen Code in JavaScript-Dateien zu schreiben",
      deck: "React Hooks",
      createdAt: new Date('2024-01-02'),
      lastReviewed: null,
      difficulty: 'new'
    },
    {
      id: 3,
      front: "Was ist useState?",
      back: "Ein React Hook, der es ermöglicht, State zu funktionalen Komponenten hinzuzufügen",
      deck: "React Hooks",
      createdAt: new Date('2024-01-03'),
      lastReviewed: new Date('2024-01-10'),
      difficulty: 'medium'
    },
    {
      id: 4,
      front: "¿Cómo estás?",
      back: "Wie geht es dir?",
      deck: "Spanisch Grundwortschatz",
      createdAt: new Date('2024-01-04'),
      lastReviewed: null,
      difficulty: 'new'
    },
    {
      id: 5,
      front: "H2O",
      back: "Wasser - Chemische Formel für Wasser",
      deck: "Chemie Formeln",
      createdAt: new Date('2024-01-05'),
      lastReviewed: new Date('2024-01-12'),
      difficulty: 'easy'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setFlashcardSets(mockSets);
      setFlashcards(mockFlashcards);
      setLoading(false);
    }, 1000);
  }, []);

  // Listen for header AI modal event
  useEffect(() => {
    const handleOpenAIModal = () => {
      setShowAIModal(true);
    };

    window.addEventListener('openAIModal', handleOpenAIModal);

    return () => {
      window.removeEventListener('openAIModal', handleOpenAIModal);
    };
  }, []);

  const handleCreateSet = (newSet) => {
    setFlashcardSets(prev => [newSet, ...prev]);
  };

  const saveFlashcard = (newCard) => {
    if (newCard.id && flashcards.find(card => card.id === newCard.id)) {
      // Update existing card
      setFlashcards(prev => prev.map(card => card.id === newCard.id ? newCard : card));
    } else {
      // Add new card
      setFlashcards(prev => [...prev, newCard]);
    }
  };

  const deleteCard = (cardId) => {
    setConfirmAction({
      type: 'deleteCard',
      id: cardId,
      title: 'Karte löschen',
      message: 'Möchtest du diese Lernkarte wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      confirmText: 'Löschen'
    });
    setShowConfirmModal(true);
  };

  const editCard = (card) => {
    setEditingCard(card);
    setShowEditModal(true);
  };

  const startLearning = (deckName = null, randomMode = false) => {
    let cardsToStudy = deckName ? flashcards.filter(card => card.deck === deckName) : flashcards;
    setLearningCards(cardsToStudy);
    setSelectedDeck(deckName);
    setIsRandomMode(randomMode);
    setIsLearning(true);
  };

  const handleStudySet = (set) => {
    startLearning(set.name);
  };

  const handleEditSet = (set) => {
    setEditingSet(set);
    setShowEditSetModal(true);
  };

  const handleSaveSet = (updatedSet) => {
    setFlashcardSets(prev => prev.map(set => 
      set.id === updatedSet.id ? updatedSet : set
    ));
    // Update all cards that belong to this set if the name changed
    if (editingSet && editingSet.name !== updatedSet.name) {
      setFlashcards(prev => prev.map(card => 
        card.deck === editingSet.name 
          ? { ...card, deck: updatedSet.name }
          : card
      ));
    }
  };

  const handleDeleteSet = (setId) => {
    const set = flashcardSets.find(s => s.id === setId);
    setConfirmAction({
      type: 'deleteSet',
      id: setId,
      title: 'Kartenset löschen',
      message: `Möchtest du das Kartenset "${set?.name}" wirklich löschen? Alle Karten in diesem Set werden ebenfalls gelöscht.`,
      confirmText: 'Löschen'
    });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction?.type === 'deleteCard') {
      setFlashcards(prev => prev.filter(card => card.id !== confirmAction.id));
    } else if (confirmAction?.type === 'deleteSet') {
      const set = flashcardSets.find(s => s.id === confirmAction.id);
      setFlashcardSets(prev => prev.filter(s => s.id !== confirmAction.id));
      // Also delete all cards in this set
      if (set) {
        setFlashcards(prev => prev.filter(card => card.deck !== set.name));
      }
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary dark:text-dark-text-secondary">Lade Kartensets...</p>
        </motion.div>
      </div>
    );
  }

  if (isLearning) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <ContextualHeader />
        
        <main className="pt-16 pb-20 md:pb-4 md:pl-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LearningMode
              flashcards={learningCards}
              onBack={() => setIsLearning(false)}
              deckName={selectedDeck}
              isRandomMode={isRandomMode}
            />
          </div>
        </main>
        
        <BottomTabNavigation />
        <NavigationBridge />
        <StudySessionOverlay />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full bg-surface dark:bg-dark-surface"
        >
          <div className="px-4 py-6 space-y-8">
            {/* Hero Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Lernkarten
              </h1>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                Erstelle und lerne mit digitalen Karteikarten
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{flashcardSets.length}</p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Sets</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                    {flashcardSets.reduce((sum, set) => sum + set.cardCount, 0)}
                  </p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Karten</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                    {Math.round(flashcardSets.reduce((sum, set) => sum + set.progress, 0) / flashcardSets.length) || 0}%
                  </p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Fortschritt</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors"
                >
                  <Icon name="Plus" size={16} />
                  <span>Neues Set erstellen</span>
                </button>
                <button
                  onClick={() => setShowAIModal(true)}
                  className="inline-flex items-center justify-center space-x-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary px-6 py-3 rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors border border-border dark:border-dark-border"
                >
                  <Icon name="Sparkles" size={16} />
                  <span>KI Generator</span>
                </button>
                <button
                  onClick={() => setShowCreateCardModal(true)}
                  className="inline-flex items-center justify-center space-x-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary px-6 py-3 rounded-2xl font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors border border-border dark:border-dark-border"
                >
                  <Icon name="Plus" size={16} />
                  <span>Einzelne Karte</span>
                </button>
              </div>
            </motion.div>

            {/* Flashcard Sets */}
            <AnimatePresence mode="wait">
              {flashcardSets.length > 0 ? (
                <motion.div
                  key="sets-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Folder" size={20} className="text-text-secondary dark:text-dark-text-secondary" />
                    <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                      Meine Kartensets
                    </h2>
                    <span className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                      ({flashcardSets.length})
                    </span>
                  </div>
                  
                  {/* Desktop Grid */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {flashcardSets.map((set, index) => (
                      <FlashcardSetCard
                        key={set.id}
                        set={set}
                        index={index}
                        onStudy={handleStudySet}
                        onEdit={handleEditSet}
                        onDelete={handleDeleteSet}
                      />
                    ))}
                  </div>

                  {/* Mobile List */}
                  <div className="md:hidden space-y-4">
                    {flashcardSets.map((set, index) => (
                      <FlashcardSetCard
                        key={set.id}
                        set={set}
                        index={index}
                        onStudy={handleStudySet}
                        onEdit={handleEditSet}
                        onDelete={handleDeleteSet}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="no-sets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 rounded-3xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 flex items-center justify-center mx-auto mb-6">
                    <Icon name="CreditCard" size={32} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    Noch keine Kartensets
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                    Erstelle dein erstes Lernkartenset und beginne zu lernen
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    <Icon name="Plus" size={16} />
                    <span>Erstes Set erstellen</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Create Set Modal */}
      <CreateSetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSet={handleCreateSet}
      />

      {/* AI Modal */}
      <AIFlashcardModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onSave={saveFlashcard}
      />

      {/* Create Card Modal */}
      <CreateFlashcardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        onSave={saveFlashcard}
      />

      {/* Edit Modal */}
      <EditFlashcardModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={saveFlashcard}
        flashcard={editingCard}
      />

      {/* Edit Set Modal */}
      <EditSetModal
        isOpen={showEditSetModal}
        onClose={() => {
          setShowEditSetModal(false);
          setEditingSet(null);
        }}
        onSaveSet={handleSaveSet}
        set={editingSet}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAction}
        title={confirmAction?.title}
        message={confirmAction?.message}
        confirmText={confirmAction?.confirmText}
        isDestructive={true}
      />

      {/* Navigation */}
      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default Flashcards; 
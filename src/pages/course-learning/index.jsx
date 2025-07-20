import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

import { useUserProfile } from 'lib/hooks/useUserProfile';
import VideoPlayer from './components/VideoPlayer';

const CourseLearning = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const videoRef = useRef(null);
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [notes, setNotes] = useState('');
  const [personalNotes, setPersonalNotes] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [bookmarkedLessons, setBookmarkedLessons] = useState(new Set());
  const [showSidebar, setShowSidebar] = useState(false);
  const [expandedModules, setExpandedModules] = useState(new Set([1]));
  const [showVideoFullscreen, setShowVideoFullscreen] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState('portrait'); // 'portrait' or 'landscape'

  // Mock course data
  const mockCourseData = {
    1: {
      id: 1,
      title: "Complete React Development Bootcamp",
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
      },
      totalProgress: 35,
      modules: [
        {
          id: 1,
          title: "Getting Started with React",
          lessons: [
            {
              id: 1,
              title: "Course Introduction and Setup",
              type: "video",
              duration: "12:30",
              videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
              description: "Welcome to the Complete React Development Bootcamp! In this lesson, we'll introduce you to the course structure and set up your development environment.",
              transcript: "Welcome to the Complete React Development Bootcamp. I'm Sarah Johnson, and I'll be your instructor throughout this journey. In this course, we'll cover everything from React basics to advanced concepts like hooks, context, and Redux.",
              resources: [
                { name: "Course Slides", url: "#", type: "pdf" },
                { name: "Starter Code", url: "#", type: "zip" },
                { name: "VS Code Extensions", url: "#", type: "link" }
              ],
              quiz: {
                questions: [
                  {
                    id: 1,
                    question: "What is React primarily used for?",
                    type: "multiple-choice",
                    options: [
                      "Building mobile applications only",
                      "Building user interfaces for web applications",
                      "Server-side programming",
                      "Database management"
                    ],
                    correct: 1
                  }
                ]
              }
            },
            {
              id: 2,
              title: "What is React and Why Use It?",
              type: "video",
              duration: "15:45",
              videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
              description: "Learn about React's core concepts, its benefits, and why it's become the most popular frontend framework.",
              transcript: "React is a JavaScript library for building user interfaces. It was created by Facebook and has become one of the most popular frontend frameworks.",
              resources: [
                { name: "React Documentation", url: "#", type: "link" },
                { name: "Component Examples", url: "#", type: "code" }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "React Components Deep Dive",
          lessons: [
            {
              id: 3,
              title: "Understanding JSX",
              type: "video",
              duration: "16:30",
              videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
              description: "Master JSX syntax and learn how to write clean, readable React components.",
              transcript: "JSX is a syntax extension for JavaScript that allows us to write HTML-like code in our JavaScript files.",
              resources: [
                { name: "JSX Cheat Sheet", url: "#", type: "pdf" },
                { name: "Practice Exercises", url: "#", type: "code" }
              ]
            }
          ]
        }
      ]
    }
  };

  const tabs = [
    { id: 'content', label: 'Inhalt', icon: 'Play' },
    { id: 'notes', label: 'Notizen', icon: 'FileText' },
    { id: 'resources', label: 'Materialien', icon: 'Download' },
    { id: 'discussion', label: 'Diskussion', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    setTimeout(() => {
      const courseData = mockCourseData[courseId];
      if (courseData) {
        setCourse(courseData);
        const allLessons = courseData.modules.flatMap(module => module.lessons);
        const lesson = allLessons.find(l => l.id.toString() === lessonId) || allLessons[0];
        setCurrentLesson(lesson);
      }
      setIsLoading(false);
    }, 1000);
  }, [courseId, lessonId]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
    const savedNotes = localStorage.getItem(`course_${courseId}_notes`);
    
    if (savedProgress) {
      setCompletedLessons(new Set(JSON.parse(savedProgress)));
    }
    if (savedNotes) {
      setPersonalNotes(JSON.parse(savedNotes));
    }
  }, [courseId]);

  const markLessonComplete = (lessonId) => {
    const newCompleted = new Set([...completedLessons, lessonId]);
    setCompletedLessons(newCompleted);
    localStorage.setItem(`course_${courseId}_progress`, JSON.stringify([...newCompleted]));
  };

  const toggleBookmark = (lessonId) => {
    const newBookmarks = new Set(bookmarkedLessons);
    if (newBookmarks.has(lessonId)) {
      newBookmarks.delete(lessonId);
    } else {
      newBookmarks.add(lessonId);
    }
    setBookmarkedLessons(newBookmarks);
  };

  const toggleModuleExpansion = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

    const navigateToLesson = (lessonId) => {
    // Use the existing NavigationBridge transition system
      navigate(`/course/${courseId}/learn/${lessonId}`);
  };

  const getNextLesson = () => {
    const allLessons = course?.modules.flatMap(module => module.lessons) || [];
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
    return allLessons[currentIndex + 1] || null;
  };

  const getPreviousLesson = () => {
    const allLessons = course?.modules.flatMap(module => module.lessons) || [];
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
    return allLessons[currentIndex - 1] || null;
  };

  const addNote = () => {
    if (!notes.trim()) return;
    
      const newNote = {
        id: Date.now(),
        content: notes,
      timestamp: Date.now(),
      lessonId: currentLesson?.id
      };
    
      const updatedNotes = [...personalNotes, newNote];
      setPersonalNotes(updatedNotes);
      localStorage.setItem(`course_${courseId}_notes`, JSON.stringify(updatedNotes));
    setNotes('');
  };

  const deleteNote = (noteId) => {
    const updatedNotes = personalNotes.filter(note => note.id !== noteId);
    setPersonalNotes(updatedNotes);
    localStorage.setItem(`course_${courseId}_notes`, JSON.stringify(updatedNotes));
  };

  const submitQuiz = () => {
    // Quiz submission logic
    alert('Quiz eingereicht! Ergebnisse werden angezeigt...');
  };

  if (isLoading) {
        return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <ContextualHeader />
        <div className="pt-16 pb-20 md:pb-4 md:pl-16">
          <div className="p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                Kursinhalte werden geladen...
                </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Bereite deine Lernumgebung vor
                  </p>
              </motion.div>
                  </div>
                    </div>
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
        <div className="min-h-[calc(100vh-4rem)] bg-surface dark:bg-dark-surface">
          
          {/* Mobile Course Header */}
          <div className="md:hidden">
            <div className="relative bg-primary text-white">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigate('/course-library')}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Icon name="ArrowLeft" size={20} />
                  </button>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleBookmark(currentLesson?.id)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Icon 
                        name="Bookmark" 
                        size={20} 
                        className={bookmarkedLessons.has(currentLesson?.id) ? 'fill-white' : ''}
                      />
                    </button>
                    <button
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Icon name="Menu" size={20} />
                    </button>
                        </div>
                </div>
                
                <div className="mb-4">
                  <h1 className="text-xl font-bold mb-2 line-clamp-2">
                    {course?.title}
                  </h1>
                  <div className="flex items-center space-x-3 text-white/80 text-sm">
                    <span>von {course?.instructor.name}</span>
                    <span>•</span>
                    <span>{course?.totalProgress}% abgeschlossen</span>
            </div>
          </div>
                
                {/* Progress Bar */}
                <div className="bg-white/20 rounded-full h-2 mb-4">
                    <motion.div
                    className="bg-white rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${course?.totalProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                
                {/* Current Lesson Info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon name="Play" size={16} />
                        </div>
                      <span className="font-medium">Aktuelle Lektion</span>
                      </div>
                    <span className="text-white/60 text-sm">
                      {course?.modules.flatMap(m => m.lessons).findIndex(l => l.id === currentLesson?.id) + 1} / {course?.modules.flatMap(m => m.lessons).length}
                    </span>
                </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {currentLesson?.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-white/80 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{currentLesson?.duration}</span>
                  </div>
                    {currentLesson?.quiz && (
                      <div className="flex items-center space-x-1">
                        <Icon name="HelpCircle" size={14} />
                        <span>Quiz</span>
                </div>
              )}
            </div>
          </div>
                </div>
                </div>
              </div>

          {/* Mobile TOC Overlay */}
      <AnimatePresence>
            {showSidebar && (
          <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="md:hidden fixed inset-0 z-50 bg-background dark:bg-dark-background"
                style={{ top: '64px' }}
              >
                <div className="h-full overflow-y-auto">
                  {/* TOC Header */}
                  <div className="bg-primary text-white p-4 sticky top-0">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold">Kursinhalte</h2>
                      <button
            onClick={() => setShowSidebar(false)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <Icon name="X" size={20} />
                      </button>
                </div>
                
                    {/* Progress Summary */}
                    <div className="flex items-center space-x-4 text-white/90 text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={16} />
                        <span>{completedLessons.size} erledigt</span>
                  </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={16} />
                        <span>{course?.modules.flatMap(m => m.lessons).length} Lektionen</span>
                  </div>
                </div>
              </div>
              
                  {/* Modules List */}
                  <div className="p-4 space-y-3">
                {course?.modules.map((module, moduleIndex) => {
                      const moduleProgress = (module.lessons.filter(lesson => 
                        completedLessons.has(lesson.id)
                      ).length / module.lessons.length) * 100;
                  
                  return (
                    <motion.div
                      key={module.id}
                          initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: moduleIndex * 0.1 }}
                          className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl overflow-hidden border border-border/10 dark:border-dark-border/10"
                    >
                      {/* Module Header */}
                          <div
                            onClick={() => toggleModuleExpansion(module.id)}
                            className="p-4 cursor-pointer hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                          >
                        <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
                                  <Icon name="BookOpen" size={16} className="text-primary" />
                            </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary text-sm">
                                {module.title}
                                  </h3>
                                  <p className="text-text-tertiary dark:text-dark-text-tertiary text-xs">
                                    {module.lessons.length} Lektionen
                              </p>
                            </div>
                          </div>
                              <div className="flex items-center space-x-2">
                                <div className="bg-surface-primary dark:bg-dark-surface-primary px-2 py-1 rounded-lg">
                                  <span className="text-xs font-bold text-primary">
                                    {Math.round(moduleProgress)}%
                                  </span>
                            </div>
                                <motion.div
                                  animate={{ rotate: expandedModules.has(module.id) ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Icon name="ChevronDown" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                                </motion.div>
                              </div>
                        </div>
                        
                        {/* Module Progress Bar */}
                            <div className="w-full h-2 bg-surface-primary dark:bg-dark-surface-primary rounded-full overflow-hidden">
                          <motion.div 
                                className="h-full bg-gradient-to-r from-primary to-primary-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${moduleProgress}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      
                          {/* Lessons List */}
                          <AnimatePresence>
                            {expandedModules.has(module.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <motion.div
                            key={lesson.id}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: lessonIndex * 0.05 }}
                                      onClick={() => {
                                        navigateToLesson(lesson.id);
                                        setShowSidebar(false);
                                      }}
                                                                            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                              currentLesson?.id === lesson.id
                                          ? 'bg-primary/10 dark:bg-primary/20 border border-primary/20'
                                          : 'hover:bg-surface-primary dark:hover:bg-dark-surface-primary'
                            }`}
                          >
                                      {/* Lesson Status */}
                            <div className="flex-shrink-0">
                              {completedLessons.has(lesson.id) ? (
                                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <Icon name="Check" size={14} className="text-white" />
                                </div>
                              ) : currentLesson?.id === lesson.id ? (
                                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <Icon name="Play" size={12} className="text-white" />
                                </div>
                              ) : (
                                          <div className="w-6 h-6 border-2 border-text-tertiary dark:border-dark-text-tertiary rounded-full"></div>
                              )}
                            </div>
                            
                                      {/* Lesson Info */}
                            <div className="flex-1 min-w-0">
                                                                                <p className={`text-sm font-medium truncate ${
                                currentLesson?.id === lesson.id
                                            ? 'text-primary'
                                            : 'text-text-primary dark:text-dark-text-primary'
                              }`}>
                                {lesson.title}
                                        </p>
                                        <div className="flex items-center space-x-3 mt-1">
                                          <div className="flex items-center space-x-1 text-text-tertiary dark:text-dark-text-tertiary text-xs">
                                            <Icon name="Clock" size={12} />
                                            <span>{lesson.duration}</span>
                              </div>
                                {lesson.quiz && (
                                            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-xs">
                                              <Icon name="HelpCircle" size={12} />
                                              <span>Quiz</span>
                                            </div>
                                )}
                              </div>
                            </div>
                            
                                      {/* Bookmark */}
                                      <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(lesson.id);
                                }}
                                        className="p-1 hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary rounded-lg transition-colors"
                              >
                                <Icon 
                                  name="Bookmark" 
                                          size={14} 
                                          className={bookmarkedLessons.has(lesson.id) 
                                            ? 'text-amber-600 fill-amber-600' 
                                            : 'text-text-tertiary dark:text-dark-text-tertiary'
                                          }
                                        />
                                      </button>
                          </motion.div>
                        ))}
                      </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <motion.div 
            key={currentLesson?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lesson-content p-4 md:p-6 space-y-6"
          >
            {/* Modern Tab Navigation */}
            <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-1 border border-border/10 dark:border-dark-border/10">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap min-w-fit ${
                      activeTab === tab.id
                        ? 'bg-surface-primary dark:bg-dark-surface-primary text-primary shadow-lg'
                        : 'text-text-secondary dark:text-dark-text-secondary hover:text-primary hover:bg-surface-primary/50 dark:hover:bg-dark-surface-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-1.5 rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-primary/10 dark:bg-primary/20'
                        : 'bg-transparent'
                    }`}>
                      <Icon name={tab.icon} size={16} className={activeTab === tab.id ? 'text-primary' : ''} />
                  </div>
                    <span className="hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        layoutId="activeTab"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </motion.button>
                ))}
                  </div>
                </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'content' && (
                  <div className="space-y-6">
                                        {/* Video Player */}
                    <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl overflow-hidden border border-border/10 dark:border-dark-border/10">
                      <div 
                        className="aspect-video bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                        onClick={() => setShowVideoFullscreen(true)}
                      >
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/20 transition-colors">
                            <Icon name="Play" size={24} />
              </div>
                          <p className="text-lg font-semibold mb-2">{currentLesson?.title}</p>
                          <p className="text-white/70">Dauer: {currentLesson?.duration}</p>
                          <p className="text-white/50 text-sm mt-2">Tippen für Vollbild</p>
            </div>
          </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button className="p-2 bg-primary hover:bg-primary-600 text-white rounded-xl transition-colors">
                              <Icon name="Play" size={16} />
                            </button>
                            <div className="flex items-center space-x-2 text-text-secondary dark:text-dark-text-secondary text-sm">
                              <Icon name="Volume2" size={16} />
                              <span>1.0x</span>
                        </div>
                      </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setShowTranscript(!showTranscript)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                showTranscript 
                                  ? 'bg-primary text-white' 
                                  : 'bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary'
                              }`}
                            >
                              Transkript
                            </button>
                            <button className="p-2 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary rounded-lg transition-colors">
                              <Icon name="Settings" size={16} className="text-text-secondary dark:text-dark-text-secondary" />
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>

                    {/* Lesson Description */}
                    <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-6 border border-border/10 dark:border-dark-border/10">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
                          <Icon name="Info" size={16} className="text-primary" />
                      </div>
                        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                          Beschreibung
                        </h3>
                      </div>
                      <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                        {currentLesson?.description}
                      </p>
                    </div>
                    
                    {/* Transcript */}
                    {currentLesson?.transcript && (
                      <AnimatePresence>
                        {showTranscript && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl border border-border/10 dark:border-dark-border/10 overflow-hidden"
                          >
                            <div className="p-6">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
                                  <Icon name="FileText" size={16} className="text-primary" />
                    </div>
                                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                                  Transkript
                                </h3>
                  </div>
                              <div className="bg-surface-primary dark:bg-dark-surface-primary rounded-xl p-4 max-h-64 overflow-y-auto">
                                <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed text-sm">
                                  {currentLesson.transcript}
                                </p>
                </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Quiz Section */}
                    {currentLesson?.quiz && (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700/50">
                      <button
                          onClick={() => setShowQuiz(!showQuiz)}
                          className="w-full flex items-center justify-between p-6 hover:bg-gray-100/50 dark:hover:bg-gray-700/20 transition-colors rounded-2xl"
                        >
                          <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                              <Icon name="HelpCircle" size={16} className="text-gray-600 dark:text-gray-300" />
                </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              Quiz ({currentLesson.quiz.questions.length} Fragen)
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: showQuiz ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon name="ChevronDown" size={20} className="text-gray-600 dark:text-gray-300" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {showQuiz && (
                  <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 space-y-4">
                                {currentLesson.quiz.questions.map((question, index) => (
                                  <div key={question.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600/30">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                      {index + 1}. {question.question}
                                    </h4>
                                    <div className="space-y-2">
                                      {question.options.map((option, optionIndex) => (
                                        <label
                                          key={optionIndex}
                                          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                        >
                                          <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={optionIndex}
                                            checked={quizAnswers[question.id] === optionIndex}
                                            onChange={(e) => setQuizAnswers({
                                              ...quizAnswers,
                                              [question.id]: parseInt(e.target.value)
                                            })}
                                            className="w-4 h-4 text-gray-600"
                                          />
                                          <span className="text-gray-700 dark:text-gray-300 text-sm">{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  onClick={submitQuiz}
                                  className="w-full bg-gray-600 hover:bg-gray-700 text-white border-0"
                                >
                                  Quiz einreichen
                                </Button>
                              </div>
                  </motion.div>
                          )}
                </AnimatePresence>
              </div>
                    )}
            </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-6 border border-border/10 dark:border-dark-border/10">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                          <Icon name="Edit3" size={16} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                          Neue Notiz hinzufügen
                    </h3>
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Schreibe deine Notizen zu dieser Lektion..."
                        className="w-full h-32 p-4 border border-border/20 dark:border-dark-border/20 rounded-xl bg-surface-primary dark:bg-dark-surface-primary text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                      />
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={addNote}
                          disabled={!notes.trim()}
                          className="bg-green-600 hover:bg-green-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Icon name="Plus" size={16} className="mr-2" />
                          Notiz hinzufügen
                        </Button>
                        </div>
                        </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon name="FileText" size={16} className="text-primary" />
                      </div>
                        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                          Meine Notizen ({personalNotes.filter(note => note.lessonId === currentLesson?.id).length})
                        </h3>
                  </div>
                  
                      {personalNotes.filter(note => note.lessonId === currentLesson?.id).length === 0 ? (
                        <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-12 text-center border border-border/10 dark:border-dark-border/10">
                          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="FileText" size={24} className="text-primary" />
                    </div>
                          <p className="text-text-secondary dark:text-dark-text-secondary font-medium mb-2">
                            Noch keine Notizen vorhanden
                          </p>
                          <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm">
                            Füge deine erste Notiz hinzu, um wichtige Punkte festzuhalten.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {personalNotes
                            .filter(note => note.lessonId === currentLesson?.id)
                            .map((note) => (
                              <motion.div
                                key={note.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-4 border border-border/10 dark:border-dark-border/10"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                                    {new Date(note.timestamp).toLocaleString('de-DE')}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteNote(note.id)}
                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                                <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                                  {note.content}
                                </p>
                              </motion.div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-6">
                    <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-6 border border-border/10 dark:border-dark-border/10">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                          <Icon name="Download" size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                          Lektionsmaterialien
                        </h3>
                </div>

                      {currentLesson?.resources ? (
                        <div className="space-y-3">
                          {currentLesson.resources.map((resource, index) => (
                            <motion.a
                              key={index}
                              href={resource.url}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-4 bg-surface-primary dark:bg-dark-surface-primary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors group border border-border/5 dark:border-dark-border/5"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                  <Icon 
                                    name={resource.type === 'pdf' ? 'FileText' : resource.type === 'zip' ? 'Archive' : 'ExternalLink'} 
                                    size={16}
                                    className="text-purple-600 dark:text-purple-400" 
                                  />
                        </div>
                                <div>
                                  <p className="font-medium text-text-primary dark:text-dark-text-primary">
                                    {resource.name}
                                  </p>
                                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary capitalize">
                                    {resource.type} Resource
                                  </p>
                                </div>
                              </div>
                              <Icon 
                                name="Download" 
                                size={20} 
                                className="text-text-tertiary dark:text-dark-text-tertiary group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" 
                              />
                            </motion.a>
                          ))}
                      </div>
                    ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="Download" size={24} className="text-primary" />
                          </div>
                          <p className="text-text-secondary dark:text-dark-text-secondary font-medium mb-2">
                            Keine Materialien verfügbar
                          </p>
                          <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm">
                            Für diese Lektion sind keine zusätzlichen Materialien vorhanden.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div className="space-y-6">
                    <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-8 text-center border border-border/10 dark:border-dark-border/10">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mx-auto mb-6">
                        <Icon name="MessageCircle" size={32} className="text-primary" />
                    </div>
                      <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                        Diskussion
                      </h3>
                      <p className="text-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
                        Diskussionsfunktion kommt bald! Verbinde dich mit anderen Lernenden, stelle Fragen und teile Erkenntnisse.
                      </p>
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
                        <p className="text-sm text-primary font-medium">
                          💡 Tipp: Nutze in der Zwischenzeit die Notizen-Funktion!
                        </p>
                  </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
                  
            {/* Mobile Lesson Navigation */}
            <div className="md:hidden bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-4 border border-border/10 dark:border-dark-border/10">
              <div className="flex items-center justify-between">
                    <Button
                  variant="outline"
                      onClick={() => {
                        const prev = getPreviousLesson();
                        if (prev) navigateToLesson(prev.id);
                      }}
                      disabled={!getPreviousLesson()}
                  className="flex-1 mr-2 border-border/20 dark:border-dark-border/20 text-text-secondary dark:text-dark-text-secondary hover:border-primary hover:bg-primary/5 hover:text-primary disabled:opacity-50"
                    >
                  <Icon name="ChevronLeft" size={16} className="mr-2" />
                  Zurück
                    </Button>
                    
                      <Button
                        onClick={() => {
                          const next = getNextLesson();
                          if (next) navigateToLesson(next.id);
                        }}
                  disabled={!getNextLesson()}
                  className="flex-1 ml-2 bg-primary hover:bg-primary-600 text-white border-0 disabled:opacity-50"
                >
                  Weiter
                  <Icon name="ChevronRight" size={16} className="ml-2" />
                      </Button>
                        </div>
              
              {/* Lesson Status */}
              <div className="mt-4 pt-4 border-t border-border/10 dark:border-dark-border/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-tertiary dark:text-dark-text-tertiary">
                    Lektion {course?.modules.flatMap(m => m.lessons).findIndex(l => l.id === currentLesson?.id) + 1} von {course?.modules.flatMap(m => m.lessons).length}
                        </span>
                  {!completedLessons.has(currentLesson?.id) && (
                    <Button
                      onClick={() => markLessonComplete(currentLesson?.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white border-0"
                    >
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Abschließen
                      </Button>
                    )}
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Video Fullscreen Modal */}
      <AnimatePresence>
        {showVideoFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Video Container */}
            <div className={`h-full w-full flex items-center justify-center relative ${
              videoOrientation === 'landscape' ? 'transform rotate-90' : ''
            }`}>
              {/* Video Player */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Play" size={32} />
                        </div>
                  <p className="text-xl font-semibold mb-2">{currentLesson?.title}</p>
                  <p className="text-white/70 text-lg">Dauer: {currentLesson?.duration}</p>
                  <p className="text-white/50 text-sm mt-4">Video Player Vollbild-Modus</p>
                      </div>
                  </div>

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none">
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto">
                  <button
                    onClick={() => setShowVideoFullscreen(false)}
                    className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <Icon name="ArrowLeft" size={20} />
                  </button>
                  
                  <div className="text-white text-center">
                    <p className="font-semibold">{currentLesson?.title}</p>
                    <p className="text-white/70 text-sm">{currentLesson?.duration}</p>
                </div>

                  <button
                    onClick={() => setVideoOrientation(videoOrientation === 'portrait' ? 'landscape' : 'portrait')}
                    className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <Icon name="RotateCw" size={20} />
                  </button>
              </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
                        <Icon name="SkipBack" size={16} />
                      </button>
                      
                      <button className="p-4 bg-primary rounded-full text-white hover:bg-primary-600 transition-colors">
                        <Icon name={isVideoPlaying ? "Pause" : "Play"} size={20} />
                      </button>
                      
                      <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
                        <Icon name="SkipForward" size={16} />
                      </button>
            </div>

                    <div className="flex items-center space-x-4">
                      <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
                        <Icon name="Volume2" size={16} />
                      </button>
                      
                      <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
                        <Icon name="Settings" size={16} />
                      </button>
          </div>
        </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${videoProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
      </div>

                  <div className="flex justify-between text-white/70 text-sm mt-2">
                    <span>0:00</span>
                    <span>{currentLesson?.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default CourseLearning; 
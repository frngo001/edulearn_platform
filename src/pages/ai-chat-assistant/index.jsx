import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

// Topic Selection Modal Component
const TopicSelectionModal = ({ isOpen, onClose, onSelectTopic }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const predefinedTopics = [
    {
      id: 'programming',
      title: 'Programming',
      description: 'JavaScript, React, Python, Web Development',
      icon: 'Code'
    },
    {
      id: 'design',
      title: 'Design & UI/UX',
      description: 'Figma, Adobe, Prototyping, User Experience',
      icon: 'Palette'
    },
    {
      id: 'business',
      title: 'Business & Marketing',
      description: 'Strategy, Marketing, Entrepreneurship',
      icon: 'TrendingUp'
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Mathematics, Physics, Chemistry, Biology',
      icon: 'Atom'
    },
    {
      id: 'language',
      title: 'Languages',
      description: 'German, English, French, Spanish',
      icon: 'Globe'
    },
    {
      id: 'general',
      title: 'General',
      description: 'General questions and conversation',
      icon: 'MessageCircle'
    }
  ];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setShowCustomInput(false);
    setCustomTopic('');
  };

  const handleCustomTopicSelect = () => {
    setShowCustomInput(true);
    setSelectedTopic(null);
  };

  const handleConfirm = () => {
    if (selectedTopic) {
      onSelectTopic(selectedTopic);
    } else if (customTopic.trim()) {
      onSelectTopic({
        id: 'custom',
        title: customTopic.trim(),
        description: 'Custom topic',
        icon: 'Star'
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedTopic(null);
    setCustomTopic('');
    setShowCustomInput(false);
    onClose();
  };

  if (!isOpen) return null;

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
          transition={{ duration: 0.2 }}
          className="bg-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-border dark:border-dark-border max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border dark:border-dark-border">
            <div className="flex items-center justify-between">
                             <div>
                 <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                   Choose a topic
                 </h2>
                 <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                   Start a new conversation about a specific topic
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
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Predefined Topics List */}
            <div className="space-y-2 mb-6">
              {predefinedTopics.map((topic, index) => (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleTopicSelect(topic)}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 group ${
                    selectedTopic?.id === topic.id
                      ? 'bg-surface-secondary dark:bg-dark-surface-secondary'
                      : 'hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Topic Icon */}
                    <div className="w-6 h-6 rounded-md bg-border dark:bg-dark-border flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name={topic.icon} 
                        size={12} 
                        className="text-text-tertiary dark:text-dark-text-tertiary" 
                      />
                    </div>

                    {/* Topic Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary dark:text-dark-text-primary truncate">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary truncate mt-0.5">
                        {topic.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {selectedTopic?.id === topic.id && (
                      <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Custom Topic Option */}
            <div className="border-t border-border dark:border-dark-border pt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCustomTopicSelect}
                className={`w-full p-3 rounded-xl transition-all duration-200 text-left group ${
                  showCustomInput
                    ? 'bg-surface-secondary dark:bg-dark-surface-secondary'
                    : 'hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-md bg-border dark:bg-dark-border flex items-center justify-center">
                    <Icon name="Plus" size={12} className="text-text-tertiary dark:text-dark-text-tertiary" />
                  </div>
                                     <div className="flex-1">
                     <h4 className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                       Custom Topic
                     </h4>
                     <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                       Create a custom topic
                     </p>
                   </div>
                </div>
              </motion.button>

              {/* Custom Topic Input */}
              <AnimatePresence>
                {showCustomInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                                             placeholder="e.g. Quantum Physics, Cooking Recipes, Photography..."
                      className="w-full px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border rounded-xl text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border dark:border-dark-border bg-surface-secondary dark:bg-dark-surface-secondary">
            <div className="flex items-center justify-between">
                             <button
                 onClick={handleClose}
                 className="px-6 py-2.5 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary rounded-xl hover:bg-surface dark:hover:bg-dark-surface transition-colors font-medium"
               >
                 Cancel
               </button>
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={handleConfirm}
                 disabled={!selectedTopic && !customTopic.trim()}
                 className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                   selectedTopic || customTopic.trim()
                     ? 'bg-primary text-white hover:bg-primary-600 shadow-md hover:shadow-lg'
                     : 'bg-border dark:bg-dark-border text-text-tertiary dark:text-dark-text-tertiary cursor-not-allowed'
                 }`}
               >
                 Start Chat
               </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Recent Chats Dropdown Component
const RecentChatsDropdown = ({ isOpen, onClose, chats, currentChatId, onSelectChat, onNewChat }) => {
  if (!isOpen) return null;

  // Get the 5 most recent chats
  const recentChats = chats
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-surface dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border shadow-2xl z-50 overflow-hidden max-w-[calc(100vw-2rem)]"
      >
        {/* Header */}
        <div className="p-4 border-b border-border dark:border-dark-border">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">Recent chats</h3>
            <button
              onClick={onClose}
              className="p-1.5 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-lg hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-b border-border dark:border-dark-border">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary rounded-xl px-4 py-3 text-sm font-medium hover:bg-border dark:hover:bg-dark-border transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span>New chat</span>
          </motion.button>
        </div>

        {/* Recent Chats List */}
        <div className="max-h-80 overflow-y-auto">
          {recentChats.length > 0 ? (
            <div className="p-2">
              {recentChats.map((chat, index) => (
                <motion.button
                  key={chat.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onSelectChat(chat.id);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 group mb-1 ${
                    currentChatId === chat.id
                      ? 'bg-surface-secondary dark:bg-dark-surface-secondary'
                      : 'hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Chat Icon */}
                    <div className="w-6 h-6 rounded-md bg-border dark:bg-dark-border flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name="MessageSquare" 
                        size={12} 
                        className="text-text-tertiary dark:text-dark-text-tertiary" 
                      />
                    </div>

                    {/* Chat Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary dark:text-dark-text-primary truncate">
                        {chat.title}
                      </h4>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary truncate mt-0.5">
                        {new Date(chat.timestamp).toLocaleDateString('de-DE', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="MessageSquare" size={20} className="text-text-tertiary dark:text-dark-text-tertiary" />
              </div>
              <h4 className="text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">Noch keine Unterhaltungen</h4>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Starte deine erste Unterhaltung mit der KI</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {recentChats.length > 0 && (
          <div className="p-3 border-t border-border dark:border-dark-border bg-surface-secondary dark:bg-dark-surface-secondary">
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary text-center">
              Alle Unterhaltungen ({chats.length})
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const AiChatAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showRecentChats, setShowRecentChats] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [showTopicSelection, setShowTopicSelection] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

      // Mock chats data
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'React Hooks Explanation',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 1,
          type: 'user',
          content: 'hi',
          timestamp: new Date()
        },
        {
          id: 2,
          type: 'assistant',
          content: 'Hallo! Ich bin dein KI-Lernassistent. Ich kann dir bei deinen Studien helfen, Fragen beantworten und Lernmaterialien erklären. Womit kann ich dir heute helfen?',
          timestamp: new Date()
        },
        {
          id: 3,
          type: 'user',
          content: 'Can you explain useState hook?',
          timestamp: new Date()
        },
        {
          id: 4,
          type: 'assistant',
          content: 'Absolutely! The useState hook is one of the most fundamental hooks in React.\n\nHere\'s how it works:\n\n```javascript\nconst [state, setState] = useState(initialValue);\n```\n\n- `state` is the current value\n- `setState` is the function to update it\n- `initialValue` is the starting value\n\nExample:\n```javascript\nconst [count, setCount] = useState(0);\n```',
          timestamp: new Date()
        },
        {
          id: 5,
          type: 'user',
          content: 'What about useEffect?',
          timestamp: new Date()
        },
        {
          id: 6,
          type: 'assistant',
          content: 'Great question! useEffect is used for side effects in functional components.\n\nBasic syntax:\n```javascript\nuseEffect(() => {\n  // Side effect code\n}, [dependencies]);\n```\n\nCommon use cases:\n- API calls\n- Setting up subscriptions\n- Manually changing the DOM\n- Cleanup operations\n\nThe dependency array controls when the effect runs.',
          timestamp: new Date()
        },
        {
          id: 7,
          type: 'user',
          content: 'Can you show me a practical example?',
          timestamp: new Date()
        },
        {
          id: 8,
          type: 'assistant',
          content: 'Sure! Here\'s a practical example of a component that fetches user data:\n\n```javascript\nimport React, { useState, useEffect } from \'react\';\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchUser = async () => {\n      try {\n        setLoading(true);\n        const response = await fetch(`/api/users/${userId}`);\n        const userData = await response.json();\n        setUser(userData);\n      } catch (err) {\n        setError(err.message);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchUser();\n  }, [userId]); // Re-run when userId changes\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  if (!user) return <div>No user found</div>;\n\n  return (\n    <div>\n      <h1>{user.name}</h1>\n      <p>{user.email}</p>\n    </div>\n  );\n}\n```\n\nThis example shows:\n- State management with useState\n- Side effects with useEffect\n- Dependency array [userId]\n- Loading and error states\n- Async operations',
          timestamp: new Date()
        }
      ]
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      messages: []
    },
    {
      id: 3,
      title: 'CSS Grid Layout',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      messages: []
    }
  ]);

  // Get current chat messages
  const currentChat = chats.find(chat => chat.id === currentChatId);
  const [messages, setMessages] = useState(currentChat?.messages || []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    // Scroll to the very bottom of the container
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
    // Also use the ref as backup
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollToBottom(false);
    setIsUserScrolling(false);
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // Reduced threshold for better detection
    
    // Show scroll to bottom button if not at bottom and has enough messages
    const shouldShow = !isAtBottom && messages.length > 2;
    setShowScrollToBottom(shouldShow);
    
    // Track if user is manually scrolling
    if (!isAtBottom) {
      setIsUserScrolling(true);
    } else {
      setIsUserScrolling(false);
    }
  };

  useEffect(() => {
    // Only auto-scroll if user is not manually scrolling
    if (!isUserScrolling) {
      scrollToBottom();
    }
  }, [messages, isUserScrolling]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  // Force check scroll position when messages change
  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 100);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim() && attachedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : null
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    updateCurrentChat(newMessages);
    setInput('');
    setAttachedFiles([]);
    setIsTyping(true);
    setIsUserScrolling(false); // Reset scrolling state when sending message

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I\'m here to help! How can I assist you today?',
        timestamp: new Date()
      };
      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);
      updateCurrentChat(finalMessages);
      setIsTyping(false);
    }, 1500);
  };

  const updateCurrentChat = (newMessages) => {
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: newMessages, timestamp: new Date().toISOString() }
        : chat
    ));
  };

  const handleSelectChat = (chatId) => {
    const selectedChat = chats.find(chat => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages || []);
      setIsUserScrolling(false); // Reset scroll state when switching chats
      setShowScrollToBottom(false);
    }
  };

  const handleNewChat = () => {
    setShowTopicSelection(true);
  };

  const handleTopicSelect = (topic) => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: topic.title,
      topic: topic,
      timestamp: new Date().toISOString(),
      messages: []
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
    setShowTopicSelection(false);
    setIsUserScrolling(false); // Reset scroll state for new chat
    setShowScrollToBottom(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
    e.target.value = ''; // Reset input
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCopyMessage = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const handleBookmarkMessage = (message) => {
    // Implementation for bookmarking
    console.log('Bookmarked message:', message);
    // Could save to localStorage or send to backend
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const truncateFileName = (fileName, maxLength = 25) => {
    if (fileName.length <= maxLength) return fileName;
    
    // Finde die Dateiendung
    const lastDotIndex = fileName.lastIndexOf('.');
    const extension = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
    const nameWithoutExtension = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
    
    // Berechne verfügbare Zeichen für den Namen (minus Extension und "...")
    const availableLength = maxLength - extension.length - 3; // 3 für "..."
    
    if (availableLength <= 0) {
      // Wenn sogar die Extension zu lang ist, zeige nur die ersten Zeichen
      return fileName.substring(0, maxLength - 3) + '...';
    }
    
    // Teile die verfügbaren Zeichen zwischen Anfang und Ende auf
    const startLength = Math.ceil(availableLength / 2);
    const endLength = Math.floor(availableLength / 2);
    
    const start = nameWithoutExtension.substring(0, startLength);
    const end = nameWithoutExtension.substring(nameWithoutExtension.length - endLength);
    
    return start + '...' + end + extension;
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader 
        showRecentChats={showRecentChats}
        setShowRecentChats={setShowRecentChats}
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        RecentChatsDropdown={RecentChatsDropdown}
      />

      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        {/* Chat Messages - optimiert für perfektes Scrollen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] bg-surface dark:bg-dark-surface overflow-hidden"
        >
          <div 
            ref={chatContainerRef}
            className="h-full overflow-y-auto px-4 py-4 space-y-4"
            style={{ paddingBottom: isMobile ? '200px' : '140px' }}
          >
            {/* Welcome Message for New Chats */}
            {messages.length === 0 && currentChat?.topic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center min-h-[50vh]"
              >
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 rounded-2xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border flex items-center justify-center mx-auto mb-4">
                    <Icon name={currentChat.topic.icon} size={32} className="text-text-secondary dark:text-dark-text-secondary" />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    {currentChat.topic.title}
                  </h2>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                    {currentChat.topic.description}
                  </p>
                  <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-4 text-left border border-border/30 dark:border-dark-border/30">
                                         <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                       💡 <strong>Tip:</strong> Ask specific questions about this topic for the best answers!
                     </p>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {/* File Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-2 space-y-1">
                        {message.attachments.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center space-x-2 bg-surface-secondary dark:bg-dark-surface-secondary rounded-lg px-3 py-2 text-sm">
                            <Icon name="Paperclip" size={14} className="text-text-tertiary dark:text-dark-text-tertiary" />
                            <span className="text-text-primary dark:text-dark-text-primary font-medium" title={file.name}>
                              {isMobile ? truncateFileName(file.name, 20) : file.name}
                            </span>
                            <span className="text-text-tertiary dark:text-dark-text-tertiary text-xs">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-white ml-auto'
                          : 'bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>

                    {/* Message Actions - Only for Assistant Messages */}
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyMessage(message.content)}
                          className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-text-primary dark:hover:text-dark-text-primary rounded-lg hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
                          title="Copy"
                        >
                          <Icon name="Copy" size={14} />
                        </button>
                        <button
                          onClick={() => handleBookmarkMessage(message)}
                          className="p-2 text-text-tertiary dark:text-dark-text-tertiary hover:text-accent dark:hover:text-accent rounded-lg hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
                          title="Add to bookmarks"
                        >
                          <Icon name="Bookmark" size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[85%]">
                  <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-tertiary dark:bg-dark-text-tertiary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-tertiary dark:bg-dark-text-tertiary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-text-tertiary dark:bg-dark-text-tertiary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to Bottom Button */}
          <AnimatePresence>
            {showScrollToBottom && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={scrollToBottom}
                className="absolute bottom-32 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 z-20"
                aria-label="Scroll to bottom"
              >
                <Icon name="ArrowDown" size={20} className="text-white" />
              </motion.button>
            )}
          </AnimatePresence>


        </motion.div>

        {/* Input Area - Schönes Design ohne Trennlinie */}
        <div className="fixed bottom-0 left-0 right-0 md:left-16 bg-gradient-to-t from-surface dark:from-dark-surface via-surface dark:via-dark-surface to-transparent pt-6 pb-4 px-4 z-10">
          {/* File Attachments Preview */}
          <AnimatePresence>
            {attachedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-2"
              >
                {attachedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl px-3 py-2 shadow-sm border border-border/30 dark:border-dark-border/30"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Paperclip" size={14} className="text-primary dark:text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-text-primary dark:text-dark-text-primary font-medium text-sm" title={file.name}>
                          {isMobile ? truncateFileName(file.name, 18) : file.name}
                        </span>
                        <span className="text-text-tertiary dark:text-dark-text-tertiary text-xs">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFile(index)}
                      className="w-6 h-6 bg-error/10 dark:bg-error/20 hover:bg-error/20 dark:hover:bg-error/30 text-error rounded-full flex items-center justify-center transition-colors"
                    >
                      <Icon name="X" size={12} />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input Container */}
          <div className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-3xl shadow-lg border border-border/20 dark:border-dark-border/20 p-1">
            <form onSubmit={handleSendMessage} className="flex items-end">
              {/* File Upload Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary rounded-2xl hover:bg-surface dark:hover:bg-dark-surface transition-all duration-200 flex items-center justify-center flex-shrink-0 ml-1"
              >
                <Icon name="Paperclip" size={18} />
              </motion.button>

              {/* Text Input */}
              <div className="flex-1 px-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="w-full bg-transparent text-text-primary dark:text-dark-text-primary placeholder-text-tertiary dark:placeholder-dark-text-tertiary resize-none border-none outline-none focus:outline-none focus:ring-0 focus:border-none py-3 text-sm leading-relaxed min-h-[44px] max-h-[120px] overflow-y-auto"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent',
                    boxShadow: 'none'
                  }}
                />
              </div>

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: input.trim() || attachedFiles.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: input.trim() || attachedFiles.length > 0 ? 0.95 : 1 }}
                type="submit"
                disabled={!input.trim() && attachedFiles.length === 0}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 flex-shrink-0 mr-1 ${
                  input.trim() || attachedFiles.length > 0
                    ? 'bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary-600'
                    : 'bg-border/50 dark:bg-dark-border/50 text-text-tertiary dark:text-dark-text-tertiary cursor-not-allowed'
                }`}
              >
                <Icon name="ArrowUp" size={16} />
              </motion.button>
            </form>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.mp4,.mov"
          />
        </div>
      </main>

      <NavigationBridge />
      <StudySessionOverlay />
      <BottomTabNavigation />

      {/* Topic Selection Modal */}
      <TopicSelectionModal
        isOpen={showTopicSelection}
        onClose={() => setShowTopicSelection(false)}
        onSelectTopic={handleTopicSelect}
      />
    </div>
  );
};

export default AiChatAssistant;
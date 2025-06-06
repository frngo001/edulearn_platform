import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';
import NavigationBridge from 'components/ui/NavigationBridge';

const AiChatAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  // Mock data for courses
  const mockCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      lesson: "React Hooks and State Management",
      progress: 75,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      lesson: "Binary Trees and Graph Traversal",
      progress: 60,
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      lesson: "Neural Networks Introduction",
      progress: 45,
      color: "from-orange-500 to-red-600"
    }
  ];

  // Mock chat messages
  const mockMessages = [
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI learning assistant. I'm here to help you understand complex concepts, answer questions, and provide personalized learning support.

How can I assist you with your studies today?`,
      timestamp: new Date(Date.now() - 3600000),
      course: 'Advanced React Development',
      hasCode: false
    },
    {
      id: 2,
      type: 'user',
      content: "Can you explain the difference between useState and useReducer hooks in React?",
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: 3,
      type: 'ai',
      content: `Great question! Let me explain the key differences between useState and useReducer:

**useState** is perfect for simple state management:
- Best for primitive values (strings, numbers, booleans)
- Simple state updates
- When you have independent state variables

**useReducer** is better for complex state logic:
- Managing objects with multiple sub-values
- When state transitions depend on previous state
- Complex state logic that involves multiple sub-values

Here's a practical example:`,timestamp: new Date(Date.now() - 3400000),course: 'Advanced React Development',
      hasCode: true,
      codeExample: `// useState example
const [count, setCount] = useState(0);
const [name, setName] = useState('');

// useReducer example
const initialState = { count: 0, name: '', loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'setName':
      return { ...state, name: action.payload };
    case 'setLoading':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);`
    },
    {
      id: 4,
      type: 'user',
      content: "That\'s helpful! Can you create some practice questions about React hooks?",
      timestamp: new Date(Date.now() - 3200000)
    },
    {
      id: 5,
      type: 'ai',
      content: `Absolutely! Here are some practice questions to test your understanding of React hooks:

**Beginner Level:**
1. What is the purpose of the dependency array in useEffect?
2. When would you use useState vs useReducer?
3. What happens if you forget to include a dependency in useEffect?

**Intermediate Level:**
4. How would you implement a custom hook for API data fetching?
5. Explain the difference between useCallback and useMemo
6. What are the rules of hooks and why are they important?

**Advanced Level:**
7. How would you optimize a component that re-renders frequently due to prop changes?
8. Implement a custom hook that manages localStorage state
9. Explain how useRef differs from useState for storing values

Would you like me to provide detailed answers for any of these questions?`,
      timestamp: new Date(Date.now() - 3000000),
      course: 'Advanced React Development',
      hasCode: false
    }
  ];

  // Quick suggestion chips
  const quickSuggestions = [
    { text: "Explain this concept", icon: "BookOpen" },
    { text: "Create practice questions", icon: "HelpCircle" },
    { text: "Summarize this lesson", icon: "FileText" },
    { text: "Show examples", icon: "Code" },
    { text: "Test my knowledge", icon: "Brain" },
    { text: "Related topics", icon: "Link" }
  ];

  useEffect(() => {
    setMessages(mockMessages);
    setSelectedCourse(mockCourses[0]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = messages.filter(message =>
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [searchQuery, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !attachedFile) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachment: attachedFile
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setAttachedFile(null);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: `I understand your question about "${inputMessage}". Let me provide you with a comprehensive explanation.

This is a great topic that many students find challenging. Based on your current course progress in ${selectedCourse?.title}, I can see you're working on advanced concepts.Here's what you need to know:
• Key concept explanation with practical examples
• Step-by-step breakdown of the process
• Common pitfalls to avoid
• Best practices and recommendations

Would you like me to elaborate on any specific aspect or provide additional practice exercises?`,
        timestamp: new Date(),
        course: selectedCourse?.title,
        hasCode: Math.random() > 0.5
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputMessage(suggestion.text);
    inputRef.current?.focus();
  };

  const handleVoiceToggle = () => {
    setIsVoiceRecording(!isVoiceRecording);
    // Voice recording logic would go here
  };

  const handleFileAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const displayMessages = showSearch ? filteredMessages : messages;

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      <NavigationBridge />
      
      <div className="pt-16 pb-20 md:pb-4 md:pl-64">
        <div className="h-screen flex flex-col">
          {/* Context Panel */}
          {showContextPanel && selectedCourse && (
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${selectedCourse.color} rounded-lg flex items-center justify-center`}>
                    <Icon name="BookOpen" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary">
                      {selectedCourse.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Current: {selectedCourse.lesson}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContextPanel(false)}
                  className="p-2 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors duration-150"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-text-secondary mb-1">
                  <span>Progress</span>
                  <span>{selectedCourse.progress}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${selectedCourse.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${selectedCourse.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          {showSearch && (
            <div className="bg-surface border-b border-border p-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search conversation history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200"
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              {searchQuery && (
                <p className="text-sm text-text-secondary mt-2">
                  Found {filteredMessages.length} message(s)
                </p>
              )}
            </div>
          )}

          {/* Chat Header */}
          <div className="bg-surface border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-text-primary">AI Learning Assistant</h2>
                <p className="text-sm text-text-secondary">
                  {isTyping ? 'Typing...' : 'Online • Ready to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowContextPanel(!showContextPanel)}
                className={`p-2 rounded-lg transition-colors duration-150 ${
                  showContextPanel 
                    ? 'bg-primary-100 text-primary-700' :'hover:bg-gray-100 text-text-secondary'
                }`}
                aria-label="Toggle context panel"
              >
                <Icon name="Info" size={20} />
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-lg transition-colors duration-150 ${
                  showSearch 
                    ? 'bg-primary-100 text-primary-700' :'hover:bg-gray-100 text-text-secondary'
                }`}
                aria-label="Search messages"
              >
                <Icon name="Search" size={20} />
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors duration-150"
                aria-label="Exit chat"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {displayMessages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {searchQuery ? 'No messages found' : 'Start a conversation'}
                </h3>
                <p className="text-text-secondary">
                  {searchQuery 
                    ? 'Try adjusting your search terms' :'Ask me anything about your courses or learning topics'
                  }
                </p>
              </div>
            ) : (
              displayMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user' ?'bg-primary text-white' :'bg-surface border border-border'
                      }`}
                    >
                      {message.attachment && (
                        <div className="mb-3 p-3 bg-white bg-opacity-20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Icon name="Paperclip" size={16} className="text-current opacity-70" />
                            <span className="text-sm font-medium">{message.attachment.name}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>

                      {message.hasCode && message.codeExample && (
                        <div className="mt-3 bg-gray-900 rounded-lg p-3 overflow-x-auto">
                          <pre className="text-sm text-gray-100">
                            <code>{message.codeExample}</code>
                          </pre>
                        </div>
                      )}

                      {message.course && (
                        <div className="mt-2 text-xs opacity-70">
                          Related to: {message.course}
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 space-x-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-text-tertiary">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.type === 'ai' && (
                        <div className="flex space-x-1">
                          <button className="p-1 rounded hover:bg-gray-100 transition-colors duration-150">
                            <Icon name="Copy" size={12} className="text-text-tertiary" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100 transition-colors duration-150">
                            <Icon name="Bookmark" size={12} className="text-text-tertiary" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ?'order-1 mr-3 bg-gradient-to-br from-accent to-warning' :'order-2 ml-3 bg-gradient-to-br from-secondary to-primary'
                  }`}>
                    <Icon 
                      name={message.type === 'user' ? 'User' : 'Bot'} 
                      size={16} 
                      className="text-white" 
                    />
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs">
                  <div className="bg-surface border border-border rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0 ml-3">
                  <Icon name="Bot" size={16} className="text-white" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-border bg-surface">
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    <Icon name={suggestion.icon} size={14} />
                    <span>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-surface border-t border-border p-4">
            {attachedFile && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} className="text-text-tertiary" />
                  <span className="text-sm text-text-primary">{attachedFile.name}</span>
                  <span className="text-xs text-text-tertiary">({formatFileSize(attachedFile.size)})</span>
                </div>
                <button
                  onClick={() => setAttachedFile(null)}
                  className="p-1 rounded hover:bg-gray-200 transition-colors duration-150"
                >
                  <Icon name="X" size={14} className="text-text-tertiary" />
                </button>
              </div>
            )}

            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your courses..."
                    className="w-full px-4 py-3 pr-12 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary transition-colors duration-200 resize-none max-h-32"
                    rows="1"
                    style={{ minHeight: '48px' }}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileAttachment}
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                    >
                      <Icon name="Paperclip" size={16} className="text-text-tertiary" />
                    </label>
                    <button
                      onClick={handleVoiceToggle}
                      className={`p-1 rounded transition-colors duration-150 ${
                        isVoiceRecording 
                          ? 'bg-error text-white' :'hover:bg-gray-100 text-text-tertiary'
                      }`}
                    >
                      <Icon name={isVoiceRecording ? 'MicOff' : 'Mic'} size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() && !attachedFile}
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <Icon name="Send" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
      <StudySessionOverlay />
    </div>
  );
};

export default AiChatAssistant;
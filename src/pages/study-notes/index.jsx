import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';


const StudyNotes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // Mock notes data - using state to allow modifications
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "JavaScript Array Methods",
      content: "Important array methods to remember:\n• map() - transforms elements\n• filter() - filters elements\n• reduce() - reduces to single value\n• forEach() - iterates over elements",
      category: "javascript",
      tags: ["arrays", "methods", "fundamentals"],
      course: "Web Development",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T14:22:00Z",
      isFavorite: true,
      isPinned: false,
      likes: 5,
      color: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    {
      id: 2,
      title: "React Hooks Cheat Sheet",
      content: "Essential React Hooks:\n\n1. useState - manages component state\n2. useEffect - handles side effects\n3. useContext - consumes context\n4. useReducer - complex state management\n5. useMemo - memoizes expensive calculations",
      category: "react",
      tags: ["hooks", "react", "cheatsheet"],
      course: "Frontend Development",
      createdAt: "2024-01-14T09:15:00Z",
      updatedAt: "2024-01-16T11:45:00Z",
      isFavorite: false,
      isPinned: true,
      likes: 12,
      color: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      content: "When to use Grid vs Flexbox:\n\nGrid:\n• 2D layouts (rows and columns)\n• Complex layouts\n• Page structure\n\nFlexbox:\n• 1D layouts\n• Component alignment\n• Space distribution",
      category: "css",
      tags: ["css", "grid", "flexbox", "layout"],
      course: "Web Design",
      createdAt: "2024-01-13T16:20:00Z",
      updatedAt: "2024-01-13T16:20:00Z",
      isFavorite: true,
      isPinned: false,
      likes: 8,
      color: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    {
      id: 4,
      title: "Python Data Types",
      content: "Basic Python data types:\n\n• int - integers (1, 2, 3)\n• float - decimal numbers (3.14)\n• str - strings ('hello')\n• bool - True/False\n• list - [1, 2, 3]\n• dict - {'key': 'value'}\n• tuple - (1, 2, 3)",
      category: "python",
      tags: ["python", "datatypes", "basics"],
      course: "Python Programming",
      createdAt: "2024-01-12T13:45:00Z",
      updatedAt: "2024-01-12T13:45:00Z",
      isFavorite: false,
      isPinned: false,
      likes: 3,
      color: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    {
      id: 5,
      title: "Database Normalization",
      content: "Normal Forms:\n\n1NF: Eliminate duplicate columns\n2NF: Remove subsets of data\n3NF: Remove columns not dependent on primary key\n\nBenefits:\n• Reduces redundancy\n• Improves data integrity\n• Easier maintenance",
      category: "database",
      tags: ["database", "normalization", "sql"],
      course: "Database Management",
      createdAt: "2024-01-11T11:30:00Z",
      updatedAt: "2024-01-11T11:30:00Z",
      isFavorite: false,
      isPinned: false,
      likes: 7,
      color: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    },
    {
      id: 6,
      title: "Git Commands Reference",
      content: "Essential Git commands:\n\n• git init - initialize repository\n• git clone - copy repository\n• git add . - stage changes\n• git commit -m 'message' - save changes\n• git push - upload to remote\n• git pull - download from remote\n• git branch - manage branches\n• git merge - combine branches",
      category: "tools",
      tags: ["git", "version control", "commands"],
      course: "Development Tools",
      createdAt: "2024-01-10T15:00:00Z",
      updatedAt: "2024-01-15T09:30:00Z",
      isFavorite: true,
      isPinned: true,
      likes: 15,
      color: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    }
  ]);

  const categories = [
    { id: 'all', label: 'Alle', icon: 'FileText', count: notes.length },
    { id: 'favorites', label: 'Favoriten', icon: 'Heart', count: notes.filter(n => n.isFavorite).length },
    { id: 'pinned', label: 'Angeheftet', icon: 'Pin', count: notes.filter(n => n.isPinned).length },
    { id: 'javascript', label: 'JavaScript', icon: 'Code', count: notes.filter(n => n.category === 'javascript').length },
    { id: 'react', label: 'React', icon: 'Atom', count: notes.filter(n => n.category === 'react').length },
    { id: 'css', label: 'CSS', icon: 'Palette', count: notes.filter(n => n.category === 'css').length },
    { id: 'python', label: 'Python', icon: 'Terminal', count: notes.filter(n => n.category === 'python').length },
    { id: 'database', label: 'Database', icon: 'Database', count: notes.filter(n => n.category === 'database').length },
    { id: 'tools', label: 'Tools', icon: 'Wrench', count: notes.filter(n => n.category === 'tools').length }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'all' || 
                          selectedCategory === 'favorites' && note.isFavorite ||
                          selectedCategory === 'pinned' && note.isPinned ||
                          note.category === selectedCategory;
    
    const matchesSearch = searchQuery === '' || 
                         note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // Favoriten zuerst, dann angeheftete, dann normale Notizen
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Bei gleicher Priorität nach Aktualisierungsdatum sortieren (neueste zuerst)
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  // Note actions
  const toggleFavorite = (noteId, e) => {
    e.stopPropagation();
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, isFavorite: !note.isFavorite }
          : note
      )
    );
  };

  const togglePin = (noteId, e) => {
    e.stopPropagation();
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, isPinned: !note.isPinned }
          : note
      )
    );
  };

  const likeNote = (noteId, e) => {
    e.stopPropagation();
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, likes: note.likes + 1 }
          : note
      )
    );
  };

  const startEditing = (note, e) => {
    e.stopPropagation();
    setEditingNote({...note});
  };

  const saveEdit = () => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === editingNote.id 
          ? { ...editingNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setEditingNote(null);
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCategoriesDropdown && !event.target.closest('.categories-dropdown')) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showCategoriesDropdown]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="px-4 py-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 hidden md:block">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2 md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Notizen
              </motion.h1>
              <p className="text-gray-500 dark:text-gray-400 md:text-lg">
                Minimalistisch. Organisiert. Effizient.
              </p>
            </div>

            {/* Search and Actions Bar */}
            <motion.div 
              className="flex flex-col gap-4 mb-8 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-0 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 shadow-sm md:py-3"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="px-4 py-4 bg-white dark:bg-gray-800 border-0 rounded-2xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm active:scale-95 md:py-3"
                >
                  <Icon name={viewMode === 'grid' ? 'List' : 'Grid3X3'} size={20} />
                </button>
                <button
                  onClick={() => setShowNewNote(true)}
                  className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-colors duration-200 shadow-md font-medium active:scale-95 md:py-3"
                >
                  <Icon name="Plus" size={20} />
                  <span>Neue Notiz</span>
                </button>
              </div>
            </motion.div>

            {/* Mobile Categories Dropdown */}
            <div className="mb-6 lg:hidden">
              <div className="relative categories-dropdown">
                <button
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  className="w-full flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-0 text-gray-900 dark:text-white font-medium transition-all duration-200 active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={categories.find(cat => cat.id === selectedCategory)?.icon || 'FileText'} size={18} />
                    <span>
                      {categories.find(cat => cat.id === selectedCategory)?.label || 'Alle'}
                    </span>
                    <span className="px-2 py-1 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      {categories.find(cat => cat.id === selectedCategory)?.count || 0}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: showCategoriesDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ChevronDown" size={20} className="text-gray-400" />
                  </motion.div>
                </button>

                {/* Dropdown Menu */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: showCategoriesDropdown ? 1 : 0,
                    y: showCategoriesDropdown ? 0 : -10,
                    scale: showCategoriesDropdown ? 1 : 0.95
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-0 z-10 overflow-hidden ${
                    showCategoriesDropdown ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  <div className="p-2">
                    {categories.map((category, index) => (
                                             <motion.button
                         key={category.id}
                         onClick={() => {
                           setSelectedCategory(category.id);
                           setShowCategoriesDropdown(false);
                         }}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ 
                           opacity: showCategoriesDropdown ? 1 : 0,
                           x: showCategoriesDropdown ? 0 : -20
                         }}
                         transition={{ 
                           duration: 0.2, 
                           delay: showCategoriesDropdown ? index * 0.05 : 0,
                           ease: "easeOut"
                         }}
                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 active:scale-95 ${
                           selectedCategory === category.id
                             ? 'bg-primary text-white'
                             : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <Icon name={category.icon} size={16} />
                           <span>{category.label}</span>
                         </div>
                         <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                           selectedCategory === category.id
                             ? 'bg-white/20 text-white'
                             : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                         }`}>
                           {category.count}
                         </span>
                       </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Desktop Categories Sidebar */}
              <motion.div 
                className="hidden lg:block lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Kategorien</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors duration-200 active:scale-95 ${
                          selectedCategory === category.id
                            ? 'bg-primary text-white'
                            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={category.icon} size={18} />
                          <span>{category.label}</span>
                        </div>
                                                 <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                           selectedCategory === category.id
                             ? 'bg-white/20 text-white'
                             : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                         }`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Notes Grid/List */}
              <div className="col-span-1 lg:col-span-3">
                {filteredNotes.length > 0 ? (
                  <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6' 
                    : 'space-y-4'
                  }>
                    {filteredNotes.map((note, index) => (
                      <motion.div
                        key={note.id}
                        className={`${note.color} rounded-3xl p-6 shadow-sm border cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 hover:scale-[1.02] group`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        onClick={() => setSelectedNote(note)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1 mr-3 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                            {note.title}
                          </h3>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={(e) => togglePin(note.id, e)}
                              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 active:scale-95 ${
                                note.isPinned 
                                  ? 'bg-primary text-white hover:bg-primary-700' 
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              <Icon name="Pin" size={12} className={
                                note.isPinned 
                                  ? 'text-white' 
                                  : 'text-gray-600 dark:text-gray-400'
                              } />
                            </button>
                            <button
                              onClick={(e) => toggleFavorite(note.id, e)}
                              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
                                note.isFavorite 
                                  ? 'bg-red-500 hover:bg-red-600' 
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              <Icon name="Heart" size={12} className={
                                note.isFavorite 
                                  ? 'text-white fill-current' 
                                  : 'text-gray-600 dark:text-gray-400'
                              } />
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 whitespace-pre-line leading-relaxed">
                          {truncateContent(note.content)}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {note.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {note.tags.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                              +{note.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => likeNote(note.id, e)}
                              className="flex items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors active:scale-95"
                            >
                              <Icon name="ThumbsUp" size={14} />
                              <span className="text-xs font-medium">{note.likes}</span>
                            </button>
                            <button
                              onClick={(e) => startEditing(note, e)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors active:scale-95"
                            >
                              <Icon name="Edit3" size={14} />
                            </button>
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            <span className="font-medium">{note.course}</span>
                            <span className="mx-2">•</span>
                          <span>{formatDate(note.updatedAt)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="FileText" size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Keine Notizen
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                      {searchQuery ? `Nichts für "${searchQuery}" gefunden` : `Keine Notizen in ${selectedCategory}`}
                    </p>
                    <button
                      onClick={() => setShowNewNote(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-colors duration-200 font-medium shadow-md active:scale-95"
                    >
                      <Icon name="Plus" size={18} />
                      <span>Erste Notiz erstellen</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Notiz bearbeiten
              </h2>
              <button
                onClick={cancelEdit}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inhalt
                </label>
                <textarea
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                  rows={10}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (durch Komma getrennt)
                </label>
                <input
                  type="text"
                  value={editingNote.tags.join(', ')}
                  onChange={(e) => setEditingNote({...editingNote, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelEdit}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-2xl hover:bg-primary-700 transition-colors duration-200 font-medium"
              >
                Speichern
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudyNotes; 
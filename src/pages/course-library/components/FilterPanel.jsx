import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, onClose, onApply, activeFilters }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    difficulty: [],
    duration: '',
    rating: 0,
    language: [],
    category: []
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    difficulty: true,
    duration: true,
    rating: true,
    language: false,
    category: false
  });

  useEffect(() => {
    setFilters({ ...filters, ...activeFilters });
  }, [activeFilters]);

  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const durationOptions = [
    { value: 'short', label: '0-10 hours' },
    { value: 'medium', label: '10-30 hours' },
    { value: 'long', label: '30+ hours' }
  ];
  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Chinese'];
  const categoryOptions = ['Technology', 'Business', 'Arts', 'Science', 'Health', 'Language'];

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    setFilters({ ...filters, priceRange: newRange });
  };

  const handleDifficultyToggle = (difficulty) => {
    const newDifficulty = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    setFilters({ ...filters, difficulty: newDifficulty });
  };

  const handleLanguageToggle = (language) => {
    const newLanguage = filters.language.includes(language)
      ? filters.language.filter(l => l !== language)
      : [...filters.language, language];
    setFilters({ ...filters, language: newLanguage });
  };

  const handleCategoryToggle = (category) => {
    const newCategory = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    setFilters({ ...filters, category: newCategory });
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleApply = () => {
    const cleanFilters = {};
    
    // Only include non-empty filters
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) {
      cleanFilters.priceRange = filters.priceRange;
    }
    if (filters.difficulty.length > 0) {
      cleanFilters.difficulty = filters.difficulty;
    }
    if (filters.duration) {
      cleanFilters.duration = filters.duration;
    }
    if (filters.rating > 0) {
      cleanFilters.rating = filters.rating;
    }
    if (filters.language.length > 0) {
      cleanFilters.language = filters.language;
    }
    if (filters.category.length > 0) {
      cleanFilters.category = filters.category;
    }

    onApply(cleanFilters);
  };

  const handleClear = () => {
    setFilters({
      priceRange: [0, 200],
      difficulty: [],
      duration: '',
      rating: 0,
      language: [],
      category: []
    });
  };

  const renderStars = (rating, onRatingChange) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Icon
              name="Star"
              size={20}
              className={`transition-colors duration-150 ${
                star <= rating
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300 dark:text-gray-600 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
        <span className="text-sm text-text-secondary dark:text-dark-text-secondary ml-2">
          {rating > 0 ? `${rating}+ stars` : 'Any rating'}
        </span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface dark:bg-dark-surface border-l border-border dark:border-dark-border z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:relative md:transform-none md:w-80`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border dark:border-dark-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary dark:text-dark-text-primary">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            <Icon name="X" size={20} className="text-text-secondary dark:text-dark-text-secondary" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6">
          
          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary dark:text-dark-text-primary">Price Range</h3>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-150 ${
                  expandedSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm text-text-secondary dark:text-dark-text-secondary mb-1">Min</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                      className="w-full px-3 py-2 border border-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-background text-text-primary dark:text-dark-text-primary"
                      min="0"
                      max="200"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-text-secondary dark:text-dark-text-secondary mb-1">Max</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                      className="w-full px-3 py-2 border border-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-background text-text-primary dark:text-dark-text-primary"
                      min="0"
                      max="200"
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="absolute w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="absolute w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Level */}
          <div>
            <button
              onClick={() => toggleSection('difficulty')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary dark:text-dark-text-primary">Difficulty Level</h3>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-150 ${
                  expandedSections.difficulty ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.difficulty && (
              <div className="space-y-2">
                {difficultyOptions.map((difficulty) => (
                  <label key={difficulty} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(difficulty)}
                      onChange={() => handleDifficultyToggle(difficulty)}
                      className="w-4 h-4 text-primary border-border dark:border-dark-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{difficulty}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Duration */}
          <div>
            <button
              onClick={() => toggleSection('duration')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary dark:text-dark-text-primary">Duration</h3>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-150 ${
                  expandedSections.duration ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.duration && (
              <div className="space-y-2">
                {durationOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      value={option.value}
                      checked={filters.duration === option.value}
                      onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                      className="w-4 h-4 text-primary border-border dark:border-dark-border focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary dark:text-dark-text-primary">Minimum Rating</h3>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-150 ${
                  expandedSections.rating ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.rating && (
              <div>
                {renderStars(filters.rating, (rating) => 
                  setFilters({ ...filters, rating: rating === filters.rating ? 0 : rating })
                )}
              </div>
            )}
          </div>

          {/* Language */}
          <div>
            <button
              onClick={() => toggleSection('language')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary dark:text-dark-text-primary">Language</h3>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-150 ${
                  expandedSections.language ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.language && (
              <div className="space-y-2">
                {languageOptions.map((language) => (
                  <label key={language} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.language.includes(language)}
                      onChange={() => handleLanguageToggle(language)}
                      className="w-4 h-4 text-primary border-border dark:border-dark-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{language}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="font-medium text-text-primary dark:text-dark-text-primary">Category</h3>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-tertiary dark:text-dark-text-tertiary transition-transform duration-150 ${
                  expandedSections.category ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.category && (
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <label key={category} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-primary border-border dark:border-dark-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-surface dark:bg-dark-surface border-t border-border dark:border-dark-border p-6 space-y-3">
          <button
            onClick={handleApply}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-150 font-medium"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClear}
            className="w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
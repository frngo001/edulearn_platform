import React from 'react';
import Icon from 'components/AppIcon';

const SearchSuggestions = ({ suggestions, recentSearches, onSelect, onClose }) => {
  const hasRecentSearches = recentSearches && recentSearches.length > 0;
  const hasSuggestions = suggestions && suggestions.length > 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
      {/* Recent Searches */}
      {hasRecentSearches && suggestions === recentSearches && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-text-secondary">Recent Searches</h4>
            <button
              onClick={onClose}
              className="text-text-tertiary hover:text-text-secondary transition-colors duration-150"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSelect(search)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
              >
                <Icon name="Clock" size={16} className="text-text-tertiary" />
                <span className="text-sm text-text-secondary">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Suggestions */}
      {hasSuggestions && suggestions !== recentSearches && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-text-secondary">Suggestions</h4>
            <button
              onClick={onClose}
              className="text-text-tertiary hover:text-text-secondary transition-colors duration-150"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSelect(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
              >
                <Icon name="Search" size={16} className="text-text-tertiary" />
                <span className="text-sm text-text-secondary">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Categories */}
      <div className="border-t border-border p-4">
        <h4 className="text-sm font-medium text-text-secondary mb-3">Popular Categories</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Web Development', icon: 'Code' },
            { name: 'Data Science', icon: 'BarChart3' },
            { name: 'Design', icon: 'Palette' },
            { name: 'Business', icon: 'Briefcase' }
          ].map((category) => (
            <button
              key={category.name}
              onClick={() => onSelect(category.name)}
              className="flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
            >
              <Icon name={category.icon} size={16} className="text-primary" />
              <span className="text-sm text-text-secondary">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border p-4">
        <h4 className="text-sm font-medium text-text-secondary mb-3">Quick Actions</h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelect('free courses')}
            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
          >
            <Icon name="Gift" size={16} className="text-green-500" />
            <span className="text-sm text-text-secondary">Browse Free Courses</span>
          </button>
          <button
            onClick={() => onSelect('bestsellers')}
            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
          >
            <Icon name="TrendingUp" size={16} className="text-orange-500" />
            <span className="text-sm text-text-secondary">View Bestsellers</span>
          </button>
          <button
            onClick={() => onSelect('new releases')}
            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
          >
            <Icon name="Sparkles" size={16} className="text-blue-500" />
            <span className="text-sm text-text-secondary">New Releases</span>
          </button>
        </div>
      </div>

      {/* No Results */}
      {!hasSuggestions && !hasRecentSearches && (
        <div className="p-8 text-center">
          <Icon name="Search" size={32} className="text-text-tertiary mx-auto mb-3" />
          <p className="text-sm text-text-secondary">
            Start typing to see suggestions
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
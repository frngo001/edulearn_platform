import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfileAPI } from './api';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from database on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        setIsLoading(true);
        
        // First try to get from localStorage for immediate response
        const savedTheme = localStorage.getItem('edulearn-theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setTheme(savedTheme);
        }

        // Then try to load from database (user profile)
        const { data: profileData, error } = await UserProfileAPI.getUserProfile();
        
        if (!error && profileData?.theme_preference) {
          const dbTheme = profileData.theme_preference;
          if (['light', 'dark', 'system'].includes(dbTheme)) {
            setTheme(dbTheme);
            // Sync with localStorage
            localStorage.setItem('edulearn-theme', dbTheme);
          }
        }
      } catch (error) {
        console.warn('Failed to load theme preference from database:', error);
        // Fallback to localStorage or default
        const savedTheme = localStorage.getItem('edulearn-theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setTheme(savedTheme);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Update resolved theme based on theme preference and system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes when using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(resolvedTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#1E293B' : '#FFFFFF'
      );
    }
  }, [resolvedTheme]);

  const setThemePreference = async (newTheme) => {
    if (!['light', 'dark', 'system'].includes(newTheme)) {
      console.warn('Invalid theme preference:', newTheme);
      return;
    }

    try {
      // Update local state immediately for responsive UI
      setTheme(newTheme);
      localStorage.setItem('edulearn-theme', newTheme);

      // Update in database
      const { error } = await UserProfileAPI.updateThemePreference(newTheme);
      
      if (error) {
        console.error('Failed to save theme preference to database:', error);
        // The local change still applies, so theme will work
        // We could show a notification to user about sync failure
      }
    } catch (error) {
      console.error('Error updating theme preference:', error);
      // Even if database update fails, keep the local change
    }
  };

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setThemePreference(nextTheme);
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme: setThemePreference,
    toggleTheme,
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark',
    isSystem: theme === 'system',
    isLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 
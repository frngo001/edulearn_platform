/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#4F46E5', // Indigo that conveys trust and intelligence - indigo-600
        'primary-50': '#EEF2FF', // Light indigo background - indigo-50
        'primary-100': '#E0E7FF', // Very light indigo - indigo-100
        'primary-500': '#6366F1', // Medium indigo - indigo-500
        'primary-700': '#3730A3', // Dark indigo - indigo-700
        'primary-900': '#312E81', // Very dark indigo - indigo-900

        // Secondary Colors
        'secondary': '#06B6D4', // Cyan that suggests clarity and fresh thinking - cyan-500
        'secondary-50': '#ECFEFF', // Light cyan background - cyan-50
        'secondary-100': '#CFFAFE', // Very light cyan - cyan-100
        'secondary-500': '#06B6D4', // Medium cyan - cyan-500
        'secondary-700': '#0E7490', // Dark cyan - cyan-700
        'secondary-900': '#164E63', // Very dark cyan - cyan-900

        // Accent Colors
        'accent': '#F59E0B', // Warm amber for achievement and progress - amber-500
        'accent-50': '#FFFBEB', // Light amber background - amber-50
        'accent-100': '#FEF3C7', // Very light amber - amber-100
        'accent-500': '#F59E0B', // Medium amber - amber-500
        'accent-700': '#D97706', // Dark amber - amber-700
        'accent-900': '#92400E', // Very dark amber - amber-900

        // Background Colors (Light Mode)
        'background': '#FAFAFA', // Soft off-white for reduced eye strain - gray-50
        'surface': '#FFFFFF', // Pure white for content cards and modals - white
        'surface-secondary': '#F9FAFB', // Light gray surface - gray-50

        // Text Colors (Light Mode)
        'text-primary': '#1F2937', // Dark gray for excellent readability - gray-800
        'text-secondary': '#6B7280', // Medium gray for supporting text - gray-500
        'text-tertiary': '#9CA3AF', // Light gray for subtle text - gray-400
        'text-inverse': '#FFFFFF', // White text for dark backgrounds - white

        // Status Colors
        'success': '#10B981', // Fresh green for achievements - emerald-500
        'success-50': '#ECFDF5', // Light green background - emerald-50
        'success-100': '#D1FAE5', // Very light green - emerald-100
        'success-700': '#047857', // Dark green - emerald-700

        'warning': '#F59E0B', // Consistent with accent for attention - amber-500
        'warning-50': '#FFFBEB', // Light warning background - amber-50
        'warning-100': '#FEF3C7', // Very light warning - amber-100
        'warning-700': '#D97706', // Dark warning - amber-700

        'error': '#EF4444', // Clear red for problems without being aggressive - red-500
        'error-50': '#FEF2F2', // Light error background - red-50
        'error-100': '#FEE2E2', // Very light error - red-100
        'error-700': '#DC2626', // Dark error - red-700

        // Border Colors
        'border': '#E5E7EB', // Light gray for minimal borders - gray-200
        'border-secondary': '#F3F4F6', // Very light gray for subtle separation - gray-100
        'border-focus': '#4F46E5', // Primary color for focus states - indigo-600

        // Dark Mode Colors
        'dark': {
          'background': '#0F172A', // Dark blue-gray for main background - slate-900
          'surface': '#1E293B', // Darker blue-gray for cards - slate-800
          'surface-secondary': '#334155', // Medium blue-gray for secondary surfaces - slate-700
          'text-primary': '#F1F5F9', // Light gray for primary text - slate-100
          'text-secondary': '#CBD5E1', // Medium gray for secondary text - slate-300
          'text-tertiary': '#94A3B8', // Darker gray for tertiary text - slate-400
          'border': '#334155', // Medium blue-gray for borders - slate-700
          'border-secondary': '#475569', // Lighter blue-gray for secondary borders - slate-600
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], // Modern sans-serif for headings
        'body': ['Source Sans Pro', 'sans-serif'], // Highly legible for body text
        'caption': ['Roboto', 'sans-serif'], // Clean neutral for UI elements
        'mono': ['JetBrains Mono', 'monospace'], // Monospace for code and data
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
        'card': '8px', // Custom card radius
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'elevation-1': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'elevation-2': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        'elevation-3': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'gentle-pulse': 'gentlePulse 2s infinite',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gentlePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        bounceSubtle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0,-5px,0)' },
          '70%': { transform: 'translate3d(0,-3px,0)' },
          '90%': { transform: 'translate3d(0,-1px,0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      scale: {
        '102': '1.02',
        '98': '0.98',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
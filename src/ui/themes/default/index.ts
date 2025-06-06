import { Theme } from '../types';

export const defaultTheme: Theme = {
  colors: {
    primary: '#4F46E5', // Indigo-600
    secondary: '#6B7280', // Gray-500
    background: '#F9FAFB', // Gray-50
    surface: '#FFFFFF',
    text: {
      primary: '#111827', // Gray-900
      secondary: '#4B5563', // Gray-600
      disabled: '#9CA3AF', // Gray-400
    },
    border: '#E5E7EB', // Gray-200
    error: '#DC2626', // Red-600
    success: '#059669', // Green-600
    warning: '#D97706', // Yellow-600
    info: '#2563EB', // Blue-600
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

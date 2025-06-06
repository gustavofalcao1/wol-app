import { Theme } from '../types';
import { defaultTheme } from '../default';

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    primary: '#6366F1', // Indigo-500
    secondary: '#9CA3AF', // Gray-400
    background: '#111827', // Gray-900
    surface: '#1F2937', // Gray-800
    text: {
      primary: '#F9FAFB', // Gray-50
      secondary: '#D1D5DB', // Gray-300
      disabled: '#6B7280', // Gray-500
    },
    border: '#374151', // Gray-700
    error: '#EF4444', // Red-500
    success: '#10B981', // Green-500
    warning: '#F59E0B', // Yellow-500
    info: '#3B82F6', // Blue-500
  },
};

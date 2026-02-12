// @ts-check

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        'primary-hover': 'var(--color-primary-dark)',
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        'success-hover': 'var(--color-success-light)',
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        border: 'var(--color-border)',
        foreground: 'var(--color-text-primary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-disabled': 'var(--color-text-disabled)',
        error: 'var(--color-error)',
        'error-light': 'var(--color-error-light)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        info: 'var(--color-info)',
        'info-light': 'var(--color-info-light)',
        'test-red': '#FF0000',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
        lg: 'var(--border-radius-lg)',
        sm: 'var(--border-radius-sm)',
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}

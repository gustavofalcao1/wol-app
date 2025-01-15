import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        secondary: '#64748b',
        success: {
          DEFAULT: '#22c55e',
          hover: '#16a34a',
        },
        border: '#e2e8f0',
        background: '#f8fafc',
        foreground: '#1e293b',
      },
    },
  },
  plugins: [],
}

export default config;

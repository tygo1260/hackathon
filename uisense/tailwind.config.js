/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#e6e6ef',
          100: '#c2c2d6',
          200: '#9999b3',
          300: '#70708f',
          400: '#52527a',
          500: '#333366',
          600: '#2e2e5e',
          700: '#272753',
          800: '#1f1f49',
          900: '#141438',
          950: '#0a0a1a',
        },
        accent: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

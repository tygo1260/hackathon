/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#F5F2EB',
          200: '#EDE8DC',
          300: '#e0dbd0',
          400: '#d5d0c5',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          muted: '#6b6b6b',
          dim: '#9b9b9b',
        },
        accent: {
          DEFAULT: '#264E70',
          warm: '#B87333',
        },
        beni: '#9B4E4E',
        sage: '#5B7553',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif JP', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      borderRadius: {
        card: '22px',
      },
      boxShadow: {
        card: '0 8px 60px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 80px rgba(0,0,0,0.13), 0 4px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};

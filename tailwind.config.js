/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#FFF5E5',
          100: '#FFE5CC',
          200: '#FFCB99',
          300: '#FFB380',
          400: '#FF8C4D',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#CC4A22',
          800: '#B33A19',
          900: '#992A10',
        }
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        'glow-move': 'glow-move 15s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 8s ease-in-out infinite',
        'glow-scale': 'glow-scale 12s ease-in-out infinite',
        'glow-fade': 'glow-fade 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-move': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(50px, 30px)' },
          '50%': { transform: 'translate(20px, -20px)' },
          '75%': { transform: 'translate(-30px, 20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        'glow-scale': {
          '0%, 100%': { transform: 'scale(1) translateX(0)' },
          '50%': { transform: 'scale(1.2) translateX(-50px)' },
        },
        'glow-fade': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

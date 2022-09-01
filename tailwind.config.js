/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md}', './src/**/*.svg'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'bounce-short': {
          '0%, 100% ': {
            transform: 'translateY(-8%)',
            '-webkit-animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            ' -webkit-animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'bounce-short': 'bounce-short 1s ease-in-out 4',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#FF7E1E',
        secondary: '#FFCE00',
        cream: '#F5F2ED',
      },
    },
  },
  plugins: [],
};

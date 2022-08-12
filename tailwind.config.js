/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md}', './src/**/*.svg'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
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
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
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

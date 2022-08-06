/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md}', './src/**/*.svg'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};

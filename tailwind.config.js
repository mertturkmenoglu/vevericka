const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      'primary': '#be185d',
      'midnight': '#1a1a1a',
    },
    extend: {},
  },
  plugins: [],
};

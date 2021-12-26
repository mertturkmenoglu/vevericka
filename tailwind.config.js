const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'deep-orange': '#ff5722',
      'dark-primary': '#262626',
    },
    extend: {},
  },
  plugins: [],
}

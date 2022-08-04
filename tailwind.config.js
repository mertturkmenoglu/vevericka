/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/atom/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#be185d',
        midnight: '#1a1a1a',
        paper: {
          50: '#f9f9f9',
          100: '#f1f1f1',
          200: '#acacac',
          300: '#6c6c6c',
          400: '#606060',
          500: '#414141',
          600: '#313131',
          700: '#212121',
          800: '#1a1a1a',
          900: '#000000',
        }
      },
    },
  },
  plugins: [],
};

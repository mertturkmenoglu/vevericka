/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        berry: "#be185d",
        midnight: "#1a1a1a"
      },
      fontFamily: {
        sans: ["'-apple-system', BlinkMacSystemFont, 'Segoe UI', 'Open Sans', Helvetica, Arial, 'sans-serif'"]
      },
      screens: {
        sd: "896px"
      }
    }
  },
  plugins: []
};

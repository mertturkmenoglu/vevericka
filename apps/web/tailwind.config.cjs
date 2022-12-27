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
        sans: ["\"Open Sans\""]
      },
      screens: {
        sd: "896px"
      }
    }
  },
  plugins: []
};

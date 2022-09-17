const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      }
    },
  }
};

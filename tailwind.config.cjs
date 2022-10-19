/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          mid: "#8284FA",
          dark: "#5E60CE"
        },
        secondary: {
          mid: "#4EA8DE",
          dark: "#1E6F9F",
        },
        gray: {
          100: "#F2F2F2",
          200: "#D9D9D9",
          300: "#808080",
          400: "#333333",
          500: "#262626",
          600: "#1A1A1A",
          700: "#0D0D0D",
        },
        danger: "#E25858"
      },
      fontFamily: {
        sans: "'Inter', sans-serif",
      }
    },
  },
  plugins: [],
}

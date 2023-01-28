/**
 * @param {number} columnCount
 * @returns {string}
 */
function getPageListWidth(columnCount) {
  return `${columnCount * 264 + (columnCount + 1) * 24}px`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {},

    screens: {
      sm: getPageListWidth(4),
      md: getPageListWidth(5),
      lg: getPageListWidth(6),
    },
  },

  plugins: [],
}

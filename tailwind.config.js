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

    fontFamily: {
      sans: [
        'Pretendard Variable',
        'Pretendard',
        '-apple-system',
        'BlinkMacSystemFont',
        'Apple SD Gothic Neo',
        'NanumGothic',
        'Malgun Gothic',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },

    screens: {
      sm: getPageListWidth(4),
      md: getPageListWidth(5),
      lg: getPageListWidth(6),
    },
  },

  plugins: [],
}

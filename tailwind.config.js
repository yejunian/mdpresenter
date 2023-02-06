/**
 * @param {number} columnCount
 * @returns {string}
 */
function getBreakpoint(columnCount) {
  return `${columnCount * 264 + (columnCount + 1) * 24 + 24}px`
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
      sm: getBreakpoint(4),
      md: getBreakpoint(5),
      lg: getBreakpoint(6),
    },
  },

  plugins: [],
}

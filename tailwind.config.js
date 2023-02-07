const { getBreakpointByColumns } = require('./src/core/getBreakpointByColumns')

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
      mono: [
        'Cascadia Code',
        'Cascadia Mono',
        'Menlo',
        'Consolas',
        'Pretendard Variable',
        'Pretendard',
        '-apple-system',
        'BlinkMacSystemFont',
        'Apple SD Gothic Neo',
        'NanumGothic',
        'Malgun Gothic',
        'sans-serif',
      ],
    },

    screens: {
      sm: `${getBreakpointByColumns(4)}px`,
      md: `${getBreakpointByColumns(5)}px`,
      lg: `${getBreakpointByColumns(6)}px`,
    },
  },

  plugins: [],
}

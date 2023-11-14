/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class',
  theme: {
    aspectRatio: {
      1: '1',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
    },
    colors: {
      blue: colors.blue,
      gray: colors.gray,
      green: colors.green,
      primary: colors.blue,
      red: colors.red,
      secondary: colors.teal,
      teal: colors.teal,
      transparent: colors.transparent,
      white: colors.white,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
        sm: '1.5rem',
      },
      screens: {
        lg: '1024px',
        md: '768px',
        sm: '640px',
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat Variable'],
      },
      colors: {
        black: '#111111',
        green: '#1B5B31',
        beige: '#DCC1AB',
        gray: '#F5F0EC',
      },
      keyframes: {
        expandInput: {
          '0%': { width: '24px' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        expandInput: 'expandInput 1s ease-in-out forwards',
      }
    },
  },
  plugins: [],
};

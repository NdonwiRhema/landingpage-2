/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#ff914d',
          dark: '#f27b2f',
          light: '#ffa66b'
        },
        midnight: {
          DEFAULT: '#041c31',
          light: '#062745',
          dark: '#02111d'
        }
      }
    },
  },
  plugins: [],
};
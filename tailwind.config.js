/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFF08',
        secondary: '#6F4E37',
      },
      fontFamily: {
        'racing': ['Racing Sans One', 'cursive'],
      },
    },
  },
  plugins: [],
};
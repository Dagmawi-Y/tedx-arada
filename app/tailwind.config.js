/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'ted-red': '#E62B1E',
        'ted-black': '#000000',
        'ted-dark': '#111111',
        'arada-accent': '#D4AF37',
      },
    },
  },
  plugins: [],
};

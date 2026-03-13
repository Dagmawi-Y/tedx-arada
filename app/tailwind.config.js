/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'ted-red': '#E62B1E',
        'ted-black': '#111111',
        'ted-gray': '#F5F5F5',
        'arada-accent': '#D4AF37',
      },
    },
  },
  plugins: [],
};

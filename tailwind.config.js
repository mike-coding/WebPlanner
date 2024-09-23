/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Tailwind CSS v3.x
  theme: {
    extend: {
      backdropBrightness: {
        25: '.25',
        75: '.75',
        90: '.9',
        95: '.95',
        110: '1.1',
        105: '1.05',
        115: '1.15',
        120: '1.2'
      },
      backdropSaturate: {
        60: '0.6',
        70: '0.7',
        80: '0.8',
        90: '0.9'
      },
      backdropContrast: {
        90: '0.9',
        80: '0.8',
        70: '0.7'
      },
      spacing: {
        '1/2': '0.125rem',
        '3/2': '0.375rem',
        '2/9': '0.05555rem',
        '5/9': '0.1388rem'
      },
      width: {
        '160': '40rem',
        '120': '30rem', 
      },
      height: {
        '80': '20rem',
        '65': '16.25rem',
      },
    },
  },
  plugins: [],
};
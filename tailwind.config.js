module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: '#231f20',
        'gray-300': '#888',
      },
      fontFamily: {
        sans: ['Futura', 'Trebuchet MS', 'Arial', 'sans-serif'],
      },
      rotate: {
        60: '60deg',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

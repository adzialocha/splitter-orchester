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
      },
      fontFamily: {
        sans: ['Futura', 'Trebuchet MS', 'Arial', 'sans-serif'],
      },
      rotate: {
        60: '60deg',
      },
      height: {
        112: '28rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

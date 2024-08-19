/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-menu': "url('./images/bg1.png')",
        boat: "url('./images/boat.png')",
        'sandbox-pic': "url('./images/bg2.png')",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        jersey: ['Jersey 10', 'serif'],
      },
      fontSize: {
        header2xs: '0.8rem',
        '2xs': '0.7rem',
        '3xs': '0.45rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

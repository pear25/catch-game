/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-menu': "url('/images/bg1.png')",
        boat: "url('/images/boat.png')",
        'sandbox-pic': "url('/images/bg2.png')",
      },
      fontFamily: {
        'bungee-tint': ['Bungee Tint', 'New Amsterdam', 'sans-serif'],
        'new-amsterdam': ['New Amsterdam', 'sans-serif'],
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

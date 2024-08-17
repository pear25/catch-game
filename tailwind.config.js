/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-menu': "url('./public/images/bg1.png')",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        jersey: ['Jersey 10', 'serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

/** @type {import('tailwindcss').Config} */
const colors = require('./src/assets/styles/colors');

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        meysha: ['Meysha', 'serif'],
        barlow: ['Barlow', 'sans-serif'],
        ttjenevers: ['TT Jenevers', 'serif'],
        almarai: ['Almarai', 'sans-serif'],
      },
      borderWidth: {
        '1.5': '1.45px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(48px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-up-slow': 'fade-up 1s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'slide-in-right': 'slide-in-right 0.55s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },
      screens: {
        sm: "480px",
        rg: "660px",
        md: "768px",
        mdl: "840px",
        mdxl: "880px",
        lg: "1024px",
        xl: "1280px",
        "1.5xl": "1440px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

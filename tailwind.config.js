/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        meysha: ['Meysha', 'serif'],
        barlow: ['Barlow', 'sans-serif'],
        ttjenevers: ['TT Jenevers', 'serif'],
        almarai: ['Almarai', 'sans-serif'],
      },
      borderWidth: {
        '1.5': '1.45px',
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

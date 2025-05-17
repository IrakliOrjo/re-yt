/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {

        'mini-md': '580px',
      },
      backgroundImage: {
        "hero-bg": "url('/wallpaper1.jpg')",
        "newyork-bg": "url('/newyork.jpg')",
        "la-bg": "url('/la.jpg')",
        "san-francisco-bg": "url('/san-francisco.jpg')",
        "chicago-bg": "url('/chicago.jpg')",
        "miami-bg": "url('/miami.jpg')",
        "las-vegas-bg": "url('/las-vegas.jpg')",
        "detroit-bg": "url('/detroit.jpg')",
      },
      fontFamily: {
        // Primary font: DM Sans - clean, modern, highly readable
        primary: ["DM Sans", ...defaultTheme.fontFamily.sans],
        // Secondary font: Playfair Display - elegant, luxurious feel for headings
        display: ["Playfair Display", ...defaultTheme.fontFamily.serif],
      },
      
      keyframes: {
        slideInRight: {
          '0%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        slideOutLeft: {
          '0%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        }
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        slideOutLeft: 'slideOutLeft 0.5s ease-out forwards',
        'scroll': 'scroll 5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};

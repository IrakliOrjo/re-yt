/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/public/wallpaper1.jpg')",
        "newyork-bg": "url('/public/newyork.jpg')",
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
        }
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        slideOutLeft: 'slideOutLeft 0.5s ease-out forwards'
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};

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
        "hero-bg": "url('/public/wallpaper1.jpg')",
        "newyork-bg": "url('/public/newyork.jpg')",
        "la-bg": "url('/public/la.jpg')",
        "san-francisco-bg": "url('/public/san-francisco.jpg')",
        "chicago-bg": "url('/public/chicago.jpg')",
        "miami-bg": "url('/public/miami.jpg')",
        "las-vegas-bg": "url('/public/las-vegas.jpg')",
        "detroit-bg": "url('/public/detroit.jpg')",
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

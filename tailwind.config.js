/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/public/wallpaper1.jpg')",
      },
      fontFamily: {
        // Primary font: DM Sans - clean, modern, highly readable
        primary: ["DM Sans", ...defaultTheme.fontFamily.sans],
        // Secondary font: Playfair Display - elegant, luxurious feel for headings
        display: ["Playfair Display", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};

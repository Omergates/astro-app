/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Palette AstroMoi
        astro: {
          bg: "#0D0D1A",
          violet: "#7C3AED",
          "violet-light": "#A78BFA",
          gold: "#F59E0B",
          "gold-light": "#FCD34D",
          cream: "#F5F3FF",
        },
      },
    },
  },
  plugins: [],
};

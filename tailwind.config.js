/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Enables class-based dark mode (toggle with a class)

  theme: {
    extend: {
      colors: {
        // Groxie Optimized Light Theme
        'primary': '#43A047', // Vital Green
        'secondary': '#FB8C00', // Citrus Orange
        'accent': '#8E24AA', // Soft Plum
        'background': '#FFFFFF', // Clean White (for navbars and app background)
        'card': '#FFFFFF', // Clean White
        'input': '#FFFFFF', // Clean White
        'text-primary': '#1E1E1E', // Deep Charcoal
        'text-secondary': '#757575', // Cool Gray
        'button': '#AED581', // Active Lime

        // Groxie Optimized Dark Theme (prefix: dark-)
        'dark-primary': '#00C853', // Emerald Glow
        'dark-secondary': '#FFAB40', // Amber Blaze
        'dark-accent': '#7C4DFF', // Indigo Pulse
        'dark-background': '#181818', // True dark for navbars and app background
        'dark-card': '#1E1E1E', // Soft Slate
        'dark-input': '#1E1E1E', // Soft Slate
        'dark-text-primary': '#F5F5F5', // Mist White
        'dark-text-secondary': '#B0BEC5', // Silver Mist
        'dark-button': '#66BB6A', // Glowing Mint
      }
    }
  },
  plugins: [],
};
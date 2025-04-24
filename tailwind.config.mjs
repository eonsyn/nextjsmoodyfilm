/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Changed from "component" to "components"
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./majorComponent/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8", // Deep Blue
        secondary: "#FF6F61", // Warm Orange
        accent: "#34A853", // Soft Green
        background: "#F5F5F5", // Light Gray
        text: "#202124", // Dark Gray
      },
    },
    fontFamily: {
      playwrite: ["Playwrite IS", "serif"],
      poppins: ["Poppins", "sans-serif"],
      darumadrop: ["Darumadrop One", "serif"],
    },
  },
  plugins: [],
};

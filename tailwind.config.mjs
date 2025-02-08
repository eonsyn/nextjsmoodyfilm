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
        "background-dark": "#121212",
        menubar: "#181818",
        "secondary-text": "#B3B3B3",
        "primary-text": "#FFFFFF",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [],
};

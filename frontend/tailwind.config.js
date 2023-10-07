/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: "Lato", // auto font loading
    },
    extend: {
      colors: {
        primaryDark: "#0F172A",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      montserat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "blue-200": "#B1D1F0",
        "grey-200": "#E9E8E8",
        "green-300": "#94DA69",
        "red-100": "#F6EEEE",
        "red-200": "#E3B3B3",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        48: "48px",
      },
    },
  },
  plugins: [],
};

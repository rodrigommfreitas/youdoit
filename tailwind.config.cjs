/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        danube: {
          50: "#f2f5fc",
          100: "#e2e8f7",
          200: "#ccd7f1",
          300: "#a8bde8",
          400: "#7f9bdb",
          500: "#6882d3",
          600: "#4c62c4",
          700: "#4251b3",
          800: "#3b4392",
          900: "#343b74",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[class="dark"]'],
  jit: true,
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "prim-text": "rgb(var(--primary-text) / <alpha-value>)",
        bg: "rgb(var(--bg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        notification: "rgb(var(--notification) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

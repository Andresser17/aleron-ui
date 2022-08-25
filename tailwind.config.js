module.exports = {
  jit: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        hover: "rgb(var(--hover) / <alpha-value>)",
        active: "rbg(var(--active) / <alpha-value>)",
        focus: "rgb(var(--focus) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  prefix: "al-",
};

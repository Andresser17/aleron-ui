module.exports = {
  jit: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        hover: "var(--hover)",
        active: "var(--active)",
        focus: "var(--focus)",
        "focus-border": "var(--focus-border)",
        border: "var(--border)",
        disabled: "var(--disabled)",
        "disabled-text": "var(--disabled-text)",
        "disabled-border": "var(--disabled-border)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  prefix: "al-",
};

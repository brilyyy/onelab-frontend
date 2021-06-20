module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "pattern-lab": "url(/src/img/pattern.png)",
      }),
    },
    fontFamily: {
      "open-sans": ["Open Sans"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

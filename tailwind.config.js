/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
    "./**/*.html",
    "!./node_modules/**/*",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#653da7",
          container: "#7e57c2"
        },
        "on-primary": "#ffffff",
        "secondary": {
          DEFAULT: "#006a62",
          container: "#81f3e5"
        },
        "on-secondary": "#ffffff",
        "tertiary": {
          DEFAULT: "#714e00",
          container: "#916400"
        },
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "outline": "#7b7483",
        "outline-variant": "#ccc3d3",
        "surface": {
          DEFAULT: "#fbf9f8",
          50: "#ffffff",
          100: "#f5f3f2",
          200: "#efedec",
          300: "#eae8e7",
          400: "#dbdad9",
          500: "#fbf9f8",
          600: "#1b1c1b",
          700: "#1b1c1b",
          800: "#0a0a0a",
          900: "#0a0a0a",
          950: "#000000"
        },
        "on-surface": {
          DEFAULT: "#1b1c1b",
          light: "#1b1c1b",
          dark: "#f2f0ef"
        },
        "on-surface-variant": "#4a4452",
        "surface-variant": {
          DEFAULT: "#e4e2e1",
          light: "#e4e2e1",
          dark: "#4a4452"
        }
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Lexend", "sans-serif"],
        label: ["Lexend", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

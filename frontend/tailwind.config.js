module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx, css}",  // <- This tells Tailwind to scan all JS/TS/JSX/TSX files in src/
  ],
  theme: {
    extend: {
      colors: {
        'fpl-purple': '#3d195b',
      }
    },
  },
  plugins: [],
}
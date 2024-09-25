/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff653e',
        blueBackground: '#1e3578 ',
        violetBackground: '#481862',
      }
    },
  },
  plugins: [],
}


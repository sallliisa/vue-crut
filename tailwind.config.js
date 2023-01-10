/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        c: {
          background: "#0E1013",
          outline: "#3C4043",
          faded: "#8B8B8D",
          primary: "#286DF1",
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        '200': '50rem',
      },
      width: {
        '1/8': '200px',
      },
      height: {
        '1/8': '50px',
        '100': '590px'
      },
    },
  },
  plugins: [],
}


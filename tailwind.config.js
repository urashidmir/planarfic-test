/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        planarific: {
          DEFAULT: '#e47f63',
        },
      },
    },
  },
  plugins: [],
}


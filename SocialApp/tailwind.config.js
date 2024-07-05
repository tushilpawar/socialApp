/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    important: "#root",
    theme: {
      extend: {
        colors: {
          primary: '#418EE0',
          leftbg: '#F7F8F9'
        },
      },
    },
    plugins: [],
  }
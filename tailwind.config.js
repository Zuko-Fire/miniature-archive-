/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark900: '#1a1a1a',
        dark800: '#262626',
        dark700: '#404040',
        accentPurple: '#6d28d9',
        accentPurpleHover: '#5b21b6',
      }
    },
  },
  plugins: [],
}
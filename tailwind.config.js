/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#1a1a1a', // Основной фон
          800: '#262626', // Фон карточек/строк
          700: '#404040', // Границы
        },
        accent: {
          purple: '#6d28d9', // Цвет тегов как на скриншоте
        }
      }
    },
  },
  plugins: [],
}
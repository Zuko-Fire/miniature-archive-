import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // ✅ '/' для dev-сервера, './' для сборки в Electron
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true, // Чтобы порт не менялся
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
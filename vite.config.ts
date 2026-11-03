import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Creative-Website/',
  build: { rollupOptions: { input: { main: 'index.html', pricing: 'pricing.html' } } },
  plugins: [react(), tailwindcss()],
})

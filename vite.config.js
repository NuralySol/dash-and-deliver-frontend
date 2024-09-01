import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@stripe/stripe-js'],
  },
  build: {
    rollupOptions: {
      external: ['@stripe/stripe-js'],
    },
  },
})
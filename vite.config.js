import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@stripe/stripe-js': path.resolve(__dirname, 'node_modules/@stripe/stripe-js'),
      '@stripe/react-stripe-js': path.resolve(__dirname, 'node_modules/@stripe/react-stripe-js'),
    },
  },
  optimizeDeps: {
    include: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
  },
  build: {
    rollupOptions: {
      external: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
    },
  },
});
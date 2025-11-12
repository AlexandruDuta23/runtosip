import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // expose to network
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://server:5174', // container network
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://server:5174',
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8091', 
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
});
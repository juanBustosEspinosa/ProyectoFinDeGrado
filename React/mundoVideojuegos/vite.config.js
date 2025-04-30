import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws', // Asegúrate de usar ws si no estás usando HTTPS
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8091', // Cambia esto si tu backend usa otro puerto
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
});
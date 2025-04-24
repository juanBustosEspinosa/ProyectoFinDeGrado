import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  server: {
    hmr: false, // Desactiva Hot Module Replacement
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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './Component/AuthContext'; // Importar el AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Aquí envolvemos toda la aplicación con AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
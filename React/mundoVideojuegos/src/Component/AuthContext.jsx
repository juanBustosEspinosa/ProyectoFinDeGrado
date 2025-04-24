import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Intenta cargar el usuario desde localStorage al inicio
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!usuario; // Devuelve true si hay usuario

  const login = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

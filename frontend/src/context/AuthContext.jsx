import { createContext, useContext, useState } from 'react';
import { registerRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data); // Aquí actualizamos el estado del usuario
      console.log('Usuario registrado:', res.data);
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user }}>
      {children}
    </AuthContext.Provider>
  );
};

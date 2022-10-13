import { createContext, useState } from 'react';

// Contextos

export const AuthContext = createContext();

// Proveedores

export const AuthProvider = ({ children }) => {

  // Hook estado
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  // Handler estado
  const toggleAuth = () => {
    if (auth) {
      setAuth(false);
    }
    else {
      setAuth(true);
    }
  };
  const handlerToken = (nuevo) => {
    setToken(nuevo);
  };
  const handlerIdUsuario = (id) => {
    setIdUsuario(id);
  };

  return (
    <AuthContext.Provider
      value = { {
        Auth: [auth, toggleAuth],
        Token: [token, handlerToken],
        IdUsuario: [idUsuario, handlerIdUsuario]
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};
import { createContext, useContext, useState } from 'react';
import API from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('token');
  const usernameFromStorage = localStorage.getItem('username');

  const [token, setToken] = useState(tokenFromStorage || null);
  const [username, setUsername] = useState(usernameFromStorage || null);

  const login = async ({ username: u, password }) => {
    // backend expects { username, password }
    const res = await API.post('/auth/login', { username: u, password });
    const t = res.data.token;
    setToken(t);
    setUsername(u);
    localStorage.setItem('token', t);
    localStorage.setItem('username', u);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const register = async ({ username: u, password, email }) => {
    return API.post('/auth/register', { username: u, password, email });
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

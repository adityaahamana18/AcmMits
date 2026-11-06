import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('acm_admin_token') || null);
  const [admin, setAdmin] = useState(
    token ? { id: 1, username: 'admin', email: 'acm@mitsgwalior.in', role: 'superadmin' } : null
  );

  const login = async (username, password) => {
    const res = await api.adminLogin({ username, password });
    if (res.success) {
      setToken(res.token);
      setAdmin(res.admin);
      localStorage.setItem('acm_admin_token', res.token);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('acm_admin_token');
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading: false, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

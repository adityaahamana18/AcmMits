import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('acm_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/admin/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setAdmin(data.admin);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

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
    <AuthContext.Provider value={{ admin, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


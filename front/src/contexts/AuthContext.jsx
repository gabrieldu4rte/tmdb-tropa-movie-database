import React from 'react';
import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const stored = localStorage.getItem('authData');
  const [user, setUser] = useState(
    stored ? JSON.parse(stored).user : null
  );

  async function login(email, password) {
    const token = btoa(`${email}:${password}`);
    localStorage.setItem('auth', `Basic ${token}`);
    const resp = await api.get('/search?query=teste');
    if (resp.status === 200) {
      const u = { email };
      setUser(u);
      localStorage.setItem('authData', JSON.stringify({ user: u }));
      return true;
    } else {
      logout();
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('authData');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  authHeader: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setToken(parsed.token || null);
        setUsername(parsed.username || null);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify({ token, username }));
  }, [token, username]);

  const login = async (user: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password })
    });
    if (!res.ok) return false;
    const data = await res.json();
    setToken(data.token);
    setUsername(user);
    return true;
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  const authHeader = () => (token ? { Authorization: `Bearer ${token}` } : {} as Record<string, string>);

  const value = useMemo<AuthContextType>(() => ({ token, username, isAuthenticated: !!token, login, logout, authHeader }), [token, username]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Role = 'user' | 'recruiter' | 'admin';
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  company?: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  login: (data: Omit<UserProfile, 'id'>) => void;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const KEY = 'app_user_profile_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch {}
  }, [user]);

  const login: AuthContextValue['login'] = (data) => {
    const profile: UserProfile = { id: crypto.randomUUID(), ...data };
    setUser(profile);
  };

  const logout = () => setUser(null);

  const updateProfile: AuthContextValue['updateProfile'] = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const value = useMemo(() => ({ user, login, logout, updateProfile }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

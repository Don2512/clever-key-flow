import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Role = 'user' | 'recruiter' | 'admin';
export interface UserLink { label: string; url: string }
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  company?: string;
  bio?: string;
  links?: UserLink[];
  passwordHash?: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  login: (data: Omit<UserProfile, 'id'>) => void;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  changePassword: (current: string, next: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const KEY = 'app_user_profile_v1';

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

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

  const changePassword: AuthContextValue['changePassword'] = async (current, next) => {
    if (!next || next.length < 6) {
      throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự');
    }
    const nextHash = await sha256(next);
    if (!user) throw new Error('Chưa đăng nhập');
    if (user.passwordHash) {
      const currentHash = await sha256(current || '');
      if (currentHash !== user.passwordHash) {
        throw new Error('Mật khẩu hiện tại không đúng');
      }
    }
    setUser((prev) => (prev ? { ...prev, passwordHash: nextHash } : prev));
  };

  const value = useMemo(
    () => ({ user, login, logout, updateProfile, changePassword }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

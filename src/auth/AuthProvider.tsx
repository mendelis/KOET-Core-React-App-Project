import React, { createContext, useContext, useEffect, useState } from 'react';
import { navigationRef } from '../navigation/NavigationRef';
import { saveRefreshToken, getRefreshToken, deleteRefreshToken } from '../utils/secureStore';
import { LoginRequest, AuthResponse, User } from '../types/auth';
import { bindAuthRef } from './authRef';
import { login, refresh, getProfile } from '../api/auth';

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  signIn: (creds: LoginRequest, redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!accessToken;

  bindAuthRef({
    getAccessToken: () => accessToken,
    setAccessToken: (t) => setAccessToken(t),
    signOut: async () => await internalSignOut(),
  });

  const signIn = async (creds: LoginRequest, redirectTo?: string) => {
    const res: AuthResponse = await login(creds);
    if (!res.accessToken) throw new Error('Login failed');

    setAccessToken(res.accessToken);
    if (res.refreshToken) await saveRefreshToken(res.refreshToken);
    setUser(res.user ?? await getProfile());

    navigationRef.current?.navigate(redirectTo ?? 'Home' as never);
  };

  const internalSignOut = async () => {
    setAccessToken(null);
    setUser(null);
    await deleteRefreshToken();
    navigationRef.current?.navigate('Login' as never);
  };

  const restore = async () => {
    const token = await getRefreshToken();
    if (!token) return;

    try {
      const res = await refresh({ refreshToken: token });
      setAccessToken(res.accessToken);
      if (res.refreshToken) await saveRefreshToken(res.refreshToken);
      setUser(res.user ?? await getProfile());
    } catch {
      await internalSignOut();
    }
  };

  useEffect(() => {
    restore();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, isAuthenticated, signIn, signOut: internalSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
import React, { createContext, useContext, useEffect, useState } from 'react';
import { navigationRef } from '../navigation/NavigationRef';
import { saveRefreshToken, getRefreshToken, deleteRefreshToken } from '../utils/secureStore';
import { LoginRequest, AuthResponse, User } from '../types/auth';
import { bindAuthRef } from './authRef';
import authApi from '../api/auth';


type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  signIn: (creds: LoginRequest, redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!accessToken;

  // Bind token helpers to avoid require cycle
  bindAuthRef({
    getAccessToken: () => accessToken,
    setAccessToken: (t) => setAccessToken(t),
    signOut: async () => await internalSignOut(),
  });

  const signIn = async (creds: LoginRequest, redirectTo?: string) => {
    const res: AuthResponse = await authApi.login(creds);

    if (!res.token) throw new Error('Login failed');

    setAccessToken(res.token);
    if (res.refreshToken) await saveRefreshToken(res.refreshToken);

    if (res.user) {
      setUser(res.user);
    } else {
      try {
        const profile = await authApi.getProfile();
        if (profile) setUser(profile);
      } catch (e) {
        console.warn('Failed to fetch profile after login', e);
      }
    }

    const dest = redirectTo ?? 'Home';
    navigationRef.current?.navigate(dest as never);
  };

  const internalSignOut = async () => {
    setAccessToken(null);
    setUser(null);
    await deleteRefreshToken();
    navigationRef.current?.navigate('Login' as never);
  };

  const refresh = async () => {
    const token = await getRefreshToken();
    if (!token) return;

    try {
      const res = await authApi.refresh({ refreshToken: token });
      if (res.accessToken) setAccessToken(res.accessToken);
      if (res.refreshToken) await saveRefreshToken(res.refreshToken);

      if (res.user) {
        setUser(res.user);
      } else {
        const profile = await authApi.getProfile();
        if (profile) setUser(profile);
      }
    } catch (e) {
      console.warn('Refresh failed', e);
      await internalSignOut();
    }
  };

  useEffect(() => {
    refresh();
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
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {  LoginRequest, RegisterRequest, User } from '../types/auth';
import { login, register } from '../api/auth';

type AuthContextType = {
  user: User | null;
  signIn: (data: LoginRequest) => Promise<void>;
  signUp: (data: RegisterRequest) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (data: LoginRequest) => {
    const loggedInUser = await login(data);
    setUser(loggedInUser);
  };

  const signUp = async (data: RegisterRequest) => {
    const newUser = await register(data);
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
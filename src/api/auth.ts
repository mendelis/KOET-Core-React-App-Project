import api from './apiClient';
import { LoginRequest, AuthResponse, RefreshTokenRequest } from '../types/auth';

export const login = async (creds: LoginRequest): Promise<AuthResponse> => {
  const r = await api.post('/login', creds);
  return r.data;
};

export const refresh = async (payload: RefreshTokenRequest): Promise<AuthResponse> => {
  const r = await api.post('/refresh', payload);
  return r.data;
};

export const getProfile = async (): Promise<any> => {
  const r = await api.get('/me');
  return r.data;
};
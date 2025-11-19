import api from './apiClient';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const r = await api.post<AuthResponse>('/login', payload);
  return r.data;
};

export const register = async (payload: RegisterRequest): Promise<AuthResponse> => {
  const r = await api.post<AuthResponse>('/register', payload);
  return r.data;
};

export const confirmEmail = async (token: string) => {
  const r = await api.get('/confirm', { params: { token } });
  return r.data;
};

export const refresh = async (payload: { refreshToken: string }) => {
  const r = await api.post<AuthResponse>('/refresh', payload);
  return r.data;
};

export const logout = async () => {
  const r = await api.post('/logout');
  return r.data;
};

export const updateProfile = async (form: FormData) => {
  const r = await api.post('/update-profile', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return r.data;
};
import axios from 'axios';
import * as authRef from '../auth/authRef';
import { getRefreshToken, saveRefreshToken, deleteRefreshToken } from '../utils/secureStore';
import { AuthResponse, RefreshTokenRequest } from '../types/auth';

const BASE = 'https://localhost:7261/api/auth'; // Replace with your actual API base

const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (v?: any) => void; reject: (e: any) => void }> = [];

const processQueue = (error: any, token: string = '') => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.request.use(config => {
  const token = authRef.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (token && originalReq.headers) {
            originalReq.headers.Authorization = `Bearer ${token as string}`;
          }
          return axios(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const payload: RefreshTokenRequest = { refreshToken };
        const response = await axios.post<AuthResponse>(`${BASE}/refresh`, payload);
        const auth = response.data;

        if (!auth.accessToken) throw new Error('Refresh failed');

        authRef.setAccessToken(auth.accessToken);
        if (auth.refreshToken) await saveRefreshToken(auth.refreshToken);

        processQueue(null, auth.accessToken);

        if (auth.accessToken && originalReq.headers) {
          originalReq.headers.Authorization = `Bearer ${auth.accessToken}`;
        }

        return axios(originalReq);
      } catch (refreshErr) {
        processQueue(refreshErr, '');
        await deleteRefreshToken();
        await authRef.signOut();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
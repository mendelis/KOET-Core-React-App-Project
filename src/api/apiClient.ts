import axios from 'axios';
import { getAccessToken, setAccessToken, signOut } from '../auth/authRef';
import { getRefreshToken, saveRefreshToken, deleteRefreshToken } from '../utils/secureStore';
import { AuthResponse, RefreshTokenRequest } from '../types/auth';

const BASE = 'https://localhost:7261/api/auth'; // adjust to your API base

const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (v?: any) => void; reject: (e: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  r => r,
  async err => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token: string | null) => {
          if (token && originalReq.headers) {
            originalReq.headers.Authorization = `Bearer ${token}`;
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
        const r = await axios.post<AuthResponse>(`${BASE}/refresh`, payload);
        const auth = r.data;

        if (!auth.token) throw new Error('Refresh failed');

        setAccessToken(auth.token);
        if (auth.refreshToken) await saveRefreshToken(auth.refreshToken);

        processQueue(null, auth.token);
        if (originalReq.headers) {
          originalReq.headers.Authorization = `Bearer ${auth.token}`;
        }
        return axios(originalReq);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        await deleteRefreshToken();
        await signOut();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
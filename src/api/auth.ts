import axios from 'axios';
import { LoginRequest, RegisterRequest, User } from '../types/auth';

const API_BASE_URL = 'https://localhost:7261/api';

export async function login(data: LoginRequest): Promise<User> {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
  return response.data.user;
}

export async function register(data: RegisterRequest): Promise<User> {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
  return response.data.user;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  sessionId?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  // include sessionId if your server requires it
  sessionId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  photoUrl?: string | null;
}
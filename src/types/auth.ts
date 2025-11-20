export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: User;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

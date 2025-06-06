export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<User, 'password'>;
}

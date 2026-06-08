export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'individual' | 'business' | 'expert';
  avatarUrl?: string;
  createdAt?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'individual' | 'business' | 'expert';
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export type ProviderVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface ProviderProfile {
  id: string;
  organizationName: string;
  verificationStatus: ProviderVerificationStatus;
  onboardingCompleted: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'individual' | 'business' | 'expert' | 'provider';
  avatarUrl?: string;
  createdAt?: string;
  provider?: ProviderProfile;
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
  role: 'provider';
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export type RegisterResult =
  | AuthResponse
  | { requiresEmailConfirmation: true; email: string };

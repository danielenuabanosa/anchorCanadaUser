export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  role: 'individual' | 'business' | 'expert';
  province?: string;
  avatarUrl?: string;
  interests: string[];
  createdAt: string;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  bio?: string;
  province?: string;
  interests?: string[];
}

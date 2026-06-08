'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/store/authStore';
import type { LoginDto, RegisterDto } from '../types';

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      router.push('/dashboard');
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: Omit<RegisterDto, 'confirmPassword'>) => authService.register(dto),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      router.push('/dashboard');
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearAuth();
      router.push('/login');
    },
  });
}

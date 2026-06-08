'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { loginSchema, type LoginInput } from '../schemas';
import { useLogin } from '../hooks/useAuth';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = (data: LoginInput) => login(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {error && (
        <div role="alert" className="rounded-xl bg-error-50 px-4 py-3 text-sm text-error-600 border border-error-100">
          {(error as { message?: string }).message ?? 'Sign-in failed. Please try again.'}
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <div className="flex items-center justify-end">
        <Link href="/forgot-password" className="text-sm text-brand-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" isLoading={isPending} className="w-full" size="lg">
        Sign in
      </Button>

      <p className="text-center text-sm text-neutral-500">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-brand-600 hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}

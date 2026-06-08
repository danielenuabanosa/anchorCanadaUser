'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Mail, Lock, User } from 'lucide-react';
import { registerSchema, type RegisterInput } from '../schemas';
import { useRegister } from '../hooks/useAuth';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

const ROLE_OPTIONS = [
  { value: 'individual', label: '👤 Individual — I\'m looking for opportunities' },
  { value: 'business',   label: '🏢 Business — I\'m a provider or employer' },
  { value: 'expert',     label: '🎓 Expert — I\'m a consultant or advisor' },
] as const;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const { mutate: signUp, isPending, error } = useRegister();

  const onSubmit = ({ confirmPassword: _cp, ...dto }: RegisterInput) => signUp(dto);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {error && (
        <div role="alert" className="rounded-xl bg-error-50 px-4 py-3 text-sm text-error-600 border border-error-100">
          {(error as { message?: string }).message ?? 'Registration failed. Please try again.'}
        </div>
      )}

      <Input
        label="Full name"
        type="text"
        autoComplete="name"
        placeholder="Jane Smith"
        leftIcon={<User className="h-4 w-4" />}
        error={errors.name?.message}
        required
        {...register('name')}
      />

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

      {/* Role selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-700">
          I am a… <span className="ml-1 text-error-500" aria-hidden="true">*</span>
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {ROLE_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 p-3 text-sm transition has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50"
            >
              <input
                type="radio"
                value={value}
                className="accent-brand-600"
                {...register('role')}
              />
              <span className="text-neutral-700">{label}</span>
            </label>
          ))}
        </div>
        {errors.role && (
          <p role="alert" className="text-xs text-error-500">{errors.role.message}</p>
        )}
      </div>

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.password?.message}
        helperText="Min 8 chars, one uppercase letter, one number"
        required
        {...register('password')}
      />

      <Input
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />

      <Button type="submit" isLoading={isPending} className="w-full" size="lg">
        Create account
      </Button>

      <p className="text-center text-sm text-neutral-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

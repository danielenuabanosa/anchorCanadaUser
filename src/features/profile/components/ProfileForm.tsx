'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateProfile } from '../hooks/useProfile';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import type { UserProfile } from '../types';

const profileSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  phone:    z.string().optional(),
  bio:      z.string().max(500, 'Bio max 500 characters').optional(),
  province: z.string().optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

const PROVINCE_OPTIONS = [
  { value: '',   label: 'Select province' },
  { value: 'AB', label: 'Alberta'          },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba'         },
  { value: 'NB', label: 'New Brunswick'    },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'NS', label: 'Nova Scotia'      },
  { value: 'ON', label: 'Ontario'          },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec'           },
  { value: 'SK', label: 'Saskatchewan'     },
];

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name:     profile.name,
      phone:    profile.phone ?? '',
      bio:      profile.bio ?? '',
      province: profile.province ?? '',
    },
  });

  const { mutate: update, isPending, isSuccess, error } = useUpdateProfile();

  return (
    <form
      onSubmit={handleSubmit((data) => update(data))}
      className="space-y-5"
      noValidate
    >
      {isSuccess && (
        <div role="status" className="rounded-xl bg-success-50 px-4 py-3 text-sm text-success-600 border border-success-200">
          Profile updated successfully.
        </div>
      )}
      {error && (
        <div role="alert" className="rounded-xl bg-error-50 px-4 py-3 text-sm text-error-600 border border-error-100">
          {(error as { message?: string }).message ?? 'Failed to update profile.'}
        </div>
      )}

      <Input
        label="Full name"
        type="text"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      <Input
        label="Phone number"
        type="tel"
        autoComplete="tel"
        placeholder="+1 (555) 000-0000"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Select
        label="Province"
        options={PROVINCE_OPTIONS}
        {...register('province')}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-700">Bio</label>
        <textarea
          className="anchor-textarea"
          placeholder="Tell us a bit about yourself…"
          rows={4}
          {...register('bio')}
        />
        {errors.bio && (
          <p role="alert" className="text-xs text-error-500">{errors.bio.message}</p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isPending}
        disabled={!isDirty}
        className="w-full sm:w-auto"
      >
        Save changes
      </Button>
    </form>
  );
}

'use client';

import { useProfile } from '../hooks/useProfile';
import { useAuthStore } from '@/store/authStore';
import { ProfileForm } from './ProfileForm';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { capitalize } from '@/lib/utils';

export function ProfilePageContent() {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile header */}
      <Card>
        <div className="flex items-center gap-5">
          <Avatar
            src={user?.avatarUrl}
            fallback={user?.name ?? 'U'}
            size="xl"
            className="shrink-0 ring-4 ring-brand-100"
          />
          <div>
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-neutral-900">{profile?.name}</h2>
                <p className="text-sm text-neutral-500">{profile?.email}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="primary">{capitalize(profile?.role ?? '')}</Badge>
                  {profile?.province && (
                    <Badge variant="default">{profile.province}</Badge>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Edit form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading || !profile ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <ProfileForm profile={profile} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { redirect } from 'next/navigation';

/** Team setup was removed from provider onboarding. */
export default function TeamSetupPage() {
  redirect('/onboarding/activation');
}

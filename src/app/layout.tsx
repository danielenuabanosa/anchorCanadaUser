import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from '@/shared/components/providers/Providers';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Anchor Canada',
    default: 'Anchor Canada — Your Opportunity Hub',
  },
  description:
    'Discover jobs, housing, training, funding, and community support across Canada — all in one place.',
  openGraph: {
    siteName: 'Anchor Canada',
    type: 'website',
    locale: 'en_CA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={[dmSans.variable, instrumentSerif.variable].join(' ')}
    >
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import React from 'react';
import { CreditCard, Wrench, Megaphone, KeyRound } from 'lucide-react';
import { AppStoreTemplate } from '../components/marketing/AppStoreTemplate';

export const metadata = {
  title: 'Lodgely Resident App — Rent, Maintenance & Building Access',
  description:
    'The Lodgely Resident app: pay rent and service charges, submit and track maintenance issues, stay on top of building notices, and generate digital visitor access codes — all from your phone.',
};

// Resident is a mobile-native-only product (per confirmed product scope) —
// this page is a pure app-store download page, with no Sign In/Sign Up CTA
// and no link to the legacy resident-web browser app.
export default function ResidentPage() {
  const appStoreUrl = process.env.NEXT_PUBLIC_RESIDENT_APP_STORE_URL || '#';
  const playStoreUrl = process.env.NEXT_PUBLIC_RESIDENT_PLAY_STORE_URL || '#';

  return (
    <AppStoreTemplate
      appId="resident"
      eyebrow="Lodgely for Residents"
      headline={
        <>
          Your home, <span style={{ color: 'var(--mint-deep)' }}>handled</span> from your phone.
        </>
      }
      subheadline="Pay rent, raise a maintenance ticket, catch every building notice, and let visitors in — all from one app built for where you live."
      appStoreUrl={appStoreUrl}
      playStoreUrl={playStoreUrl}
      features={[
        {
          icon: <CreditCard size={24} strokeWidth={1.75} />,
          title: 'Pay rent in a tap',
          description:
            'Pay rent and service charges, track contributions, and pull up a digital receipt whenever you need one — no queues, no bank visits.',
        },
        {
          icon: <Wrench size={24} strokeWidth={1.75} />,
          title: 'Report issues, track fixes',
          description:
            'Submit a maintenance ticket in seconds and follow its status through to resolution, with updates and comments along the way.',
        },
        {
          icon: <Megaphone size={24} strokeWidth={1.75} />,
          title: 'Never miss a notice',
          description:
            'Building announcements and real-time notifications land straight on your phone, so you always know what is happening where you live.',
        },
        {
          icon: <KeyRound size={24} strokeWidth={1.75} />,
          title: 'Digital access for visitors',
          description:
            'Generate time-bound digital access codes for guests and deliveries, and share them instantly — no calls to the gate required.',
        },
      ]}
    />
  );
}

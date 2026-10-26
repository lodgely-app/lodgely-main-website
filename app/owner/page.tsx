import React from 'react';
import { notFound } from 'next/navigation';
import { Wallet, Building2, FileText, Wrench } from 'lucide-react';
import { AppStoreTemplate } from '../components/marketing/AppStoreTemplate';
import { SHOW_OWNER } from '../lib/productFlags';

export const metadata = {
  title: 'Lodgely Owner App — Rent Collection, Wallet & Lease Management',
  description:
    'The Lodgely Owner app: track rent collection across every unit, see your wallet balance at a glance, manage leases and tenants, and stay on top of maintenance — all from your phone.',
};

// Owner (landlord) is a mobile-native-only product (per confirmed product
// scope) — this page is a pure app-store download page, with no Sign In/Sign
// Up CTA and no link to the legacy landlord-web browser app.
export default function OwnerPage() {
  // Not publicly ready yet — hidden from nav/cards/footer/search (see
  // app/lib/productFlags.ts) and 404'd here too, so visiting the URL
  // directly doesn't surface it either. Nothing above is deleted; flip
  // NEXT_PUBLIC_SHOW_OWNER to 'true' once it's ready.
  if (!SHOW_OWNER) {
    notFound();
  }

  const appStoreUrl = process.env.NEXT_PUBLIC_OWNER_APP_STORE_URL || '#';
  const playStoreUrl = process.env.NEXT_PUBLIC_OWNER_PLAY_STORE_URL || '#';

  return (
    <AppStoreTemplate
      appId="owner"
      eyebrow="Lodgely for Owners"
      headline={
        <>
          Your whole portfolio, <span style={{ color: 'var(--mint-deep)' }}>in your pocket</span>.
        </>
      }
      subheadline="Track rent collection, see what's in your wallet, manage leases, and stay ahead of maintenance across every property you own — all from one app."
      appStoreUrl={appStoreUrl}
      playStoreUrl={playStoreUrl}
      features={[
        {
          icon: <Wallet size={24} strokeWidth={1.75} />,
          title: 'Rent collection, at a glance',
          description:
            'See revenue collected, what is still outstanding, and every transaction across your facilities — plus your wallet balance in real time.',
        },
        {
          icon: <Building2 size={24} strokeWidth={1.75} />,
          title: 'Manage every facility',
          description:
            'Keep tabs on occupancy, units, and tenants across all your properties from a single dashboard, without switching between spreadsheets.',
        },
        {
          icon: <FileText size={24} strokeWidth={1.75} />,
          title: 'Leases and tenants, organized',
          description:
            'View tenant details and lease terms — start dates, end dates, and renewals — so nothing slips through the cracks.',
        },
        {
          icon: <Wrench size={24} strokeWidth={1.75} />,
          title: 'Maintenance visibility',
          description:
            'Stay in the loop on maintenance requests raised across your units, so you always know what needs your attention next.',
        },
      ]}
    />
  );
}

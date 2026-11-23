import React from 'react';
import { ResidentLandingClient } from './ResidentLandingClient';

export const metadata = {
  title: 'Lodgely Resident App — Service Charge, Repairs, Notices & Gate Passes',
  description:
    'The Lodgely Resident app for estates on Lodgely Facility: pay your service charge and levies, keep your receipts, report repairs, read estate notices and create visitor gate passes, all from your phone.',
};

// Resident is a mobile-native-only product. The page follows the same setup
// as /facility and /developer (shared Navbar, split hero, CTA band, shared
// footer); the store buttons read the NEXT_PUBLIC_RESIDENT_*_STORE_URL vars.
export default function ResidentPage() {
  const appStoreUrl = process.env.NEXT_PUBLIC_RESIDENT_APP_STORE_URL || '#';
  const playStoreUrl = process.env.NEXT_PUBLIC_RESIDENT_PLAY_STORE_URL || '#';

  return (
    <ResidentLandingClient
      appStoreUrl={appStoreUrl}
      playStoreUrl={playStoreUrl}
    />
  );
}

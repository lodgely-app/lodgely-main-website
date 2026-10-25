import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lodgely - Premium Facility Management Software',
  description:
    'Lodgely is the ultimate facility management solution. Manage facilities, track service charges, handle maintenance, and securely onboard tenants with our unified platform.',
  openGraph: {
    type: 'website',
    url: 'https://lodgely.ng/facility',
    title: 'Lodgely - Premium Facility Management Software',
    description:
      'Lodgely is the ultimate facility management solution. Manage facilities, track service charges, handle maintenance, and securely onboard tenants with our unified platform.',
    images: [
      {
        url: 'https://lodgely.ng/lodgely_logo.png',
        width: 1200,
        height: 630,
        alt: 'Lodgely Facility Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lodgely - Premium Facility Management Software',
    description:
      'Lodgely is the ultimate facility management solution. Manage facilities, track service charges, handle maintenance, and securely onboard tenants with our unified platform.',
    images: ['https://lodgely.ng/lodgely_logo.png'],
  },
};

export default function FacilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

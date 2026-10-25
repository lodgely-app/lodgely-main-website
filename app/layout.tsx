import './globals.css';
import './landing.css';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://lodgely.ng'),
  title: {
    default: 'Lodgely - Premium Facility & Real Estate Management Software',
    template: '%s | Lodgely',
  },
  description:
    'Lodgely is the ultimate unified property and facility management solution. Manage facilities, track service charges, handle maintenance, and securely onboard residents, landlords, and teams across one platform.',
  keywords: [
    'property management',
    'facility management',
    'estate management',
    'service charge tracking',
    'landlord software',
    'tenant app',
    'Nigeria property management',
    'real estate developer software',
    'realtor CRM',
    'real estate investment platform',
  ],
  authors: [{ name: 'Lodgely Inc.', url: 'https://lodgely.ng' }],
  creator: 'Lodgely',
  publisher: 'Lodgely',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/lodgely_logo.png',
    shortcut: '/lodgely_logo.png',
    apple: '/lodgely_logo.png',
  },
  alternates: {
    canonical: 'https://lodgely.ng',
  },
  verification: {
    google: 'w59Mv2e6oYZ0NRpxolnft6RW8araNtGC93ppsPJZm4M',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://lodgely.ng',
    siteName: 'Lodgely',
    title: 'Lodgely - Premium Facility Management Software',
    description:
      'Lodgely is the ultimate facility management solution. Manage facilities, track service charges, handle maintenance, and securely onboard tenants with our unified platform.',
    images: [
      {
        url: 'https://lodgely.ng/lodgely_logo.png',
        width: 1200,
        height: 630,
        alt: 'Lodgely Real Estate & Facility Management Platform',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lodgely',
  operatingSystem: 'Web, iOS, Android',
  applicationCategory: 'BusinessApplication',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '150',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'NGN',
  },
  description:
    'Facility management software designed to simplify rent collection, service charge, maintenance tracking, and tenant onboarding.',
  url: 'https://lodgely.ng',
  publisher: {
    '@type': 'Organization',
    name: 'Lodgely',
    logo: 'https://lodgely.ng/lodgely_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="w59Mv2e6oYZ0NRpxolnft6RW8araNtGC93ppsPJZm4M" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

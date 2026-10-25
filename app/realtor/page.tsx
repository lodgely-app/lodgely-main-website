'use client';

import React from 'react';
import { ComingSoonTemplate } from '../components/marketing/ComingSoonTemplate';

const icon = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
    {path}
  </svg>
);

// realtor-web is a real, functioning product today (identity-service's APPS
// registry already has a full "realtor" entry, role "agent") — "coming soon"
// here describes this marketing presence, not product availability. Hero
// copy is based on realtor-web's own (thin) Landing.tsx positioning; feature
// teasers are reasonable extrapolations for a marketing page, not a product
// requirements doc.
export default function RealtorMarketingPage() {
  return (
    <ComingSoonTemplate
      appId="realtor"
      eyebrow="Lodgely for Realtors"
      headline={
        <>
          The easiest way to run
          <br />
          your side of the property.
        </>
      }
      subheadline="Purpose-built for how agents actually work — connected to every other side of the portfolio through one Lodgely account."
      features={[
        {
          icon: icon(
            <>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h4" />
            </>
          ),
          title: 'Listings Management',
          description: 'Publish and update property listings in one place, with details that stay in sync everywhere they appear.',
        },
        {
          icon: icon(
            <>
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </>
          ),
          title: 'Client & Lead Pipeline',
          description: 'Track every lead from first inquiry to signed deal, and never lose sight of who needs a follow-up.',
        },
        {
          icon: icon(
            <>
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </>
          ),
          title: 'Closing & Transaction Tracking',
          description: 'Follow a deal from offer to closing with a clear view of documents, milestones, and payouts.',
        },
        {
          icon: icon(
            <>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </>
          ),
          title: 'One Identity, Every App',
          description: 'Sign in once and move between your realtor tools and the rest of the Lodgely platform without friction.',
        },
      ]}
    />
  );
}

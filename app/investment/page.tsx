'use client';

import React from 'react';
import { ComingSoonTemplate } from '../components/marketing/ComingSoonTemplate';

const icon = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
    {path}
  </svg>
);

// investment-web's own "/" root (FeedView) is a real, working public
// social/browsing feed — a separate workstream, left untouched here. This
// page is the net-new marketing presence for the product line; there is no
// existing marketing copy to migrate, so the feature teasers are anchored on
// investment-web's actual purpose (a public feed of listings/channels plus a
// personal portfolio behind login) and the homepage's own investment blurb.
export default function InvestmentMarketingPage() {
  return (
    <ComingSoonTemplate
      appId="investment"
      eyebrow="Lodgely for Investors"
      headline={
        <>
          Real estate investing,
          <br />
          without the guesswork.
        </>
      }
      subheadline="Track portfolio returns, monitor cash flows, and evaluate new deals — all connected to the rest of the Lodgely platform through one account."
      features={[
        {
          icon: icon(
            <>
              <path d="M3 3v18h18" />
              <path d="M7 15l4-4 3 3 5-6" />
            </>
          ),
          title: 'Portfolio Tracking',
          description: 'See your holdings, returns, and cash flows in one live view instead of piecing it together from statements.',
        },
        {
          icon: icon(
            <>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 10h18" />
              <path d="M7 15h.01" />
              <path d="M11 15h6" />
            </>
          ),
          title: 'Deal Discovery Feed',
          description: 'Browse new listings and investment opportunities surfaced from agencies and channels across the platform.',
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
          title: 'Agency Channels',
          description: 'Follow the agencies and developers you invest with and keep every update from them in one place.',
        },
        {
          icon: icon(
            <>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </>
          ),
          title: 'One Identity, Every App',
          description: 'Sign in once and move between your investment tools and the rest of the Lodgely platform without friction.',
        },
      ]}
    />
  );
}

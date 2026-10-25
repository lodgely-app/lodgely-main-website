'use client';

import React, { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { getSignInUrl, getSignUpUrl } from '../../lib/auth';

export interface ComingSoonFeature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ComingSoonTemplateProps {
  appId: string;
  eyebrow: string;
  headline: ReactNode;
  subheadline: string;
  features: ComingSoonFeature[];
  primaryCtaLabel?: string;
}

// Lighter single-page template for product surfaces that don't have a rich
// marketing Landing page to migrate (realtor/investment) — unlike developer
// and facility, which port an existing page wholesale, this is net-new
// "coming soon"-styled copy. It still carries real, working Sign In / Sign Up
// CTAs through account-portal-web (per the product spec, these are not
// fake waitlist pages — both appIds already exist in the shared login system).
export function ComingSoonTemplate({
  appId,
  eyebrow,
  headline,
  subheadline,
  features,
  primaryCtaLabel = 'Schedule a demo',
}: ComingSoonTemplateProps) {
  const signInUrl = getSignInUrl(appId);
  const signUpUrl = '/schedule-demo';

  return (
    <main>
      <SiteHeader activeAppId={appId} />


      <section
        style={{
          textAlign: 'center',
          padding: '136px 24px 56px',
          background:
            'radial-gradient(ellipse 900px 400px at 50% 0%, rgba(131, 232, 202, 0.16), transparent 70%), var(--bg)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(131, 232, 202, 0.14)',
            border: '1px solid rgba(131, 232, 202, 0.4)',
            color: 'var(--navy)',
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: 999,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--mint-deep)',
              display: 'inline-block',
            }}
          />
          {eyebrow}
        </div>

        <h1
          style={{
            fontSize: 52,
            lineHeight: 1.14,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'var(--navy)',
            maxWidth: 820,
            margin: '0 auto',
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: 'var(--text-muted)',
            maxWidth: 580,
            margin: '24px auto 0',
            lineHeight: 1.6,
          }}
        >
          {subheadline}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginTop: 38,
            flexWrap: 'wrap',
          }}
        >
          <a
            href={signUpUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--navy)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              padding: '15px 30px',
              borderRadius: 10,
              boxShadow: '0 10px 24px -8px rgba(44, 53, 82, 0.45)',
            }}
          >
            {primaryCtaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={16} height={16}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={signInUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'var(--navy)',
              fontWeight: 700,
              fontSize: 15,
              padding: '14px 28px',
              borderRadius: 10,
              border: '1.5px solid var(--navy)',
            }}
          >
            Sign In
          </a>
        </div>
      </section>

      <section style={{ padding: '0 48px 100px' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="hover-card"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '30px 26px',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'rgba(131, 232, 202, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                  color: 'var(--navy)',
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: 8,
                }}
              >
                {feature.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

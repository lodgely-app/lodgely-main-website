'use client';

import React, { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import FooterCmp from '../landingPage/FooterCmp';

export interface ServiceHighlight {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ServicePageTemplateProps {
  eyebrow: string;
  headline: ReactNode;
  subheadline: string;
  highlights: ServiceHighlight[];
  whoItsForTitle: string;
  whoItsFor: string[];
  ctaLabel?: string;
}

// Shared layout for the four /services/* pages — professional-services
// offerings Lodgely provides alongside the software, not product sign-up
// pages, so the CTA points at /schedule-demo ("talk to us") rather than any
// Sign In/Sign Up flow.
export function ServicePageTemplate({
  eyebrow,
  headline,
  subheadline,
  highlights,
  whoItsForTitle,
  whoItsFor,
  ctaLabel = 'Schedule a Consultation',
}: ServicePageTemplateProps) {
  return (
    <main>
      <SiteHeader />

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
            fontSize: 48,
            lineHeight: 1.16,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'var(--navy)',
            maxWidth: 780,
            margin: '0 auto',
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            fontSize: 17,
            color: 'var(--text-muted)',
            maxWidth: 580,
            margin: '22px auto 0',
            lineHeight: 1.6,
          }}
        >
          {subheadline}
        </p>

        <div style={{ marginTop: 34 }}>
          <a
            href="/schedule-demo"
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
              textDecoration: 'none',
            }}
          >
            {ctaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={16} height={16}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      <section style={{ padding: '0 48px 72px' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {highlights.map((item, i) => (
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
                {item.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 48px 100px' }}>
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '36px 40px',
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 16 }}>
            {whoItsForTitle}
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8 }}>
            {whoItsFor.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <FooterCmp />
    </main>
  );
}

export default ServicePageTemplate;

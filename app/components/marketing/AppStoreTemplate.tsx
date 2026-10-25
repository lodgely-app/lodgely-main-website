import React from 'react';
import { Apple, Play } from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export interface AppStoreFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface AppStoreTemplateProps {
  appId?: string;
  eyebrow: string;
  headline: React.ReactNode;
  subheadline: string;
  /** 3-4 feature highlight cards */
  features: AppStoreFeature[];
  /** From env — may be a placeholder ('#') until the app is listed. */
  appStoreUrl?: string;
  /** From env — may be a placeholder ('#') until the app is listed. */
  playStoreUrl?: string;
}

// Shared layout for the two mobile-native-only product pages (/resident and
// /owner). Per confirmed product scope, these pages are pure app-store-badge
// download pages — no Sign In/Sign Up CTA, no link to the legacy
// resident-web/landlord-web browser apps. SiteHeader still renders (it's the
// site-wide brand bar used on every page), it just isn't the primary CTA here.
export function AppStoreTemplate({
  appId,
  eyebrow,
  headline,
  subheadline,
  features,
  appStoreUrl = '#',
  playStoreUrl = '#',
}: AppStoreTemplateProps) {
  return (
    <main>
      <SiteHeader activeAppId={appId} />

      {/* ---------- HERO ---------- */}
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
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(131, 232, 202, 0.16)',
            border: '1px solid rgba(95, 211, 176, 0.4)',
            color: 'var(--navy)',
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 26,
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
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.12,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'var(--navy)',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: 'var(--text-muted)',
            maxWidth: 620,
            margin: '26px auto 0',
            lineHeight: 1.6,
          }}
        >
          {subheadline}
        </p>

        {/* ---------- STORE BADGES ---------- */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            marginTop: 40,
          }}
        >
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--navy)',
              color: '#fff',
              padding: '13px 26px',
              borderRadius: 12,
              boxShadow: '0 10px 24px -8px rgba(44, 53, 82, 0.45)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <Apple size={28} strokeWidth={1.5} fill="#fff" />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
              <span style={{ fontSize: 11, opacity: 0.8, fontWeight: 500 }}>Download on the</span>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>App Store</span>
            </span>
          </a>

          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--navy)',
              color: '#fff',
              padding: '13px 26px',
              borderRadius: 12,
              boxShadow: '0 10px 24px -8px rgba(44, 53, 82, 0.45)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <Play size={24} strokeWidth={1.5} fill="#fff" />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
              <span style={{ fontSize: 11, opacity: 0.8, fontWeight: 500 }}>GET IT ON</span>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Google Play</span>
            </span>
          </a>
        </div>
      </section>

      {/* ---------- FEATURE HIGHLIGHTS ---------- */}
      <section style={{ padding: '20px 24px 100px' }}>
        <div
          style={{
            maxWidth: 1120,
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
                boxShadow: '0 20px 40px -28px rgba(27, 33, 56, 0.18)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(131, 232, 202, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--navy)',
                  marginBottom: 20,
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
              <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

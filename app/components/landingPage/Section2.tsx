'use client';

import React from 'react';
import { Users, TrendingUp, Smartphone, ShieldCheck } from 'lucide-react';
import { getSignUpUrl } from '../../lib/auth';
import { SHOW_OWNER, VISIBLE_PRODUCT_IDS, VISIBLE_PRODUCT_NAMES, VISIBLE_PRODUCT_ROLES, joinWithAnd } from '../../lib/productFlags';

const miniFeatures = [
  {
    Icon: Users,
    iconBg: '#EDE9FF',
    iconColor: '#4F39F6',
    title: 'BUILT FOR EVERY ROLE:',
    desc: `${joinWithAnd(VISIBLE_PRODUCT_ROLES.map((r) => r.charAt(0).toUpperCase() + r.slice(1)))} each get a tailored experience.`,
  },
  {
    Icon: TrendingUp,
    iconBg: '#E6F7F1',
    iconColor: '#0D9488',
    title: 'TRACK EVERY TRANSACTION:',
    desc: 'Access full payment history and reporting in one dashboard.',
  },
  {
    Icon: Smartphone,
    iconBg: '#FDEEE4',
    iconColor: '#B45309',
    title: 'ACCESS FROM ANYWHERE:',
    desc: SHOW_OWNER
      ? 'Web for operators, native mobile apps for residents and owners.'
      : 'Web for operators, a native mobile app for residents.',
  },
  {
    Icon: ShieldCheck,
    iconBg: '#FEECEC',
    iconColor: '#DC2626',
    title: 'KEEP YOUR DATA SECURE:',
    desc: 'Encrypted, gateway-secured data for safety and trust.',
  },
];

export const Section2 = () => {
  return (
    <div className="caps-outer">
      <div className="caps-header">
        <span className="product-eyebrow-text">PLATFORM CAPABILITIES</span>
        <h2 className="product-title-heading" style={{ color: '#1B2138' }}>
          Everything a unified real estate platform should do.
        </h2>
      </div>

      <div className="caps-grid">
        {/* Column 1 */}
        <div className="caps-col">
          <div className="caps-card" style={{ background: '#EDE9FF', minHeight: 420 }}>
            <h3 className="caps-card-title">ONE IDENTITY, {VISIBLE_PRODUCT_IDS.length} APPS</h3>
            <p className="caps-card-desc">
              Sign in once and move between {joinWithAnd(VISIBLE_PRODUCT_NAMES)} — no separate accounts to manage.
            </p>
            <a href={getSignUpUrl('marketing')} className="caps-card-btn" style={{ background: '#4F39F6' }}>
              Get Started
            </a>
          </div>

          <div className="caps-card" style={{ background: '#E8F1FF' }}>
            <h3 className="caps-card-title">SECURE PAYMENTS</h3>
            <p className="caps-card-desc">
              Rent, service charges, and contributions processed securely, with a full transaction history for every
              tenancy.
            </p>
            <div className="caps-mock-box">
              <div className="caps-mock-label">Payment Reference</div>
              <div className="caps-mock-value">
                <span>LDG-7F3A91C2-RENT</span>
              </div>
              <div className="caps-mock-actions">
                <button type="button" className="caps-mock-copy-btn">Copy reference</button>
                <button type="button" className="caps-mock-ghost-btn">View receipt</button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="caps-col">
          <div className="caps-card" style={{ background: '#FDEEE4' }}>
            <h3 className="caps-card-title">REAL-TIME NOTIFICATIONS</h3>
            <p className="caps-card-desc">
              Announcements, issue updates, and payment reminders delivered instantly — on web and in the Lodgely
              mobile app.
            </p>
            <div className="caps-notif-stack">
              <div className="caps-notif-chip">
                <span className="caps-notif-dot" style={{ background: '#2ba3a1' }} />
                <div>
                  <div className="caps-notif-title">New Announcement</div>
                  <div className="caps-notif-sub">Block A water supply · 2 min ago</div>
                </div>
              </div>
              <div className="caps-notif-chip">
                <span className="caps-notif-dot" style={{ background: '#f59e0b' }} />
                <div>
                  <div className="caps-notif-title">Rent Reminder</div>
                  <div className="caps-notif-sub">Due in 3 days · Unit 4B</div>
                </div>
              </div>
            </div>
          </div>

          <div className="caps-card" style={{ background: '#EAFBF3', minHeight: 420 }}>
            <h3 className="caps-card-title">ROLE-BASED ACCESS</h3>
            <p className="caps-card-desc">
              Managers, finance, and viewers each see exactly what they need — nothing more, nothing less.
            </p>
            <div className="caps-shield-art">
              <ShieldCheck size={56} color="#0D9488" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Mini feature strip */}
      <div className="caps-feature-strip">
        {miniFeatures.map((f) => (
          <div className="caps-feature-item" key={f.title}>
            <div className="caps-feature-icon" style={{ background: f.iconBg }}>
              <f.Icon size={22} color={f.iconColor} />
            </div>
            <h4 className="caps-feature-title">{f.title}</h4>
            <p className="caps-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;

'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { isProductVisible } from '../../lib/productFlags';

// lucide-react doesn't ship brand/social-platform icons (intentionally, to
// avoid trademarking issues) — these are small hand-drawn glyphs, not
// copyrighted logo marks, matching the generic-outline-icon style the rest
// of this footer's link buttons already use.
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.3l8.2-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5C0 2.1 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.2 8.3h4.6V23H.2V8.3zM8 8.3h4.4v2h.06c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.44 3 5.44 6.9V23h-4.6v-6.8c0-1.6 0-3.7-2.26-3.7-2.26 0-2.6 1.77-2.6 3.6V23H8V8.3z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>
);

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Operations Suite', href: '#operations-suite' },
  { label: 'Mobile Apps', href: '#mobile-apps' },
];

const operatorApps = [
  { id: 'developer', label: 'Developer', href: '/developer' },
  { id: 'facility', label: 'Facility', href: '/facility' },
  { id: 'realtor', label: 'Realtor', href: '/realtor' },
  { id: 'investment', label: 'Investment', href: '/investment' },
].filter((l) => isProductVisible(l.id));

const stakeholderApps = [
  { id: 'resident', label: 'Resident', href: '/resident' },
  { id: 'owner', label: 'Owner', href: '/owner' },
].filter((l) => isProductVisible(l.id));

export const FooterCmp = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper-v2">
      <div className="footer-inner-v2">
        <div className="footer-top-grid-v2">
          {/* Col 1: Logo, blurb, contact */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-logo-link">
              <img src="/lodgely-logo.svg" alt="Lodgely" width={34} height={34} />
              <span>Lodgely</span>
            </Link>

            <div className="footer-contact-block">
              <h5 className="footer-col-title-v2">Contact Info</h5>
              <a href="mailto:support@lodgely.ng" className="footer-contact-row">
                <Mail size={16} />
                <span>support@lodgely.ng</span>
              </a>
              <div className="footer-contact-row footer-address-row">
                <MapPin size={16} />
                <span>Plot 246 Cadastral Zone B10, Jabi-Dakibiu, Abuja, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="footer-col-title-v2">Quick Links</h5>
            <ul className="footer-links-list-v2">
              {quickLinks.map((l) => (
                <li key={l.label}><a href={l.href} className="footer-link-v2">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3: Operator Apps */}
          <div>
            <h5 className="footer-col-title-v2">Operator Apps</h5>
            <ul className="footer-links-list-v2">
              {operatorApps.map((l) => (
                <li key={l.label}><a href={l.href} className="footer-link-v2">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4: Mobile Apps */}
          <div>
            <h5 className="footer-col-title-v2">Mobile Apps</h5>
            <ul className="footer-links-list-v2">
              {stakeholderApps.map((l) => (
                <li key={l.label}><a href={l.href} className="footer-link-v2">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 5: Social */}
          <div>
            <h5 className="footer-col-title-v2">Social Media</h5>
            <div className="footer-social-row">
              <a href="#" aria-label="Instagram" className="footer-social-btn"><InstagramIcon /></a>
              <a href="#" aria-label="X" className="footer-social-btn"><XIcon /></a>
              <a href="#" aria-label="LinkedIn" className="footer-social-btn"><LinkedInIcon /></a>
              <a href="#" aria-label="YouTube" className="footer-social-btn"><YoutubeIcon /></a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar-v2">
          <p>© {currentYear}, Lodgely Inc. All rights reserved.</p>
          <div className="footer-bottom-links-v2">
            <a href="/terms" className="footer-link-v2">Terms &amp; Conditions</a>
            <a href="/privacy" className="footer-link-v2">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Giant dotted watermark */}
      <div className="footer-watermark-v2" aria-hidden>Lodgely</div>
    </footer>
  );
};

export default FooterCmp;

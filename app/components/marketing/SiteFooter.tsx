import React from 'react';

const PRODUCT_LINKS: { label: string; href: string }[] = [
  { label: 'Developer', href: '/developer' },
  { label: 'Facility', href: '/facility' },
  { label: 'Realtor', href: '/realtor' },
  { label: 'Investment', href: '/investment' },
  { label: 'Resident', href: '/resident' },
  { label: 'Owner', href: '/owner' },
];

// Shared site-wide footer. Migrated product pages (developer/facility/realtor)
// bring their own richer footer section as part of their ported content —
// this is used standalone by the homepage and the net-new resident/owner/
// investment pages, which have no existing footer to migrate.
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <div className="site-footer-brand-row">
            <img src="/lodgely-logo.svg" alt="Lodgely Logo" width={28} height={28} />
            <span>Lodgely</span>
          </div>
          <p>Unified real estate property management, connecting every side of the property under one identity.</p>
        </div>

        <div className="site-footer-col">
          <h5>Products</h5>
          <ul>
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} Lodgely Inc. All rights reserved. Unified Real Estate Property Suite.</p>
      </div>
    </footer>
  );
}

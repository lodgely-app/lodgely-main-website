import React from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { LegalSidebar, LegalSidebarSection } from './LegalSidebar';

export interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  intro?: React.ReactNode;
  sections: LegalSidebarSection[];
  children: React.ReactNode;
}

// Shared layout for /privacy and /terms — long-form legal content, styled
// consistently with the rest of the marketing site (SiteHeader/SiteFooter,
// navy/mint palette). "On this page" is a sticky left sidebar (see
// LegalSidebar) rather than an inline box, matching the reference layout.
export function LegalLayout({ title, lastUpdated, intro, sections, children }: LegalLayoutProps) {
  return (
    <main>
      <SiteHeader />
      <div className="legal-page">
        <div className="legal-page-header">
          <h1>{title}</h1>
          <p className="legal-last-updated">Last updated: {lastUpdated}</p>
          {intro && <div className="legal-intro">{intro}</div>}
        </div>
        <div className="legal-page-body">
          <LegalSidebar sections={sections} />
          <div className="legal-content">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

export default LegalLayout;

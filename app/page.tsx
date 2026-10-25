'use client';

import React from 'react';
import Navbar from './components/landingPage/Navbar';
import Section1Hero from './components/landingPage/Section1Hero';
import Section3 from './components/landingPage/Section3';
import Section5 from './components/landingPage/Section5';
import Section2 from './components/landingPage/Section2';
import Section7 from './components/landingPage/Section7';
import FooterCmp from './components/landingPage/FooterCmp';
import ScrollToTopButton from './components/landingPage/ScrollToTopButton';

export default function LandingPage() {
  return (
    <main className="landing-page-root" style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Floating Animated Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="top">
        <Section1Hero />
      </section>

      {/* Main Content Sections */}
      <div style={{ width: '100%', margin: '0 auto' }}>
        {/* Section 3: Operations Suite (Developer, Facility, Realtor, Investment) */}
        <section id="operations-suite">
          <Section3 />
        </section>

        {/* Section 5: Mobile Apps (Resident, Owner) - Dark Mode */}
        <section id="mobile-apps" style={{ backgroundColor: '#16191C' }}>
          <Section5 />
        </section>

        {/* Section 2: Platform Capabilities grid */}
        <Section2 />

        {/* Section 7: Bold closing CTA band (full-bleed) */}
        <Section7 />

        {/* Footer */}
        <FooterCmp />
      </div>

      {/* Scroll-To-Top Button */}
      <ScrollToTopButton />
    </main>
  );
}

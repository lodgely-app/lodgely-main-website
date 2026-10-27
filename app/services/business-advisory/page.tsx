import React from 'react';
import { Compass, TrendingUp, Users2, BarChart3 } from 'lucide-react';
import { ServicePageTemplate } from '../../components/marketing/ServicePageTemplate';

export const metadata = {
  title: 'Business Advisory',
  description:
    "Strategic advisory for real estate developers, facility operators, and agencies — from Lodgely's own team, built on what actually works running a property business on the platform.",
};

const icon = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
    {path}
  </svg>
);

export default function BusinessAdvisoryPage() {
  return (
    <ServicePageTemplate
      eyebrow="Lodgely Business Advisory"
      headline={
        <>
          Run your property business
          <br />
          like one that scales.
        </>
      }
      subheadline="Strategic advisory for developers, facility operators, and agencies looking to professionalize operations, restructure their organization, and improve margins — grounded in how real property businesses actually run on Lodgely."
      highlights={[
        {
          icon: <Compass size={24} strokeWidth={1.75} />,
          title: 'Operating model review',
          description:
            'An outside, experienced look at how your organization is structured today — roles, approval chains, and where work actually bottlenecks.',
        },
        {
          icon: <Users2 size={24} strokeWidth={1.75} />,
          title: 'Team & role design',
          description:
            'Define who should own what — from project ownership to finance sign-off — so decisions move at the pace your business needs.',
        },
        {
          icon: <BarChart3 size={24} strokeWidth={1.75} />,
          title: 'Financial & reporting discipline',
          description:
            'Build the reporting cadence and KPIs that let you see margin, cash position, and project health before they become a problem.',
        },
        {
          icon: <TrendingUp size={24} strokeWidth={1.75} />,
          title: 'Growth & expansion planning',
          description:
            'Whether it\'s a new development, a new building portfolio, or a new market, get a clear-eyed plan for what it takes to get there.',
        },
      ]}
      whoItsForTitle="Who this is for"
      whoItsFor={[
        'Real estate developers scaling beyond one project at a time',
        'Facility management companies adding buildings faster than their processes can keep up',
        'Agencies and brokerages formalizing how they manage listings, leads, and transactions',
        'Property owners professionalizing a portfolio that started informally',
      ]}
    />
  );
}

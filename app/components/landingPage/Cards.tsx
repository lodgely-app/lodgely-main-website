'use client';

import React from 'react';
import { HardHat, Building2, Home, TrendingUp, KeyRound, Landmark } from 'lucide-react';
import CardCmp from './CardCmp';

// Lodgely has no polished product screenshots to show in these cards — each
// product instead gets a couple of small "live activity" chips, the same
// mock-UI pattern used on the homepage's own product showcase, styled to
// read clearly against that product's own gradient background.
function ActivityMock({ items }: { items: { title: string; sub: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 320 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(255,255,255,0.96)',
            borderRadius: 14,
            padding: '14px 18px',
            marginLeft: i * 28,
            boxShadow: '0px 16px 32px rgba(0,0,0,0.18)',
          }}
        >
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#1B2138' }}>{item.title}</div>
          <div style={{ fontSize: 12, color: '#5B6478', marginTop: 2 }}>{item.sub}</div>
        </div>
      ))}
    </div>
  );
}

const iconBox = (Icon: React.ElementType) => <Icon size={28} color="#1B2138" />;

export const DeveloperCard = () => (
  <CardCmp
    bg="linear-gradient(139deg, #0f766e 2.33%, #14b8a6 96.28%)"
    heading="Developer"
    description="Plan projects, track unit inventory, manage requisitions and procurement, and release pre-sale units — all tied to one shared identity and one financial trail."
    btnlabel="Explore Developer"
    btnHref="/developer"
    icon={iconBox(HardHat)}
    art={
      <ActivityMock
        items={[
          { title: 'Milestone: Foundation Complete', sub: 'Riverside Towers · 2 min ago' },
          { title: 'Requisition Approved', sub: '₦2,400,000 · Procurement' },
        ]}
      />
    }
  />
);

export const FacilityCard = () => (
  <CardCmp
    bg="linear-gradient(139deg, #2ba3a1 2.33%, #83e8ca 96.28%)"
    heading="Facility"
    description="Coordinate tenancies, maintenance, service charges, and payments across every building in one place — with role-based access for managers, finance, and viewers."
    btnlabel="Explore Facility"
    btnHref="/facility"
    icon={iconBox(Building2)}
    art={
      <ActivityMock
        items={[
          { title: 'Rent Reminder Sent', sub: 'Unit 4B · Oakwood Court' },
          { title: 'Maintenance Ticket Resolved', sub: '#203 · Plumbing' },
        ]}
      />
    }
  />
);

export const RealtorCard = () => (
  <CardCmp
    bg="linear-gradient(139deg, #b45309 2.33%, #f59e0b 96.28%)"
    heading="Realtor"
    description="Manage listings, nurture leads through a real pipeline, and close transactions — connected to the same identity your clients already trust."
    btnlabel="Explore Realtor"
    btnHref="/realtor"
    icon={iconBox(Home)}
    art={
      <ActivityMock
        items={[
          { title: 'New Lead: 3BR Lekki Listing', sub: 'Via website inquiry' },
          { title: 'Offer Accepted', sub: 'Closing in escrow · 5 days' },
        ]}
      />
    }
  />
);

export const InvestmentCard = () => (
  <CardCmp
    bg="linear-gradient(139deg, #312e81 2.33%, #6366f1 96.28%)"
    heading="Investment"
    description="Track portfolio returns, monitor cash flows, and evaluate new deals from a live feed of listings and agency channels."
    btnlabel="Explore Investment"
    btnHref="/investment"
    icon={iconBox(TrendingUp)}
    art={
      <ActivityMock
        items={[
          { title: 'Portfolio +12.4% YTD', sub: 'Across 6 active deals' },
          { title: 'New Deal: Victoria Island Tower', sub: 'Minimum entry ₦5,000,000' },
        ]}
      />
    }
  />
);

export const ResidentCard = () => (
  <CardCmp
    bg="linear-gradient(139deg, #9d174d 2.33%, #f43f5e 96.28%)"
    heading="Resident"
    description="Pay rent, submit and track maintenance tickets, view notices, and get a digital access code for your building — all from the Lodgely mobile app."
    btnlabel="Get the App"
    btnHref="/resident"
    icon={iconBox(KeyRound)}
    art={
      <ActivityMock
        items={[
          { title: 'Rent Paid — Receipt Issued', sub: 'Unit 12C · ₦850,000' },
          { title: 'Maintenance Ticket Resolved', sub: 'Leaking faucet · Today' },
        ]}
      />
    }
  />
);

export const OwnerCard = () => (
  <CardCmp
    bg="linear-gradient(139deg, #581c87 2.33%, #a855f7 96.28%)"
    heading="Owner"
    description="Track rent collection and payouts, monitor occupancy, and stay on top of maintenance across every unit you own — from the Lodgely mobile app."
    btnlabel="Get the App"
    btnHref="/owner"
    icon={iconBox(Landmark)}
    art={
      <ActivityMock
        items={[
          { title: 'Payout Processed', sub: '₦1,200,000 · 3 buildings' },
          { title: 'Occupancy: 94%', sub: 'Up 2% this quarter' },
        ]}
      />
    }
  />
);

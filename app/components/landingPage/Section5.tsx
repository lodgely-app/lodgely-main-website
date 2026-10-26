'use client';

import React from 'react';
import ProductSectionCmp from './ProductSectionCmp';
import { ResidentCard, OwnerCard } from './Cards';
import { SHOW_OWNER } from '../../lib/productFlags';

// Owner is feature-flagged off while its app isn't ready — same
// index-alignment reasoning as Section3.
const slots: { title: string; card: React.ReactNode }[] = [
  { title: 'Resident', card: <ResidentCard /> },
  ...(SHOW_OWNER ? [{ title: 'Owner', card: <OwnerCard /> }] : []),
];

const tabOptions = slots.map((s, i) => ({ id: String(i + 1), title: s.title }));

export const Section5 = () => {
  return (
    <ProductSectionCmp
      title="MOBILE APPS"
      description={
        <h2 className="product-title-heading" style={{ color: '#FFFFFF' }}>
          <span
            style={{
              background: 'linear-gradient(139deg, #D7D9DB 2.33%, #808D99 96.28%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your property, handled from your phone{' '}
          </span>
          {/* Residents manage their home and owners track payouts — both built as native Lodgely mobile apps. */}
        </h2>
      }
      tabOptions={tabOptions}
      card1={slots[0]?.card}
      card2={slots[1]?.card}
      bg="#16191C"
      textColor="light"
    />
  );
};

export default Section5;

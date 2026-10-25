'use client';

import React from 'react';
import ProductSectionCmp from './ProductSectionCmp';
import { ResidentCard, OwnerCard } from './Cards';

const tabOptions = [
  { id: '1', title: 'Resident' },
  { id: '2', title: 'Owner' },
];

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
      card1={<ResidentCard />}
      card2={<OwnerCard />}
      bg="#16191C"
      textColor="light"
    />
  );
};

export default Section5;

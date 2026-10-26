'use client';

import React from 'react';
import ProductSectionCmp from './ProductSectionCmp';
import { DeveloperCard, FacilityCard, RealtorCard, InvestmentCard } from './Cards';
import { SHOW_REALTOR, SHOW_INVESTMENT } from '../../lib/productFlags';

// Realtor/Investment are feature-flagged off while their apps aren't ready.
// ProductSectionCmp assigns card1-4 to tabOptions[0-3] by fixed index, so
// hidden slots must be squeezed out of BOTH lists together (not just left
// as a gap) — otherwise, e.g. Realtor off + Investment on would hand
// ProductSectionCmp an Investment card under the `card4` prop while
// tabOptions only has 3 entries, desyncing the tab bar from the card it's
// supposed to label.
const slots: { title: string; card: React.ReactNode }[] = [
  { title: 'Developer', card: <DeveloperCard /> },
  { title: 'Facility', card: <FacilityCard /> },
  ...(SHOW_REALTOR ? [{ title: 'Realtor', card: <RealtorCard /> }] : []),
  ...(SHOW_INVESTMENT ? [{ title: 'Investment', card: <InvestmentCard /> }] : []),
];

const tabOptions = slots.map((s, i) => ({ id: String(i + 1), title: s.title }));

export const Section3 = () => {
  return (
    <ProductSectionCmp
      title="OPERATIONS SUITE"
      description={
        <h2 className="product-title-heading" style={{ color: '#1B2138' }}>
          Run every side of the property business with Lodegly tools{' '}
          {/* Run every side of the property business with tools built and{' '} */}
          <span
            style={{
              background: 'linear-gradient(90deg, #56616B 0%, #B4B9BC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {/* tailored to how developers, facility teams, realtors, and investors actually work. */}
          </span>
        </h2>
      }
      tabOptions={tabOptions}
      card1={slots[0]?.card}
      card2={slots[1]?.card}
      card3={slots[2]?.card}
      card4={slots[3]?.card}
      bg="#FFFFFF"
      textColor="dark"
    />
  );
};

export default Section3;

'use client';

import React from 'react';
import ProductSectionCmp from './ProductSectionCmp';
import { DeveloperCard, FacilityCard, RealtorCard, InvestmentCard } from './Cards';

const tabOptions = [
  { id: '1', title: 'Developer' },
  { id: '2', title: 'Facility' },
  { id: '3', title: 'Realtor' },
  { id: '4', title: 'Investment' },
];

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
      card1={<DeveloperCard />}
      card2={<FacilityCard />}
      card3={<RealtorCard />}
      card4={<InvestmentCard />}
      bg="#FFFFFF"
      textColor="dark"
    />
  );
};

export default Section3;

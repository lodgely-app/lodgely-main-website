'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getSignUpUrl } from '../../lib/auth';

export const Section7 = () => {
  return (
    <div className="bold-cta-outer">
      <div className="bold-cta-rings" aria-hidden />
      <div className="bold-cta-content">
        <h2 className="bold-cta-title">
          UNIFY EVERY SIDE OF YOUR REAL ESTATE BUSINESS WITH LODGELY
        </h2>

        <motion.a
          href={getSignUpUrl('marketing')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="bold-cta-btn"
        >
          Get started for free
        </motion.a>

        <p className="bold-cta-subtext">One account. Six apps. Zero data silos.</p>
      </div>
    </div>
  );
};

export default Section7;

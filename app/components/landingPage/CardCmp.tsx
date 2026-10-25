'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardCmpProps {
  bg: string;
  heading: string;
  description: string;
  btnlabel: string;
  btnHref?: string;
  icon: React.ReactNode;
  /** Mock-UI artwork rendered in place of a product screenshot — Lodgely has
   * no polished screenshots to show here, so each product renders a small
   * set of representative "live activity" cards instead (see Cards.tsx). */
  art: React.ReactNode;
}

export const CardCmp: React.FC<CardCmpProps> = ({ bg, heading, description, btnlabel, btnHref = '#', icon, art }) => {
  return (
    <div className="card-box" style={{ background: bg }}>
      {/* Left Column: Details */}
      <div className="card-left-content">
        <div className="card-icon-sq">{icon}</div>

        <h3 className="card-heading">{heading}</h3>

        <p className="card-desc">{description}</p>

        <div>
          <motion.a
            href={btnHref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card-action-btn"
          >
            {btnlabel}
          </motion.a>
        </div>
      </div>

      {/* Right Column: Mock-UI Artwork */}
      <div className="card-right-art">{art}</div>
    </div>
  );
};

export default CardCmp;

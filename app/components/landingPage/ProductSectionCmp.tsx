'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface TabOption {
  id: string;
  title: string;
}

interface ProductSectionCmpProps {
  title: ReactNode;
  description: ReactNode;
  tabOptions: TabOption[];
  card1?: ReactNode;
  card2?: ReactNode;
  card3?: ReactNode;
  card4?: ReactNode;
  bg?: string;
  textColor?: 'dark' | 'light';
}

export const ProductSectionCmp: React.FC<ProductSectionCmpProps> = ({
  title,
  description,
  tabOptions,
  card1,
  card2,
  card3,
  card4,
  bg = '#FFFFFF',
  textColor = 'dark',
}) => {
  const [activeTab, setActiveTab] = useState(tabOptions[0]?.title || '');

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const isInView1 = useInView(ref1, { once: false, amount: 0.35 });
  const isInView2 = useInView(ref2, { once: false, amount: 0.35 });
  const isInView3 = useInView(ref3, { once: false, amount: 0.35 });
  const isInView4 = useInView(ref4, { once: false, amount: 0.35 });

  useEffect(() => {
    if (isInView4 && tabOptions[3]) {
      setActiveTab(tabOptions[3].title);
    } else if (isInView3 && tabOptions[2]) {
      setActiveTab(tabOptions[2].title);
    } else if (isInView2 && tabOptions[1]) {
      setActiveTab(tabOptions[1].title);
    } else {
      setActiveTab(tabOptions[0]?.title || '');
    }
  }, [isInView1, isInView2, isInView3, isInView4, tabOptions]);

  const handleSelect = (tabTitle: string) => {
    setActiveTab(tabTitle);
    const element = document.getElementById(tabTitle);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // The "stacking" inset effect used to be done by animating `padding` on
  // the sticky wrapper itself — padding is a layout property, so the
  // browser had to reflow (and the card's text had to re-wrap) on every one
  // of these discrete state flips, which is exactly what showed up as
  // flicker/stutter and "cards loading late" on fast scroll. `transform:
  // scale()` on a separate, non-sticky inner wrapper produces the same
  // visual inset without ever touching layout — it's pure compositing.
  const getCard1Scale = () => {
    if (isInView2 && isInView3) return 'scale(0.91)';
    if (isInView2) return 'scale(0.96)';
    return 'scale(1)';
  };

  const getCard2Scale = () => {
    if (isInView3 && isInView4) return 'scale(0.93)';
    if (isInView3) return 'scale(0.97)';
    return 'scale(1)';
  };

  const getCard3Scale = () => {
    if (isInView4) return 'scale(0.97)';
    return 'scale(1)';
  };

  return (
    <div
      style={{
        backgroundColor: bg,
        color: textColor === 'light' ? '#FFFFFF' : '#1B2138',
      }}
      className="product-section-wrapper"
    >
      <div className="product-section-inner">
        {/* Eyebrow and Description */}
        <div className="product-section-header">
          <div>
            <span className="product-eyebrow-text">{title}</span>
          </div>
          <div>{description}</div>
        </div>

        {/* Sticky Tab Bar */}
        <div className="sticky-tabs-container">
          <div className="sticky-tabs-pill">
            {tabOptions.map((option) => {
              const isSelected = activeTab === option.title;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.title)}
                  className={`tab-pill-btn ${isSelected ? 'is-active' : ''}`}
                >
                  {option.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stacking Cards List */}
        <div className="cards-stack-list">
          {/* Card 1 */}
          {card1 && (
            <div id={tabOptions[0]?.title} ref={ref1} className="sticky-card-wrapper" style={{ top: '160px', zIndex: 10 }}>
              <div className="sticky-card-inner" style={{ transform: getCard1Scale() }}>
                {card1}
              </div>
            </div>
          )}

          {/* Card 2 */}
          {card2 && (
            <div id={tabOptions[1]?.title} ref={ref2} className="sticky-card-wrapper" style={{ top: '180px', zIndex: 20 }}>
              <div className="sticky-card-inner" style={{ transform: getCard2Scale(), opacity: isInView2 ? 1 : 0.95 }}>
                {card2}
              </div>
            </div>
          )}

          {/* Card 3 */}
          {card3 && (
            <div id={tabOptions[2]?.title} ref={ref3} className="sticky-card-wrapper" style={{ top: '200px', zIndex: 30 }}>
              <div className="sticky-card-inner" style={{ transform: getCard3Scale(), opacity: isInView3 ? 1 : 0.95 }}>
                {card3}
              </div>
            </div>
          )}

          {/* Card 4 */}
          {card4 && (
            <div id={tabOptions[3]?.title} ref={ref4} className="sticky-card-wrapper" style={{ top: '220px', zIndex: 40 }}>
              <div className="sticky-card-inner" style={{ opacity: isInView4 ? 1 : 0.95 }}>
                {card4}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSectionCmp;

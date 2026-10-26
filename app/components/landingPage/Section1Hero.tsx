'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  ArrowRight,
  KeyRound,
  Landmark,
  Building2,
  HardHat,
  Home,
  TrendingUp,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { isProductVisible, SHOW_OWNER } from '../../lib/productFlags';

interface HeroSlide {
  id: string;
  num: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  primaryCta: string;
  primaryHref: string;
  // Gates this entire slide behind a product flag (see productFlags.ts) —
  // omitted for slides that aren't tied to a single not-yet-ready product.
  productId?: string;
}

const ALL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    num: '01',
    tag: 'FACILITY & ESTATE MANAGEMENT',
    title: 'Effortless Facility & Estate Operations',
    description:
      'Coordinate tenancies, maintenance, service charges, automated vendor dispatches, and secure gate access across blocks of flats and estates in real time.',
    image: '/hero/slide-1.jpg',
    primaryCta: 'Explore Facility Hub',
    primaryHref: '/facility',
  },
  {
    id: 'slide-2',
    num: '02',
    tag: 'DEVELOPMENT & CONSTRUCTION',
    title: 'From Blueprint to Major Commercial Delivery',
    description:
      'Equip real estate developers with phase requisition, unit inventory management, procurement tracking, and pre-sales tied to verified project milestones.',
    image: '/hero/slide-2.jpg',
    primaryCta: 'Explore Developer Suite',
    primaryHref: '/developer',
  },
  {
    id: 'slide-3',
    num: '03',
    tag: 'CAPITAL ASSETS & INVESTMENT',
    title: 'Real Estate Investment & Rising Yield Trajectories',
    description:
      'Track full-building performance, algorithmic rental distributions, syndication deal pipelines, and verifiable net yields for property investors.',
    image: '/hero/slide-3.jpg',
    primaryCta: 'Explore Investment Hub',
    primaryHref: '/investment',
    productId: 'investment',
  },
  {
    id: 'slide-4',
    num: '04',
    tag: 'NATIVE MOBILE APPS',
    title: 'Handled From Your Phone: Tenants & Landlords',
    description: SHOW_OWNER
      ? 'Digital gate passes and 1-tap rent payments for residents, paired with live revenue disbursements and 24/7 unit occupancy tracking for property owners.'
      : 'Digital gate passes, 1-tap rent payments, maintenance tickets, and building notices — all from the Lodgely Resident mobile app.',
    image: '/hero/slide-4.jpg',
    primaryCta: 'Explore Mobile Apps',
    primaryHref: '#mobile-apps',
  },
];

// Re-numbered after filtering so "01, 02, 03..." stays sequential with no
// gap when a flagged-off slide (e.g. Investment) is removed.
const HERO_SLIDES: HeroSlide[] = ALL_HERO_SLIDES.filter(
  (s) => !s.productId || isProductVisible(s.productId),
).map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }));

interface LodgelyAppCard {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  href: string;
  accentColor: string;
  lightBg: string;
  icon: React.ElementType;
  tag: string;
}

const LODGELY_APPS: LodgelyAppCard[] = [
    {
      id: 'facility',
      name: 'Facility',
      subtitle: 'Maintenance & work orders',
      logo: '/logos/lodgely_facility.png',
      href: '/facility',
      accentColor: '#00D4E5',
      lightBg: 'rgba(0, 212, 229, 0.08)',
      icon: Building2,
      tag: 'Operations Hub',
    },
    {
        id: 'developer',
        name: 'Developer',
        subtitle: 'Phases, units & pre-sales',
        logo: '/logos/lodgely_developer.png',
        href: '/developer',
        accentColor: '#14B8A6',
        lightBg: 'rgba(20, 184, 166, 0.08)',
        icon: HardHat,
        tag: 'Project Suite',
    },
    {
        id: 'realtor',
        name: 'Realtor',
        subtitle: 'Listings & lead pipeline',
        logo: '/logos/lodgely_realtor.png',
        href: '/realtor',
        accentColor: '#F59E0B',
        lightBg: 'rgba(245, 158, 11, 0.08)',
        icon: Home,
        tag: 'Broker CRM',
    },
    {
        id: 'investment',
        name: 'Investment',
        subtitle: 'Portfolio yield & syndicates',
        logo: '/logos/lodgely_invest.png',
        href: '/investment',
        accentColor: '#6366F1',
        lightBg: 'rgba(99, 102, 241, 0.08)',
        icon: TrendingUp,
        tag: 'Capital Hub',
    },
    {
    id: 'resident',
    name: 'Resident',
    subtitle: 'Rent, digital keys & tickets',
    logo: '/logos/lodgely_resident.png',
    href: '/resident',
    accentColor: '#F43F5E',
    lightBg: 'rgba(244, 63, 94, 0.08)',
    icon: KeyRound,
    tag: 'Mobile App',
  },
  {
    id: 'owner',
    name: 'Owner',
    subtitle: 'Payouts, yield & occupancy',
    logo: '/logos/lodgely_owner.png',
    href: '/owner',
    accentColor: '#A855F7',
    lightBg: 'rgba(168, 85, 247, 0.08)',
    icon: Landmark,
    tag: 'Mobile App',
  },
].filter((app) => isProductVisible(app.id));

export const Section1Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <div
      className="modern-hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Hero Visual Stage */}
      <div className="hero-stage-container">
        {/* Background Image Carousel with Crossfade */}
        <div className="hero-bg-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hero-bg-slide"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="hero-bg-image"
              />
            </motion.div>
          </AnimatePresence>

          {/* Master Cinematic Overlays */}
          <div className="hero-overlay-gradient-top" />
          <div className="hero-overlay-gradient-bottom" />
          <div className="hero-overlay-vignette" />
        </div>

        {/* LEFT RAIL: Vertical Slider & Navigation Buttons (Desktop only) */}
        <aside className="hero-left-rail" aria-label="Slide Controls">
          {/* Up Button */}
          <motion.button
            type="button"
            onClick={prevSlide}
            whileHover={{ scale: 1.12, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.92 }}
            className="hero-rail-btn"
            aria-label="Previous slide"
          >
            <ChevronUp size={16} />
          </motion.button>

          {/* Vertical Progress Rail */}
          <div className="hero-rail-track-wrapper">
            <div className="hero-rail-track-line" />
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`hero-rail-dot ${activeSlide === idx ? 'is-active' : ''}`}
                style={{ top: `${(idx / (totalSlides - 1)) * 100}%` }}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
            {/* Sliding Indicator Circle */}
            <motion.div
              className="hero-rail-sliding-indicator"
              animate={{
                top: `${(activeSlide / (totalSlides - 1)) * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              <div className="hero-rail-sliding-inner-dot" />
            </motion.div>
          </div>

          {/* Down Button */}
          <motion.button
            type="button"
            onClick={nextSlide}
            whileHover={{ scale: 1.12, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.92 }}
            className="hero-rail-btn"
            aria-label="Next slide"
          >
            <ChevronDown size={16} />
          </motion.button>
        </aside>

        {/* RIGHT RAIL: Slide Index Numbers & Vertical System Tags (Desktop only) */}
        <aside className="hero-right-rail" aria-label="Slide Index">
          {/* Numbers: 01, 02, 03, 04 */}
          <div className="hero-slide-numbers-group">
            {HERO_SLIDES.map((s, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`hero-slide-num-btn ${isActive ? 'is-active' : ''}`}
                  aria-label={`Go to slide ${s.num}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSlideDot"
                      className="hero-active-slide-dot"
                    />
                  )}
                  <span className="hero-slide-num-text">{s.num}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeSlideBar"
                      className="hero-active-slide-line"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Rotated Vertical Labels */}
          <div className="hero-vertical-meta-labels">
            <span className="hero-meta-tag">REAL ESTATE</span>
            <span className="hero-meta-dot">·</span>
            <span className="hero-meta-tag">FACILITY</span>
            <span className="hero-meta-dot">·</span>
            <span className="hero-meta-tag">CONSTRUCTION</span>
          </div>
        </aside>

        {/* Mobile Slide Navigation Dots (visible on mobile & tablet) */}
        <div className="hero-mobile-dots" aria-label="Slide navigation">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSlide(idx)}
              className={`hero-mobile-dot ${activeSlide === idx ? 'is-active' : ''}`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* MAIN STAGE CONTENT WRAPPER */}
        <div className="hero-center-content-wrapper">
          <div className="hero-center-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="hero-slide-text-block"
              >
                {/* Main Headline */}
                <h1 className="hero-main-heading">
                  {slide.title}
                </h1>

                {/* Subtitle / Description */}
                <p className="hero-description-paragraph">
                  {slide.description}
                </p>

                {/* Action Button: Signature Connected Dual Button */}
                <div className="hero-actions-container">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="hero-dual-cta-button-group"
                  >
                    <Link
                      href={slide.primaryHref}
                      className="hero-dual-cta-arrow-box"
                      aria-label="Explore Lodgely Apps"
                    >
                      <ArrowRight size={18} className="hero-dual-cta-arrow-icon" />
                    </Link>

                    <Link
                      href={slide.primaryHref}
                      className="hero-dual-cta-label-box"
                    >
                      <span>{slide.primaryCta}</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FLOATING BOTTOM DOCK: 6 LODGELY APPS CARDS                      */}
      {/* Overlaps both hero section and next section (tight spacing)     */}
      {/* ============================================================== */}
      <div id="lodgely-apps" className="hero-cards-dock-container">
        <div className="hero-cards-grid">
          {LODGELY_APPS.map((app, index) => {
            const IconCmp = app.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                className="hero-app-card"
              >
                <Link href={app.href} className="hero-app-card-link">
                  {/* Top Area: App Icon Squircle Container */}
                  <div className="hero-app-card-top">
                    <div
                      className="hero-app-icon-squircle"
                      style={{
                        backgroundColor: app.lightBg,
                        border: `1px solid ${app.accentColor}33`,
                      }}
                    >
                      <img
                        src={app.logo}
                        alt={`${app.name} icon`}
                        className="hero-app-logo-img"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                      <IconCmp
                        size={20}
                        color={app.accentColor}
                        className="hero-app-fallback-icon"
                      />
                    </div>

                    <span
                      className="hero-app-badge-tag"
                      style={{ color: app.accentColor }}
                    >
                      {app.tag}
                    </span>
                  </div>

                  {/* Middle Area: App Title & Subtitle */}
                  <div className="hero-app-card-body">
                    <h3 className="hero-app-card-title">{app.name}</h3>
                    <p className="hero-app-card-sub">{app.subtitle}</p>
                  </div>

                  {/* Bottom Area: Small Action Arrow Button in Corner */}
                  <div className="hero-app-card-bottom">
                    <span className="hero-app-explore-text">Explore</span>
                    <div
                      className="hero-app-arrow-button"
                      style={{
                        '--card-accent': app.accentColor,
                      } as React.CSSProperties}
                    >
                      <ArrowRight size={14} className="hero-app-card-arrow-icon" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section1Hero;

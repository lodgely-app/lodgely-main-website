'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface HeroStage {
  id: string;
  stage: string;
  name: string;
  logo: string;
  color: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
// What each product lets you do with a property, read as
// "You can <phrase> with Lodgely <Product>."
const STAGE_PHRASE: Record<string, string> = {
  developer: 'build it',
  realtor: 'sell or let it',
  investment: 'invest in it',
  facility: 'manage it',
  resident: 'live in it',
  owner: 'own it',
};

const HEADLINE = ['Software', 'for', 'every', 'stage', 'of', 'a', 'property’s', 'life.'];

// Animated hero for /about: staggered headline, a cycling "stage" word in
// each product's colour, and the product logos orbiting the Lodgely mark.
// Everything holds still when the visitor prefers reduced motion.
export function AboutHero({ stages }: { stages: HeroStage[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || stages.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % stages.length), 2200);
    return () => clearInterval(t);
  }, [reduce, stages.length]);

  const current = stages[i] ?? stages[0];

  return (
    <section className="ah">
      {/* Backdrop: grid + drifting glows */}
      <div className="ah-grid" aria-hidden />
      <motion.div
        className="ah-glow ah-glow-a"
        aria-hidden
        animate={reduce ? undefined : { x: [0, 60, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ah-glow ah-glow-b"
        aria-hidden
        animate={reduce ? undefined : { x: [0, -50, 30, 0], y: [0, 40, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="ah-inner">
        <div className="ah-copy">
          {/* <motion.span
            className="ah-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="ah-eyebrow-dot" />
            About Lodgely
          </motion.span> */}

          <h1 className="ah-title" aria-label="Software for every stage of a property’s life.">
            {HEADLINE.map((w, n) => (
              <span key={n} className="ah-word-mask" aria-hidden>
                <motion.span
                  className={`ah-word${w === 'stage' ? ' ah-word-accent' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + n * 0.06 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="ah-stage-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="ah-stage-label">You can</span>
            <span className="ah-stage-slot">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.id}
                  className="ah-stage-chip"
                  style={{ ['--c' as string]: current.color }}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="ah-stage-verb">{STAGE_PHRASE[current.id] ?? `${current.stage.toLowerCase()} it`}</span>
                  <span className="ah-stage-name"> with {current.name}.</span>
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            className="ah-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
          >
            Lodgely combines technology with professional facility management, so residents, facility teams,
            vendors and property owners work from one system while our team delivers on the ground.
          </motion.p>

          <motion.div
            className="ah-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
          >
            <Link href="/schedule-demo?topic=general" className="ah-btn ah-btn-primary">
              Talk to us <ArrowRight size={16} />
            </Link>
            <a href="#products" className="ah-btn ah-btn-ghost">
              See our products
            </a>
          </motion.div>
        </div>

        {/* Orbit */}
        <motion.div
          className="ah-orbit-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          aria-hidden
        >
          <div className="ah-ring ah-ring-1" />
          <div className="ah-ring ah-ring-2" />
          <div className="ah-ring ah-ring-3" />

          <motion.div
            className="ah-orbit"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          >
            {stages.map((s, n) => {
              const angle = (n / stages.length) * 360;
              const active = s.id === current.id;
              return (
                <div key={s.id} className="ah-sat-arm" style={{ transform: `rotate(${angle}deg)` }}>
                  <motion.div
                    className="ah-sat"
                    style={{ ['--c' as string]: s.color }}
                    animate={reduce ? { rotate: -angle } : { rotate: [-angle, -angle - 360] }}
                    transition={reduce ? undefined : { duration: 48, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className="ah-sat-tile"
                      animate={{ scale: active ? 1.18 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <img src={s.logo} alt="" width={52} height={52} />
                      {active && <span className="ah-sat-ping" />}
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <div className="ah-core">
            <motion.div
              className="ah-core-pulse"
              animate={reduce ? undefined : { scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="ah-core-tile">
              <img src="/lodgely-logo.svg" alt="" width={56} height={56} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#story"
        className="ah-scroll"
        aria-label="Scroll to our story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.span
          className="ah-scroll-dot"
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  );
}

export default AboutHero;

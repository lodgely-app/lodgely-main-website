'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  ClipboardList,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Wallet,
  Workflow,
} from 'lucide-react';
import { SiteHeader } from '../components/marketing/SiteHeader';
import FooterCmp from '../components/landingPage/FooterCmp';
import { isProductVisible } from '../lib/productFlags';
import { motion } from 'framer-motion';
import { AboutHero } from './AboutHero';
import './about.css';

// Each product as one stage of a property's life, in the order a property
// actually moves through them. Products that are feature-flagged off
// (productFlags.ts) drop out automatically.
const STAGES = [
  {
    id: 'developer',
    stage: 'Build',
    name: 'Lodgely Developer',
    text: 'Plan projects, raise requisitions, track materials and manage pre-sale releases.',
    logo: '/logos/lodgely_developer.png',
    color: '#00BBA8',
  },
  {
    id: 'realtor',
    stage: 'Sell & let',
    name: 'Lodgely Realtor',
    text: 'Manage listings and leads, and close transactions.',
    logo: '/logos/lodgely_realtor.png',
    color: '#D97706',
  },
  {
    id: 'investment',
    stage: 'Invest',
    name: 'Lodgely Investment',
    text: 'Track portfolio returns and evaluate new deals.',
    logo: '/logos/lodgely_invest.png',
    color: '#9333EA',
  },
  {
    id: 'facility',
    stage: 'Manage',
    name: 'Lodgely Facility',
    text: 'Run tenancies, service charge, rent, maintenance and building finances.',
    logo: '/logos/lodgely_facility.png',
    color: '#0D9488',
  },
  {
    id: 'resident',
    stage: 'Live',
    name: 'Lodgely Resident',
    text: 'Pay, report issues, read notices and issue gate passes from a phone.',
    logo: '/logos/lodgely_resident.png',
    color: '#059669',
  },
  {
    id: 'owner',
    stage: 'Own',
    name: 'Lodgely Owner',
    text: 'Follow payouts and occupancy across your units.',
    logo: '/logos/lodgely_owner.png',
    color: '#2563EB',
  },
].filter((s) => isProductVisible(s.id));

const PRINCIPLES = [
  {
    Icon: Layers,
    title: 'One shared record',
    text: 'The developer, the manager, the resident and the owner look at the same numbers, not their own copies in separate spreadsheets.',
  },
  {
    Icon: Wallet,
    title: 'Money you can follow',
    text: 'Every charge, payment and payout is recorded against the unit it belongs to, so a balance can always be explained.',
  },
  {
    Icon: ShieldCheck,
    title: 'The right access for each role',
    text: 'Teams decide who can view, approve or pay. People see what their role needs and nothing more.',
  },
  {
    Icon: ReceiptText,
    title: 'Built for how property works here',
    text: 'Naira pricing, service charge and rent cycles, and online payments or bank transfers, designed around the Nigerian market from the start.',
  },
];

const SERVICES = [
  { Icon: Briefcase, title: 'Business Advisory', href: '/services/business-advisory' },
  { Icon: ClipboardList, title: 'Project Management', href: '/services/project-management' },
  { Icon: Workflow, title: 'Change Management', href: '/services/change-management' },
  { Icon: GraduationCap, title: 'Facility Management Training', href: '/services/facility-management-training' },
];

// Fades a block up as it scrolls into view (once).
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutClient() {
  return (
    <main className="about">
      <SiteHeader />

      <AboutHero stages={STAGES} />

      {/* Story */}
      <section className="about-section" id="story">
        <Reveal>
        <div className="about-story">
          <div>
            <p className="about-kicker">Why we exist</p>
            <h2>Property runs on too many disconnected tools.</h2>
          </div>
          <div className="about-story-body">
            <p>
              A single building can pass through a developer, an agent, a facility manager, its residents and its
              owners. Each of them usually keeps their own records, in spreadsheets, notebooks, chat groups and
              bank alerts, and none of those records agree.
            </p>
            <p>
              We built Lodgely so that everyone involved works from the same information. A project&rsquo;s costs,
              a unit&rsquo;s service charge, a resident&rsquo;s payment and an owner&rsquo;s payout all live in one
              place, and each person sees the part that matters to them.
            </p>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Lifecycle */}
      <section className="about-section about-section-tint" id="products">
        <div className="about-head">
          <p className="about-kicker">What we make</p>
          <h2>One platform, from first brick to everyday living.</h2>
        </div>
        <ol className="about-stages">
          {STAGES.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            >
              <Link href={`/${s.id}`} className="about-stage" style={{ ['--accent' as string]: s.color }}>
                <span className="about-stage-step">
                  {String(i + 1).padStart(2, '0')} · {s.stage}
                </span>
                <img src={s.logo} alt="" width={40} height={40} />
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <span className="about-stage-link">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Principles */}
      <section className="about-section">
        <div className="about-head">
          <p className="about-kicker">What we believe</p>
          <h2>How we build Lodgely.</h2>
        </div>
        <div className="about-principles">
          {PRINCIPLES.map(({ Icon, title, text }, n) => (
            <motion.div
              key={title}
              className="about-principle"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: n * 0.08 }}
            >
              <span className="about-icon">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="about-section about-section-tint">
        <Reveal>
        <div className="about-services">
          <div>
            <p className="about-kicker">More than software</p>
            <h2>We work alongside your team.</h2>
            <p className="about-muted">
              Software only helps when people use it well. Our team also offers hands-on services to help you plan,
              roll out and run your properties.
            </p>
          </div>
          <ul className="about-service-list">
            {SERVICES.map(({ Icon, title, href }) => (
              <li key={href}>
                <Link href={href} className="about-service">
                  <span className="about-icon">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span>{title}</span>
                  <ArrowRight size={16} className="about-service-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="about-section">
        <Reveal>
        <div className="about-cta">
          <div>
            <h2>Let&rsquo;s talk about your properties.</h2>
            <p>Tell us what you&rsquo;re building or managing and we&rsquo;ll show you how Lodgely fits.</p>
            <div className="about-contact">
              <a href="mailto:support@lodgely.ng">
                <Mail size={16} /> support@lodgely.ng
              </a>
              <span>
                <MapPin size={16} /> Plot 246 Cadastral Zone B10, Jabi-Dakibiu, Abuja, Nigeria
              </span>
            </div>
          </div>
          <Link href="/schedule-demo?topic=general" className="about-cta-btn">
            Contact us <ArrowRight size={16} />
          </Link>
        </div>
        </Reveal>
      </section>

      <FooterCmp />
    </main>
  );
}

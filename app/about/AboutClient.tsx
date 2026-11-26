'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Compass,
  Cpu,
  Gauge,
  GraduationCap,
  HeartHandshake,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Users,
  Wallet,
  Workflow,
  Wrench,
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

// What every facility Lodgely manages should be.
const QUALITIES = [
  { Icon: ShieldCheck, label: 'Safe' },
  { Icon: Gauge, label: 'Efficient' },
  { Icon: Wrench, label: 'Well-maintained' },
  { Icon: Wallet, label: 'Financially transparent' },
  { Icon: Cpu, label: 'Technology-enabled' },
  { Icon: Home, label: 'Resident-focused' },
];

const VALUES = [
  {
    Icon: HeartHandshake,
    title: 'We put customers first',
    text: 'Every decision starts with what residents, property owners, developers and colleagues need. We communicate clearly, act respectfully and aim for excellent service.',
  },
  {
    Icon: CheckCircle2,
    title: 'We take ownership',
    text: 'We don’t wait for someone else to solve a problem. We take responsibility for it and follow through until it is closed.',
  },
  {
    Icon: ShieldCheck,
    title: 'We operate with integrity',
    text: 'We are honest in how we communicate, transparent in how we report and accountable for what we do, even when no one is watching.',
  },
  {
    Icon: Award,
    title: 'We pursue excellence',
    text: 'Good enough is rarely good enough. We keep improving our technology, operations and service, one consistent step at a time.',
  },
  {
    Icon: Users,
    title: 'We work as one team',
    text: 'Technology supports operations, operations inform product, and finance supports everyone. No team succeeds in isolation.',
  },
  {
    Icon: Lightbulb,
    title: 'We embrace innovation',
    text: 'Innovation isn’t limited to software. It means better processes, less waste, clearer communication and better ways to serve you.',
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
            <p className="about-kicker">Our story</p>
            <h2>Managing properties and facilities should not be chaotic.</h2>
          </div>
          <div className="about-story-body">
            <p>
              Across many residential estates, commercial properties and managed communities, facility management
              has been reactive rather than proactive. Residents struggle with unresolved maintenance issues, little
              visibility into service charges and poor communication. Facility managers rely on manual processes,
              scattered records and disconnected tools.
            </p>
            <p>
              Lodgely was founded to change that. We combine technology with professional facility management to
              create transparent, efficient and well-run communities. Our platform lets residents, facility teams,
              vendors and property owners work together in one system, while our operations team delivers
              facility management on the ground.
            </p>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Mission & vision */}
      <section className="about-section about-section-tint">
        <div className="about-mv">
          <Reveal>
            <div className="about-mv-card">
              <span className="about-icon">
                <Target size={22} strokeWidth={1.75} />
              </span>
              <p className="about-kicker">Our mission</p>
              <p className="about-mv-text">
                To simplify facility and property management through innovative technology, operational excellence
                and exceptional customer service.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-mv-card about-mv-card-dark">
              <span className="about-icon">
                <Compass size={22} strokeWidth={1.75} />
              </span>
              <p className="about-kicker">Our vision</p>
              <p className="about-mv-text">
                To become Africa&rsquo;s leading technology-enabled facility and property management company,
                empowering communities, property owners and facility teams with world-class digital solutions and
                operational excellence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why we exist */}
      <section className="about-section">
        <div className="about-why">
          <Reveal>
            <div>
              <p className="about-kicker">Why we exist</p>
              <h2>Buildings are more than physical structures.</h2>
              <p className="about-muted">
                They are where people live, work, build businesses, raise families and create communities. Poor
                facility management affects safety, trust, financial accountability and quality of life. Lodgely
                exists to make sure every facility we manage is:
              </p>
            </div>
          </Reveal>
          <ul className="about-qualities">
            {QUALITIES.map(({ Icon, label }, n) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: n * 0.06 }}
              >
                <span className="about-icon">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                {label}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="about-section about-section-tint" id="products">
        <div className="about-head">
          <p className="about-kicker">What we make</p>
          <h2>One brand for every stage of the property lifecycle.</h2>
          <p className="about-muted">
            Facility management, estate management, development management and property investment. Each product
            works on its own or together with the others, for developers, property owners, residents, investors and
            facility teams.
          </p>
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

      {/* What makes us different */}
      <section className="about-section">
        <Reveal>
          <div className="about-diff">
            <p className="about-kicker">What makes Lodgely different</p>
            <p className="about-diff-line">We are not just a software company.</p>
            <p className="about-diff-line">We are not just a real estate company.</p>
            <p className="about-diff-line about-diff-accent">We are both.</p>
            <p className="about-muted about-diff-body">
              Our technology is shaped by real operational challenges, and our operations are strengthened by
              purpose-built technology. That combination lets us deliver better outcomes for our clients and their
              residents.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Core values */}
      <section className="about-section about-section-tint">
        <div className="about-head">
          <p className="about-kicker">Our core values</p>
          <h2>What guides how we work.</h2>
        </div>
        <div className="about-principles">
          {VALUES.map(({ Icon, title, text }, n) => (
            <motion.div
              key={title}
              className="about-principle"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (n % 3) * 0.08 }}
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
      <section className="about-section">
        <Reveal>
        <div className="about-services">
          <div>
            <p className="about-kicker">More than software</p>
            <h2>We work alongside your team.</h2>
            <p className="about-muted">
              Our ambition goes beyond software. We bring technology, people and processes together, and our team
              offers hands-on services to help you plan, roll out and run your properties.
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
              <a href="tel:+2349115761018">
                <Phone size={16} /> +234 (0)911 576 1018
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

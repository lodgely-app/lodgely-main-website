'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  FileText,
  HandCoins,
  Home,
  KeyRound,
  Layers,
  Megaphone,
  Receipt,
  User,
  Wallet,
  Wrench,
  Apple,
  Play,
} from 'lucide-react';
import Navbar from '../components/landingPage/Navbar';
import FooterCmp from '../components/landingPage/FooterCmp';
import ScrollReveal from '../facility/components/ScrollReveal';

// Lodgely Resident — the mobile app residents use in estates and buildings
// run on Lodgely Facility. A consumer-app layout (photo hero, feature cards,
// deep-green app showcase, three steps, download band) in Lodgely's navy +
// mint, with the shared Navbar and footer. Every feature listed here exists
// in frontends/resident-mobile.

interface ResidentLandingClientProps {
  appStoreUrl?: string;
  playStoreUrl?: string;
}

const MINT = '#83E8CA';
const DEEP = '#0B3B2E';

const CARDS = [
  {
    n: '01',
    tag: 'Payments',
    Icon: Wallet,
    tint: 'bg-emerald-50 text-emerald-700',
    title: 'Service charge, sorted',
    body: 'See what you owe and how it’s worked out, then pay it all or half at a time through Paystack.',
  },
  {
    n: '02',
    tag: 'Repairs',
    Icon: Wrench,
    tint: 'bg-orange-50 text-orange-600',
    title: 'Report it, track it',
    body: 'Raise a repair with photos, follow every update and talk it through with your manager on the same ticket.',
  },
  {
    n: '03',
    tag: 'Notices',
    Icon: Megaphone,
    tint: 'bg-sky-50 text-sky-700',
    title: 'Hear it first',
    body: 'Water, power and security updates from your facility manager land on your phone, not lost in a group chat.',
  },
  {
    n: '04',
    tag: 'Gate passes',
    Icon: KeyRound,
    tint: 'bg-violet-50 text-violet-700',
    title: 'Let your guests in',
    body: 'Create a visitor code that lasts 1, 5 or 24 hours, share it in a tap, and get told when it’s used.',
  },
];

const SHOWCASE = [
  { Icon: Receipt, title: 'Receipts when you need them', body: 'Every payment saved, with a PDF receipt you can share.' },
  { Icon: HandCoins, title: 'Levies in the open', body: 'See your share of estate projects and how much has been raised.' },
  { Icon: Layers, title: 'More than one unit?', body: 'What’s owed on each unit, broken down and kept separate.' },
];

const STEPS = [
  { title: 'Your manager adds you', body: 'Your estate’s facility manager invites you from Lodgely Facility with your email.' },
  { title: 'Download and sign in', body: 'Get the app on iPhone or Android and sign in with the invited email.' },
  { title: 'Handle the everyday', body: 'Pay, report, read notices and let visitors in, all from one place.' },
];

const FAQS = [
  {
    q: 'How do I get access?',
    a: 'Residents are added by their estate or building’s facility manager. Once you’ve been invited, download the app and sign in with that email address.',
  },
  {
    q: 'My estate isn’t on Lodgely yet. Can I still use it?',
    a: 'The app works with estates managed on Lodgely Facility. Share Lodgely with your facility manager and they can set your estate up.',
  },
  {
    q: 'Is paying through the app safe?',
    a: 'Payments go through Paystack’s secure checkout. Lodgely never sees or stores your card details.',
  },
];

function StoreBadge({ href, store }: { href: string; store: 'apple' | 'google' }) {
  // Both apps are live. A badge whose store URL isn't configured yet still
  // shows, just without a link, until NEXT_PUBLIC_RESIDENT_*_STORE_URL is set.
  const live = href && href !== '#';
  const Icon = store === 'apple' ? Apple : Play;
  const top = store === 'apple' ? 'Download on the' : 'Get it on';
  const name = store === 'apple' ? 'App Store' : 'Google Play';
  const cls =
    'inline-flex items-center gap-3 rounded-xl bg-[#2C3552] px-5 py-3 text-white shadow-lg transition-all hover:bg-[#232a42] active:scale-95';
  const inner = (
    <>
      <Icon className="h-6 w-6 fill-current" />
      <span className="text-left">
        <span className="block text-[10px] uppercase leading-none tracking-wider text-slate-300">{top}</span>
        <span className="block text-base font-bold leading-tight">{name}</span>
      </span>
    </>
  );
  return live ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <span className={`${cls} cursor-default`} aria-disabled="true">
      {inner}
    </span>
  );
}

/** Generic sample data only — not anyone's real account. */
function PhoneMockup() {
  return (
    <div className="relative w-[300px] rounded-[46px] border-4 border-slate-700/70 bg-[#12181F] p-2.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] sm:w-[330px]">
      <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-black" />
      <div className="select-none overflow-hidden rounded-[36px] bg-[#F7FAF9] p-4 text-left text-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sample Court · Unit B4</div>
            <div className="text-lg font-bold text-slate-900">Good morning</div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2C3552] text-xs font-bold text-[#83E8CA]">
            AO
          </div>
        </div>

        <div className="mb-4 rounded-2xl p-4 text-white" style={{ background: DEEP }}>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#83E8CA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#83E8CA]" /> Outstanding balance
          </div>
          <div className="text-2xl font-bold">₦45,000</div>
          <div className="mt-0.5 text-[11px] text-white/60">Service charge · Q1 cycle</div>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] font-semibold text-[#83E8CA]">
            <span>View charge breakdown</span>
            <span className="rounded-md bg-[#83E8CA] px-2.5 py-1 text-[11px] font-bold text-[#0B3B2E]">Pay now</span>
          </div>
        </div>

        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick actions</div>
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[
            { Icon: HandCoins, label: 'Levies', c: 'bg-emerald-50 text-emerald-700' },
            { Icon: KeyRound, label: 'Gate pass', c: 'bg-violet-50 text-violet-700' },
            { Icon: Bell, label: 'Notices', c: 'bg-sky-50 text-sky-700' },
            { Icon: Wrench, label: 'Repairs', c: 'bg-orange-50 text-orange-600' },
          ].map(({ Icon, label, c }) => (
            <div key={label} className="flex flex-col items-center rounded-xl border border-slate-100 bg-white p-2 text-center">
              <div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg ${c}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <Megaphone className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Water pump maintenance</div>
              <div className="text-[9px] text-slate-400">Today, 2:00 PM · Facility Manager</div>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <KeyRound className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">Visitor pass · 148-293</div>
              <div className="text-[9px] text-slate-400">Valid for 5 hours</div>
            </div>
          </div>
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">Active</span>
        </div>

        <div className="mt-4 flex items-center justify-around border-t border-slate-200/70 pt-3 text-slate-400">
          {[
            { Icon: Home, label: 'Home', on: true },
            { Icon: Wallet, label: 'Pay' },
            { Icon: FileText, label: 'History' },
            { Icon: User, label: 'Profile' },
          ].map(({ Icon, label, on }) => (
            <div key={label} className={`flex flex-col items-center ${on ? 'font-bold text-[#0B3B2E]' : ''}`}>
              <Icon className="h-4 w-4" />
              <span className="mt-0.5 text-[9px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <span
    className={`mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-[#83E8CA]' : 'text-[#0F7A5C]'}`}
  >
    {children}
  </span>
);

export function ResidentLandingClient({ appStoreUrl = '#', playStoreUrl = '#' }: ResidentLandingClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#83E8CA]/40">
      <Navbar activeAppId="resident" />

      {/* 1. Photo hero */}
      <section className="relative flex min-h-[640px] flex-col justify-between overflow-hidden bg-[#07140F] pb-10 pt-28 sm:min-h-[720px] sm:pt-36 lg:min-h-[760px]">
        <Image
          src="/hero/resident.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-[70%_center]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07140F] via-[#07140F]/90 to-[#07140F]/10 sm:via-[#07140F]/80 md:via-[#07140F]/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07140F]/50 via-transparent to-[#07140F]/70" />

        <div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-2xl">
            {/* <Eyebrow light>For residents of estates on Lodgely</Eyebrow> */}
            <h1 className="font-degular-display text-[44px] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[72px]">
              Your estate,
              <br />
              in your pocket.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-200/90 lg:text-[17px]">
              Pay your service charge, report a repair, read estate notices and let visitors through the gate. One app,
              connected to your facility manager.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <a
                href="#download"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#83E8CA] px-7 py-3.5 text-base font-bold text-[#0B3B2E] shadow-xl shadow-[#83E8CA]/20 transition-all hover:scale-[1.02] hover:bg-[#9BF0D6] active:scale-[0.98]"
              >
                Get the app <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-2 pt-1 text-sm font-medium text-slate-200/90">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[#0B3B2E]">
                  <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                </span>
                Available on the App Store and Google Play
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex w-full justify-center pb-2">
          <a
            href="#features"
            aria-label="Scroll to features"
            className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 p-1 transition-colors hover:border-white"
          >
            <span className="h-2 w-1 animate-pulse rounded-full bg-white" />
          </a>
        </div>
      </section>

      {/* 2. Four feature cards */}
      <section id="features" className="bg-[#F6FAF8] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Eyebrow>What you can do</Eyebrow>
              <h2 className="font-degular-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Everything your estate asks of you.
                <br className="hidden sm:inline" /> One app.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
                No chasing the estate office for a breakdown, no digging through WhatsApp for the latest notice.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c, i) => (
              <ScrollReveal key={c.n} delay={i * 0.06}>
                <div className="group flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${c.tint}`}>
                    <c.Icon className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {c.n} / {c.tag}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">{c.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-500">{c.body}</p>
                  <div className="flex justify-end pt-6">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-[#83E8CA]/30 group-hover:text-[#0B3B2E]">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep-green app showcase */}
      <section className="relative overflow-hidden py-24 text-white sm:py-32" style={{ background: DEEP }}>
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#83E8CA]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Eyebrow light>Your unit at a glance</Eyebrow>
              <h2 className="font-degular-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Know where you stand, any time.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                Your balance, your receipts and what’s happening on the estate, open on your home screen whenever you
                want to check.
              </p>
              <div className="mt-8 space-y-6">
                {SHOWCASE.map(({ Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#83E8CA]/25 bg-white/5 text-[#83E8CA]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold">{title}</h3>
                      <p className="mt-0.5 text-sm text-white/60">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#download"
                className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#83E8CA] px-7 py-3.5 text-base font-bold text-[#0B3B2E] transition-all hover:scale-[1.02] hover:bg-[#9BF0D6] active:scale-[0.98]"
              >
                Get the app <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="relative flex justify-center lg:col-span-6">
              <div className="absolute right-2 top-1/4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B3B2E] shadow-2xl sm:right-12">
                <Check className="h-6 w-6 stroke-[3]" />
              </div>
              <div className="absolute bottom-1/4 left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-500 shadow-2xl sm:left-12">
                <Bell className="h-5 w-5" />
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
                <PhoneMockup />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three steps */}
      <section id="how-it-works" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-14">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="font-degular-display max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Up and running in three steps.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-orange-500">0{i + 1}</span>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{s.title}</h3>
                  </div>
                  <p className="mt-3 pl-8 text-sm leading-relaxed text-slate-500 sm:text-base">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Questions */}
      <section id="faq" className="bg-[#F6FAF8] py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-degular-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Good to know.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Manage an estate?{' '}
              <Link href="/facility" className="font-semibold text-[#0F7A5C] underline-offset-4 hover:underline">
                See Lodgely Facility
              </Link>
              , where managers bill, handle repairs and send notices.
            </p>
          </div>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6 lg:col-span-3">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold text-slate-900"
                >
                  {f.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pb-5 text-sm leading-relaxed text-slate-600"
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Download band */}
      <section id="download" className="bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#D3F5EA] p-8 sm:p-14 lg:p-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow>Get Lodgely Resident</Eyebrow>
              <h2 className="font-degular-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                Less admin. More home.
              </h2>
              <p className="mt-4 text-base text-slate-700 sm:text-lg">
                Free to download for iPhone and Android. Your manager’s invite gets you in.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <StoreBadge href={appStoreUrl} store="apple" />
                <StoreBadge href={playStoreUrl} store="google" />
              </div>
            </div>
            <div className="flex justify-center lg:col-span-4 lg:justify-end">
              <div className="flex h-52 w-52 flex-col items-center justify-center rounded-full border-2 border-[#83E8CA] bg-white/50 p-6 text-center sm:h-56 sm:w-56">
                <Image src="/logos/lodgely_resident.png" alt="" width={64} height={64} className="mb-3 rounded-2xl" />
                <span className="text-sm font-bold tracking-wide text-[#0B3B2E]">Your estate, sorted.</span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-[#0F7A5C]">Lodgely Resident</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCmp />
    </div>
  );
}

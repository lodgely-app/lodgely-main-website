'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Wallet,
  Wrench,
  Users,
  Bell,
  ScanLine,
  BarChart3,
  Send,
  Building2,
  Smartphone,
} from 'lucide-react';
import Navbar from '../../components/landingPage/Navbar';
import FooterCmp from '../../components/landingPage/FooterCmp';
import { Button } from '../components/ui';
import { FACILITY_PRICING } from '../../lib/pricing';

// Facility has no subscription: Lodgely takes a platform fee on each
// resident payment. The percentage comes from the site's env file — see
// app/lib/pricing.ts.
const FEE_PERCENT = FACILITY_PRICING.feePercent;

const HEADLINE = [
  'Unlimited buildings and units',
  'Unlimited staff and residents',
  'Free resident mobile app',
  'Every feature, no tiers',
];

const MODULES = [
  {
    icon: FileText,
    title: 'Service charge and billing',
    points: ['Reusable service charge templates', 'Billing cycles for every unit', 'Contributions and one-off levies', 'Payment reminders to residents'],
  },
  {
    icon: Wallet,
    title: 'Wallet and payouts',
    points: ['Online collections land in your wallet', 'Withdraw to your bank account', 'Record cash and transfers by hand', 'Full history of every payout'],
  },
  {
    icon: BarChart3,
    title: 'Financial tracking',
    points: ['Live ledger per building', 'Outstanding balances by resident', 'Payment cycles at a glance', 'Exportable transaction history'],
  },
  {
    icon: Wrench,
    title: 'Maintenance tickets',
    points: ['Residents report issues with photos', 'Priorities and staff assignment', 'Status updates sent to residents', 'Comment thread on every ticket'],
  },
  {
    icon: Users,
    title: 'Occupancy and residents',
    points: ['Units, tenancies and lease cycles', 'Resident records in one place', 'Occupancy across all buildings', 'Staff roles for your team'],
  },
  {
    icon: Send,
    title: 'Onboarding',
    points: ['Secure resident invitations', 'Digital documents', 'Residents set up their own accounts', 'Track who has joined'],
  },
  {
    icon: Bell,
    title: 'Announcements',
    points: ['Post to all residents or chosen ones', 'Send by email as well', 'Add images to notices', 'Residents can reply in comments'],
  },
  {
    icon: ScanLine,
    title: 'Visitor access',
    points: ['Residents create guest passes', 'QR codes and access PINs', 'Passes that expire on their own', 'Shared straight from the app'],
  },
];

const RESIDENT_APP = [
  { icon: Wallet, t: 'Pay service charges and rent', d: 'Pay online in a few taps and see what’s left to pay.' },
  { icon: Wrench, t: 'Report issues', d: 'Send maintenance requests with photos and track them.' },
  { icon: Bell, t: 'Stay informed', d: 'Get building announcements and reminders.' },
  { icon: ScanLine, t: 'Invite guests', d: 'Share a visitor pass before they arrive.' },
];

const FAQS = [
  {
    q: 'Is there a monthly subscription?',
    a: 'No. There’s no setup fee and no monthly charge. Lodgely only earns when your residents pay, so you can add as many buildings, units, staff and residents as you need.',
  },
  {
    q: 'How does the platform fee work?',
    a: `Lodgely takes ${FEE_PERCENT}% of each resident payment. By default it’s added to what the resident pays, so you receive the full amount. You can turn that off on any service charge or contribution and cover it yourself.`,
  },
  {
    q: 'What about payments made in cash or by direct transfer?',
    a: 'You can record them by hand so every ledger stays complete. The same fee applies, and it’s settled automatically from your next online collections or paid directly from your dashboard.',
  },
  {
    q: 'Do you offer different rates for large portfolios?',
    a: 'Yes. For estates and managers with many buildings we can agree a custom rate. Book a demo and we’ll put a quote together.',
  },
  {
    q: 'What does the resident app cost residents?',
    a: 'Nothing. The resident app is free to download and use. Residents only pay the charges you bill them for.',
  },
];

export default function FacilityPricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar activeAppId="facility" />

      {/* Hero */}
      <section className="border-b border-slate-200 px-6 pb-16 pt-36 text-center sm:px-12 lg:pb-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600"></p>
          <h1 className="text-4xl font-black uppercase leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Everything you need to run your buildings. <span className="text-teal-600">One simple plan.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
            Billing, payments, maintenance, residents, announcements and visitor access, all included for every building you manage. No subscription and no setup fee.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/schedule-demo?topic=facility">
              <Button className="w-full rounded-none bg-teal-600 px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-white shadow-none transition-all hover:bg-teal-700 active:scale-95 sm:w-auto">
                Schedule a demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#included">
              <Button variant="outline" className="w-full rounded-none border border-slate-300 bg-transparent px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-700 shadow-none transition-all hover:bg-slate-100 active:scale-95 sm:w-auto">
                See what’s included
              </Button>
            </a>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-px border border-slate-200 bg-slate-200 text-left sm:grid-cols-5">
            <li className="col-span-2 flex items-center gap-3 bg-teal-50 p-4 sm:col-span-1">
              <span className="text-l font-black leading-none text-teal-700">{FEE_PERCENT}%</span>
              <span className="text-[12px] font-semibold leading-snug text-slate-600">platform fee per resident payment</span>
            </li>
            {HEADLINE.map((x) => (
              <li key={x} className="flex items-start gap-2 bg-white p-4 text-[13px] font-semibold leading-snug text-slate-800">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" strokeWidth={3} /> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section id="included" className="scroll-mt-24 bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">For managers</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Every feature,{' '}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">included</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">
              No add-ons and no locked modules. Every manager gets the full platform from day one.
            </p>
          </div>

          <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map(({ icon: Icon, title, points }) => (
              <div key={title} className="bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center border border-teal-100 bg-teal-50">
                  <Icon className="h-5 w-5 text-teal-700" strokeWidth={1.7} />
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <ul className="mt-3 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2 text-[14px] leading-snug text-slate-500">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal-500" strokeWidth={3} /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resident app */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">For residents</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">A free app for every resident</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-500">
              Your residents get their own mobile app at no cost, so payments, requests and notices stop living in WhatsApp groups.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-slate-700">
              <Smartphone className="h-5 w-5 text-teal-600" /> iOS and Android
            </div>
          </div>
          <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {RESIDENT_APP.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white p-6">
                <Icon className="h-5 w-5 text-teal-700" strokeWidth={1.7} />
                <h3 className="mt-4 font-semibold text-slate-900">{t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom rates */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 border border-slate-200 p-7 sm:flex-row sm:items-center">
            <div className="flex gap-4">
              <Building2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-teal-600" />
              <div>
                <h3 className="font-bold text-slate-900">Large estate or many buildings?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">We can agree a custom rate for your portfolio.</p>
              </div>
            </div>
            <Link href="/schedule-demo?topic=facility-custom-rate" className="flex-shrink-0">
              <Button variant="outline" className="rounded-none border border-slate-900 bg-transparent px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-900 shadow-none hover:bg-slate-900 hover:text-white">
                Talk to us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Pricing questions</h2>
          <div className="mt-10 divide-y divide-slate-200 border border-slate-200 bg-white">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] font-semibold text-slate-900"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="-mt-1 px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-500 to-cyan-500 px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white">See it running on your buildings</h2>
        <p className="mx-auto mt-5 max-w-xl text-xl text-teal-50">Book a demo and we’ll walk you through setup.</p>
        <div className="mt-8 flex justify-center">
          <Link href="/schedule-demo?topic=facility">
            <Button className="rounded-none bg-white px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-lg transition-all hover:bg-slate-100 active:scale-95">
              Schedule a demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <FooterCmp />
    </div>
  );
}

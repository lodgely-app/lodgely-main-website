'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Minus, Plus, ArrowRight, ChevronDown, HardDrive, Users, Wallet } from 'lucide-react';
import Navbar from '../../components/landingPage/Navbar';
import FooterCmp from '../../components/landingPage/FooterCmp';
import { getSignUpUrl } from '../../lib/auth';
import { DEVELOPER_PRICING, naira, plural, yearlySavePercent } from '../../lib/pricing';

// Prices and limits come from the site's env file — see app/lib/pricing.ts.
const P = DEVELOPER_PRICING;
const PRO_MONTHLY = P.proMonthly;
const PRO_YEARLY = P.proYearly;
const STORAGE_BLOCK_GB = P.storageBlockGb;
const STORAGE_BLOCK_MONTHLY = P.storageBlockMonthly;
const SAVE_PERCENT = yearlySavePercent();
const FREE_LIMITS = [
  plural(P.freeUsers, 'user', 'users'),
  plural(P.freeProjects, 'active project', 'active projects'),
  plural(P.freeBoqs, 'Bill of Quantities', 'Bills of Quantities'),
  `${P.freeStorageGb}GB storage`,
];

type Cycle = 'monthly' | 'yearly';

const PLANS = [
  {
    key: 'free',
    name: 'Free',
    tagline: 'For one person getting started.',
    highlights: FREE_LIMITS,
    features: [
      'Projects, milestones and tasks',
      'Gantt timeline and Kanban board',
      'My Tasks across projects',
      'Project chat and documents',
      'Bill of Quantities with Excel import and PDF export',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    tagline: 'For teams running projects end to end.',
    highlights: ['Everything in Free', 'Unlimited projects and BoQs', `${P.proStorageGb}GB organization storage`, 'Pay only for the people who use it'],
    features: [
      'Requisitions, procurement and inventory',
      'Finance: invoices and payment history',
      'Vendors, artisans and subcontractors',
      '10 team roles and permissions',
      'Templates, automation and recurring tasks',
      'Budget vs actual and schedule variance',
      'Materials catalogue and data export',
      'Priority email support',
    ],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large developers with custom needs.',
    highlights: ['Everything in Pro', 'Custom users and storage', 'Dedicated account support'],
    features: [
      'Onboarding and data migration',
      'Custom roles',
      'Pay by invoice or bank transfer',
      'Consolidated billing for several organizations',
    ],
  },
];

type Cell = boolean | string;
const COMPARE: { group: string; rows: { label: string; free: Cell; pro: Cell; ent: Cell }[] }[] = [
  {
    group: 'Usage',
    rows: [
      { label: 'Users', free: String(P.freeUsers), pro: 'As many as you pay for', ent: 'Custom' },
      { label: 'Active projects', free: String(P.freeProjects), pro: 'Unlimited', ent: 'Unlimited' },
      { label: 'Bills of Quantities', free: String(P.freeBoqs), pro: 'Unlimited', ent: 'Unlimited' },
      { label: 'Storage', free: `${P.freeStorageGb}GB`, pro: `${P.proStorageGb}GB + ${P.storageBlockGb}GB add-ons`, ent: 'Custom' },
    ],
  },
  {
    group: 'Projects',
    rows: [
      { label: 'Milestones, tasks, Gantt and Kanban', free: true, pro: true, ent: true },
      { label: 'Project chat and documents', free: true, pro: true, ent: true },
      { label: 'BoQ with Excel import and PDF export', free: true, pro: true, ent: true },
      { label: 'Templates, automation and recurring tasks', free: false, pro: true, ent: true },
      { label: 'Budget vs actual and schedule variance', free: false, pro: true, ent: true },
    ],
  },
  {
    group: 'Operations',
    rows: [
      { label: 'Requisitions', free: false, pro: true, ent: true },
      { label: 'Procurement and purchase orders', free: false, pro: true, ent: true },
      { label: 'Inventory', free: false, pro: true, ent: true },
      { label: 'Finance: invoices and payments', free: false, pro: true, ent: true },
      { label: 'Vendors, artisans and subcontractors', free: false, pro: true, ent: true },
      { label: 'Materials catalogue', free: false, pro: true, ent: true },
    ],
  },
  {
    group: 'Team and admin',
    rows: [
      { label: 'Team roles and permissions', free: false, pro: '10 roles', ent: 'Custom roles' },
      { label: 'Multiple organizations', free: false, pro: true, ent: 'Consolidated billing' },
      { label: 'Data export', free: false, pro: true, ent: true },
      { label: 'Support', free: 'Email', pro: 'Priority email', ent: 'Dedicated account team' },
      { label: 'Onboarding and data migration', free: false, pro: false, ent: true },
    ],
  },
];

const FAQS = [
  {
    q: 'What counts as a user?',
    a: 'Every named member of your organization who has a licence. You choose who gets one on the Team tab, and the owner always has one. Removing someone frees their licence for the next person.',
  },
  {
    q: 'How does payment work?',
    a: 'You pay for a month or a year at a time through Paystack. Lodgely doesn’t store your card. You can top up a prepaid organization wallet so renewals and extra licences are paid from it automatically.',
  },
  {
    q: 'What happens if I don’t renew?',
    a: 'You get a 7-day grace period with reminders. After that your organization moves to Free: your data stays, Pro pages are locked, and you can upgrade again at any time.',
  },
  {
    q: 'Can I start on Free and upgrade later?',
    a: 'Yes. Every new organization starts on Free. Upgrade from Settings → Subscription whenever your team is ready, and everything you’ve built carries over.',
  },
  {
    q: 'Is there a free trial of Pro?',
    a: 'No trial, but Free has no time limit, so you can run a real project on it before deciding. Talk to us if you’d like a demo of the Pro features first.',
  },
  {
    q: 'Is wallet money refundable?',
    a: 'No. Wallet top-ups are non-refundable and can only be spent on your Lodgely Developer subscription, licences and storage.',
  },
];

function goToSignUp() {
  window.location.href = getSignUpUrl('developer');
}

function CellMark({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-[#2C3552]" strokeWidth={2.5} aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-slate-300" aria-label="Not included" />;
  return <span className="text-[13px] font-medium text-slate-700">{v}</span>;
}

export default function DeveloperPricingPage() {
  const [cycle, setCycle] = useState<Cycle>('yearly');
  const [users, setUsers] = useState(5);
  const [blocks, setBlocks] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const perUser = cycle === 'yearly' ? PRO_YEARLY : PRO_MONTHLY;
  const monthlyTotal = users * perUser + blocks * STORAGE_BLOCK_MONTHLY;
  const periodTotal = cycle === 'yearly' ? monthlyTotal * 12 : monthlyTotal;
  const yearlySaving = (PRO_MONTHLY - PRO_YEARLY) * users * 12;

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#2C3552]">
      <Navbar activeAppId="developer" />

      {/* Header */}
      <section className="relative overflow-hidden bg-[#1B2138] px-4 pb-40 pt-36 text-center sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#83E8CA]/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#83E8CA]"></p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Start free. Pay per person when your team joins.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            One person can run up to three projects for free. Pro opens up requisitions, procurement, inventory and finance for the whole team.
          </p>

          <div className="mt-9 inline-flex rounded-full bg-white/10 p-1" role="radiogroup" aria-label="Billing cycle">
            {(['monthly', 'yearly'] as Cycle[]).map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={cycle === c}
                onClick={() => setCycle(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  cycle === c ? 'bg-white text-[#1B2138]' : 'text-slate-300 hover:text-white'
                }`}
              >
                {c === 'monthly' ? 'Monthly' : 'Yearly'}
                {c === 'yearly' && SAVE_PERCENT > 0 && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${cycle === c ? 'bg-[#83E8CA] text-[#1B2138]' : 'bg-[#83E8CA]/20 text-[#83E8CA]'}`}>
                    Save {SAVE_PERCENT}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="relative -mt-28 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {PLANS.map((p) => {
            const featured = p.key === 'pro';
            return (
              <div
                key={p.key}
                className={`flex flex-col rounded-2xl border bg-white p-7 shadow-sm ${
                  featured ? 'border-[#2C3552] shadow-xl shadow-[#2C3552]/10 ring-1 ring-[#2C3552]' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  {featured && <span className="rounded-full bg-[#83E8CA] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1B2138]">Most popular</span>}
                </div>
                <p className="mt-1 text-sm text-slate-500">{p.tagline}</p>

                <div className="mt-6 min-h-[84px]">
                  {p.key === 'free' && (
                    <>
                      <div className="text-4xl font-extrabold">₦0</div>
                      <div className="mt-1 text-sm text-slate-500">Free forever</div>
                    </>
                  )}
                  {p.key === 'pro' && (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold">{naira(perUser)}</span>
                        <span className="text-sm text-slate-500">/ user / month</span>
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {cycle === 'yearly' ? `Billed yearly · ${naira(PRO_YEARLY * 12)} per user` : `Billed monthly · ${naira(PRO_YEARLY)} if billed yearly`}
                      </div>
                    </>
                  )}
                  {p.key === 'enterprise' && (
                    <>
                      <div className="text-4xl font-extrabold">Custom</div>
                      <div className="mt-1 text-sm text-slate-500">Priced for your team and portfolio</div>
                    </>
                  )}
                </div>

                {p.key === 'enterprise' ? (
                  <Link
                    href="/schedule-demo?topic=developer-enterprise"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-[#2C3552] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#2C3552] hover:text-white"
                  >
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={goToSignUp}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      featured ? 'bg-[#2C3552] text-white hover:bg-[#1B2138]' : 'border border-slate-300 hover:border-[#2C3552]'
                    }`}
                  >
                    {featured ? 'Start free, upgrade anytime' : 'Start for free'} <ArrowRight className="h-4 w-4" />
                  </button>
                )}

                <ul className="mt-7 space-y-2.5 border-t border-slate-100 pt-6">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm font-semibold">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5FD3B0]" strokeWidth={3} /> {h}
                    </li>
                  ))}
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" strokeWidth={2.5} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5FD3B0]">Work out your bill</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Pay for the people who use it. Nothing else.</h2>
            <p className="mt-4 max-w-md leading-relaxed text-slate-600">
              Pro is priced per licensed user, and you decide who holds a licence. Need more room for drawings and photos? Add storage {STORAGE_BLOCK_GB}GB at a time.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Users, t: 'Named licences', d: 'Assign and move them on the Team tab' },
                { icon: Wallet, t: 'Prepaid wallet', d: 'Renewals paid automatically, no saved card' },
                { icon: HardDrive, t: `+${STORAGE_BLOCK_GB}GB blocks`, d: `${naira(STORAGE_BLOCK_MONTHLY)} a month each` },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-xl border border-slate-200 p-4">
                  <Icon className="h-5 w-5 text-[#5FD3B0]" />
                  <div className="mt-3 text-sm font-bold">{t}</div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-500">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Pro · {cycle === 'yearly' ? 'billed yearly' : 'billed monthly'}</span>
              <button type="button" onClick={() => setCycle(cycle === 'yearly' ? 'monthly' : 'yearly')} className="text-xs font-semibold text-slate-500 underline-offset-2 hover:underline">
                Switch to {cycle === 'yearly' ? 'monthly' : 'yearly'}
              </button>
            </div>

            {[
              { label: 'Users', hint: `${naira(perUser)} each / month`, value: users, set: setUsers, min: 1, max: 500 },
              { label: 'Extra storage', hint: `${STORAGE_BLOCK_GB}GB blocks · ${naira(STORAGE_BLOCK_MONTHLY)} each / month`, value: blocks, set: setBlocks, min: 0, max: 100 },
            ].map((r) => (
              <div key={r.label} className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div>
                  <div className="text-sm font-bold">{r.label}</div>
                  <div className="text-xs text-slate-500">{r.hint}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label={`Fewer ${r.label.toLowerCase()}`} onClick={() => r.set(Math.max(r.min, r.value - 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 hover:border-[#2C3552] disabled:opacity-40" disabled={r.value <= r.min}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    aria-label={r.label}
                    value={r.value}
                    min={r.min}
                    max={r.max}
                    onChange={(e) => {
                      const n = Math.floor(Number(e.target.value));
                      r.set(Number.isFinite(n) ? Math.min(r.max, Math.max(r.min, n)) : r.min);
                    }}
                    className="h-9 w-16 rounded-lg border border-slate-200 text-center text-sm font-bold focus:border-[#2C3552] focus:outline-none"
                  />
                  <button type="button" aria-label={`More ${r.label.toLowerCase()}`} onClick={() => r.set(Math.min(r.max, r.value + 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 hover:border-[#2C3552]">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-500">{cycle === 'yearly' ? 'Per year' : 'Per month'}</span>
                <span className="text-3xl font-extrabold">{naira(periodTotal)}</span>
              </div>
              <div className="mt-1 text-right text-xs text-slate-500">
                {P.proStorageGb + blocks * STORAGE_BLOCK_GB}GB storage
                {cycle === 'yearly' ? ` · works out at ${naira(monthlyTotal)} a month` : ''}
              </div>
              {cycle === 'monthly' && yearlySaving > 0 && (
                <button type="button" onClick={() => setCycle('yearly')} className="mt-4 w-full rounded-lg bg-[#83E8CA]/25 px-4 py-2.5 text-sm font-semibold text-[#1B2138]">
                  Pay yearly and save {naira(yearlySaving)} a year
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-slate-50 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">Compare plans</h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 text-sm font-semibold text-slate-500">Features</th>
                  {['Free', 'Pro', 'Enterprise'].map((n) => (
                    <th key={n} className={`w-[22%] p-4 text-center text-sm font-bold ${n === 'Pro' ? 'bg-[#83E8CA]/15' : ''}`}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((g) => (
                  <Group key={g.group} group={g} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">Pricing questions</h2>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] font-semibold"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="-mt-1 px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">Prices are in Nigerian naira.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2138] px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Run your first project free.</h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-300">No card needed. Upgrade when the rest of the team is ready to join.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={goToSignUp} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#83E8CA] px-6 py-3 text-sm font-bold text-[#1B2138] hover:bg-[#5FD3B0]">
            Start for free <ArrowRight className="h-4 w-4" />
          </button>
          <Link href="/schedule-demo?topic=developer" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
            Book a demo
          </Link>
        </div>
      </section>

      <FooterCmp />
    </div>
  );
}

function Group({ group }: { group: (typeof COMPARE)[number] }) {
  return (
    <>
      <tr>
        <td colSpan={4} className="bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          {group.group}
        </td>
      </tr>
      {group.rows.map((r) => (
        <tr key={r.label} className="border-t border-slate-100">
          <td className="p-4 text-sm text-slate-700">{r.label}</td>
          <td className="p-4 text-center"><CellMark v={r.free} /></td>
          <td className="bg-[#83E8CA]/10 p-4 text-center"><CellMark v={r.pro} /></td>
          <td className="p-4 text-center"><CellMark v={r.ent} /></td>
        </tr>
      ))}
    </>
  );
}

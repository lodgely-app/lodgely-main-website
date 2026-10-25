'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { SiteHeader } from '../components/marketing/SiteHeader';
import { useIsMobile } from '../lib/useIsMobile';
import { useScrollReveal } from '../lib/useScrollReveal';
import { getSignUpUrl, redirectToLogin } from '../lib/auth';
import {
  Menu,
  X,
  ArrowRight,
  Building2,
  HardHat,
  Ruler,
  ShoppingCart,
  TrendingUp,
  Plus,
  Minus,
  GripVertical,
  ChevronRight,
} from 'lucide-react';

// Hardcoded in place of developer-web's `import.meta.env.VITE_APP_NAME` —
// this page has no local env wiring of its own, and the brand name rendered
// here (nav + footer) never varied across environments anyway.
const APP_NAME = 'Lodgely Developer';

// Every CTA on this page routes through account-portal-web rather than a
// local form — see the module note above goToSignIn/goToSignUp below.
function goToSignIn() {
  redirectToLogin('developer');
}

function goToSignUp() {
  window.location.href = getSignUpUrl('developer');
}

// Real product tag colors, lifted straight from FinanceView.tsx's
// STATUS_TAG/ITEM_PAYMENT_TAG — the mock tables below should look like the
// actual app, not a marketing-only re-skin of it.
const TAG = {
  full: { bg: '#ecfdf5', color: '#059669' },
  partial: { bg: '#eff6ff', color: '#2563eb' },
  credit: { bg: '#f5f3ff', color: '#7c3aed' },
  wait: { bg: '#fffbeb', color: '#d97706' },
};

const ROLES = [
  'Owner', 'Admin', 'Project Manager', 'Quantity Surveyor', 'Site Manager',
  'Procurement Manager', 'Inventory Manager', 'Finance', 'Worker', 'Viewer',
];

interface RoleInfo {
  name: string;
  scope: string;
  badgeColor: string;
  summary: string;
  allowed: string[];
  restricted: string[];
  primaryModules: string[];
}

const ROLE_DETAILS: Record<string, RoleInfo> = {
  Owner: {
    name: 'Owner',
    scope: 'Portfolio Master',
    badgeColor: '#83e8ca',
    summary: 'Full executive oversight of all projects, organizational capital deployment, high-value financial approvals, and user governance.',
    allowed: [
      'Create and archive projects across organizations',
      'Authorize high-value vendor disbursements',
      'Invite & assign administrative team members',
      'Export consolidated audit and finance ledgers',
    ],
    restricted: [],
    primaryModules: ['Portfolio Dashboard', 'Finance & Ledgers', 'Team & Permissions', 'Audit Logs'],
  },
  Admin: {
    name: 'Admin',
    scope: 'Org Administrator',
    badgeColor: '#5eead4',
    summary: 'Configures project structures, manages role assignments, oversees procurement approvals, and manages vendor masters.',
    allowed: [
      'Assign and modify team role permissions',
      'Approve procurement orders and budget caps',
      'Create and update Bill of Quantities templates',
      'Generate cross-project milestone reports',
    ],
    restricted: ['Cannot delete organization owner records'],
    primaryModules: ['Project Setup', 'BoQ Manager', 'Approvals', 'Team'],
  },
  'Project Manager': {
    name: 'Project Manager',
    scope: 'Project Lifecycle Lead',
    badgeColor: '#38bdf8',
    summary: 'Owns milestone schedules, task dependencies, contractor assignments, and overall site velocity.',
    allowed: [
      'Create and adjust milestones & task schedules',
      'Review and advance material requisitions',
      'Approve site milestone completion proofs',
      'Monitor budget vs actual expenditure',
    ],
    restricted: ['Cannot mark invoices as paid in bank ledger'],
    primaryModules: ['Milestones Roadmap', 'Task Board', 'Requisitions', 'Reports'],
  },
  'Quantity Surveyor': {
    name: 'Quantity Surveyor',
    scope: 'Cost & Measurement Lead',
    badgeColor: '#a78bfa',
    summary: 'Maintains Bill of Quantities (BoQ), validates material take-offs, and aligns milestone estimations with actual site requirements.',
    allowed: [
      'Build and edit structured BoQ item catalogues',
      'Tie material requisitions to BoQ budget lines',
      'Perform cost variance and rate benchmarking',
      'Export detailed measurement sheets',
    ],
    restricted: ['Cannot disburse payments directly'],
    primaryModules: ['BoQ Hub', 'Price Benchmarks', 'Material Catalogue', 'Estimates'],
  },
  'Site Manager': {
    name: 'Site Manager',
    scope: 'On-Site Operations',
    badgeColor: '#f59e0b',
    summary: 'Raises material requisitions against the BoQ, receives site deliveries, updates task progress, and captures field inspection photos.',
    allowed: [
      'Raise material requisitions against catalogue',
      'Verify & log physical deliveries into site inventory',
      'Attach progress photos and inspection sign-offs',
      'Close completed tasks in assigned milestones',
    ],
    restricted: ['Cannot alter vendor rates or issue invoices'],
    primaryModules: ['Requisitions', 'Inventory Deliveries', 'Task Tracker', 'Site Log'],
  },
  'Procurement Manager': {
    name: 'Procurement Manager',
    scope: 'Sourcing & Purchasing',
    badgeColor: '#ec4899',
    summary: 'Prices requisitions, fulfills from existing site stock, issues purchase orders to vendors, and secures quotes.',
    allowed: [
      'Evaluate supplier rate sheets and quotes',
      'Fulfill requisitions from stock or raise POs',
      'Manage vendor directory and delivery waybills',
      'Trigger 3-way match upon physical receipt',
    ],
    restricted: ['Cannot edit project engineering schedules'],
    primaryModules: ['Procurement Orders', 'Vendor Master', 'Price Sheets', 'PO Ledger'],
  },
  'Inventory Manager': {
    name: 'Inventory Manager',
    scope: 'Warehouse & Stock Control',
    badgeColor: '#10b981',
    summary: 'Monitors site stock balances, logs incoming delivery waybills, handles material transfers between sites, and manages returns.',
    allowed: [
      'Log received materials against purchase invoices',
      'Record material disbursements to sub-contractors',
      'Perform stock audits & track minimum levels',
      'Process damaged item returns & credit tracking',
    ],
    restricted: ['Cannot change vendor pricing terms'],
    primaryModules: ['Stock Ledger', 'Delivery Receipts', 'Site Transfers', 'Audit Logs'],
  },
  Finance: {
    name: 'Finance',
    scope: 'Fiscal Settlement',
    badgeColor: '#818cf8',
    summary: 'Validates 3-way matching between PO, delivery waybill, and invoice. Executes full/partial payments and issues credit notes.',
    allowed: [
      'Mark invoices as paid (Full, Partial, Credit)',
      'Manage accounts payable and disbursements',
      'Reconcile bank transfers with vendor receipts',
      'Generate fiscal statement & cash flow projections',
    ],
    restricted: ['Cannot modify construction schedule deadlines'],
    primaryModules: ['Invoices & Payments', 'Credit Ledger', 'Tax & Withholding', 'Cash Flow'],
  },
  Worker: {
    name: 'Worker',
    scope: 'Field Execution',
    badgeColor: '#94a3b8',
    summary: 'Views assigned punch list items, checks off completed tasks, and uploads progress photos directly from mobile.',
    allowed: [
      'View daily assigned tasks and safety guidelines',
      'Mark personal tasks complete with timestamps',
      'Upload site completion photos',
    ],
    restricted: ['Cannot view financial data or create requisitions'],
    primaryModules: ['My Assigned Tasks', 'Daily Checklist', 'Photo Upload'],
  },
  Viewer: {
    name: 'Viewer',
    scope: 'Read-Only Stakeholder',
    badgeColor: '#64748b',
    summary: 'Investors and external auditors who need high-level progress visibility, milestone timeline tracking, and read-only reports.',
    allowed: [
      'View milestone roadmap progress percentages',
      'Read public project overview reports',
      'Inspect approved photo documentation',
    ],
    restricted: ['Read-only access across all modules'],
    primaryModules: ['Executive Summary', 'Public Milestone Roadmap', 'Photo Gallery'],
  },
};

const WHO_FOR = [
  { icon: Building2, title: 'Developers', body: "Run the whole project — schedule, materials, and money — without it living in someone's inbox." },
  { icon: HardHat, title: 'Site managers', body: 'Raise what’s needed on site and watch it through to delivery.' },
  { icon: Ruler, title: 'Quantity surveyors', body: "Keep the Bill of Quantities and milestone budgets tied to what's actually being built." },
  { icon: ShoppingCart, title: 'Procurement teams', body: 'Price, fulfill, and order — with rates attributed to whoever set them.' },
  { icon: TrendingUp, title: 'Investors', body: 'See real progress on the project they backed, not a quarterly update.' },
];

const FAQS = [
  {
    q: "How is a milestone's progress actually calculated?",
    a: 'From real task completion, not a manual guess — when every task under a milestone is done, the milestone closes itself out, and every document or photo captured along the way stays attached to the milestone that produced it.',
  },
  {
    q: 'Can I run more than one project at once?',
    a: 'Yes — every module filters by project, and an organization-wide view rolls milestones, requisitions and invoices up across every site you’re running.',
  },
  {
    q: 'What happens when Finance chooses Partial Payment or Credit Note?',
    a: 'The item is confirmed complete either way, so the project can advance past the payment stage — vendors are often paid in installments or settled with a credit note. The actual money transfer, whenever it happens, is recorded separately in Payments Made.',
  },
  {
    q: 'Who can mark an invoice as paid?',
    a: 'Only Finance, Admin, or the Owner — checked on the server for every request, not just hidden from the interface for other roles.',
  },
];

const ROADMAP_MILESTONES = [
  {
    num: '01',
    name: 'Preliminaries & Earthwork',
    desc: 'Site survey, perimeter hoarding, bulk excavation & soil testing.',
    status: 'COMPLETED',
    progress: 100,
    dates: 'Aug 01 → Aug 22',
    isCurrent: false,
  },
  {
    num: '02',
    name: 'Substructure & Foundation',
    desc: 'Reinforced concrete raft slab, ground beams & damp proofing.',
    status: 'IN PROGRESS',
    progress: 68,
    dates: 'Aug 25 → Sep 18',
    isCurrent: true,
  },
  {
    num: '03',
    name: 'Superstructure Blockwork',
    desc: 'Load-bearing masonry, lintels, columns & floor beam casting.',
    status: 'PENDING',
    progress: 0,
    dates: 'Sep 20 → Oct 15',
    isCurrent: false,
  },
  // {
  //   num: '04',
  //   name: 'Roofing & Waterproofing',
  //   desc: 'Steel trusses, standing seam aluminum sheets & rainwater gutters.',
  //   status: 'PENDING',
  //   progress: 0,
  //   dates: 'Oct 18 → Nov 10',
  //   isCurrent: false,
  // },
];

export default function DeveloperLandingPage() {
  const isMobile = useIsMobile();
  const styles = useMemo(() => getResponsiveStyles(isMobile), [isMobile]);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>('Site Manager');
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    scale: '1-3 Sites (Residential/Commercial)',
    notes: '',
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const activeRoleData = ROLE_DETAILS[selectedRole] || ROLE_DETAILS['Site Manager'];

  // Ports the IntersectionObserver reveal pattern this page's sections rely
  // on (className="reveal-on-scroll" → "is-visible") via the shared hook.
  useScrollReveal();

  const navLink: CSSProperties = isMobile ? { padding: '14px 0', borderBottom: '1px solid var(--border)' } : {};

  return (
    <div style={styles.page}>
      {/* Unified Lodgely Navbar with Developer app context */}
      <SiteHeader activeAppId="developer" />



      {/* ============================== HERO WITH ARCHITECTURAL BACKGROUND ============================== */}
      <section style={styles.heroWrapper}>
        {/* Background Architectural Photography with Slow Ambient Drift */}
        <div className="animate-bg-drift" style={styles.heroBgImage} />
        {/* Layered Gradient Vignette & Ambience */}
        <div style={styles.heroOverlay} />
        <div className="animate-glow-pulse" style={styles.heroGlow} />

        {/* Hero Content */}
        <div style={styles.heroContainer}>
          {/* Main Display Headline with Cascading Reveal and Flowing Gradient */}
          <h1 className="animate-hero-title" style={styles.h1}>
            Run the <br />whole project.<br />
            <span className="animate-gradient-text" style={styles.h1Highlight}>Not just the paperwork.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-sub" style={styles.heroSub}>
            Live Bill of Quantities, site requisitions, 3-way matched procurement, inventory, and finance —
            one connected record for real estate projects from groundbreaking to handover.
          </p>

          {/* Action CTAs with Shine & Magnetic Hover */}
          <div className="animate-hero-ctas" style={styles.btnRow}>
            <button className="interactive-btn-solid" style={styles.btnSolid} onClick={goToSignUp}>
              Start a project <ArrowRight size={18} className="cta-arrow-icon" />
            </button>
            <a href="#platform" className="interactive-btn-glass" style={styles.btnGlass}>
              See how it works
            </a>
          </div>

          {/* Target Audience / Stakeholders */}
          <div className="animate-hero-chips" style={styles.chipRow}>
            {['Residential Developers', 'Commercial Contractors', 'Quantity Surveyors', 'Site Engineers', 'Finance Teams'].map((c) => (
              <span key={c} className="interactive-chip" style={styles.chip}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== PROJECT OVERVIEW (dark) ============================== */}
      <section id="platform" className="reveal-on-scroll" style={styles.darkBand}>
        <div style={isMobile ? { ...styles.darkGrid, gridTemplateColumns: '1fr', gap: 32 } : styles.darkGrid}>
          <div>
            <span style={styles.eyebrowDark}>The Whole Project</span>
            <h2 style={styles.h2Dark}>See the whole build, not just this week's punch list.</h2>
            <p style={styles.ledeDark}>
              Milestones, tasks, requisitions and documents for a project all live in the same place — so
              "how's the site doing" has a real answer, not a phone call to five different people.
            </p>
            <a href="#workflow" className="interactive-btn-glass" style={{ ...styles.btnOutline, ...styles.btnOutlineDark, marginTop: 26, display: 'inline-flex' }}>Explore the workflow</a>
          </div>
          <div
            className="interactive-floating-card"
            style={{
              background: '#ffffff',
              borderRadius: 14,
              padding: isMobile ? '16px 12px' : '18px 20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -28px rgba(0,0,0,0.45)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: isMobile ? 14.5 : 15.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Milestone Roadmap
              </h3>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 999 }}>
                Test Villa · {ROADMAP_MILESTONES.length} Phases
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Continuous Vertical Timeline Line - perfectly centered in the 18px dot column */}
              <div
                style={{
                  position: 'absolute',
                  left: 9,
                  top: 8,
                  bottom: 24,
                  width: 2,
                  transform: 'translateX(-50%)',
                  backgroundColor: '#e2e8f0',
                  borderRadius: 1,
                  zIndex: 1,
                }}
              />

              {/* Top Node: Proposed Start Date */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 6,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div style={{ width: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#0f172a',
                      border: '2.5px solid #ffffff',
                      boxShadow: '0 0 0 1.5px #cbd5e1',
                    }}
                  />
                </div>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 999,
                    padding: '2px 9px',
                    fontSize: 10,
                    color: '#334155',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <span style={{ color: '#64748b', fontWeight: 500 }}>Proposed Start:</span>
                  <span style={{ color: '#0f172a', fontWeight: 700 }}>Sep 1, 20xx</span>
                </div>
              </div>

              {/* Milestones Flow */}
              {ROADMAP_MILESTONES.map((m, idx) => {
                const isCompleted = m.status === 'COMPLETED';
                const isInProgress = m.status === 'IN PROGRESS';
                const badgeStyle = isCompleted
                  ? { bg: '#ecfdf5', text: '#059669', dot: '#10b981' }
                  : isInProgress
                  ? { bg: '#cffafe', text: '#0891b2', dot: '#06b6d4' }
                  : { bg: '#f1f5f9', text: '#64748b', dot: '#cbd5e1' };

                return (
                  <div key={m.num} style={{ marginBottom: 6, position: 'relative', zIndex: 2 }}>
                    {/* Insert milestone link */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, marginTop: idx === 0 ? 5 : 6 }}>
                      <div style={{ width: 18, flexShrink: 0 }} />
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 3,
                          color: '#94a3b8',
                          fontSize: 10,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#0ea5e9')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      >
                        <Plus size={10} strokeWidth={2.5} />
                        <span>Insert milestone</span>
                      </span>
                    </div>

                    {/* Milestone Card Container with Dot + Card */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      {/* Perfectly Aligned Timeline Dot */}
                      <div
                        style={{
                          width: 18,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                          marginTop: 12,
                        }}
                      >
                        <div
                          className={
                            isInProgress
                              ? 'animate-roadmap-dot-teal'
                              : isCompleted
                              ? 'animate-roadmap-dot-green'
                              : ''
                          }
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: badgeStyle.dot,
                            border: '2.5px solid #ffffff',
                            boxShadow: isInProgress
                              ? '0 0 0 2.5px rgba(6, 182, 212, 0.3)'
                              : isCompleted
                              ? '0 0 0 2px rgba(16, 185, 129, 0.25)'
                              : '0 0 0 1px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      </div>

                      {/* Card Content */}
                      <div
                        className="roadmap-card-hover"
                        style={{
                          flex: 1,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: 10,
                          padding: isMobile ? '8px 10px' : '9px 13px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                          cursor: 'pointer',
                        }}
                      >
                        {/* Card Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                              <GripVertical size={12} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
                              {m.num}
                            </span>
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>
                              {m.name}
                            </span>
                          </div>
                          <ChevronRight size={13} className="roadmap-chevron" style={{ color: '#94a3b8' }} />
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: 10.5, color: '#64748b', margin: 0, paddingLeft: 17, lineHeight: 1.35 }}>
                          {m.desc}
                        </p>

                        {/* Status + Progress Bar Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 17, marginTop: 1 }}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '1.5px 6px',
                              borderRadius: 6,
                              backgroundColor: badgeStyle.bg,
                              gap: 4,
                              minWidth: 'max-content',
                            }}
                          >
                            <div
                              className={isInProgress ? 'animate-dot-pulse' : ''}
                              style={{
                                width: 4.5,
                                height: 4.5,
                                borderRadius: '50%',
                                backgroundColor: badgeStyle.dot,
                              }}
                            />
                            <span style={{ fontSize: 8.5, fontWeight: 700, color: badgeStyle.text, letterSpacing: '0.03em' }}>
                              {m.status}
                            </span>
                          </div>

                          <div style={{ flex: 1, height: 3.5, borderRadius: 2, backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                            <div
                              className={isInProgress ? 'animate-gantt-bar' : ''}
                              style={{
                                height: '100%',
                                width: `${m.progress}%`,
                                backgroundColor: badgeStyle.dot,
                                borderRadius: 2,
                                transition: 'width 0.4s ease',
                              }}
                            />
                          </div>

                          <span style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', minWidth: 24, textAlign: 'right' }}>
                            {m.progress}%
                          </span>
                        </div>

                        {/* Dates */}
                        <div style={{ paddingLeft: 17, fontSize: 10, color: '#64748b', fontWeight: 500 }}>
                          {m.dates}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURE: MILESTONES ============================== */}
      <section id="workflow" className="reveal-on-scroll" style={styles.bandLight}>
        <div style={isMobile ? { ...styles.featureGrid, gridTemplateColumns: '1fr', gap: 32 } : styles.featureGrid}>
          <div>
            <span style={styles.eyebrow}>Milestones &amp; Timeline</span>
            <h2 style={styles.h2}>Progress that's tied to what was actually delivered, not a guess.</h2>
            <p style={styles.lede}>
              Milestones roll up their tasks' real completion — and every task can trace back to the
              requisitions and deliveries that made it possible, so "60% done" means something a
              spreadsheet update never could.
            </p>
            <ul style={styles.featureList}>
              <li>- Milestone progress computed from real task completion</li>
              <li>- Documents and images attached at the milestone that produced them</li>
              <li>- Date validation that catches an impossible schedule before it's saved</li>
            </ul>
          </div>
          <div style={{ ...styles.notebookCanvasMint, ...(isMobile ? {} : { order: 1 }) }}>
            <div className="interactive-floating-card" style={styles.floatingTableCard}>
              <div style={styles.mockHead}>
                <span style={styles.mockHeadTitle}>MILESTONES · TEST VILLA</span>
                <span style={{ ...styles.mockHeadMeta, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span className="animate-dot-pulse" /> 4 ACTIVE
                </span>
              </div>
              <div style={{ padding: isMobile ? '8px 0' : '12px 0' }}>
                {[
                  ['Foundation', 100],
                  ['Roofing', 72],
                  ['Plumbing', 38],
                  ['Finishing', 6],
                ].map(([label, pct]) => (
                  <div key={label as string} className="interactive-table-row" style={styles.ganttRow}>
                    <span style={styles.ganttLabel}>{label}</span>
                    <div style={styles.ganttTrack}><div className="animate-gantt-bar" style={{ ...styles.ganttFill, width: `${pct}%` }} /></div>
                    <span style={{ ...styles.ganttPct, fontWeight: 700, color: 'var(--navy)' }}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURE: PROCUREMENT ============================== */}
      <section className="reveal-on-scroll" style={styles.bandCard}>
        <div style={isMobile ? { ...styles.featureGrid, gridTemplateColumns: '1fr', gap: 32 } : { ...styles.featureGrid, ...styles.featureGridRev }}>
          <div style={isMobile ? {} : { order: 2 }}>
            <span style={styles.eyebrow}>Requisitions &amp; Procurement</span>
            <h2 style={styles.h2}>From "we need this" to a priced, approved order.</h2>
            <p style={styles.lede}>
              A site manager raises a requisition against the material catalogue. Procurement prices it,
              fulfills what's already in stock, and only sends the rest out for purchase — no more
              guessing what's already on site before ordering more of it.
            </p>
            <ul style={styles.featureList}>
              <li>Catalogue-matched requisitions, not free-text guesswork</li>
              <li>Fulfill from stock or procure — decided item by item</li>
              <li>Every rate entry attributed to the person who priced it</li>
            </ul>
          </div>
          <div style={styles.notebookCanvasBlue}>
            <div className="interactive-floating-card" style={styles.floatingTableCard}>
              <div style={styles.mockHead}>
                <span style={styles.mockHeadTitle}>PROCUREMENT · TEST VILLA</span>
                <span style={styles.mockHeadMeta}>SHEET 2 OF 3</span>
              </div>
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={styles.mockTable}>
                  <thead>
                    <tr>
                      <th style={styles.mockTh}>Item</th>
                      <th style={styles.mockTh}>Qty</th>
                      <th style={styles.mockTh}>Rate</th>
                      <th style={{ ...styles.mockTh, textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600 }}>Dangote Cement</td>
                      <td style={styles.mockTd}>50 bags</td>
                      <td style={styles.mockTd}>₦8,200</td>
                      <td style={{ ...styles.mockTd, textAlign: 'right' }}>
                        <span className="interactive-pill-badge" style={styles.pillPriced}>
                          <span className="animate-dot-pulse" /> PRICED
                        </span>
                      </td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600 }}>Angle Iron</td>
                      <td style={styles.mockTd}>2 lengths</td>
                      <td style={styles.mockTd}>₦2,500</td>
                      <td style={{ ...styles.mockTd, textAlign: 'right' }}>
                        <span className="interactive-pill-badge" style={styles.pillPriced}>
                          <span className="animate-dot-pulse" /> PRICED
                        </span>
                      </td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600, borderBottom: 'none' }}>Binding Wire</td>
                      <td style={{ ...styles.mockTd, borderBottom: 'none' }}>4 rolls</td>
                      <td style={{ ...styles.mockTd, borderBottom: 'none' }}>—</td>
                      <td style={{ ...styles.mockTd, textAlign: 'right', borderBottom: 'none' }}>
                        <button className="interactive-btn-solid" style={styles.actionBtnPrice}>Price</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURE: INVENTORY ============================== */}
      <section className="reveal-on-scroll" style={styles.bandLight}>
        <div style={isMobile ? { ...styles.featureGrid, gridTemplateColumns: '1fr', gap: 32 } : styles.featureGrid}>
          <div>
            <span style={styles.eyebrow}>Inventory &amp; Delivery</span>
            <h2 style={styles.h2}>Know what's actually on the shelf before you buy more of it.</h2>
            <p style={styles.lede}>
              Every delivered item lands in the site's own stock ledger the moment it's received — with
              supplier, waybill reference and quantity — so the next requisition can be fulfilled from
              what's already there instead of triggering a duplicate order.
            </p>
            <ul style={styles.featureList}>
              <li>Delivery receipts logged against the originating invoice line</li>
              <li>Partial deliveries and returns tracked without losing the trail</li>
              <li>Stock levels visible to procurement before they price the next order</li>
            </ul>
          </div>
          <div style={{ ...styles.notebookCanvasSand, ...(isMobile ? {} : { order: 1 }) }}>
            <div className="interactive-floating-card" style={styles.floatingTableCard}>
              <div style={styles.mockHead}>
                <span style={styles.mockHeadTitle}>INVENTORY · DELIVERY LOG</span>
                <span style={styles.mockHeadMeta}>THIS WEEK</span>
              </div>
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={styles.mockTable}>
                  <thead>
                    <tr>
                      <th style={styles.mockTh}>Material</th>
                      <th style={styles.mockTh}>Delivered</th>
                      <th style={styles.mockTh}>Supplier</th>
                      <th style={{ ...styles.mockTh, textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600 }}>Dangote Cement</td>
                      <td style={styles.mockTd}>50 bags</td>
                      <td style={styles.mockTd}>Lafarge Depot</td>
                      <td style={{ ...styles.mockTd, textAlign: 'right' }}>
                        <span className="interactive-pill-badge" style={styles.pillReceived}>
                          <span className="animate-dot-pulse" /> RECEIVED
                        </span>
                      </td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600 }}>Angle Iron</td>
                      <td style={styles.mockTd}>2 lengths</td>
                      <td style={styles.mockTd}>Iron &amp; Steel Co.</td>
                      <td style={{ ...styles.mockTd, textAlign: 'right' }}>
                        <span className="interactive-pill-badge" style={styles.pillReceived}>
                          <span className="animate-dot-pulse" /> RECEIVED
                        </span>
                      </td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600, borderBottom: 'none' }}>Roofing Sheets</td>
                      <td style={{ ...styles.mockTd, borderBottom: 'none' }}>0 / 30</td>
                      <td style={{ ...styles.mockTd, borderBottom: 'none' }}>—</td>
                      <td style={{ ...styles.mockTd, textAlign: 'right', borderBottom: 'none' }}>
                        <span className="interactive-pill-badge" style={styles.pillAwaiting}>
                          <span className="animate-dot-amber" /> AWAITING
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURE: FINANCE ============================== */}
      <section className="reveal-on-scroll" style={styles.bandCard}>
        <div style={isMobile ? { ...styles.featureGrid, gridTemplateColumns: '1fr', gap: 32 } : { ...styles.featureGrid, ...styles.featureGridRev }}>
          <div style={isMobile ? {} : { order: 2 }}>
            <span style={styles.eyebrow}>Finance &amp; Payments</span>
            <h2 style={styles.h2}>Full payment, partial payment, or a credit note — Finance's call, always on record.</h2>
            <p style={styles.lede}>
              Vendors are often paid off in installments or settled with a credit note, not cash up front —
              and the requisition can still advance on that agreement. Finance settles it however the deal
              actually works, and records the real money transfer, whenever it happens, in its own ledger.
            </p>
            <ul style={styles.featureList}>
              <li>Three settlement types, one audit trail</li>
              <li>Outstanding balances tracked independently of workflow status</li>
              <li>Every disbursement stamped with who confirmed it and when</li>
            </ul>
          </div>
          <div style={styles.notebookCanvasViolet}>
            <div className="interactive-floating-card" style={styles.floatingTableCard}>
              <div style={styles.mockHead}>
                <span style={styles.mockHeadTitle}>FINANCE · PAYMENTS MADE</span>
                <span style={{ ...styles.mockHeadMeta, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span className="animate-dot-amber" /> OUTSTANDING: ₦2,000.00
                </span>
              </div>
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={styles.mockTable}>
                  <thead>
                    <tr>
                      <th style={styles.mockTh}>Invoice / Item</th>
                      <th style={styles.mockTh}>Type</th>
                      <th style={{ ...styles.mockTh, textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600 }}>INV-897481 · Cement</td>
                      <td style={styles.mockTd}><span className="interactive-pill-badge" style={styles.pillFull}>Full Payment</span></td>
                      <td style={{ ...styles.mockTd, textAlign: 'right', fontWeight: 600 }}>₦12,500.00</td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600 }}>INV-456030 · Angle Iron</td>
                      <td style={styles.mockTd}><span className="interactive-pill-badge" style={styles.pillPartial}>Partial Payment</span></td>
                      <td style={{ ...styles.mockTd, textAlign: 'right', fontWeight: 600 }}>₦3,000.00</td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td style={{ ...styles.mockTd, fontWeight: 600, borderBottom: 'none' }}>INV-364826 · Binding Wire</td>
                      <td style={{ ...styles.mockTd, borderBottom: 'none' }}><span className="interactive-pill-badge" style={styles.pillCredit}>Credit Note</span></td>
                      <td style={{ ...styles.mockTd, textAlign: 'right', fontWeight: 600, borderBottom: 'none' }}>₦800.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== HOW IT WORKS ============================== */}
      <section className="reveal-on-scroll" style={styles.bandCard}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span style={styles.eyebrow}>— HOW IT WORKS</span>
          <h2 style={styles.h2}>Five steps. One record, start to finish.</h2>
          <p style={styles.lede}>
            The same underlying fact — money or material changing hands — moves through five roles without ever leaving the ledger.
          </p>

          <div style={isMobile ? styles.stepsGridConnectedMobile : styles.stepsGridConnected}>
            <div className="interactive-step-col" style={styles.stepConnectedCol}>
              <span className="step-num-highlight" style={styles.stepConnectedNum}>01</span>
              <h4 style={styles.stepConnectedTitle}>Raise</h4>
              <p style={styles.stepConnectedBody}>Site Manager requests material against the catalogue.</p>
            </div>
            <div className="interactive-step-col" style={styles.stepConnectedCol}>
              <span className="step-num-highlight" style={styles.stepConnectedNum}>02</span>
              <h4 style={styles.stepConnectedTitle}>Price</h4>
              <p style={styles.stepConnectedBody}>Procurement rates it or fulfills it from existing stock.</p>
            </div>
            <div className="interactive-step-col" style={styles.stepConnectedCol}>
              <span className="step-num-highlight" style={styles.stepConnectedNum}>03</span>
              <h4 style={styles.stepConnectedTitle}>Invoice</h4>
              <p style={styles.stepConnectedBody}>An invoice is raised automatically from the priced order.</p>
            </div>
            <div className="interactive-step-col" style={styles.stepConnectedCol}>
              <span className="step-num-highlight" style={styles.stepConnectedNum}>04</span>
              <h4 style={styles.stepConnectedTitle}>Settle</h4>
              <p style={styles.stepConnectedBody}>Finance confirms full, partial, or credit-note payment.</p>
            </div>
            <div className="interactive-step-col" style={{ ...styles.stepConnectedCol, borderRight: isMobile ? 'none' : 'none' }}>
              <span className="step-num-highlight" style={styles.stepConnectedNum}>05</span>
              <h4 style={styles.stepConnectedTitle}>Deliver</h4>
              <p style={styles.stepConnectedBody}>Stock lands in Inventory; the requisition closes out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== ROLES & PERMISSIONS (dark) ============================== */}
      <section id="roles" className="reveal-on-scroll" style={styles.darkBand}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={isMobile ? { display: 'flex', flexDirection: 'column', gap: 36 } : { display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 52, alignItems: 'center' }}>
            {/* Left Column: Heading, description & interactive clickable role selector */}
            <div>
              <span style={styles.eyebrowDark}>Roles &amp; Granular Permissions</span>
              <h2 style={{ ...styles.h2Dark, maxWidth: '20ch' }}>Everyone on the project — one record, their own view.</h2>
              <p style={{ ...styles.ledeDark, maxWidth: '52ch' }}>
                From the site manager raising a requisition to the owner watching the whole portfolio, ten specialized roles
                work off the exact same project record, each seeing only what their job requires — securely enforced on the
                server, not just hidden in the interface.
              </p>

              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--mint)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Click a role to inspect permissions:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ROLES.map((r) => {
                    const isSelected = selectedRole === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRole(r)}
                        className="interactive-chip"
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          padding: '7px 15px',
                          borderRadius: 999,
                          border: isSelected ? '1.5px solid var(--mint)' : '1px solid rgba(255,255,255,0.18)',
                          background: isSelected ? 'rgba(131, 232, 202, 0.16)' : 'rgba(255,255,255,0.04)',
                          color: isSelected ? 'var(--mint)' : '#cbd5e1',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          boxShadow: isSelected ? '0 0 16px rgba(131, 232, 202, 0.25)' : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isSelected && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--mint)' }} className="animate-dot-pulse" />}
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Live Role Inspector Glass Card */}
            <div>
              <div
                className="interactive-floating-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 16,
                  padding: isMobile ? '20px 18px' : '26px 24px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Role Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 14, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 19, fontWeight: 800, color: '#ffffff', margin: 0 }}>
                        {activeRoleData.name}
                      </h3>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 999,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: activeRoleData.badgeColor,
                          border: `1px solid ${activeRoleData.badgeColor}40`,
                        }}
                      >
                        {activeRoleData.scope}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 4 }}>
                      Role-Based Access Control Profile
                    </div>
                  </div>
                </div>

                {/* Role Summary */}
                <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 16px' }}>
                  {activeRoleData.summary}
                </p>

                {/* Active Modules */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>
                    Accessible Modules:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {activeRoleData.primaryModules.map((mod) => (
                      <span
                        key={mod}
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          padding: '2.5px 8px',
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.06)',
                          color: '#e2e8f0',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== WHO IT'S FOR ============================== */}
      <section id="who" className="reveal-on-scroll" style={styles.bandLight}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span style={styles.eyebrow}>— WHO IT'S FOR</span>
          <h2 style={styles.h2}>Tailored for the reality on site and the precision in the office.</h2>
          <div style={isMobile ? { display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginTop: 32 } : styles.whoGrid}>
            {WHO_FOR.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="interactive-floating-card" style={styles.whoCard}>
                  <div style={styles.whoIconWrap}>
                    <Icon size={18} color="var(--mint-deep)" />
                  </div>
                  <h4 style={styles.whoTitle}>{item.title}</h4>
                  <p style={styles.whoBody}>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section id="faq" className="reveal-on-scroll" style={styles.bandCard}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span style={styles.eyebrow}>Frequently Asked</span>
          <h2 style={styles.h2}>Questions worth answering upfront.</h2>
          <div style={styles.faqList}>
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} style={styles.faqItem}>
                  <button className="interactive-faq-button" style={styles.faqSummary} onClick={() => setOpenFaq(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="interactive-faq-icon">
                      {open ? <Minus size={18} color="var(--mint-deep)" /> : <Plus size={18} color="var(--text-muted)" />}
                    </span>
                  </button>
                  {open && <p style={styles.faqBody}>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== BOOK A DEMO FORM ============================== */}
      <section id="demo" className="reveal-on-scroll" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: isMobile ? '64px 20px' : '96px 48px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={isMobile ? { display: 'flex', flexDirection: 'column', gap: 40 } : { display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
            {/* Left Column: Demo Value Prop */}
            <div>
              <span style={styles.eyebrow}>— BOOK A PERSONALIZED WALKTHROUGH</span>
              <h2 style={{ ...styles.h2, fontSize: isMobile ? 28 : 36, maxWidth: '18ch', marginTop: 12 }}>
                See how Lodgely runs your specific construction workflows.
              </h2>
              <p style={{ ...styles.lede, marginTop: 16, maxWidth: '48ch' }}>
                Schedule a 20-minute tailored walkthrough with a construction workflow specialist. We’ll show you how
                milestones, requisitions, inventory, and finance match up seamlessly on one record.
              </p>

              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 13 }}>
                    ✓
                  </div>
                  <div>
                    <h5 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: 0 }}>Custom demo tailored to your project scale</h5>
                    <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>Whether you're building 2 residential villas or managing 10+ commercial sites.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 13 }}>
                    ✓
                  </div>
                  <div>
                    <h5 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: 0 }}>BoQ &amp; Material Catalog Migration</h5>
                    <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>We’ll help you import existing spreadsheets and Bill of Quantities seamlessly.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 13 }}>
                    ✓
                  </div>
                  <div>
                    <h5 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: 0 }}>Live Q&amp;A with real estate engineers</h5>
                    <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>Get answers on role permissions, financial approvals, and vendor ledgers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Demo Booking Form */}
            <div>
              <div
                className="interactive-floating-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 16,
                  padding: isMobile ? '24px 20px' : '36px 32px',
                  boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)',
                }}
              >
                {demoSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: '#ecfdf5',
                        color: '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 18px',
                        fontSize: 26,
                        fontWeight: 800,
                      }}
                    >
                      ✓
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>
                      Demo Request Confirmed!
                    </h3>
                    <p style={{ fontSize: 14.5, color: '#64748b', lineHeight: 1.6, maxWidth: 360, margin: '0 auto 24px' }}>
                      Thank you, <strong style={{ color: '#0f172a' }}>{demoForm.fullName || 'there'}</strong>. Our workflow specialist will reach out to <strong style={{ color: '#0f172a' }}>{demoForm.workEmail}</strong> shortly with your personalized meeting invitation.
                    </p>
                    <button
                      type="button"
                      className="interactive-btn-glass"
                      style={{ ...styles.btnGlass, padding: '10px 22px', fontSize: 13.5 }}
                      onClick={() => {
                        setDemoSubmitted(false);
                        setDemoForm({ fullName: '', workEmail: '', companyName: '', phone: '', scale: '1-3 Sites (Residential/Commercial)', notes: '' });
                      }}
                    >
                      Book another demo
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDemoLoading(true);
                      setTimeout(() => {
                        setDemoLoading(false);
                        setDemoSubmitted(true);
                      }, 600);
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                  >
                    <div style={{ marginBottom: 4 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px' }}>
                        Book a Live Demo
                      </h3>
                      <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                        Fill out your details below and we’ll prepare a tailored sandbox.
                      </p>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Johnson"
                        value={demoForm.fullName}
                        onChange={(e) => setDemoForm({ ...demoForm, fullName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: 8,
                          border: '1.5px solid #cbd5e1',
                          fontSize: 14,
                          color: '#0f172a',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#248f8d')}
                        onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={demoForm.workEmail}
                          onChange={(e) => setDemoForm({ ...demoForm, workEmail: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: 8,
                            border: '1.5px solid #cbd5e1',
                            fontSize: 14,
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#248f8d')}
                          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 800 000 0000"
                          value={demoForm.phone}
                          onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: 8,
                            border: '1.5px solid #cbd5e1',
                            fontSize: 14,
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#248f8d')}
                          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Company / Developer Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Developments"
                          value={demoForm.companyName}
                          onChange={(e) => setDemoForm({ ...demoForm, companyName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: 8,
                            border: '1.5px solid #cbd5e1',
                            fontSize: 14,
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#248f8d')}
                          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Active Project Scale
                        </label>
                        <select
                          value={demoForm.scale}
                          onChange={(e) => setDemoForm({ ...demoForm, scale: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: 8,
                            border: '1.5px solid #cbd5e1',
                            fontSize: 14,
                            color: '#0f172a',
                            backgroundColor: '#ffffff',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#248f8d')}
                          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                        >
                          <option value="Planning & BoQ Stage">Planning &amp; BoQ Stage</option>
                          <option value="1-3 Sites (Residential/Commercial)">1–3 Sites</option>
                          <option value="4-10 Sites (Multi-Project)">4–10 Sites</option>
                          <option value="10+ Sites (Enterprise Developer)">10+ Sites (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        What would you like to explore? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your upcoming build or current pain points with spreadsheets/coordination..."
                        value={demoForm.notes}
                        onChange={(e) => setDemoForm({ ...demoForm, notes: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: 8,
                          border: '1.5px solid #cbd5e1',
                          fontSize: 13.5,
                          color: '#0f172a',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#248f8d')}
                        onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={demoLoading}
                      className="interactive-btn-solid"
                      style={{
                        ...styles.btnSolid,
                        width: '100%',
                        justifyContent: 'center',
                        marginTop: 6,
                        opacity: demoLoading ? 0.7 : 1,
                      }}
                    >
                      {demoLoading ? 'Scheduling...' : 'Schedule My Demo'} <ArrowRight size={18} className="cta-arrow-icon" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FINAL CTA ============================== */}
      <section className="reveal-on-scroll" style={styles.ctaBand}>
        <h2 style={{ ...styles.h2Dark, textAlign: 'center', margin: '0 auto 16px' }}>Put your next project on one platform.</h2>
        <p style={{ ...styles.ledeDark, textAlign: 'center', margin: '0 auto 28px' }}>
          Set up your organization, invite your team, and start planning your first milestone today.
        </p>
        <div style={{ ...styles.btnRow, justifyContent: 'center' }}>
          <button className="interactive-btn-solid" style={styles.btnSolid} onClick={goToSignUp}>
            Start a project <ArrowRight size={18} className="cta-arrow-icon" />
          </button>
          <button className="interactive-btn-glass" style={{ ...styles.btnOutline, ...styles.btnOutlineDark }} onClick={goToSignIn}>Talk to us</button>
        </div>
      </section>

      {/* ============================== FOOTER ============================== */}
      <footer style={styles.footer}>
        <div style={styles.footGrid}>
          <div>
            <div style={styles.brand}>
              <img src="/lodgely-developer-logo.png" alt="Lodgely Developer" style={styles.brandLogo} />
              <span style={{ ...styles.brandName, color: '#fff' }}>{APP_NAME}</span>
            </div>
            <p style={styles.footNote}>The platform for running a construction project — milestones, requisitions, procurement, inventory and finance, on one record.</p>
          </div>
          <div>
            <h5 style={styles.footH5}>Product</h5>
            <ul style={styles.footList}>
              <li><a href="#workflow">Milestones</a></li>
              <li><a href="#workflow">Requisitions</a></li>
              <li><a href="#workflow">Procurement</a></li>
              <li><a href="#platform">Finance</a></li>
            </ul>
          </div>
          <div>
            <h5 style={styles.footH5}>Company</h5>
            <ul style={styles.footList}>
              <li><a href="#who">Who it's for</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 style={styles.footH5}>Resources</h5>
            <ul style={styles.footList}>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#roles">Roles &amp; Permissions</a></li>
            </ul>
          </div>
        </div>
        <div style={styles.footBottom}>
          <span>© 2026 Lodgely Technologies. All rights reserved.</span>
          <span>Role-based access control · A full audit trail on every transaction</span>
        </div>
      </footer>
    </div>
  );
}

function getResponsiveStyles(isMobile: boolean): Record<string, CSSProperties> {
  const scaled = isMobile ? scaleFontsForMobile(baseStyles) : baseStyles;
  if (!isMobile) return scaled;

  return {
    ...scaled,
    headerInner: { ...scaled.headerInner, padding: '14px 20px' },
    heroWrapper: { ...scaled.heroWrapper, padding: '72px 18px 56px', minHeight: 'auto' },
    h1: { ...scaled.h1, fontSize: 36, lineHeight: 1.15, marginBottom: 18 },
    heroSub: { ...scaled.heroSub, fontSize: 15.5, lineHeight: 1.55, marginBottom: 28 },
    btnRow: { ...scaled.btnRow, flexDirection: 'column', width: '100%', gap: 12, marginBottom: 32 },
    btnSolid: { ...scaled.btnSolid, width: '100%', justifyContent: 'center', padding: '13px 22px', fontSize: 15, borderRadius: 6 },
    btnGlass: { ...scaled.btnGlass, width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 15, borderRadius: 6 },
    chipRow: { ...scaled.chipRow, gap: 8, padding: '0 4px', justifyContent: 'center' },
    chip: { ...scaled.chip, fontSize: 12, padding: '7px 14px' },
    darkBand: { ...scaled.darkBand, padding: '56px 20px' },
    bandLight: { ...scaled.bandLight, padding: '56px 20px' },
    bandCard: { ...scaled.bandCard, padding: '56px 20px' },
    ctaBand: { ...scaled.ctaBand, padding: '56px 20px' },
    footer: { ...scaled.footer, padding: '48px 20px 24px' },
    footGrid: { ...scaled.footGrid, gridTemplateColumns: '1fr', gap: 32 },
    footBottom: { ...scaled.footBottom, flexDirection: 'column', gap: 12, margin: '32px auto 0' },
    h2: { ...scaled.h2, fontSize: 25, lineHeight: 1.2 },
    h2Dark: { ...scaled.h2Dark, fontSize: 25, lineHeight: 1.2 },
    lede: { ...scaled.lede, fontSize: 14.5, lineHeight: 1.6 },
    ledeDark: { ...scaled.ledeDark, fontSize: 14.5, lineHeight: 1.6 },
    notebookCanvasMint: { ...scaled.notebookCanvasMint, padding: '18px 12px' },
    notebookCanvasBlue: { ...scaled.notebookCanvasBlue, padding: '18px 12px' },
    notebookCanvasSand: { ...scaled.notebookCanvasSand, padding: '18px 12px' },
    notebookCanvasViolet: { ...scaled.notebookCanvasViolet, padding: '18px 12px' },
    mockTh: { ...scaled.mockTh, padding: '9px 12px', fontSize: 10 },
    mockTd: { ...scaled.mockTd, padding: '10px 12px', fontSize: 12 },
    ganttRow: { ...scaled.ganttRow, padding: '8px 12px', gap: 8 },
    ganttLabel: { ...scaled.ganttLabel, width: 68, fontSize: 11.5 },
    faqItem: { ...scaled.faqItem, padding: '2px 16px' },
    faqSummary: { ...scaled.faqSummary, fontSize: 14.5, padding: '14px 0' },
    faqBody: { ...scaled.faqBody, fontSize: 13.5, paddingBottom: 16 },
  };
}

// Inlined from developer-web's lib/mobileScale.ts (not ported to
// marketing-site-web as shared infra) — shrinks every explicit numeric
// `fontSize` in a styles object by a fixed factor for mobile, preserving
// whatever visual hierarchy the desktop styles already establish.
function scaleFontsForMobile<T extends Record<string, CSSProperties>>(
  styles: T,
  factor = 0.85,
  minSize = 9,
): T {
  const scaled = {} as T;
  for (const key in styles) {
    const style = styles[key];
    scaled[key] =
      typeof style?.fontSize === 'number'
        ? { ...style, fontSize: Math.max(minSize, Math.round(style.fontSize * factor)) }
        : style;
  }
  return scaled;
}

const baseStyles: Record<string, CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--bg)' },

  header: {
    position: 'relative',
    zIndex: 10,
    background: 'rgba(247, 249, 251, 0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid #e2e8f0',
  },
  headerInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', gap: 24, maxWidth: 1280, margin: '0 auto' },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandLogo: { width: 34, height: 34, borderRadius: 9, objectFit: 'contain' },
  brandName: { fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: 'var(--navy)' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 14 },
  signInLink: { background: 'none', border: 'none', fontWeight: 600, fontSize: 14.5, color: 'var(--navy)' },
  navCta: {
    background: '#248f8d',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    padding: '9px 18px',
    fontWeight: 700,
    fontSize: 13.5,
    boxShadow: '0 4px 14px -3px rgba(43, 163, 161, 0.4)',
    cursor: 'pointer',
  },
  navToggle: { background: 'none', border: 'none', color: 'var(--navy)', display: 'flex', padding: 4 },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 24px 24px',
    fontSize: 14.5,
    fontWeight: 600,
    color: 'var(--navy)',
    background: 'rgba(255, 255, 255, 0.98)',
    borderBottom: '1px solid #e2e8f0',
  },
  profileMenu: {
    position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: 320, background: 'var(--card)',
    borderRadius: 12, boxShadow: '0 8px 30px rgba(27,33,56,0.16)', border: '1px solid var(--border)', zIndex: 100, textAlign: 'left',
  },

  /* Architectural Hero Styles (Light Theme) */
  heroWrapper: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    padding: '140px 32px 110px',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/hero-architecture.jpg)',
    backgroundPosition: 'center 40%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: 0.52,
    transform: 'scale(1.02)',
    filter: 'saturate(1.05) contrast(1.02)',
    pointerEvents: 'none',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.65) 0%, rgba(248, 250, 252, 0.88) 55%, rgba(248, 250, 252, 0.98) 100%)',
    pointerEvents: 'none',
  },
  heroGlow: {
    position: 'absolute',
    top: '-10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '1100px',
    height: '600px',
    background: 'radial-gradient(ellipse at center, rgba(43, 163, 161, 0.18) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1040,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 16px',
    borderRadius: 999,
    background: '#ffffff',
    border: '1px solid #ccfbf1',
    backdropFilter: 'blur(10px)',
    color: '#0f766e',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.02em',
    marginBottom: 26,
    boxShadow: '0 2px 10px rgba(43, 163, 161, 0.12)',
  },
  heroBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 8px #10b981',
  },
  h1: {
    fontSize: 66,
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: '-0.035em',
    color: '#0f172a',
    marginBottom: 26,
  },
  h1Highlight: {
    background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  },
  heroSub: {
    fontSize: 20,
    color: '#475569',
    lineHeight: 1.65,
    maxWidth: 760,
    margin: '0 auto 42px',
    fontWeight: 400,
  },
  btnRow: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 48,
  },
  btnSolid: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: '#248f8d',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    padding: '14px 28px',
    fontWeight: 700,
    fontSize: 15.5,
    boxShadow: '0 8px 24px -4px rgba(43, 163, 161, 0.45)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  btnGlass: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: '#ffffff',
    border: '1.5px solid #94a3b8',
    color: '#0f172a',
    borderRadius: 6,
    padding: '13px 26px',
    fontWeight: 700,
    fontSize: 15.5,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
    transition: 'all 0.2s ease',
  },
  btnOutline: { display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px solid #94a3b8', color: '#0f172a', borderRadius: 6, padding: '12px 24px', fontWeight: 700, fontSize: 14.5, background: '#ffffff' },
  btnOutlineDark: { borderColor: 'rgba(255,255,255,0.3)', color: '#fff', background: 'transparent' },

  heroStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    width: '100%',
    maxWidth: 900,
    marginBottom: 36,
  },
  heroStatsGridMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    width: '100%',
    marginBottom: 28,
  },
  heroStatCard: {
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(226, 232, 240, 0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: 14,
    padding: '16px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)',
  },
  heroStatValue: {
    fontSize: 15.5,
    fontWeight: 800,
    color: '#0f766e',
    marginBottom: 4,
    letterSpacing: '-0.01em',
  },
  heroStatLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: '#64748b',
  },

  chipRow: { display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  chip: {
    fontSize: 13,
    fontWeight: 600,
    color: '#475569',
    background: 'rgba(255, 255, 255, 0.92)',
    border: '1px solid #e2e8f0',
    backdropFilter: 'blur(8px)',
    padding: '9px 18px',
    borderRadius: 999,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },

  darkBand: { background: 'var(--navy-deep)', color: '#fff', padding: '80px 48px' },
  darkGrid: { display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 56, alignItems: 'center', maxWidth: 1180, margin: '0 auto' },
  eyebrowDark: { display: 'inline-block', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 16 },
  h2Dark: { fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.15, color: '#fff', marginBottom: 18, maxWidth: '18ch' },
  ledeDark: { fontSize: 15.5, color: '#b9c0d6', lineHeight: 1.7, maxWidth: '52ch' },

  bandLight: { padding: '84px 48px', maxWidth: 1180, margin: '0 auto' },
  bandCard: { padding: '84px 48px', maxWidth: 1180, margin: '0 auto' },
  eyebrow: { display: 'inline-block', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mint-deep)', marginBottom: 16 },
  h2: { fontSize: 30, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.18, color: 'var(--navy)', marginBottom: 18, maxWidth: '20ch' },
  lede: { fontSize: 15.5, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '54ch' },
  featureList: { listStyle: 'none', margin: '24px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 },

  featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' },
  featureGridRev: { direction: 'ltr' },

  /* Notebook Paper Canvas Containers */
  notebookCanvasBlue: {
    background: '#edf3f8',
    backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 27px, #d7e4ef 27px, #d7e4ef 28px)',
    border: '1px solid #cfe0ed',
    borderRadius: 16,
    padding: '36px 28px',
    boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.06)',
  },
  notebookCanvasSand: {
    background: '#f3ede4',
    backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 27px, #e4dacb 27px, #e4dacb 28px)',
    border: '1px solid #ded3c1',
    borderRadius: 16,
    padding: '36px 28px',
    boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.06)',
  },
  notebookCanvasMint: {
    background: '#eaf4f0',
    backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 27px, #d0e7df 27px, #d0e7df 28px)',
    border: '1px solid #c2e0d5',
    borderRadius: 16,
    padding: '36px 28px',
    boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.06)',
  },
  notebookCanvasViolet: {
    background: '#f2eef8',
    backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 27px, #e1d9ee 27px, #e1d9ee 28px)',
    border: '1px solid #dcd1eb',
    borderRadius: 16,
    padding: '36px 28px',
    boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.06)',
  },

  /* Floating Table Cards */
  floatingTableCard: {
    background: '#ffffff',
    borderRadius: 10,
    border: '1px solid #e2e8f0',
    boxShadow: '0 12px 28px -6px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden',
  },

  /* How It Works (Connected 5-Col Step Grid) */
  stepsGridConnected: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    marginTop: 44,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
  },
  stepsGridConnectedMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    marginTop: 32,
    overflow: 'hidden',
  },
  stepConnectedCol: {
    padding: '36px 24px 40px',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
  },
  stepConnectedNum: {
    fontSize: 12.5,
    fontWeight: 700,
    color: '#363739ff',
    letterSpacing: '0.04em',
    marginBottom: 20,
  },
  stepConnectedTitle: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: '"Outfit", "Cabinet Grotesk", "Inter", -apple-system, sans-serif',
    color: '#0f172a',
    letterSpacing: '-0.02em',
    margin: '0 0 14px',
  },
  stepConnectedBody: {
    fontSize: 13.5,
    color: '#64748b',
    lineHeight: 1.55,
    margin: 0,
  },

  mockCard: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 60px -32px rgba(27,33,56,0.2)' },
  mockHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', fontSize: 12, fontWeight: 700, color: 'var(--navy)' },
  mockTable: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  mockTh: { textAlign: 'left', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 700, padding: '10px 18px', borderBottom: '1px solid var(--border)' },
  mockTd: { padding: '12px 18px', borderBottom: '1px solid var(--border)', color: 'var(--text)' },
  pill: { display: 'inline-block', padding: '3px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700 },

  ganttRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px' },
  ganttLabel: { width: 84, fontSize: 12.5, color: 'var(--navy)', fontWeight: 600, flexShrink: 0 },
  ganttTrack: { flex: 1, height: 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' },
  ganttFill: { height: '100%', background: 'var(--mint-deep)', borderRadius: 4 },
  ganttPct: { fontSize: 12, color: 'var(--text-muted)', width: 32, textAlign: 'right', flexShrink: 0 },

  ovGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' },
  ovStat: { background: 'var(--card)', padding: '18px 18px' },
  ovNum: { fontSize: 24, fontWeight: 800, color: 'var(--mint-deep)' },
  ovLabel: { fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 },
  ovRecent: { padding: '6px 18px 14px', borderTop: '1px solid var(--border)' },
  ovRecentRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text)', padding: '9px 0', borderBottom: '1px solid var(--border)' },

  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginTop: 44 },
  stepCard: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 18px' },
  stepNum: { fontSize: 11.5, fontWeight: 700, color: 'var(--mint-deep)' },
  stepTitle: { fontSize: 17, fontWeight: 800, color: 'var(--navy)', margin: '10px 0 8px' },
  stepBody: { fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 },

  roleChipRow: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 30 },
  roleChip: { fontSize: 12.5, fontWeight: 600, color: '#dbe1ee', border: '1px solid rgba(255,255,255,0.2)', padding: '9px 16px', borderRadius: 999 },
  roleChipHi: { borderColor: 'var(--mint)', color: 'var(--mint)', background: 'rgba(131,232,202,0.1)' },

  whoGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginTop: 40 },
  whoCard: { background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 18px' },
  whoIconWrap: { width: 36, height: 36, borderRadius: 10, background: 'rgba(43,163,161,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  whoTitle: { fontSize: 16, fontWeight: 800, color: 'var(--navy)', marginBottom: 6 },
  whoBody: { fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 },

  faqList: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 36, maxWidth: 760 },
  faqItem: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '4px 22px' },
  faqSummary: { width: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 0', fontSize: 15.5, fontWeight: 700, color: 'var(--navy)', textAlign: 'left', cursor: 'pointer' },
  faqBody: { fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: 20, maxWidth: '68ch' },

  ctaBand: { background: 'var(--navy-deep)', padding: '80px 48px', textAlign: 'center' },

  footer: { background: '#161b2e', color: '#8b96b3', padding: '64px 48px 30px' },
  footGrid: { display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 40, maxWidth: 1180, margin: '0 auto' },
  footNote: { fontSize: 13, lineHeight: 1.6, marginTop: 14, maxWidth: '32ch', color: '#6d7794' },
  footH5: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6684', marginBottom: 14, fontWeight: 700 },
  footList: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 },
  footBottom: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, maxWidth: 1180, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 12.5, color: '#5c6684' },
};

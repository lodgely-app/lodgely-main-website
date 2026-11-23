'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarRange,
  ShoppingCart,
  Boxes,
  Receipt,
  ListOrdered,
  type LucideIcon,
} from 'lucide-react';

// Each app's landing page gets its own navbar links (like Atlassian's
// product sites); the main site keeps the shared Products / Services /
// Privacy / Terms links in Navbar.tsx. Hash links point at section ids on
// that app's page and work from any of its sub-pages (e.g. /developer/pricing).

export interface AppNavMenuItem {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}

export type AppNavLink =
  | { label: string; href: string }
  | { label: string; items: AppNavMenuItem[] };

export const APP_NAV: Record<string, AppNavLink[]> = {
  developer: [
    {
      label: 'Features',
      items: [
        { title: 'Project overview', description: 'Milestones, budget and progress in one view.', href: '/developer#platform', Icon: LayoutDashboard },
        { title: 'Milestones and tasks', description: 'Roadmaps, task boards and Gantt timelines.', href: '/developer#workflow', Icon: CalendarRange },
        { title: 'Procurement', description: 'Requisitions priced, fulfilled and ordered.', href: '/developer#procurement', Icon: ShoppingCart },
        { title: 'Inventory', description: 'Site stock, deliveries and transfers.', href: '/developer#inventory', Icon: Boxes },
        { title: 'Finance', description: 'Invoices, payments and credit notes.', href: '/developer#finance', Icon: Receipt },
        { title: 'How it works', description: 'Five steps from BoQ to handover.', href: '/developer#how-it-works', Icon: ListOrdered },
      ],
    },
    { label: 'Roles', href: '/developer#roles' },
    { label: 'Who it’s for', href: '/developer#who' },
    { label: 'Pricing', href: '/developer/pricing' },
    { label: 'FAQ', href: '/developer#faq' },
  ],
  facility: [
    { label: 'For managers', href: '/facility#managers' },
    { label: 'Resident app', href: '/facility#tenants' },
    { label: 'Testimonials', href: '/facility#testimonials' },
    { label: 'Pricing', href: '/facility/pricing' },
    { label: 'Training', href: '/services/facility-management-training' },
  ],
  resident: [
    { label: 'Features', href: '/resident#features' },
    { label: 'How it works', href: '/resident#how-it-works' },
    { label: 'FAQ', href: '/resident#faq' },
    { label: 'For building managers', href: '/facility' },
  ],
  owner: [
    { label: 'Features', href: '/owner#features' },
    { label: 'Get the app', href: '/owner#download' },
    { label: 'For building managers', href: '/facility' },
  ],
  realtor: [
    { label: 'Features', href: '/realtor#features' },
    { label: 'Book a demo', href: '/schedule-demo?topic=realtor' },
  ],
  investment: [
    { label: 'Features', href: '/investment#features' },
    { label: 'Book a demo', href: '/schedule-demo?topic=investment' },
  ],
};

const Chevron = ({ open }: { open: boolean }) => (
  <motion.svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ marginTop: 1 }}
  >
    <polyline points="6 9 12 15 18 9" />
  </motion.svg>
);

function NavMenu({ link, color }: { link: Extract<AppNavLink, { items: AppNavMenuItem[] }>; color: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <button
        type="button"
        className="nav-item-btn"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <span>{link.label}</span>
        <Chevron open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="nav-dropdown-menu"
            onClick={(e) => e.stopPropagation()}
          >
            {link.items.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="nav-dropdown-item">
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `${color}1A`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={18} color={color} />
                </div>
                <div>
                  <div className="nav-dropdown-title">{item.title}</div>
                  <div className="nav-dropdown-desc">{item.description}</div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Desktop links for an app page. */
export function AppNavLinks({ links, color, pathname }: { links: AppNavLink[]; color: string; pathname: string | null }) {
  return (
    <>
      {links.map((l) =>
        'items' in l ? (
          <NavMenu key={l.label} link={l} color={color} />
        ) : (
          <Link
            key={l.label}
            href={l.href}
            className="nav-item-btn"
            style={pathname === l.href ? { color } : undefined}
            aria-current={pathname === l.href ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ),
      )}
    </>
  );
}

/** Flat list for the mobile drawer (menu items become their own links). */
export function flattenAppNav(links: AppNavLink[]): { label: string; href: string }[] {
  return links.flatMap((l) => ('items' in l ? l.items.map((i) => ({ label: i.title, href: i.href })) : [l]));
}

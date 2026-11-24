'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { getLeadTopic, type LeadTopic } from '../../lib/leadTopics';

// Slide-in contact panel. Every link to /schedule-demo?topic=<key> anywhere
// on the site opens this panel (customised for that topic) instead of
// navigating; the /schedule-demo page stays as the direct-link / no-JS
// fallback. Code can also open it with useLeadDrawer().open('facility').

interface LeadDrawerApi {
  open: (topicKey?: string) => void;
}

const Ctx = createContext<LeadDrawerApi>({ open: () => {} });
export const useLeadDrawer = () => useContext(Ctx);

export function LeadDrawerProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [topic, setTopic] = useState<LeadTopic | null>(null);
  // Bumped on each open so the form (and its reCAPTCHA) starts fresh.
  const [openCount, setOpenCount] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((key?: string) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setTopic(getLeadTopic(key));
    setOpenCount((n) => n + 1);
  }, []);

  const close = useCallback(() => {
    setTopic(null);
    lastFocus.current?.focus?.();
  }, []);

  // Catch clicks on any /schedule-demo link (capture phase, before Next's
  // <Link> navigates). Modifier/middle clicks still open the page normally.
  useEffect(() => {
    if (pathname === '/schedule-demo') return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== '/schedule-demo') return;
      e.preventDefault();
      open(url.searchParams.get('topic') || undefined);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [open, pathname]);

  // Escape closes; lock page scroll while open.
  useEffect(() => {
    if (!topic) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [topic, close]);

  // Close when the route changes (e.g. a link inside the panel).
  useEffect(() => {
    setTopic(null);
  }, [pathname]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {topic && (
          <div className="fixed inset-0 z-[1000]">
            <motion.div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-drawer-title"
              className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.38 }}
            >
              <div className="h-1.5 w-full flex-shrink-0" style={{ background: topic.color }} />
              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-6 sm:px-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${topic.color}1A` }}
                  >
                    <topic.Icon className="h-6 w-6" style={{ color: topic.color }} />
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: topic.color }}>
                  {topic.eyebrow}
                </p>
                <h2 id="lead-drawer-title" className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-[28px]">
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{topic.subtitle}</p>

                <ul className="mb-7 mt-5 space-y-2 rounded-xl bg-slate-50 p-4">
                  {topic.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: topic.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <LeadForm key={openCount} topic={topic} onDone={close} autoFocus />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

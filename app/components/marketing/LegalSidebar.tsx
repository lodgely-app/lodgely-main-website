'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface LegalSidebarSection {
  id: string;
  title: string;
}

// Left-rail "On this page" nav for /privacy and /terms, matching the
// reference layout: a sticky sidebar whose active item tracks whichever
// section is currently in view, rather than a static list.
export function LegalSidebar({ sections }: { sections: LegalSidebarSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  // Set directly by a click so the highlight jumps immediately, instead of
  // waiting on the scroll-driven IntersectionObserver to catch up with the
  // smooth-scroll animation still in flight.
  const pendingClickId = useRef<string | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (pendingClickId.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Of everything currently on screen, the one closest to the top of
        // the viewport is the section a reader would call "current".
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topMost.target.id);
      },
      // Counts a section as "current" once it's crossed just below the
      // sticky header, and before it's scrolled more than halfway up.
      { rootMargin: '-140px 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    setActiveId(id);
    pendingClickId.current = id;
    window.setTimeout(() => {
      if (pendingClickId.current === id) pendingClickId.current = null;
    }, 700);
  };

  return (
    <nav className="legal-sidebar" aria-label="On this page">
      <div className="legal-sidebar-inner">
        <span className="legal-sidebar-label">On this page</span>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={activeId === s.id ? 'is-active' : ''}
                onClick={() => handleClick(s.id)}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default LegalSidebar;

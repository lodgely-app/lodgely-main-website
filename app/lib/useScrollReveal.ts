'use client';

import { useEffect } from 'react';

// Ports the IntersectionObserver reveal pattern used by developer-web/
// facility-web's Landing.tsx: any element with className "reveal-on-scroll"
// gets "is-visible" added once it scrolls into view. Call once per page.
export function useScrollReveal(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      },
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

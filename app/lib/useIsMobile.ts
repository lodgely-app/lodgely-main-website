'use client';

import { useEffect, useState } from 'react';

// Mirrors developer-web's src/lib/useIsMobile.ts — kept in sync by hand since
// no shared package exists between frontends (see lodgely-V2 conventions).
export const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const query = `(max-width: ${MOBILE_BREAKPOINT}px)`;
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return isMobile;
}

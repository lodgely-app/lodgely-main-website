'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

// Google reCAPTCHA v2 ("I'm not a robot" checkbox). The site key is public
// and read from NEXT_PUBLIC_RECAPTCHA_SITE_KEY; when it is empty the widget
// renders nothing (local dev), and notification-service skips the check if
// its RECAPTCHA_SECRET_KEY is empty too.

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

interface GreCaptcha {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  reset: (id?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: GreCaptcha;
    __lodgelyRecaptchaLoaded?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha?.render) return resolve();
    window.__lodgelyRecaptchaLoaded = () => resolve();
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?onload=__lodgelyRecaptchaLoaded&render=explicit';
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error('reCAPTCHA failed to load'));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export interface RecaptchaHandle {
  reset: () => void;
}

interface Props {
  /** Called with the token when ticked, and with null when it expires or is reset. */
  onChange: (token: string | null) => void;
  style?: React.CSSProperties;
}

export const Recaptcha = forwardRef<RecaptchaHandle, Props>(function Recaptcha({ onChange, style }, ref) {
  const el = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current(null);
    },
  }));

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        window.grecaptcha?.ready(() => {
          if (cancelled || !el.current || widgetId.current !== null) return;
          widgetId.current = window.grecaptcha!.render(el.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            callback: (token: string) => onChangeRef.current(token),
            'expired-callback': () => onChangeRef.current(null),
            'error-callback': () => onChangeRef.current(null),
          });
        });
      })
      .catch(() => onChangeRef.current(null));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!RECAPTCHA_SITE_KEY) return null;
  return <div ref={el} style={{ minHeight: 78, ...style }} />;
});

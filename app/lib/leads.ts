import type React from 'react';

// Sends a website lead (demo / consultation / contact form) to
// notification-service, which checks reCAPTCHA and posts it to Slack.

export type LeadKind = 'demo' | 'consultation' | 'contact';

export interface LeadInput {
  kind: LeadKind;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  size?: string;
  interest?: string;
  message?: string;
  recaptchaToken?: string;
  /** Honeypot field value — must stay empty for real people. */
  website?: string;
}

export async function submitLead(input: LeadInput): Promise<void> {
  const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';
  let res: Response;
  try {
    res = await fetch(`${gatewayUrl}/notification/website/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, page: typeof window !== 'undefined' ? window.location.pathname : undefined }),
    });
  } catch {
    throw new Error('We couldn’t reach our servers. Check your connection and try again.');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || 'Something went wrong. Please try again or email support@lodgely.ng.');
  }
}

/** Off-screen honeypot input. People never see or fill it; bots usually do. */
export const HONEYPOT_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: '-10000px',
  width: 1,
  height: 1,
  overflow: 'hidden',
};

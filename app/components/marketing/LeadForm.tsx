'use client';

import React, { useRef, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Recaptcha, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from './Recaptcha';
import { submitLead, HONEYPOT_STYLE } from '../../lib/leads';
import type { LeadTopic } from '../../lib/leadTopics';

// The contact / demo / consultation form, shaped by a LeadTopic. Used by the
// slide-in LeadDrawer and by the /schedule-demo page.

const inputCls =
  'block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2';

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-400">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

export function LeadForm({
  topic,
  onDone,
  autoFocus,
}: {
  topic: LeadTopic;
  /** Shown as a "Close" button on the success screen when given. */
  onDone?: () => void;
  autoFocus?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const ring = { '--tw-ring-color': `${topic.color}66` } as React.CSSProperties;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (RECAPTCHA_SITE_KEY && !token) {
      setError('Please tick “I’m not a robot” before sending.');
      return;
    }
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setLoading(true);
    try {
      await submitLead({
        kind: topic.kind,
        interest: topic.interest,
        name: f.name,
        email: f.email,
        phone: f.phone,
        company: f.company,
        size: f.size ? `${topic.sizeLabel}: ${f.size}` : undefined,
        message: f.message,
        recaptchaToken: token || undefined,
        website: f.website,
      });
      setSentTo(f.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      recaptchaRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  if (sentTo) {
    return (
      <div className="py-10 text-center">
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: `${topic.color}1A` }}
        >
          <CheckCircle2 className="h-8 w-8" style={{ color: topic.color }} />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-slate-900">{topic.successTitle}</h3>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-600">{topic.successText}</p>
        <p className="mt-3 text-sm text-slate-500">
          We’ll reply to <strong className="text-slate-800">{sentTo}</strong>.
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-7 rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Full name">
        <input name="name" required maxLength={120} autoFocus={autoFocus} autoComplete="name" className={inputCls} style={ring} placeholder="Ada Obi" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Work email">
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputCls} style={ring} placeholder="ada@company.com" />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" required maxLength={40} autoComplete="tel" className={inputCls} style={ring} placeholder="+234 800 000 0000" />
        </Field>
      </div>
      <Field label={topic.companyLabel} optional={topic.companyOptional}>
        <input
          name="company"
          required={!topic.companyOptional}
          maxLength={160}
          autoComplete="organization"
          className={inputCls}
          style={ring}
          placeholder={topic.companyPlaceholder}
        />
      </Field>
      <Field label={topic.sizeLabel}>
        <select name="size" required defaultValue="" className={`${inputCls} text-slate-700`} style={ring}>
          <option value="" disabled>
            Select…
          </option>
          {topic.sizeOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>
      <Field label={topic.messageLabel} optional={!topic.messageRequired}>
        <textarea
          name="message"
          rows={3}
          maxLength={3000}
          required={topic.messageRequired}
          className={`${inputCls} resize-y`}
          style={ring}
          placeholder={topic.messagePlaceholder}
        />
      </Field>

      {/* Honeypot — hidden from people, bots fill it in */}
      <div aria-hidden="true" style={HONEYPOT_STYLE}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Recaptcha ref={recaptchaRef} onChange={setToken} />

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 disabled:opacity-70"
        style={{ background: topic.color }}
      >
        <Send className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
        {loading ? 'Sending…' : topic.submitLabel}
      </button>
      <p className="text-center text-xs text-slate-400">
        By sending this you agree to our{' '}
        <a href="/terms" className="underline hover:text-slate-600">Terms</a> and{' '}
        <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>.
      </p>
    </form>
  );
}

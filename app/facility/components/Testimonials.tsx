'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    quote:
      'Lodgely reduced our manual billing work by 80%. We went from spending two full days on invoicing to having it happen automatically. Our tenants love the transparency.',
    name: 'Adebayo Ogunyemi',
    role: 'Operations Director, Vintage Villa',
    initials: 'AO',
    color: 'bg-blue-500',
    rating: 5,
  },
  {
    quote:
      'The ticketing system changed everything. Tenants upvote critical issues, so we always know what to fix first. Response times dropped from 48 hours to under 4.',
    name: 'Osita Kingsley',
    role: 'Property Manager, Equinox Villa',
    initials: 'OK',
    color: 'bg-emerald-500',
    rating: 5,
  },
  {
    quote:
      "As a tenant, I finally feel heard. I can pay my bills in seconds, track my maintenance requests, and actually see when things are getting resolved. It's brilliant.",
    name: 'Emeka Nwosu',
    role: 'Resident, Haven Villa',
    initials: 'EN',
    color: 'bg-violet-500',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-3">
              Social Proof
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
              Loved by managers{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
                and residents
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Hear from property professionals and residents who transformed their operations with Lodgely.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <div className="group relative h-full p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 shadow-lg shadow-slate-900/[0.03] hover:shadow-xl transition-all duration-500">
                <Quote className="w-8 h-8 text-teal-600/20 mb-5" />

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-base text-slate-600 leading-relaxed mb-8">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from '../components/landingPage/Navbar';
import FooterCmp from '../components/landingPage/FooterCmp';
import { Card } from '../facility/components/ui';
import { LeadForm } from '../components/marketing/LeadForm';
import { getLeadTopic, type LeadTopic } from '../lib/leadTopics';

// Full-page version of the contact panel, for direct links and shared URLs
// (/schedule-demo?topic=<key>). Everywhere else on the site the same links
// open the slide-in LeadDrawer instead.
export default function ScheduleDemoPage() {
  const [topic, setTopic] = useState<LeadTopic>(getLeadTopic(null));
  useEffect(() => {
    setTopic(getLeadTopic(new URLSearchParams(window.location.search).get('topic')));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-36 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${topic.color}1A` }}
            >
              <topic.Icon className="h-7 w-7" style={{ color: topic.color }} />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: topic.color }}>
                {topic.eyebrow}
              </p>
              <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                {topic.title}
              </h1>
              <p className="text-lg font-light leading-relaxed text-slate-600">{topic.subtitle}</p>
            </div>
            <ul className="space-y-3">
              {topic.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-slate-700">
                  <span
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${topic.color}1A` }}
                  >
                    <Check className="h-3.5 w-3.5" style={{ color: topic.color }} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Card className="rounded-3xl border-0 bg-white p-8 shadow-xl ring-1 ring-slate-100 sm:p-10">
              <LeadForm key={topic.interest} topic={topic} />
            </Card>
          </div>
        </div>
      </div>

      <FooterCmp />
    </div>
  );
}

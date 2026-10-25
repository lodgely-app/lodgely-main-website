'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Wrench,
  Bell,
  Users,
  BarChart3,
  Send,
  Shield,
  ChevronRight,
  Wallet,
  FileText,
  ScanLine,
  ArrowRight,
  User,
} from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Navbar from '../components/landingPage/Navbar';
import FooterCmp from '../components/landingPage/FooterCmp';
import { Button, Badge } from './components/ui';
import ScrollReveal from './components/ScrollReveal';
import Testimonials from './components/Testimonials';

export default function FacilityLandingPage() {
  // Sticky Scroll states
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.5) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex flex-col">
      {/* Consistent Unified Navbar */}
      <Navbar activeAppId="facility" />

      {/* Split Hero Section */}
      <section id="features" className="grid lg:grid-cols-2 pt-24 lg:pt-26 border-b border-slate-200">
        {/* Left Column */}
        <div className="bg-transparent flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 lg:py-20 relative">
          <div className="max-w-xl">
            {/* <Badge className="mb-4 bg-teal-100 text-teal-700 border-teal-200 uppercase tracking-widest font-bold text-[10px] rounded-none px-3 py-1">
              Facility Management
            </Badge> */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 uppercase tracking-tight">
              ONE PLATFORM FOR <span className="text-teal-600">FACILITIES</span>, RESIDENTS & GROWTH.
            </h1>

            <p className="text-base text-slate-600 font-medium mb-8 leading-relaxed max-w-md">
              Lodgely helps modern facility managers automate billing, track requests, connect with residents, and scale without juggling different tools.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/schedule-demo">
                <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-5 text-[11px] font-bold uppercase tracking-widest rounded-none shadow-none active:scale-95 transition-all">
                  Schedule a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="#managers">
                <Button variant="outline" className="w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-700 px-6 py-5 text-[11px] font-bold uppercase tracking-widest rounded-none shadow-none active:scale-95 transition-all bg-transparent">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between items-end text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] border-t border-slate-200 pt-4">
              <div>
                <span className="block mb-1 text-slate-400">Target Sectors</span>
                <span className="text-slate-700">ESTATES / APARTMENTS / COMMERCIAL</span>
              </div>
              <div className="text-right">
                <span className="block mb-1 text-slate-400">Status</span>
                <span className="text-teal-600">ENTERPRISE READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Manager Dashboard Mockup) */}
        <div className="bg-transparent relative flex items-center justify-center p-8 lg:p-12 overflow-hidden">
          <div className="relative w-full max-w-2xl">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 blur-3xl rounded-full -z-10 opacity-70"></div>

            {/* Chat Interface Mockup */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative p-6 sm:p-8 flex-col gap-6 w-full hidden lg:flex"
            >
              {/* Manager Bubble */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="self-start max-w-[85%] sm:max-w-[75%]"
              >
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mb-1 border border-teal-200">
                    <span className="text-[10px] font-bold text-teal-700">MGR</span>
                  </div>
                  <div className="bg-slate-100 border border-slate-200 text-slate-700 p-4 rounded-2xl rounded-bl-sm shadow-sm text-sm leading-relaxed">
                    Hi Sarah, your maintenance request for the AC has been approved. Our technician will arrive at 2 PM today.
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 ml-11 font-medium tracking-wide uppercase">Manager • 10:42 AM</div>
              </motion.div>

              {/* Resident Bubble */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="self-end max-w-[85%] sm:max-w-[75%]"
              >
                <div className="flex items-end gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mb-1 border border-slate-700">
                    <span className="text-[10px] font-bold text-white">RES</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 rounded-2xl rounded-br-sm shadow-md shadow-teal-600/20 text-sm leading-relaxed">
                    Great, thanks! I've authorized their entry through the visitor access code: <strong>4X82Y9</strong>.
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 mr-11 text-right font-medium tracking-wide uppercase">Resident • 10:45 AM</div>
              </motion.div>

              {/* Manager Bubble 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 2.1, duration: 0.6 }}
                className="self-start max-w-[85%] sm:max-w-[75%]"
              >
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mb-1 border border-teal-200">
                    <span className="text-[10px] font-bold text-teal-700">MGR</span>
                  </div>
                  <div className="bg-slate-100 border border-slate-200 text-slate-700 p-4 rounded-2xl rounded-bl-sm shadow-sm text-sm leading-relaxed">
                    Received. Also, your monthly service charge invoice has been generated on your portal.
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 ml-11 font-medium tracking-wide uppercase">Manager • 10:46 AM</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Managers Section */}
      <section id="managers" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-3">
                For Managers
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Everything you need,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
                  nothing you don't
                </span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Purpose-built tools that work together to simplify property management from top to bottom.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Central Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
              {[
                { icon: FileText, title: 'Service Charge & Billing', desc: 'Generate customized service charge templates and automate billing across facilities.' },
                { icon: Wallet, title: 'Manager Wallets', desc: 'Dedicated wallet system for securely tracking deposits, payouts, and managing withdrawal requests.' },
                { icon: Send, title: 'Secure Onboarding', desc: 'Dispatch secure resident invitations and streamline the onboarding process with digital documentation.' },
                { icon: BarChart3, title: 'Financial Tracking', desc: 'Monitor real-time ledger data, payment cycles, and outstanding balances across all facilities.' },
                { icon: Wrench, title: 'Ticket Resolution', desc: 'Manage maintenance requests efficiently with priority tracking and assignment workflows.' },
                { icon: Users, title: 'Occupancy Management', desc: 'Track building unit occupancy, lease cycles, and resident information in one unified dashboard.' },
              ].map((feature, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start justify-between gap-8 md:flex-row"
                  >
                    {isLeft ? (
                      <>
                        <div className="relative w-14 h-14 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-transparent">
                          <div className="absolute -top-[10px] -left-[10px] text-black/20">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                          </div>
                          <feature.icon className="w-5 h-5 text-teal-800" strokeWidth={1.5} />
                        </div>
                        <div className="text-right flex-1 pt-1 hidden md:block">
                          <h3 className="font-medium text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-500 text-[15px] font-light leading-relaxed">{feature.desc}</p>
                        </div>
                        {/* Mobile View text (always left aligned on mobile) */}
                        <div className="text-left flex-1 pt-1 md:hidden">
                          <h3 className="font-medium text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-500 text-[15px] font-light leading-relaxed">{feature.desc}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-left flex-1 pt-1 hidden md:block">
                          <h3 className="font-medium text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-500 text-[15px] font-light leading-relaxed">{feature.desc}</p>
                        </div>
                        <div className="relative w-14 h-14 rounded-2xl border border-black/10 items-center justify-center flex-shrink-0 bg-transparent hidden md:flex">
                          <div className="absolute -top-[10px] -left-[10px] text-black/20">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                          </div>
                          <feature.icon className="w-5 h-5 text-teal-800" strokeWidth={1.5} />
                        </div>

                        {/* Mobile View (icon on left, text on right) */}
                        <div className="relative w-14 h-14 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-transparent md:hidden">
                          <div className="absolute -top-[10px] -left-[10px] text-black/20">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                          </div>
                          <feature.icon className="w-5 h-5 text-teal-800" strokeWidth={1.5} />
                        </div>
                        <div className="text-left flex-1 pt-1 md:hidden">
                          <h3 className="font-medium text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-500 text-[15px] font-light leading-relaxed">{feature.desc}</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tenant Mobile App Section (Sticky Scroll) */}
      <section id="tenants" ref={stickyContainerRef} className="relative h-[300vh] bg-white">
        <div className="sticky top-0 h-screen overflow-hidden flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-4 lg:py-0">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left side text items */}
            <div className="relative z-20">
              <Badge className="mb-2 lg:mb-4 bg-teal-100 text-teal-700 border-teal-200 uppercase tracking-widest font-bold text-[10px] rounded-none px-3 py-1">
                For Residents
              </Badge>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-slate-900 mb-4 lg:mb-6">
                Your Home, At Your Fingertips
              </h2>
              <p className="text-base md:text-xl text-slate-500 font-light mb-6 lg:mb-8 leading-relaxed hidden lg:block">
                A premium mobile experience designed for modern living. Everything you need to manage your residence in one beautiful app.
              </p>

              <div className="space-y-4 lg:space-y-6">
                {[
                  { icon: Wallet, bg: 'bg-teal-100', text: 'text-teal-600', title: 'Digital Wallets', desc: 'Manage funds, set up recurring rent payments, and track every transaction securely.' },
                  { icon: Wrench, bg: 'bg-rose-100', text: 'text-rose-600', title: 'Maintenance Requests', desc: 'Submit and track maintenance requests with photos, priority levels, and real-time status updates.' },
                  { icon: Bell, bg: 'bg-blue-100', text: 'text-blue-600', title: 'Stay Informed', desc: 'Receive building announcements, reminders, and important updates delivered directly to your device.' },
                  { icon: ScanLine, bg: 'bg-cyan-100', text: 'text-cyan-600', title: 'Visitor Access Passes', desc: 'Generate secure QR codes for your guests to streamline building entry.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`gap-4 transition-all duration-500 cursor-pointer ${
                      activeIndex === idx ? 'flex opacity-100 scale-100' : 'hidden lg:flex opacity-30 scale-95'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg ${activeIndex === idx ? item.bg : 'bg-slate-100'} flex items-center justify-center flex-shrink-0 transition-colors duration-500`}>
                      <item.icon className={`w-6 h-6 ${activeIndex === idx ? item.text : 'text-slate-400'} transition-colors duration-500`} />
                    </div>
                    <div>
                      <h3 className={`font-medium mb-1 transition-colors duration-500 ${activeIndex === idx ? 'text-slate-900' : 'text-slate-500'}`}>
                        {item.title}
                      </h3>
                      <p className="text-slate-500 font-light text-[15px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side dynamic phone mockups */}
            <div className="relative flex justify-center mt-2 lg:mt-0 scale-[0.80] lg:scale-100 origin-top lg:origin-center">
              <div className="relative z-10 w-full max-w-[320px] lg:max-w-sm mx-auto">
                <div className="bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[4px] border-slate-800">
                  <div className="bg-slate-50 rounded-[2.4rem] overflow-hidden aspect-[9/18] relative flex flex-col">
                    {/* App Header Mock */}
                    <div className="bg-white px-5 pt-10 pb-4 shadow-sm flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <div className="w-5 h-5 bg-teal-500 rounded-full"></div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Good Morning</div>
                          <div className="text-sm font-bold text-slate-900">John</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-slate-600" />
                      </div>
                    </div>

                    {/* Dynamic App Content */}
                    <div className="flex-1 relative overflow-hidden bg-slate-50">
                      <AnimatePresence mode="wait">
                        {activeIndex === 0 && (
                          <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-4 space-y-4"
                          >
                            {/* Balance Card */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 shadow-md">
                              <div className="mb-4">
                                <div className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1">
                                  Remaining Balance
                                </div>
                                <div className="text-[10px] text-white/50">Cycle • Jan 1 - Dec 31</div>
                              </div>
                              <div className="flex justify-between items-center mb-5">
                                <div className="text-3xl font-bold text-teal-400">₦1,245.00</div>
                                <div className="w-12 h-12 rounded-full border-4 border-teal-400/20 border-t-teal-400 flex items-center justify-center">
                                  <span className="text-teal-400 font-bold text-[10px]">75%</span>
                                </div>
                              </div>
                              <div className="flex items-center bg-white/5 rounded-xl p-3">
                                <div className="flex-1 text-center">
                                  <div className="text-[10px] text-white/70 mb-1 uppercase font-medium">Paid</div>
                                  <div className="text-sm font-bold text-teal-400">₦3,735.00</div>
                                </div>
                                <div className="w-px h-6 bg-white/10 mx-2"></div>
                                <div className="flex-1 text-center">
                                  <div className="text-[10px] text-white/70 mb-1 uppercase font-medium">Total Due</div>
                                  <div className="text-sm font-bold text-teal-400">₦4,980.00</div>
                                </div>
                              </div>
                            </div>
                            {/* Action Button */}
                            <div className="bg-teal-500 rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:bg-teal-600 transition-colors">
                              <CreditCard className="w-4 h-4 text-slate-900" />
                              <span className="text-slate-900 font-bold text-sm">Make a Payment</span>
                            </div>
                          </motion.div>
                        )}

                        {activeIndex === 1 && (
                          <motion.div
                            key="issues"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-4 space-y-4"
                          >
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Recent Requests
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                                  <Wrench className="w-5 h-5 text-orange-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-bold text-slate-900">HVAC Repair</div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">Oct 12, 2026</div>
                                </div>
                                <div className="px-2 py-1 bg-orange-100 text-orange-700 text-[9px] font-bold rounded uppercase tracking-wider">
                                  Pending
                                </div>
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                  <Wrench className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-bold text-slate-900">Leaking Faucet</div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">Sep 28, 2026</div>
                                </div>
                                <div className="px-2 py-1 bg-green-100 text-green-700 text-[9px] font-bold rounded uppercase tracking-wider">
                                  Resolved
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200">
                              <div className="text-white text-2xl font-light">+</div>
                            </div>
                          </motion.div>
                        )}

                        {activeIndex === 2 && (
                          <motion.div
                            key="announcements"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-4 space-y-4"
                          >
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Building Feed
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <div className="text-[10px] text-slate-500 font-medium">Important Update</div>
                              </div>
                              <div className="text-sm font-bold text-slate-900 mb-1">Water Supply Maintenance</div>
                              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                Please be informed that there will be a scheduled water supply interruption tomorrow from 10:00 AM to 2:00 PM.
                              </p>
                              <div className="text-[9px] text-slate-400">Management • 2h ago</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                <div className="text-[10px] text-slate-500 font-medium">Community</div>
                              </div>
                              <div className="text-sm font-bold text-slate-900 mb-1">Monthly Residents Meeting</div>
                              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                Join us for the monthly catch-up at the clubhouse this Friday at 6 PM.
                              </p>
                              <div className="text-[9px] text-slate-400">Management • 1d ago</div>
                            </div>
                          </motion.div>
                        )}

                        {activeIndex === 3 && (
                          <motion.div
                            key="access"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-4 flex flex-col items-center justify-center space-y-6"
                          >
                            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 w-full flex flex-col items-center">
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                                Guest Access Pin
                              </div>
                              <div className="text-3xl font-light tracking-[0.2em] text-slate-900 mb-2">
                                148-293
                              </div>
                              <div className="text-[10px] text-cyan-600 font-medium bg-cyan-50 px-3 py-1 rounded-full mb-6">
                                Valid for 24 hours
                              </div>
                              <div className="w-40 h-40 bg-slate-100 rounded-xl flex items-center justify-center p-4">
                                <div className="w-full h-full border-4 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                                  <ScanLine className="w-10 h-10 text-slate-300" />
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-cyan-500 rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm">
                              <Send className="w-4 h-4 text-white" />
                              <span className="text-white font-bold text-sm">Share Pass</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Facility Management?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Join forward-thinking facility managers who've replaced scattered tools with one premium platform.
          </p>
          <div className="flex justify-center">
            <Link href="/schedule-demo">
              <Button className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-5 text-xs font-bold uppercase tracking-widest rounded-none shadow-lg active:scale-95 transition-all">
                Schedule a Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Unified Lodgely Footer */}
      <FooterCmp />
    </div>
  );
}

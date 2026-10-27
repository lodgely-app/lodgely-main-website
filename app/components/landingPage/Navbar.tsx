'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  Building2,
  Home,
  TrendingUp,
  KeyRound,
  Landmark,
  LogOut,
  LayoutDashboard,
  User,
  Briefcase,
  ClipboardList,
  Workflow,
  GraduationCap,
} from 'lucide-react';
import { getSignInUrl, getAccountAppUrl } from '../../lib/auth';
import { isProductVisible } from '../../lib/productFlags';
import { withCsrfHeader } from '../../lib/csrf';

const ProductsList = [
  {
    id: 'developer',
    title: 'Developer',
    description: 'Plan projects, track inventory, manage pre-sale releases.',
    Icon: HardHat,
    link: '/developer',
    logo: '/logos/lodgely_developer.png',
    color: '#00BBA8',
  },
  {
    id: 'facility',
    title: 'Facility',
    description: 'Manage tenancies, maintenance, and building finances.',
    Icon: Building2,
    link: '/facility',
    logo: '/logos/lodgely_facility.png',
    color: '#0D9488',
  },
  {
    id: 'realtor',
    title: 'Realtor',
    description: 'Manage listings, leads, and close transactions.',
    Icon: Home,
    link: '/realtor',
    logo: '/logos/lodgely_realtor.png',
    color: '#D97706',
  },
  {
    id: 'investment',
    title: 'Investment',
    description: 'Track portfolio returns and evaluate new deals.',
    Icon: TrendingUp,
    link: '/investment',
    logo: '/logos/lodgely_invest.png',
    color: '#9333EA',
  },
  {
    id: 'resident',
    title: 'Resident',
    description: 'Pay rent, submit tickets, access your building.',
    Icon: KeyRound,
    link: '/resident',
    logo: '/logos/lodgely_resident.png',
    color: '#059669',
  },
  {
    id: 'owner',
    title: 'Owner',
    description: 'Track payouts and occupancy across your units.',
    Icon: Landmark,
    link: '/owner',
    logo: '/logos/lodgely_owner.png',
    color: '#2563EB',
  },
];

// Realtor/Investment/Owner are feature-flagged off while their apps aren't
// ready yet (see app/lib/productFlags.ts) — filtered here once so both the
// desktop dropdown and the mobile drawer below stay in sync automatically.
const VisibleProductsList = ProductsList.filter((p) => isProductVisible(p.id));

// Professional services Lodgely offers alongside the software — not
// products with their own login, so these don't go through productFlags.ts
// or APPS_CONFIG at all, just a plain nav dropdown pointing at /services/*.
const ServicesList = [
  {
    id: 'business-advisory',
    title: 'Business Advisory',
    description: 'Strategic advisory for developers, operators, and agencies.',
    Icon: Briefcase,
    link: '/services/business-advisory',
    color: '#0D9488',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Hands-on PM for construction and development projects.',
    Icon: ClipboardList,
    link: '/services/project-management',
    color: '#00BBA8',
  },
  {
    id: 'change-management',
    title: 'Change Management',
    description: 'Rollout planning and adoption support for your team.',
    Icon: Workflow,
    link: '/services/change-management',
    color: '#9333EA',
  },
  {
    id: 'facility-management-training',
    title: 'Facility Management Training',
    description: 'Training for facility managers and building staff.',
    Icon: GraduationCap,
    link: '/services/facility-management-training',
    color: '#2563EB',
  },
];

interface AppInfo {
  id: string;
  name: string;
  title: string;
  logo: string;
  color: string;
}

const APPS_CONFIG: Record<string, AppInfo> = {
  facility: {
    id: 'facility',
    name: 'Facility',
    title: 'Facility Management',
    logo: '/logos/lodgely_facility.png',
    color: '#0D9488',
  },
  developer: {
    id: 'developer',
    name: 'Developer',
    title: 'Developer',
    logo: '/logos/lodgely_developer.png',
    color: '#00BBA8',
  },
  realtor: {
    id: 'realtor',
    name: 'Realtor',
    title: 'Realtor',
    logo: '/logos/lodgely_realtor.png',
    color: '#D97706',
  },
  investment: {
    id: 'investment',
    name: 'Investment',
    title: 'Investment',
    logo: '/logos/lodgely_invest.png',
    color: '#9333EA',
  },
  resident: {
    id: 'resident',
    name: 'Resident',
    title: 'Resident',
    logo: '/logos/lodgely_resident.png',
    color: '#059669',
  },
  owner: {
    id: 'owner',
    name: 'Owner',
    title: 'Owner',
    logo: '/logos/lodgely_owner.png',
    color: '#2563EB',
  },
  landlord: {
    id: 'owner',
    name: 'Owner',
    title: 'Owner',
    logo: '/logos/lodgely_owner.png',
    color: '#2563EB',
  },
};

interface UserSession {
  id?: string;
  fullName?: string;
  name?: string;
  firstName?: string;
  email?: string;
  [key: string]: any;
}

interface NavbarProps {
  activeAppId?: string;
}

const getFirstName = (u: UserSession | null): string => {
  if (!u) return 'User';
  if (u.firstName && typeof u.firstName === 'string' && u.firstName.trim()) {
    return u.firstName.trim();
  }
  if (u.fullName && typeof u.fullName === 'string' && u.fullName.trim()) {
    const parts = u.fullName.trim().split(/\s+/);
    if (parts[0]) return parts[0];
  }
  if (u.name && typeof u.name === 'string' && u.name.trim()) {
    const parts = u.name.trim().split(/\s+/);
    if (parts[0]) return parts[0];
  }
  if (u.email && typeof u.email === 'string') {
    return u.email.split('@')[0];
  }
  return 'User';
};

export const Navbar = ({ activeAppId }: NavbarProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const [servicesMenu, setServicesMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  // Determine current app ID based on prop or pathname
  const currentAppId = activeAppId || (() => {
    if (!pathname) return undefined;
    if (pathname.startsWith('/facility')) return 'facility';
    if (pathname.startsWith('/developer')) return 'developer';
    if (pathname.startsWith('/realtor')) return 'realtor';
    if (pathname.startsWith('/investment')) return 'investment';
    if (pathname.startsWith('/resident')) return 'resident';
    if (pathname.startsWith('/owner')) return 'owner';
    return undefined;
  })();

  const currentApp = currentAppId ? APPS_CONFIG[currentAppId] : undefined;
  const loginUrl = getSignInUrl(currentAppId);
  const accountUrl = getAccountAppUrl();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check user session
  useEffect(() => {
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';
    fetch(`${gatewayUrl}/auth/me`, { credentials: 'include', cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && !data.error) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  // Close menus on outside click anywhere on document
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (productMenuRef.current && !productMenuRef.current.contains(target)) {
        setProductMenu(false);
      }
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(target)) {
        setServicesMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProductClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProductMenu((prev) => !prev);
    setServicesMenu(false);
    setUserMenuOpen(false);
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setServicesMenu((prev) => !prev);
    setProductMenu(false);
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';
    // api-gateway's CSRF middleware 403s any cookie-based state-changing
    // request (including this one) that's missing the x-csrf-token header —
    // without it, the session is never actually destroyed server-side, so
    // reloading just logs you straight back in via the still-valid cookie.
    fetch(`${gatewayUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: withCsrfHeader('POST'),
    })
      .finally(() => {
        setUser(null);
        setUserMenuOpen(false);
        window.location.reload();
      });
  };

  const closeDropdowns = () => {
    setProductMenu(false);
    setServicesMenu(false);
    setUserMenuOpen(false);
  };

  return (
    <div
      onClick={closeDropdowns}
      className={`navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1.2, stiffness: 130, damping: 20 }}
        style={{ width: '100%', maxWidth: '1304px', position: 'relative' }}
      >
        {/* Desktop Navbar */}
        <div className="navbar-pill">
          {/* Logo & App Name Brand */}
          <Link
            href="/"
            className="navbar-brand-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
            }}
          >
            <img
              src={currentApp?.logo || '/logos/lodgely_main.png'}
              alt={currentApp ? `Lodgely ${currentApp.name}` : 'Lodgely'}
              width={36}
              height={36}
              style={{
                width: 36,
                height: 36,
                objectFit: 'contain',
                borderRadius: 10,
                flexShrink: 0,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, lineHeight: 1 }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 19,
                  letterSpacing: '-0.02em',
                  color: '#0F172A',
                }}
              >
                Lodgely
              </span>
              {currentApp && (
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 19,
                    letterSpacing: '-0.02em',
                    color: currentApp.color,
                  }}
                >
                  {currentApp.name}
                </span>
              )}
            </div>
          </Link>

          {/* Nav Links */}
          <div className="navbar-links-group">
            {/* Products Dropdown */}
            <div style={{ position: 'relative' }} ref={productMenuRef}>
              <button
                type="button"
                onClick={handleProductClick}
                className="nav-item-btn"
              >
                <span>Products</span>
                <motion.svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: productMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginTop: 1 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {productMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="nav-dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {VisibleProductsList.map((item) => (
                      <Link
                        key={item.id}
                        href={item.link}
                        onClick={() => setProductMenu(false)}
                        className={`nav-dropdown-item ${currentAppId === item.id ? 'active' : ''}`}
                      >
                        <img
                          src={item.logo}
                          alt={item.title}
                          width={38}
                          height={38}
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            objectFit: 'contain',
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            className="nav-dropdown-title"
                            style={{ color: currentAppId === item.id ? item.color : '#0F172A' }}
                          >
                            {item.title}
                          </div>
                          <div className="nav-dropdown-desc">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div style={{ position: 'relative' }} ref={servicesMenuRef}>
              <button
                type="button"
                onClick={handleServicesClick}
                className="nav-item-btn"
              >
                <span>Services</span>
                <motion.svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: servicesMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginTop: 1 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {servicesMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="nav-dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ServicesList.map((item) => {
                      const isActive = pathname?.startsWith(item.link);
                      return (
                        <Link
                          key={item.id}
                          href={item.link}
                          onClick={() => setServicesMenu(false)}
                          className={`nav-dropdown-item ${isActive ? 'active' : ''}`}
                        >
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 10,
                              background: `${item.color}1A`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <item.Icon size={18} color={item.color} />
                          </div>
                          <div>
                            <div
                              className="nav-dropdown-title"
                              style={{ color: isActive ? item.color : '#0F172A' }}
                            >
                              {item.title}
                            </div>
                            <div className="nav-dropdown-desc">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/privacy" className="nav-item-btn">
              Privacy
            </Link>
            <Link href="/terms" className="nav-item-btn">
              Terms
            </Link>
          </div>

          {/* Action buttons */}
          <div className="nav-actions-group">
            {user ? (
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen((prev) => !prev);
                  }}
                  className="nav-user-btn"
                  aria-label="User Account Menu"
                >
                  <User size={19} strokeWidth={2.2} color="#0F172A" />
                  <span className="nav-user-greeting">
                    Hi, {getFirstName(user)}
                  </span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="nav-user-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="nav-user-dropdown-header">
                        <div className="nav-user-dropdown-name">{user.fullName || 'User'}</div>
                        {user.email && (
                          <div className="nav-user-dropdown-email">{user.email}</div>
                        )}
                      </div>
                      <a
                        href={`${accountUrl}/dashboard`}
                        className="nav-user-dropdown-item"
                      >
                        <LayoutDashboard size={16} />
                        <span>My Dashboard</span>
                      </a>
                      <button
                        onClick={handleLogout}
                        className="nav-user-dropdown-item nav-user-dropdown-logout"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <a href={loginUrl} className="nav-signin-link">
                  Sign in
                </a>
                <Link href="/schedule-demo" className="nav-get-demo-btn">
                  Get demo
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Header Bar */}
        <div className="navbar-mobile-bar">
          <Link
            href="/"
            className="navbar-brand-link"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <img
              src={currentApp?.logo || '/logos/lodgely_main.png'}
              alt="Lodgely"
              style={{ height: 28, width: 28, objectFit: 'contain', borderRadius: 8 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontWeight: 800, fontSize: 17, color: '#0F172A' }}>Lodgely</span>
              {currentApp && (
                <span style={{ fontWeight: 800, fontSize: 17, color: currentApp.color }}>
                  {currentApp.name}
                </span>
              )}
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setOpenMobile((prev) => !prev)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {openMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mobile-drawer"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src={currentApp?.logo || '/logos/lodgely_main.png'}
                    alt="Lodgely"
                    style={{ height: 28, width: 28, borderRadius: 8, objectFit: 'contain' }}
                  />
                  <span style={{ fontWeight: 800, fontSize: 18, color: '#0F172A' }}>Lodgely</span>
                  {currentApp && (
                    <span style={{ fontWeight: 800, fontSize: 18, color: currentApp.color }}>
                      {currentApp.name}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenMobile(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  aria-label="Close Menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>
                    Products
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                    {VisibleProductsList.map((p) => (
                      <Link
                        key={p.id}
                        href={p.link}
                        onClick={() => setOpenMobile(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 0',
                          textDecoration: 'none',
                          color: currentAppId === p.id ? p.color : '#334155',
                          fontSize: '16px',
                          fontWeight: currentAppId === p.id ? 700 : 500,
                        }}
                      >
                        <img
                          src={p.logo}
                          alt={p.title}
                          style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'contain' }}
                        />
                        <span>{p.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>
                    Services
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                    {ServicesList.map((s) => {
                      const isActive = pathname?.startsWith(s.link);
                      return (
                        <Link
                          key={s.id}
                          href={s.link}
                          onClick={() => setOpenMobile(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 0',
                            textDecoration: 'none',
                            color: isActive ? s.color : '#334155',
                            fontSize: '16px',
                            fontWeight: isActive ? 700 : 500,
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 6,
                              background: `${s.color}1A`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <s.Icon size={15} color={s.color} />
                          </div>
                          <span>{s.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <Link href="/privacy" onClick={() => setOpenMobile(false)} style={{ textDecoration: 'none', color: '#0F172A', fontSize: '18px', fontWeight: 600 }}>
                    Privacy
                  </Link>
                  <Link href="/terms" onClick={() => setOpenMobile(false)} style={{ textDecoration: 'none', color: '#0F172A', fontSize: '18px', fontWeight: 600 }}>
                    Terms
                  </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  {user ? (
                    <>
                      <a
                        href={`${accountUrl}/dashboard`}
                        onClick={() => setOpenMobile(false)}
                        style={{
                          width: '100%',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          background: '#F8FAFC',
                          color: '#0F172A',
                          borderRadius: 12,
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        <User size={18} />
                        <span>Hi, {getFirstName(user)} (Dashboard)</span>
                      </a>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          background: '#FEF2F2',
                          color: '#DC2626',
                          border: 'none',
                          borderRadius: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={loginUrl}
                        onClick={() => setOpenMobile(false)}
                        className="nav-signin-link"
                        style={{
                          width: '100%',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                        }}
                      >
                        Sign in
                      </a>
                      <Link
                        href="/schedule-demo"
                        onClick={() => setOpenMobile(false)}
                        className="nav-get-demo-btn"
                        style={{
                          width: '100%',
                          height: '48px',
                          fontSize: 16,
                        }}
                      >
                        Get demo
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, KeyRound, Landmark, Building2, HardHat, Home, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { isProductVisible } from '../../lib/productFlags';

interface HeroSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPS_DIRECTORY = [
  {
    id: 'resident',
    title: 'Lodgely Resident',
    category: 'Mobile App',
    description: 'Pay rent, view tenancy agreements, submit repair tickets, and generate digital gate access codes.',
    href: '/resident',
    icon: KeyRound,
    color: '#F43F5E',
    keywords: ['rent', 'tenant', 'gate', 'maintenance', 'receipt', 'apartment', 'mobile', 'resident'],
  },
  {
    id: 'owner',
    title: 'Lodgely Owner',
    category: 'Mobile App & Portal',
    description: 'Monitor real-time rental payouts, occupancy rates, and maintenance expenses across all owned units.',
    href: '/owner',
    icon: Landmark,
    color: '#A855F7',
    keywords: ['landlord', 'payout', 'occupancy', 'revenue', 'investor', 'property', 'yield', 'owner'],
  },
  {
    id: 'facility',
    title: 'Lodgely Facility',
    category: 'Operations Hub',
    description: 'Manage multiple buildings, vendor dispatches, service charge invoices, and tenant requests.',
    href: '/facility',
    icon: Building2,
    color: '#00D4E5',
    keywords: ['facility', 'maintenance', 'work order', 'vendor', 'service charge', 'building', 'inspection'],
  },
  {
    id: 'developer',
    title: 'Lodgely Developer',
    category: 'Project Suite',
    description: 'Track construction milestones, inventory phases, contractor requisitions, and pre-sale releases.',
    href: '/developer',
    icon: HardHat,
    color: '#14B8A6',
    keywords: ['construction', 'developer', 'blueprint', 'requisition', 'inventory', 'pre-sale', 'off-plan'],
  },
  {
    id: 'realtor',
    title: 'Lodgely Realtor',
    category: 'Broker Network',
    description: 'Manage verified property listings, track client leads through deal pipelines, and close escrows.',
    href: '/realtor',
    icon: Home,
    color: '#F59E0B',
    keywords: ['realtor', 'broker', 'leads', 'crm', 'listings', 'sales', 'commission', 'pipeline'],
  },
  {
    id: 'investment',
    title: 'Lodgely Investment',
    category: 'Capital Portal',
    description: 'Track portfolio yields, evaluate institutional real estate deals, and monitor automated dividend distributions.',
    href: '/investment',
    icon: TrendingUp,
    color: '#6366F1',
    keywords: ['investment', 'deals', 'yield', 'roi', 'portfolio', 'dividends', 'syndication', 'fund'],
  },
].filter((app) => isProductVisible(app.id));

export const HeroSearchModal: React.FC<HeroSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim() === ''
    ? APPS_DIRECTORY
    : APPS_DIRECTORY.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="hero-search-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="hero-search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="hero-search-input-wrapper">
              <Search size={20} color="#64748B" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Lodgely apps, tools, or property workflows..."
                className="hero-search-input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="hero-search-clear-btn"
                  aria-label="Clear query"
                >
                  <X size={16} />
                </button>
              )}
              <span className="hero-search-kbd">ESC</span>
            </div>

            {/* Modal Body */}
            <div className="hero-search-results">
              <div className="hero-search-header-label">
                <Sparkles size={14} color="#00D4E5" />
                <span>Lodgely Apps & Platforms ({filtered.length})</span>
              </div>

              {filtered.length === 0 ? (
                <div className="hero-search-empty">
                  No matching Lodgely applications found for &ldquo;{query}&rdquo;.
                </div>
              ) : (
                <div className="hero-search-list">
                  {filtered.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onClose}
                        className="hero-search-item"
                      >
                        <div
                          className="hero-search-item-icon"
                          style={{ backgroundColor: `${item.color}18`, color: item.color }}
                        >
                          <IconComponent size={22} />
                        </div>
                        <div className="hero-search-item-info">
                          <div className="hero-search-item-top">
                            <span className="hero-search-item-title">{item.title}</span>
                            <span className="hero-search-item-cat">{item.category}</span>
                          </div>
                          <p className="hero-search-item-desc">{item.description}</p>
                        </div>
                        <ArrowRight size={18} className="hero-search-item-arrow" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="hero-search-footer">
              <span>Quick Navigation: Select an app to explore its capabilities.</span>
              <span className="hero-search-footer-hint">Press ESC to dismiss</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HeroSearchModal;

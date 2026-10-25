'use client';

import React from 'react';
import Navbar from '../landingPage/Navbar';

interface SiteHeaderProps {
  activeAppId?: string;
}

// Unified site header: renders the modern, consistent Navbar across all single app pages.
export function SiteHeader({ activeAppId }: SiteHeaderProps) {
  return <Navbar activeAppId={activeAppId} />;
}

export default SiteHeader;


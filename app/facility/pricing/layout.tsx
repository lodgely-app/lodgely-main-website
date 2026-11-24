import type { Metadata } from 'next';
import { FACILITY_PRICING } from '../../lib/pricing';

export const metadata: Metadata = {
  title: 'Pricing - Lodgely Facility',
  description:
    `No subscription and no setup fee. Lodgely Facility takes ${FACILITY_PRICING.feePercent}% of each resident payment, with every feature included for unlimited buildings, staff and residents.`,
  openGraph: { url: 'https://lodgely.ng/facility/pricing', title: 'Pricing - Lodgely Facility' },
};

export default function FacilityPricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

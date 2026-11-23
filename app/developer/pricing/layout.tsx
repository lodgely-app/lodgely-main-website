import type { Metadata } from 'next';
import { DEVELOPER_PRICING, naira, plural } from '../../lib/pricing';

export const metadata: Metadata = {
  title: 'Pricing - Lodgely Developer',
  description:
    `Start free with ${plural(DEVELOPER_PRICING.freeUsers, 'user', 'users')} and ${plural(DEVELOPER_PRICING.freeProjects, 'project', 'projects')}. Lodgely Developer Pro is ${naira(DEVELOPER_PRICING.proYearly)} per user per month billed yearly, with procurement, inventory and finance for your whole team.`,
  openGraph: { url: 'https://lodgely.ng/developer/pricing', title: 'Pricing - Lodgely Developer' },
};

export default function DeveloperPricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

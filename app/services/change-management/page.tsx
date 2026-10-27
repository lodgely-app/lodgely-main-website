import React from 'react';
import { Workflow, Users2, GraduationCap, TrendingUp } from 'lucide-react';
import { ServicePageTemplate } from '../../components/marketing/ServicePageTemplate';

export const metadata = {
  title: 'Change Management',
  description:
    'Moving your team off spreadsheets and manual processes onto Lodgely — stakeholder alignment, phased rollout planning, and hands-on adoption support.',
};

export default function ChangeManagementPage() {
  return (
    <ServicePageTemplate
      eyebrow="Lodgely Change Management"
      headline={
        <>
          Get your whole team
          <br />
          actually using it.
        </>
      }
      subheadline="New software fails on adoption, not features. We plan the rollout, bring your team along, and stay until the old spreadsheet is actually retired — not just replaced on paper."
      highlights={[
        {
          icon: <Workflow size={24} strokeWidth={1.75} />,
          title: 'Rollout planning',
          description:
            'A phased plan for moving your organization onto Lodgely — what moves first, what runs in parallel, and when the old system gets switched off.',
        },
        {
          icon: <Users2 size={24} strokeWidth={1.75} />,
          title: 'Stakeholder alignment',
          description:
            "Get buy-in from the people whose daily work is changing — not just the decision-maker who bought the software.",
        },
        {
          icon: <GraduationCap size={24} strokeWidth={1.75} />,
          title: 'Hands-on team onboarding',
          description:
            'Live, role-specific walkthroughs for your team — finance, site staff, management — on exactly the parts of Lodgely they\'ll use daily.',
        },
        {
          icon: <TrendingUp size={24} strokeWidth={1.75} />,
          title: 'Adoption tracking',
          description:
            "We check back in after go-live — who's actually using it, where people are reverting to old habits, and what still needs fixing.",
        },
      ]}
      whoItsForTitle="Who this is for"
      whoItsFor={[
        'Organizations moving off spreadsheets, paper records, or a legacy system',
        'Teams with staff who are resistant to or unfamiliar with new software',
        'Businesses that have struggled with a failed or stalled software rollout before',
        'Multi-building or multi-project organizations needing a staged, not all-at-once, rollout',
      ]}
    />
  );
}

import React from 'react';
import { GraduationCap, Wrench, BookOpenCheck, Award } from 'lucide-react';
import { ServicePageTemplate } from '../../components/marketing/ServicePageTemplate';

export const metadata = {
  title: 'Facility Management Training',
  description:
    'Training for facility managers and building staff — platform usage, maintenance operations, service-charge administration, and tenant relations.',
};

export default function FacilityManagementTrainingPage() {
  return (
    <ServicePageTemplate
      eyebrow="Lodgely Facility Management Training"
      headline={
        <>
          Better-trained staff,
          <br />
          better-run buildings.
        </>
      }
      subheadline="Practical training for facility managers and building staff — covering day-to-day platform usage, maintenance operations, service-charge administration, and how to actually keep tenants happy."
      highlights={[
        {
          icon: <GraduationCap size={24} strokeWidth={1.75} />,
          title: 'Platform usage training',
          description:
            'Role-specific sessions on Lodgely Facility — tenancies, maintenance tickets, service charges, and payments — for every member of your team.',
        },
        {
          icon: <Wrench size={24} strokeWidth={1.75} />,
          title: 'Maintenance operations best practices',
          description:
            'How to triage, assign, and close out maintenance tickets quickly, and how to use the data to spot recurring issues before they escalate.',
        },
        {
          icon: <BookOpenCheck size={24} strokeWidth={1.75} />,
          title: 'Service-charge administration',
          description:
            'How to set up, communicate, and collect on service charges without the disputes that come from an unclear process.',
        },
        {
          icon: <Award size={24} strokeWidth={1.75} />,
          title: 'Tenant relations & communication',
          description:
            'Practical guidance on building announcements, handling tenant complaints, and keeping communication professional and timely.',
        },
      ]}
      whoItsForTitle="Who this is for"
      whoItsFor={[
        'Facility management companies onboarding new building staff',
        'Property owners managing buildings without a dedicated, trained facility team',
        'Teams struggling with tenant disputes over maintenance or service charges',
        'Organizations standardizing how every building under their management is run',
      ]}
    />
  );
}

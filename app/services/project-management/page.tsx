import React from 'react';
import { ClipboardList, CalendarCheck, Users2, CheckCircle2 } from 'lucide-react';
import { ServicePageTemplate } from '../../components/marketing/ServicePageTemplate';

export const metadata = {
  title: 'Project Management',
  description:
    'Hands-on project management for construction and development projects, run directly inside Lodgely Developer — milestones, requisitions, procurement, and vendor coordination.',
};

export default function ProjectManagementPage() {
  return (
    <ServicePageTemplate
      eyebrow="Lodgely Project Management"
      headline={
        <>
          A project manager
          <br />
          embedded in your workflow.
        </>
      }
      subheadline="Hands-on project management for construction and development work — run directly inside Lodgely Developer, so every milestone, requisition, and vendor commitment lives on the same record your team already sees."
      highlights={[
        {
          icon: <CalendarCheck size={24} strokeWidth={1.75} />,
          title: 'Milestone planning & tracking',
          description:
            'A realistic phase and milestone plan set up in Lodgely Developer from day one, tracked and adjusted as the project actually moves.',
        },
        {
          icon: <ClipboardList size={24} strokeWidth={1.75} />,
          title: 'Requisition & procurement oversight',
          description:
            'Requisitions reviewed and procurement tracked against budget, so spend stays visible instead of surfacing at month-end.',
        },
        {
          icon: <Users2 size={24} strokeWidth={1.75} />,
          title: 'Vendor & contractor coordination',
          description:
            'A single point of contact keeping contractors, suppliers, and your internal team moving on the same schedule.',
        },
        {
          icon: <CheckCircle2 size={24} strokeWidth={1.75} />,
          title: 'Weekly reporting to stakeholders',
          description:
            "Clear, regular status reporting — budget variance, schedule risk, and what's next — so project owners are never guessing.",
        },
      ]}
      whoItsForTitle="Who this is for"
      whoItsFor={[
        'Developers running a project without a dedicated in-house project manager',
        'Teams who want an experienced second set of eyes on an active build',
        'Project owners who need reliable, regular reporting without chasing updates',
        'Organizations onboarding their first project onto Lodgely Developer',
      ]}
    />
  );
}

import {
  Building2,
  HardHat,
  Crown,
  ClipboardList,
  Users,
  GraduationCap,
  LineChart,
  Percent,
  MessageSquare,
  Home,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { LeadKind } from './leads';

// One entry per thing a visitor can ask us about. Any link to
// /schedule-demo?topic=<key> opens the slide-in contact panel with that
// topic's wording and fields (see LeadDrawer.tsx); the /schedule-demo page
// itself uses the same config when opened directly.

export interface LeadTopic {
  kind: LeadKind;
  /** Sent to Slack as "Interested in". */
  interest: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  color: string;
  Icon: LucideIcon;
  /** Short list under the heading: what the call/consultation covers. */
  points: string[];
  companyLabel: string;
  companyPlaceholder: string;
  companyOptional?: boolean;
  sizeLabel: string;
  sizeOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  /** When true the message box is required. */
  messageRequired?: boolean;
  submitLabel: string;
  successTitle: string;
  successText: string;
}

const UNITS = ['1 – 50 units', '51 – 200 units', '201 – 500 units', '501+ units'];

export const LEAD_TOPICS = {
  general: {
    kind: 'demo',
    interest: 'Lodgely',
    eyebrow: 'Talk to Lodgely',
    title: 'See Lodgely in action',
    subtitle: 'Tell us a little about your business and we’ll set up a walkthrough of the products that fit.',
    color: '#0D9488',
    Icon: MessageSquare,
    points: ['A 30-minute walkthrough tailored to you', 'Answers on pricing and setup', 'No commitment'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Properties Ltd',
    sizeLabel: 'What are you looking for?',
    sizeOptions: ['Facility management', 'Construction & development', 'Professional services', 'Not sure yet'],
    messageLabel: 'Anything you’d like us to know?',
    messagePlaceholder: 'Tell us about your properties or what you’d like to see.',
    submitLabel: 'Request my demo',
    successTitle: 'Request received',
    successText: 'Thanks! Someone from our team will reach out shortly to find a time that works.',
  },
  facility: {
    kind: 'demo',
    interest: 'Lodgely Facility',
    eyebrow: 'Lodgely Facility',
    title: 'Book a Facility demo',
    subtitle: 'See how managers collect service charges, handle maintenance and keep residents in the loop from one dashboard.',
    color: '#0D9488',
    Icon: Building2,
    points: ['Service charges and resident payments', 'Maintenance tickets and announcements', 'The resident mobile app'],
    companyLabel: 'Company / estate name',
    companyPlaceholder: 'Sample Court Estate',
    sizeLabel: 'Units managed',
    sizeOptions: UNITS,
    messageLabel: 'What would you like to see?',
    messagePlaceholder: 'e.g. how residents pay service charge, or moving off spreadsheets.',
    submitLabel: 'Book my demo',
    successTitle: 'Demo request received',
    successText: 'Thanks! A Facility specialist will reach out shortly to schedule your walkthrough.',
  },
  'facility-custom-rate': {
    kind: 'contact',
    interest: 'Lodgely Facility · custom rate',
    eyebrow: 'Lodgely Facility pricing',
    title: 'Ask about a custom rate',
    subtitle: 'Managing a large portfolio or several estates? Tell us about it and we’ll put together a rate for you.',
    color: '#0D9488',
    Icon: Percent,
    points: ['Volume pricing for large portfolios', 'Multi-estate and group setups', 'Help moving your existing data'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Facility Management Ltd',
    sizeLabel: 'Units managed',
    sizeOptions: ['201 – 500 units', '501 – 1,000 units', '1,001 – 5,000 units', '5,000+ units'],
    messageLabel: 'Tell us about your portfolio',
    messagePlaceholder: 'How many estates, how residents pay today, anything else that matters.',
    messageRequired: true,
    submitLabel: 'Request a rate',
    successTitle: 'We’ve got your details',
    successText: 'Thanks! Our team will review your portfolio and get back to you with a rate.',
  },
  developer: {
    kind: 'demo',
    interest: 'Lodgely Developer',
    eyebrow: 'Lodgely Developer',
    title: 'Book a Developer demo',
    subtitle: 'See milestones, requisitions, inventory and finance working together on one project record.',
    color: '#00BBA8',
    Icon: HardHat,
    points: ['From BoQ to milestones and tasks', 'Requisitions, procurement and site stock', 'Invoices, payments and reporting'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Builders Ltd',
    sizeLabel: 'Active projects',
    sizeOptions: ['Planning & BoQ stage', '1 – 3 sites', '4 – 10 sites', '10+ sites'],
    messageLabel: 'What would you like to explore?',
    messagePlaceholder: 'Tell us about your upcoming build or what’s hard about coordinating it today.',
    submitLabel: 'Book my demo',
    successTitle: 'Demo request received',
    successText: 'Thanks! A construction workflow specialist will reach out shortly with a meeting invite.',
  },
  'developer-enterprise': {
    kind: 'contact',
    interest: 'Lodgely Developer Enterprise',
    eyebrow: 'Lodgely Developer · Enterprise',
    title: 'Talk to us about Enterprise',
    subtitle: 'For larger teams that need custom limits, onboarding support and a plan built around how they work.',
    color: '#2C3552',
    Icon: Crown,
    points: ['Custom users, projects and storage', 'Guided onboarding for your team', 'Priority support'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Developments Plc',
    sizeLabel: 'Team size',
    sizeOptions: ['10 – 25 people', '26 – 100 people', '101 – 250 people', '250+ people'],
    messageLabel: 'What do you need?',
    messagePlaceholder: 'Number of projects, sites, anything your plan needs to cover.',
    messageRequired: true,
    submitLabel: 'Contact sales',
    successTitle: 'Message sent',
    successText: 'Thanks! Our team will get back to you shortly to talk through an Enterprise plan.',
  },
  'project-management': {
    kind: 'consultation',
    interest: 'Project Management',
    eyebrow: 'Project Management consultation',
    title: 'Get help running your project',
    subtitle: 'Hands-on project management for construction and development work, run inside Lodgely Developer.',
    color: '#00BBA8',
    Icon: ClipboardList,
    points: ['Milestone planning and tracking', 'Requisition and vendor oversight', 'Weekly reporting to stakeholders'],
    companyLabel: 'Company / project name',
    companyPlaceholder: 'Sample Towers project',
    sizeLabel: 'Project stage',
    sizeOptions: ['Pre-construction / planning', 'Under construction', 'Several projects at once', 'Rescuing a delayed project'],
    messageLabel: 'Tell us about the project',
    messagePlaceholder: 'Type of build, location, timeline, where you need the most help.',
    submitLabel: 'Request a consultation',
    successTitle: 'Consultation requested',
    successText: 'Thanks! A project manager from our team will reach out to learn more about your project.',
  },
  'change-management': {
    kind: 'consultation',
    interest: 'Change Management',
    eyebrow: 'Change Management consultation',
    title: 'Plan your rollout with us',
    subtitle: 'We plan the rollout, bring your team along and stay until the old spreadsheet is actually retired.',
    color: '#9333EA',
    Icon: Users,
    points: ['A rollout plan for your team', 'Hands-on onboarding sessions', 'Adoption tracking after go-live'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Properties Ltd',
    sizeLabel: 'People affected by the change',
    sizeOptions: ['1 – 10 people', '11 – 50 people', '51 – 200 people', '200+ people'],
    messageLabel: 'What are you moving from?',
    messagePlaceholder: 'e.g. spreadsheets, another system, paper records — and any deadline.',
    submitLabel: 'Request a consultation',
    successTitle: 'Consultation requested',
    successText: 'Thanks! Our change management team will reach out to plan a first conversation.',
  },
  'facility-management-training': {
    kind: 'consultation',
    interest: 'Facility Management Training',
    eyebrow: 'Facility Management Training',
    title: 'Book training for your team',
    subtitle: 'Practical training for facility managers and building staff, from platform use to keeping tenants happy.',
    color: '#2563EB',
    Icon: GraduationCap,
    points: ['Day-to-day platform training', 'Maintenance and service-charge administration', 'Tenant relations and communication'],
    companyLabel: 'Company / estate name',
    companyPlaceholder: 'Sample Court Estate',
    sizeLabel: 'People to train',
    sizeOptions: ['1 – 5 people', '6 – 20 people', '21 – 50 people', '50+ people'],
    messageLabel: 'What should the training cover?',
    messagePlaceholder: 'Roles attending, topics you care about, in-person or online.',
    submitLabel: 'Request training',
    successTitle: 'Training request received',
    successText: 'Thanks! Our training team will reach out to plan sessions that fit your team.',
  },
  'business-advisory': {
    kind: 'consultation',
    interest: 'Business Advisory',
    eyebrow: 'Business Advisory consultation',
    title: 'Talk to an advisor',
    subtitle: 'Strategic advice to professionalise operations, restructure your team and improve margins.',
    color: '#0D9488',
    Icon: LineChart,
    points: ['Operating model review', 'Team and role design', 'Financial and reporting discipline'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Properties Ltd',
    sizeLabel: 'Type of business',
    sizeOptions: ['Developer', 'Facility operator', 'Real estate agency', 'Other'],
    messageLabel: 'What would you like help with?',
    messagePlaceholder: 'Growth plans, margins, team structure — whatever is on your mind.',
    submitLabel: 'Request a consultation',
    successTitle: 'Consultation requested',
    successText: 'Thanks! One of our advisors will reach out to set up a first conversation.',
  },
  realtor: {
    kind: 'demo',
    interest: 'Lodgely Realtor',
    eyebrow: 'Lodgely Realtor',
    title: 'Book a Realtor demo',
    subtitle: 'See how agents manage listings, leads and deals in one place.',
    color: '#D97706',
    Icon: Home,
    points: ['Listings and enquiries', 'Leads and follow-ups', 'Deals and commissions'],
    companyLabel: 'Agency',
    companyPlaceholder: 'Sample Realty',
    sizeLabel: 'Agents on your team',
    sizeOptions: ['Just me', '2 – 10 agents', '11 – 50 agents', '50+ agents'],
    messageLabel: 'Anything you’d like us to know?',
    messagePlaceholder: 'How you manage listings and leads today.',
    submitLabel: 'Book my demo',
    successTitle: 'Demo request received',
    successText: 'Thanks! Our team will reach out shortly to schedule your walkthrough.',
  },
  investment: {
    kind: 'demo',
    interest: 'Lodgely Investment',
    eyebrow: 'Lodgely Investment',
    title: 'Book an Investment demo',
    subtitle: 'See how investors discover, reserve and track real estate opportunities.',
    color: '#9333EA',
    Icon: TrendingUp,
    points: ['Browsing opportunities', 'Reservations and payments', 'Tracking your portfolio'],
    companyLabel: 'Company',
    companyPlaceholder: 'Sample Capital',
    companyOptional: true,
    sizeLabel: 'You are…',
    sizeOptions: ['An individual investor', 'An investment firm', 'A developer raising funds', 'Other'],
    messageLabel: 'Anything you’d like us to know?',
    messagePlaceholder: 'What kind of opportunities you’re interested in.',
    submitLabel: 'Book my demo',
    successTitle: 'Demo request received',
    successText: 'Thanks! Our team will reach out shortly to schedule your walkthrough.',
  },
} satisfies Record<string, LeadTopic>;

export type LeadTopicKey = keyof typeof LEAD_TOPICS;

export function getLeadTopic(key: string | null | undefined): LeadTopic {
  return (key && (LEAD_TOPICS as Record<string, LeadTopic>)[key]) || LEAD_TOPICS.general;
}

/** Link that opens the contact panel for a topic (the page itself is the no-JS fallback). */
export const leadHref = (topic: LeadTopicKey) => `/schedule-demo?topic=${topic}`;

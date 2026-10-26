import React from 'react';
import { LegalLayout } from '../components/marketing/LegalLayout';

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Lodgely Developer, Facility, Realtor, Investment, Resident, and Owner apps, and the Lodgely website.',
};

const SECTIONS: { id: string; title: string }[] = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'the-services', title: '2. Description of the Services' },
  { id: 'eligibility', title: '3. Eligibility & Account Registration' },
  { id: 'account-security', title: '4. Account Security' },
  { id: 'organizations-roles', title: '5. Organizations, Roles & Permissions' },
  { id: 'acceptable-use', title: '6. Acceptable Use' },
  { id: 'payments', title: '7. Payments, Fees & Billing' },
  { id: 'content', title: '8. User Content & Intellectual Property' },
  { id: 'third-party', title: '9. Third-Party Services' },
  { id: 'privacy', title: '10. Privacy' },
  { id: 'disclaimers', title: '11. Disclaimers' },
  { id: 'liability', title: '12. Limitation of Liability' },
  { id: 'indemnification', title: '13. Indemnification' },
  { id: 'termination', title: '14. Suspension & Termination' },
  { id: 'disputes', title: '15. Governing Law & Dispute Resolution' },
  { id: 'changes', title: '16. Changes to These Terms' },
  { id: 'general', title: '17. General Terms' },
  { id: 'contact', title: '18. Contact Us' },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="October 26, 2026"
      intro={
        <p>
          These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) are a legal agreement between you and Lodgely
          Inc. (&ldquo;<strong>Lodgely</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>
          &rdquo;) governing your access to and use of <strong>Lodgely Developer</strong>,{' '}
          <strong>Lodgely Facility</strong>, <strong>Lodgely Realtor</strong>, <strong>Lodgely Investment</strong>,{' '}
          <strong>Lodgely Resident</strong>, and <strong>Lodgely Owner</strong>, our website at lodgely.ng, and our
          iOS and Android mobile apps (together, the &ldquo;<strong>Services</strong>&rdquo;). By creating an
          account, downloading an app, or otherwise using the Services, you agree to be bound by these Terms. If you
          are using the Services on behalf of an organization, you represent that you have the authority to bind
          that organization to these Terms, and &ldquo;you&rdquo; refers to both you and that organization.
        </p>
      }
      sections={SECTIONS}
    >
      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using any part of the Services, you agree to these Terms and to our{' '}
          <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference. If you do not
          agree, you may not access or use the Services. We may update these Terms as described in Section 16.
        </p>
      </section>

      <section id="the-services">
        <h2>2. Description of the Services</h2>
        <p>Lodgely operates a family of connected, role-based real-estate and property-management products:</p>
        <ul>
          <li><strong>Lodgely Developer</strong> — project, milestone, requisition, procurement, inventory, and finance management for real-estate developers.</li>
          <li><strong>Lodgely Facility</strong> — building, tenancy, maintenance, service-charge, and payment management for facility operators.</li>
          <li><strong>Lodgely Realtor</strong> — listings, lead, and deal/transaction management for real-estate brokers and agents.</li>
          <li><strong>Lodgely Investment</strong> — a feed of real-estate investment opportunities and portfolio/yield tracking for investors.</li>
          <li><strong>Lodgely Resident</strong> — a mobile app for tenants to pay rent, raise maintenance tickets, view notices, and generate digital access codes.</li>
          <li><strong>Lodgely Owner</strong> — a mobile app for landlords/property owners to track rent collection, payouts, occupancy, and maintenance.</li>
        </ul>
        <p>
          Not every product is available in every market, on every platform (web, iOS, Android), or to every account
          at all times — we may add, change, or discontinue features or entire products, with notice where
          reasonably practicable for material changes.
        </p>
      </section>

      <section id="eligibility">
        <h2>3. Eligibility &amp; Account Registration</h2>
        <ul>
          <li>You must be at least 18 years old and capable of forming a legally binding contract to use the Services.</li>
          <li>You must provide accurate, current, and complete information when you register, and keep it up to date.</li>
          <li>One Lodgely account may be linked to multiple organizations and apps; you are responsible for all activity under your account across every app and organization you have access to.</li>
          <li>We may refuse to open, or may suspend, an account that provides false information, impersonates another person, or violates these Terms.</li>
        </ul>
      </section>

      <section id="account-security">
        <h2>4. Account Security</h2>
        <p>You are responsible for:</p>
        <ul>
          <li>Keeping your password confidential and not sharing your account with anyone else.</li>
          <li>All activity that occurs under your account, whether or not you authorized it, except to the extent caused by our negligence.</li>
          <li>Notifying us immediately at <a href="mailto:hello@lodgely.ng">hello@lodgely.ng</a> if you suspect unauthorized access to your account.</li>
        </ul>
        <p>
          We offer optional two-factor authentication and recommend you enable it, particularly if you hold an
          Admin, Finance, or Owner role in any organization.
        </p>
      </section>

      <section id="organizations-roles">
        <h2>5. Organizations, Roles &amp; Permissions</h2>
        <p>
          Lodgely is a multi-tenant platform. An <strong>organization</strong> (a company, agency, building, or
          individual landlord) can invite members and assign each one a role (for example, Owner, Admin, Project
          Manager, Finance, Site Manager, Procurement Manager, Inventory Manager, Quantity Surveyor, Worker, or
          Viewer). Each role carries a defined set of permissions that determines what that member can view, create,
          edit, approve, or delete within that organization.
        </p>
        <ul>
          <li>
            The organization&apos;s Owner/Admins are responsible for deciding who to invite, what role to assign
            them, and for removing access when it&apos;s no longer appropriate (for example, when an employee
            leaves, or a tenancy ends).
          </li>
          <li>
            Lodgely enforces role permissions as configured by the organization, but is not responsible for an
            organization&apos;s decisions about who to invite or what role to assign them, or for disputes between
            members of the same organization (for example, a disagreement between a landlord and a tenant about a
            maintenance charge) — the Services are a tool for managing those relationships, not a party to them.
          </li>
          <li>
            Where a role grants financial permissions (approving invoices, processing payouts, recording payments),
            the organization is responsible for ensuring the right people hold that role.
          </li>
        </ul>
      </section>

      <section id="acceptable-use">
        <h2>6. Acceptable Use</h2>
        <p>When using the Services, you agree not to:</p>
        <ul>
          <li>Violate any applicable law, regulation, or third-party right, including property, tenancy, and consumer-protection laws.</li>
          <li>Provide false, misleading, or fraudulent information — including false listings, inflated invoices, or fabricated payment records.</li>
          <li>Impersonate any person or organization, or misrepresent your affiliation with one.</li>
          <li>Upload or transmit malware, or attempt to gain unauthorized access to any account, system, or network connected to the Services.</li>
          <li>Reverse-engineer, decompile, or attempt to extract the source code of the Services, except where applicable law expressly permits it.</li>
          <li>Scrape, harvest, or bulk-collect data from the Services without our prior written consent.</li>
          <li>Use the Services to send unsolicited communications (spam) to other users.</li>
          <li>Interfere with or disrupt the integrity or performance of the Services, including through excessive automated requests.</li>
          <li>Use the Services for any purpose that is illegal, including money laundering or financing of terrorism, in connection with any payment processed through the Services.</li>
        </ul>
        <p>
          We may investigate and take appropriate action against anyone who violates this section, including
          removing content, suspending or terminating accounts, and reporting unlawful activity to law enforcement.
        </p>
      </section>

      <section id="payments">
        <h2>7. Payments, Fees &amp; Billing</h2>
        <ul>
          <li>
            <strong>Payment processing.</strong> Rent, service-charge, contribution, and other in-app payments are
            processed by our licensed third-party payment processor, Paystack. By making a payment through the
            Services, you also agree to Paystack&apos;s applicable terms. Lodgely is not a bank or licensed payment
            institution and does not itself hold your funds outside of what is reflected in your in-app wallet
            balance, where applicable.
          </li>
          <li>
            <strong>Platform fees.</strong> Certain transactions processed through the Services may be subject to a
            platform or processing fee, which will be disclosed to you (or to the organization) before the
            transaction is completed, or as published in your organization&apos;s plan/pricing terms.
          </li>
          <li>
            <strong>Payouts.</strong> Property owners and organizations receiving payouts through Lodgely Owner or
            Lodgely Facility are responsible for providing accurate bank/settlement details; we are not liable for a
            misdirected payout caused by inaccurate details you provided.
          </li>
          <li>
            <strong>Refunds &amp; disputes.</strong> Refunds for a specific transaction (for example, an
            overpayment, or a disputed service charge) are handled according to the policy of the organization that
            received the payment, and applicable law. Contact that organization first; Lodgely will assist where the
            dispute concerns the operation of the Services itself.
          </li>
          <li>
            <strong>Taxes.</strong> You are responsible for determining and paying any taxes that apply to your use
            of the Services or transactions you process through them.
          </li>
        </ul>
      </section>

      <section id="content">
        <h2>8. User Content &amp; Intellectual Property</h2>
        <h3>8.1 Your content</h3>
        <p>
          You retain ownership of the content you upload or create through the Services — documents, photos,
          listings, messages, and records (&ldquo;<strong>User Content</strong>&rdquo;). By submitting User Content,
          you grant Lodgely a worldwide, non-exclusive, royalty-free license to host, store, reproduce, and display
          that content solely as necessary to provide and improve the Services (for example, rendering a listing
          photo, or generating a PDF receipt). You are solely responsible for your User Content and for having the
          rights necessary to upload it.
        </p>
        <h3>8.2 Our intellectual property</h3>
        <p>
          The Services, including their software, design, logos, trademarks, and underlying technology, are owned by
          Lodgely or our licensors and are protected by intellectual-property laws. Except for the limited right to
          use the Services as intended, these Terms do not grant you any right, title, or interest in our
          intellectual property.
        </p>
      </section>

      <section id="third-party">
        <h2>9. Third-Party Services</h2>
        <p>
          The Services integrate or link to third-party services, including Paystack (payments) and Google
          (sign-in). We are not responsible for the availability, content, or practices of these third-party
          services, which are governed by their own terms.
        </p>
      </section>

      <section id="privacy">
        <h2>10. Privacy</h2>
        <p>
          Our collection and use of personal data in connection with the Services is described in our{' '}
          <a href="/privacy">Privacy Policy</a>, which forms part of these Terms.
        </p>
      </section>

      <section id="disclaimers">
        <h2>11. Disclaimers</h2>
        <p>
          The Services are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any
          kind, whether express or implied, including (to the maximum extent permitted by law) implied warranties of
          merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the
          Services will be uninterrupted, error-free, or completely secure, or that any listing, valuation, yield
          projection, or investment figure shown in Lodgely Realtor or Lodgely Investment will be accurate,
          achievable, or suitable for your circumstances — property and investment decisions should be made with
          your own independent due diligence and, where appropriate, professional advice.
        </p>
      </section>

      <section id="liability">
        <h2>12. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Lodgely and its officers, employees, and agents will
          not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of
          profits, revenue, data, or goodwill, arising from or related to your use of the Services, even if we have
          been advised of the possibility of such damages. To the maximum extent permitted by law, our total
          aggregate liability for any claim arising out of or relating to the Services will not exceed the greater
          of (a) the amount of platform fees you paid to Lodgely in the twelve (12) months preceding the claim, or
          (b) ₦50,000.
        </p>
        <p>
          Nothing in these Terms limits any liability that cannot be limited or excluded under applicable law,
          including liability for fraud or willful misconduct.
        </p>
      </section>

      <section id="indemnification">
        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify and hold Lodgely, its officers, employees, and agents harmless from any claim,
          liability, damage, loss, or expense (including reasonable legal fees) arising out of or related to: (a)
          your use or misuse of the Services; (b) your User Content; (c) your violation of these Terms or applicable
          law; or (d) your violation of any third party&apos;s rights, including another user or organization you
          interact with through the Services.
        </p>
      </section>

      <section id="termination">
        <h2>14. Suspension &amp; Termination</h2>
        <ul>
          <li>You may stop using the Services, or request deletion of your account, at any time by contacting us.</li>
          <li>
            We may suspend or terminate your access to the Services, in whole or in part, if we reasonably believe
            you have violated these Terms, created risk or legal exposure for us or other users, or if required by
            law, with notice where reasonably practicable.
          </li>
          <li>
            If you are removed from, or leave, an organization, your access to that organization&apos;s data ends,
            but the organization&apos;s own records are retained in accordance with Section 10 of our Privacy
            Policy.
          </li>
          <li>
            Sections of these Terms that by their nature should survive termination (including Sections 8, 11, 12,
            13, 15, and 17) will survive.
          </li>
        </ul>
      </section>

      <section id="disputes">
        <h2>15. Governing Law &amp; Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict-of-law
          principles. Any dispute arising out of or relating to these Terms or the Services will first be addressed
          through good-faith negotiation; if unresolved within thirty (30) days, the dispute will be subject to the
          exclusive jurisdiction of the courts of Lagos State, Nigeria.
        </p>
      </section>

      <section id="changes">
        <h2>16. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. If we make material changes, we will notify you by email
          and/or an in-app notice before the change takes effect, and update the &ldquo;Last updated&rdquo; date
          above. Your continued use of the Services after a change takes effect constitutes acceptance of the
          updated Terms. If you do not agree to a change, you must stop using the Services.
        </p>
      </section>

      <section id="general">
        <h2>17. General Terms</h2>
        <ul>
          <li><strong>Entire agreement.</strong> These Terms, together with our Privacy Policy and any order or plan terms agreed with your organization, constitute the entire agreement between you and Lodgely regarding the Services.</li>
          <li><strong>Severability.</strong> If any provision of these Terms is held unenforceable, the remaining provisions will remain in full force and effect.</li>
          <li><strong>No waiver.</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right or provision.</li>
          <li><strong>Assignment.</strong> You may not assign or transfer these Terms without our prior written consent; we may assign these Terms in connection with a merger, acquisition, or sale of assets.</li>
          <li><strong>Force majeure.</strong> We are not liable for any delay or failure to perform resulting from causes outside our reasonable control.</li>
        </ul>
      </section>

      <section id="contact">
        <h2>18. Contact Us</h2>
        <p>
          Questions about these Terms can be sent to:
        </p>
        <p>
          <strong>Lodgely Inc.</strong>
          <br />
          Email: <a href="mailto:hello@lodgely.ng">support@lodgely.ng</a>
          <br />
          [Registered business address — to be added]
        </p>
      </section>
    </LegalLayout>
  );
}

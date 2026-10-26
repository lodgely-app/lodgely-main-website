import React from 'react';
import { LegalLayout } from '../components/marketing/LegalLayout';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How Lodgely collects, uses, shares, and protects personal data across the Lodgely Developer, Facility, Realtor, Investment, Resident, and Owner apps.',
};

const SECTIONS: { id: string; title: string }[] = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'scope', title: '2. Scope of This Policy' },
  { id: 'information-we-collect', title: '3. Information We Collect' },
  { id: 'how-we-use', title: '4. How We Use Your Information' },
  { id: 'legal-basis', title: '5. Our Legal Basis for Processing' },
  { id: 'how-we-share', title: '6. How We Share Your Information' },
  { id: 'organizations', title: '7. Organizations, Roles & Shared Data' },
  { id: 'cookies', title: '8. Cookies & Tracking Technologies' },
  { id: 'push-notifications', title: '9. Push Notifications & Device Permissions' },
  { id: 'retention', title: '10. How Long We Keep Your Data' },
  { id: 'your-rights', title: '11. Your Privacy Rights' },
  { id: 'security', title: '12. How We Protect Your Data' },
  { id: 'international-transfers', title: '13. International Data Transfers' },
  { id: 'children', title: "14. Children's Privacy" },
  { id: 'third-party-links', title: '15. Third-Party Links & Services' },
  { id: 'breach', title: '16. Data Breach Notification' },
  { id: 'changes', title: '17. Changes to This Policy' },
  { id: 'contact', title: '18. Contact Us & Complaints' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="October 26, 2026"
      intro={
        <>
          <p>
            Lodgely Inc. (&ldquo;<strong>Lodgely</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;
            <strong>us</strong>&rdquo;, or &ldquo;<strong>our</strong>&rdquo;) builds and operates a family of
            real-estate and property-management products — <strong>Lodgely Developer</strong>,{' '}
            <strong>Lodgely Facility</strong>, <strong>Lodgely Realtor</strong>, <strong>Lodgely Investment</strong>,{' '}
            <strong>Lodgely Resident</strong>, and <strong>Lodgely Owner</strong> — together with the shared Lodgely
            account system, our website at lodgely.ng, and our iOS and Android mobile apps (collectively, the
            &ldquo;<strong>Services</strong>&rdquo;).
          </p>
          <p>
            This Privacy Policy explains what personal data we collect, why we collect it, how we use and share it,
            and the choices and rights you have. By creating a Lodgely account, downloading a Lodgely app, or
            otherwise using the Services, you acknowledge that your personal data will be processed as described in
            this Policy. If you do not agree, please do not use the Services.
          </p>
        </>
      }
      sections={SECTIONS}
    >
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          Lodgely is a unified, multi-tenant platform: a single Lodgely account can carry membership in one or more
          <strong> organizations</strong> (a construction company, a facility-management company, a brokerage, an
          investment vehicle, or an individual property owner), each operating in one or more of our apps. Because an
          organization can invite you, assign you a role, and grant you access to property, tenancy, financial, and
          project records, some of the personal data described below may be collected or shared not directly by you,
          but by an organization you belong to, or by another member of that organization (for example, a Facility
          administrator entering your details as a tenant, or a Developer project owner raising a requisition that
          references your name). Section 7 explains this in more detail.
        </p>
        <p>
          This Policy is written to be read together with our <a href="/terms">Terms of Service</a>, which governs
          your use of the Services generally.
        </p>
      </section>

      <section id="scope">
        <h2>2. Scope of This Policy</h2>
        <p>This Policy applies to personal data processed through:</p>
        <ul>
          <li>
            <strong>Lodgely Developer</strong> — web app for construction and real-estate development teams
            (project, milestone, requisition, procurement, inventory, finance, and team management).
          </li>
          <li>
            <strong>Lodgely Facility</strong> — web app for managing buildings, tenancies, maintenance, service
            charges, and payments.
          </li>
          <li>
            <strong>Lodgely Realtor</strong> — web app for property listings, leads, and transaction/deal tracking.
          </li>
          <li>
            <strong>Lodgely Investment</strong> — web app and public feed for real-estate investment opportunities,
            portfolio tracking, and yield reporting.
          </li>
          <li>
            <strong>Lodgely Resident</strong> — mobile app for tenants: rent and service-charge payments,
            maintenance requests, building notices, and digital access/gate codes.
          </li>
          <li>
            <strong>Lodgely Owner</strong> — mobile app for landlords/property owners: rent-collection and payout
            tracking, occupancy and lease oversight, and maintenance visibility.
          </li>
          <li>
            The shared <strong>Lodgely account</strong> (sign-in, registration, profile, and session management used
            across every app above) and our public website at lodgely.ng.
          </li>
        </ul>
        <p>
          Some apps listed above are rolled out progressively and may not yet be publicly available in every market
          or on every store — this Policy applies to each app from the moment it is made available to you, and
          continues to apply to any data already collected.
        </p>
      </section>

      <section id="information-we-collect">
        <h2>3. Information We Collect</h2>

        <h3>3.1 Information you provide to us</h3>
        <ul>
          <li>
            <strong>Account &amp; profile data:</strong> full name, email address, phone number, password (stored as
            a salted hash, never in plain text), and profile photo if you add one.
          </li>
          <li>
            <strong>Organization &amp; property data:</strong> organization/company name, the buildings, units,
            projects, or listings you create or are given access to, tenancy and lease details (move-in/move-out
            dates, rent amounts, unit numbers), and project data (milestones, tasks, bills of quantities, budgets).
          </li>
          <li>
            <strong>Financial &amp; payment data:</strong> rent, service-charge, contribution, and invoice records;
            transaction references, amounts, and payment status; and, for property owners receiving payouts, the
            bank account and settlement details needed to pay you. We do <strong>not</strong> store your full debit
            or credit card number, CVV, or online-banking credentials — card and bank-transfer payments are handled
            directly by our licensed payment processor, <strong>Paystack</strong>, and we only receive a payment
            reference and status back from them (see Section 6).
          </li>
          <li>
            <strong>Documents &amp; media you upload:</strong> receipts, invoices, inspection reports, lease
            agreements, identification documents (where a verification flow requires them), listing and property
            photos, and floor plans.
          </li>
          <li>
            <strong>Communications:</strong> messages, comments, and attachments you post in a project or building
            channel, support requests you send us, and any other correspondence with Lodgely.
          </li>
          <li>
            <strong>Content of invitations:</strong> if you invite someone to join your organization, we collect
            their name, email, and the role you assign them.
          </li>
        </ul>

        <h3>3.2 Information collected automatically</h3>
        <ul>
          <li>
            <strong>Device &amp; log data:</strong> IP address, browser type and version, operating system, device
            identifiers, mobile network information, app version, dates and times of access, pages or screens
            viewed, and crash/diagnostic logs.
          </li>
          <li>
            <strong>Usage data:</strong> the features you use, buttons you click, and general interaction patterns,
            used to understand how the Services are used and to improve them.
          </li>
          <li>
            <strong>Cookies and similar technologies</strong> on our website and web apps — see Section 8.
          </li>
          <li>
            <strong>Approximate location</strong> derived from your IP address (for fraud prevention and to localize
            content); our mobile apps do not collect precise GPS location unless a specific feature (for example, a
            future site-visit or delivery-confirmation feature) explicitly asks for your permission first.
          </li>
        </ul>

        <h3>3.3 Information from other sources</h3>
        <ul>
          <li>
            <strong>Single sign-on providers:</strong> if you choose to sign in with Google, we receive your name,
            email address, and profile photo from Google, as permitted by your Google account settings.
          </li>
          <li>
            <strong>Payment processors:</strong> confirmation of payment success/failure, payment method type (for
            example, card or bank transfer), and a transaction reference from Paystack.
          </li>
          <li>
            <strong>Other users and organizations:</strong> if someone adds you as a tenant, invites you to an
            organization, or references you in a project, requisition, or listing record, we receive the
            information they enter about you.
          </li>
        </ul>
      </section>

      <section id="how-we-use">
        <h2>4. How We Use Your Information</h2>
        <p>We use personal data to:</p>
        <ul>
          <li>Create and maintain your account, authenticate you, and keep your session secure across devices.</li>
          <li>
            Provide the core functionality of whichever Lodgely app(s) you or your organization use — for example,
            recording a rent payment, tracking a construction milestone, publishing a listing, or generating a
            digital gate code.
          </li>
          <li>Process payments, payouts, and refunds, and maintain accurate financial and transaction records.</li>
          <li>
            Send you service communications: account verification, password resets, payment receipts and reminders,
            maintenance-ticket updates, building notices, and security alerts.
          </li>
          <li>Send product updates, tips, and (where permitted by law and your preferences) marketing communications, which you can opt out of at any time.</li>
          <li>Respond to support requests and resolve disputes.</li>
          <li>Detect, investigate, and prevent fraud, abuse, security incidents, and violations of our Terms of Service.</li>
          <li>Analyze usage trends to maintain, troubleshoot, and improve the Services, and to build new features.</li>
          <li>Comply with legal, tax, and regulatory obligations, and respond to lawful requests from public authorities.</li>
        </ul>
      </section>

      <section id="legal-basis">
        <h2>5. Our Legal Basis for Processing</h2>
        <p>
          Under the Nigeria Data Protection Act, 2023 (&ldquo;<strong>NDPA</strong>&rdquo;) and its implementing
          regulations, we rely on one or more of the following legal bases, depending on the processing activity:
        </p>
        <ul>
          <li>
            <strong>Performance of a contract</strong> — to provide the Services you or your organization signed up
            for (for example, processing a rent payment you initiated).
          </li>
          <li>
            <strong>Consent</strong> — for optional features such as marketing emails, push notifications, and
            non-essential cookies, which you can withdraw at any time.
          </li>
          <li>
            <strong>Legitimate interests</strong> — for fraud prevention, platform security, service improvement, and
            direct marketing to existing customers, balanced against your rights and interests.
          </li>
          <li>
            <strong>Legal obligation</strong> — where we must retain or disclose information to comply with
            applicable law, regulation, or a valid order from a court or regulator.
          </li>
        </ul>
      </section>

      <section id="how-we-share">
        <h2>6. How We Share Your Information</h2>
        <p>We do not sell your personal data. We share it only in the following circumstances:</p>
        <ul>
          <li>
            <strong>Within your organization:</strong> other members of an organization you belong to can see the
            data your role permits — for example, a Facility administrator can see a tenant&apos;s payment history
            for their own building; a Developer team member can see project and requisition records they have been
            granted access to. See Section 7.
          </li>
          <li>
            <strong>Service providers:</strong> vendors who process data on our behalf under contract, including our
            payment processor (<strong>Paystack</strong>), cloud hosting and storage providers, email and SMS
            delivery providers, and analytics/crash-reporting providers. These providers may only use your data to
            perform the services we&apos;ve asked for.
          </li>
          <li>
            <strong>Legal &amp; safety reasons:</strong> where required to comply with a law, regulation, legal
            process, or valid governmental request, or to protect the rights, property, or safety of Lodgely, our
            users, or the public.
          </li>
          <li>
            <strong>Business transfers:</strong> if Lodgely is involved in a merger, acquisition, financing, or sale
            of assets, personal data may be transferred as part of that transaction, subject to the commitments in
            this Policy.
          </li>
          <li>
            <strong>With your direction or consent:</strong> for example, if you ask us to share a document with a
            third party, or connect a third-party integration.
          </li>
        </ul>
      </section>

      <section id="organizations">
        <h2>7. Organizations, Roles &amp; Shared Data</h2>
        <p>
          Lodgely is built around <strong>organizations</strong>: a company or individual that signs up, invites
          members (employees, tenants, contractors, agents, or co-investors), and assigns each member a role (for
          example, Owner, Admin, Project Manager, Finance, Site Manager, or Viewer). Each role is granted a defined
          set of permissions, so members only see the data their role is entitled to see.
        </p>
        <p>
          Because of this model:
        </p>
        <ul>
          <li>
            The <strong>organization</strong> (and its Owner/Admins) — not Lodgely — decides who is invited, what
            role they&apos;re given, and therefore what data within that organization they can access.
          </li>
          <li>
            If you are a tenant, contractor, or employee added to an organization by someone else (for example, a
            landlord entering you as a tenant in Lodgely Facility), that organization is responsible for the
            accuracy of the information it enters about you and for having a lawful basis to do so; Lodgely acts as
            the data processor/platform in that relationship.
          </li>
          <li>
            Leaving an organization, or having your access revoked, stops your ongoing access to that
            organization&apos;s data, but does not automatically delete historical records (such as past payments or
            maintenance tickets) that the organization is entitled to keep for its own operational or legal
            purposes.
          </li>
          <li>
            If you believe an organization has entered inaccurate information about you, you may contact us (Section
            18) and we will work with the organization to help correct it, consistent with your rights in Section
            11.
          </li>
        </ul>
      </section>

      <section id="cookies">
        <h2>8. Cookies &amp; Tracking Technologies</h2>
        <p>
          Our website and web apps use cookies and similar technologies (such as local storage) to:
        </p>
        <ul>
          <li><strong>Keep you signed in</strong> and remember your session across our apps (essential — cannot be disabled without breaking login).</li>
          <li><strong>Remember preferences,</strong> such as your last-used organization or a dismissed banner.</li>
          <li><strong>Understand usage</strong> through basic, privacy-conscious analytics, so we can see which pages and features are used.</li>
        </ul>
        <p>
          You can control non-essential cookies through your browser settings; disabling essential cookies will
          prevent you from staying signed in. Our mobile apps do not use browser cookies but may use comparable
          on-device storage for the same purposes (session tokens, preferences).
        </p>
      </section>

      <section id="push-notifications">
        <h2>9. Push Notifications &amp; Device Permissions</h2>
        <p>
          Our mobile apps may ask for permission to send you push notifications (for example, a payment reminder, a
          maintenance-ticket update, or a building notice) and, where a specific feature requires it, permission to
          access your camera (to upload a photo or scan a document), photo library (to attach an image), or
          notifications. You can manage or revoke any of these permissions at any time in your device&apos;s
          settings; doing so may limit the related feature but will not affect the rest of the app.
        </p>
      </section>

      <section id="retention">
        <h2>10. How Long We Keep Your Data</h2>
        <p>
          We retain personal data for as long as your account is active and as necessary to provide the Services.
          After an account or organization is closed, we retain data for as long as reasonably necessary to:
        </p>
        <ul>
          <li>Comply with tax, accounting, and other legal or regulatory record-keeping obligations (financial and transaction records are typically kept for a minimum of six years, consistent with standard Nigerian financial record-keeping practice);</li>
          <li>Resolve disputes, enforce our agreements, and defend legal claims; and</li>
          <li>Maintain the integrity of records that other, still-active members of an organization are entitled to keep (for example, a building&apos;s historical payment ledger).</li>
        </ul>
        <p>
          Where none of the above applies, we delete or anonymize personal data within a reasonable period after it
          is no longer needed for the purpose it was collected for.
        </p>
      </section>

      <section id="your-rights">
        <h2>11. Your Privacy Rights</h2>
        <p>
          Under the NDPA and its implementing regulations, you have the right to:
        </p>
        <ul>
          <li><strong>Access</strong> the personal data we hold about you.</li>
          <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
          <li><strong>Erasure</strong> — ask us to delete your data, subject to our retention obligations in Section 10.</li>
          <li><strong>Restriction</strong> — ask us to limit how we process your data in certain circumstances.</li>
          <li><strong>Objection</strong> — object to processing based on legitimate interests or direct marketing.</li>
          <li><strong>Data portability</strong> — request a copy of your data in a structured, commonly-used, machine-readable format.</li>
          <li><strong>Withdraw consent</strong> at any time, for any processing that relies on your consent, without affecting processing already carried out.</li>
          <li><strong>Lodge a complaint</strong> with the Nigeria Data Protection Commission (NDPC), or your local data protection authority, if you believe we have not handled your data lawfully.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us using the details in Section 18. We will respond within the
          timeframe required by applicable law, and may ask you to verify your identity before actioning a request.
          Where a request concerns data an organization (not Lodgely) controls — for example, a landlord&apos;s
          tenancy records about you — we will route your request to that organization and assist as the platform
          provider.
        </p>
      </section>

      <section id="security">
        <h2>12. How We Protect Your Data</h2>
        <p>We apply industry-standard technical and organizational measures to protect your data, including:</p>
        <ul>
          <li>Encryption of data in transit (HTTPS/TLS) across every Lodgely app and API.</li>
          <li>Password hashing and salting — we never store passwords in plain text.</li>
          <li>Role-based access controls, so staff and platform members only see the data their role requires.</li>
          <li>Payment data handled by a PCI-DSS-compliant payment processor (Paystack) rather than stored on our own servers.</li>
          <li>Network-level protections (firewalls, rate limiting) and continuous monitoring for suspicious activity.</li>
          <li>Internal access controls and confidentiality obligations for employees and contractors who may handle personal data.</li>
        </ul>
        <p>
          No method of transmission or storage is 100% secure, and we cannot guarantee absolute security. If you
          believe you&apos;ve found a security vulnerability in our Services, please report it responsibly to{' '}
          <a href="mailto:hello@lodgely.ng">hello@lodgely.ng</a> before disclosing it publicly, so we can
          investigate and address it.
        </p>
      </section>

      <section id="international-transfers">
        <h2>13. International Data Transfers</h2>
        <p>
          Our primary infrastructure and service providers may store and process data in Nigeria and in other
          countries where our hosting and service providers operate. Where personal data is transferred outside
          Nigeria, we take steps to ensure it receives a level of protection consistent with the NDPA, including
          using providers that maintain appropriate security and contractual safeguards.
        </p>
      </section>

      <section id="children">
        <h2>14. Children&apos;s Privacy</h2>
        <p>
          The Services are intended for use by adults aged 18 and over — our apps involve tenancy agreements,
          financial transactions, and property/investment records that require legal capacity to enter into. We do
          not knowingly collect personal data from anyone under 18. If we learn that we have collected data from a
          child under 18, we will take steps to delete it. If you believe a child has provided us with personal
          data, please contact us using the details in Section 18.
        </p>
      </section>

      <section id="third-party-links">
        <h2>15. Third-Party Links &amp; Services</h2>
        <p>
          The Services may contain links to third-party websites, or integrate third-party services (such as
          Paystack for payments, or Google for sign-in). We are not responsible for the privacy practices of these
          third parties, and we encourage you to review their privacy policies before providing them with
          information.
        </p>
      </section>

      <section id="breach">
        <h2>16. Data Breach Notification</h2>
        <p>
          If a security incident results in unauthorized access to, or loss of, personal data in a way that creates
          a risk to your rights and freedoms, we will notify the Nigeria Data Protection Commission as required by
          law, and will notify affected users without undue delay, together with information about the nature of
          the incident and the steps we are taking in response.
        </p>
      </section>

      <section id="changes">
        <h2>17. Changes to This Policy</h2>
        <p>
          We may update this Policy from time to time to reflect changes in our practices, our Services, or
          applicable law. If we make material changes, we will notify you by email and/or an in-app notice before
          the change takes effect, and we will update the &ldquo;Last updated&rdquo; date above. Continued use of the
          Services after a change takes effect constitutes acceptance of the updated Policy.
        </p>
      </section>

      <section id="contact">
        <h2>18. Contact Us &amp; Complaints</h2>
        <p>
          If you have questions, concerns, or a request relating to this Policy or your personal data, contact us
          at:
        </p>
        <p>
          <strong>Lodgely Inc.</strong>
          <br />
          Email: <a href="mailto:support@lodgely.ng">support@lodgely.ng</a>
          <br />
          {/* [Registered business address — to be added] */}
        </p>
        {/* <p>
          If you are not satisfied with our response, you may lodge a complaint with the{' '}
          <strong>Nigeria Data Protection Commission (NDPC)</strong> or the data protection authority in your
          country of residence.
        </p> */}
      </section>
    </LegalLayout>
  );
}

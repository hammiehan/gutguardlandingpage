import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GutGuard",
  description: "Privacy Policy for GutGuard.",
};

const sectionStyle = {
  marginTop: 28,
} as const;

const headingStyle = {
  fontSize: "clamp(28px, 4vw, 42px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  marginBottom: 12,
} as const;

const cardStyle = {
  maxWidth: 860,
  margin: "96px auto 48px",
  padding: "32px clamp(20px, 4vw, 40px)",
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 20,
  color: "rgba(255,255,255,.82)",
  lineHeight: 1.75,
} as const;

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "24px", background: "var(--bg)" }}>
      <div style={cardStyle}>
        <Link href="/" style={{ display: "inline-block", marginBottom: 24, color: "var(--bl)", fontWeight: 700 }}>
          Back to GutGuard
        </Link>
        <h1 style={headingStyle}>Privacy Policy</h1>
        <p>
          This Privacy Policy explains how GutGuard collects, uses, stores, and protects information submitted through
          our website and connected services.
        </p>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Information We Collect</h2>
          <p>
            We may collect contact information, page activity, referral and campaign data, device and browser metadata,
            and event data related to clicks, purchases, and webhook notifications from integrated platforms.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>How We Use Information</h2>
          <p>
            We use collected information to operate the website, respond to inquiries, track offer engagement,
            attribute conversions, monitor purchase-related events, improve marketing performance, and maintain service
            security.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Third-Party Services</h2>
          <p>
            GutGuard may use third-party providers such as Supabase for data storage and TikTok for event tracking,
            attribution, and webhook notifications. Data shared with those providers is limited to what is necessary to
            operate the service.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Data Retention</h2>
          <p>
            We retain data only for as long as reasonably necessary for operational, legal, analytics, and business
            recordkeeping purposes, unless a longer retention period is required by law.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your information, subject to applicable legal and
            operational requirements.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Contact</h2>
          <p>
            For privacy-related concerns, please contact GutGuard through the official contact details published on the
            website.
          </p>
        </section>

        <p style={{ marginTop: 28, fontSize: 14, color: "rgba(255,255,255,.5)" }}>
          Last updated: May 21, 2026
        </p>
      </div>
    </main>
  );
}

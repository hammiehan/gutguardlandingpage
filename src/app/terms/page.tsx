import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | GutGuard",
  description: "Terms of Service for GutGuard.",
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

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "24px", background: "var(--bg)" }}>
      <div style={cardStyle}>
        <Link href="/" style={{ display: "inline-block", marginBottom: 24, color: "var(--bl)", fontWeight: 700 }}>
          Back to GutGuard
        </Link>
        <h1 style={headingStyle}>Terms of Service</h1>
        <p>
          These Terms of Service govern access to and use of the GutGuard website, offers, and connected digital
          services.
        </p>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Use of the Website</h2>
          <p>
            You agree to use the website only for lawful purposes and in a manner that does not interfere with the
            operation, security, or availability of the service.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Product and Offer Information</h2>
          <p>
            GutGuard may present product offers, pricing, and purchase links to third-party platforms. Final checkout,
            payment processing, fulfillment, and order status may be handled by those third-party platforms and are
            subject to their own terms and policies.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Third-Party Platforms</h2>
          <p>
            When you leave the GutGuard website to continue on a third-party service, including TikTok, your activity
            may be governed by that platform&apos;s terms, policies, and operational rules.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>No Medical Advice</h2>
          <p>
            Information presented on the website is for general informational and commercial purposes only and does not
            replace medical advice, diagnosis, or treatment from a qualified healthcare professional.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, GutGuard is not liable for indirect, incidental,
            consequential, or special damages arising from your use of the website or reliance on third-party services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Changes</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of the website after an update means
            you accept the revised terms.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Contact</h2>
          <p>
            Questions about these terms should be directed to GutGuard through the official contact details published
            on the website.
          </p>
        </section>

        <p style={{ marginTop: 28, fontSize: 14, color: "rgba(255,255,255,.5)" }}>
          Last updated: May 21, 2026
        </p>
      </div>
    </main>
  );
}

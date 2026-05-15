import Reveal from "@/components/landing/Reveal";
import { howItWorksContent, type StepItem } from "@/lib/landing-data";

function StepIcon({ icon }: { icon: StepItem["icon"] }) {
  if (icon === "user") {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }

  if (icon === "pulse") {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }

  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function getStepStyle(tone: StepItem["badgeTone"]) {
  if (tone === "gold") {
    return {
      num: {
        background: "rgba(212,168,64,.12)",
        borderColor: "rgba(212,168,64,.22)",
        color: "var(--gld)",
      },
      badge: {
        background: "rgba(212,168,64,.1)",
        borderColor: "rgba(212,168,64,.18)",
        color: "var(--gld)",
      },
    };
  }

  if (tone === "green") {
    return {
      num: {
        background: "rgba(92,184,130,.12)",
        borderColor: "rgba(92,184,130,.22)",
        color: "var(--grn)",
      },
      badge: {
        background: "rgba(92,184,130,.1)",
        borderColor: "rgba(92,184,130,.18)",
        color: "var(--grn)",
      },
    };
  }

  return {
    num: undefined,
    badge: undefined,
  };
}

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="mx">
        <Reveal>
          <h2 className="section-h" style={{ color: "#fff", marginBottom: "clamp(10px,2vh,14px)" }}>
            {howItWorksContent.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p style={{ fontSize: "clamp(17px,3.5vw,22px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--grn)", marginBottom: 0 }}>
            {howItWorksContent.subheading}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ fontSize: "clamp(16px,2.5vw,18px)", color: "rgba(255,255,255,.55)", maxWidth: 480, lineHeight: 1.75, marginBottom: 0 }}>
            {howItWorksContent.paragraph}
          </p>
        </Reveal>

        <div className="steps">
          {howItWorksContent.steps.map((step, index) => {
            const toneStyles = getStepStyle(step.badgeTone);

            return (
              <Reveal key={step.number} delay={index * 0.08}>
                <div className="step-row">
                  <div className="step-num" style={toneStyles.num}>
                    {step.number}
                  </div>
                  <div className="step-body">
                    <div className="step-h">{step.title}</div>
                    <p className="step-p">{step.body}</p>
                    <div className="step-badge" style={toneStyles.badge}>
                      <StepIcon icon={step.icon} />
                      {step.badge}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

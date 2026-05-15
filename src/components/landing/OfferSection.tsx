"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/landing/Reveal";
import { doctorStripContent, offerCards, offerSectionContent } from "@/lib/landing-data";

function AnimatedCount({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          observer.unobserve(entry.target);

          const startedAt = performance.now();
          const duration = 1400;

          const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));

            if (progress < 1) {
              frame = window.requestAnimationFrame(tick);
            }
          };

          frame = window.requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

function ScanIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export default function OfferSection() {
  return (
    <section id="offer">
      <div className="mx">
        <Reveal>
          <div className="section-tag" style={{ color: "rgba(255,255,255,.38)" }}>
            {offerSectionContent.tag}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-h" style={{ color: "#fff" }}>
            {offerSectionContent.titleLead}
            <br />
            <em style={{ fontStyle: "normal", color: "var(--grn)" }}>
              {offerSectionContent.titleAccent}
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ fontSize: "clamp(16px,2.5vw,18px)", color: "rgba(255,255,255,.55)", maxWidth: 520, lineHeight: 1.75, marginBottom: 0 }}>
            {offerSectionContent.paragraph}
          </p>
        </Reveal>

        <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "14px 18px", marginBottom: 24, background: "rgba(255,255,255,.04)", marginTop: 24 }}>
          <p style={{ fontSize: "clamp(14px,2.5vw,14px)", color: "rgba(255,255,255,.5)", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "rgba(255,255,255,.65)" }}>{offerSectionContent.disclaimerTitle}</strong>{" "}
            {offerSectionContent.disclaimerBody}
          </p>
        </div>

        <div className="proto-grid">
          {offerCards.map((card, index) => (
            <Reveal key={card.name} delay={0.08 + index * 0.08}>
              <div className={`proto-card${card.featured ? " recommended" : ""}`}>
                {card.featured ? <div className="proto-rec-badge">Most chosen</div> : null}
                <div className="proto-name">{card.name}</div>
                <div className="proto-caps">{card.capsuleSummary}</div>
                <div className="proto-cap-price">{card.pricePerCapsule}</div>
                <div className="proto-cap-label">per capsule</div>
                <div className="proto-price">{card.total}</div>
                <div className="proto-scans">
                  <ScanIcon />
                  {card.review}
                </div>
                <a href={card.href} className="proto-cta">
                  {card.ctaLabel}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div style={{ marginTop: 20, padding: "18px 22px", background: "rgba(59,130,200,.07)", border: "1px solid rgba(59,130,200,.16)", borderRadius: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase", color: "var(--bl)", marginBottom: 10 }}>
              Every tier includes
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px" }}>
              {offerSectionContent.includes.map((item) => (
                <span key={item} style={{ fontSize: 15, color: "rgba(255,255,255,.72)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--grn)", fontWeight: 700 }}>{"\u2713"}</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div style={{ marginTop: 28 }}>
            <div className="doc-strip">
              <div className="doc-top">
                <div className="doc-avatar">{"\u{1F468}\u200D\u2695\uFE0F"}</div>
                <div>
                  <div className="doc-name">{doctorStripContent.name}</div>
                  <div className="doc-title">{doctorStripContent.title}</div>
                </div>
              </div>
              <div className="doc-quote">{"\u201C"}{doctorStripContent.quote}{"\u201D"}</div>
              <div className="doc-stats">
                {doctorStripContent.stats.map((stat) => (
                  <div key={stat.label} className="ds">
                    <div className="ds-n" style={{ color: stat.color, whiteSpace: "pre-line" }}>
                      {stat.count ? <AnimatedCount target={stat.count} /> : stat.value}
                    </div>
                    <div className="ds-l">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

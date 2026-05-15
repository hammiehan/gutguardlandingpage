"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/landing/Reveal";
import { whyInflammationContent } from "@/lib/landing-data";

export default function WhyInflammation() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = barRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="why">
      <div className="mx">
        <Reveal>
          <div className="section-tag" style={{ color: "var(--bl)" }}>
            {whyInflammationContent.tag}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-h" style={{ color: "var(--d1)" }}>
            Inflammation is the documented upstream
            <br />
            driver in virtually every major disease.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="section-body" style={{ maxWidth: 580 }}>
            {whyInflammationContent.paragraph}
          </p>
        </Reveal>

        <div className="disease-grid">
          {whyInflammationContent.diseases.map((disease, index) => (
            <Reveal key={disease.label} delay={0.08 + index * 0.04}>
              <div className="disease-card">
                <div className="disease-ico">{disease.icon}</div>
                <div className="disease-lbl">{disease.label}</div>
                <div className="disease-note">{disease.note}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="inflammation-bar" ref={barRef}>
            <div className="ibar-label">{whyInflammationContent.barLabel}</div>
            <div className="ibar-track">
              <div
                className="ibar-fill"
                style={{
                  width: isVisible ? `${whyInflammationContent.fillPercent}%` : "0%",
                  transition: "width 1.4s cubic-bezier(.25,0,.1,1)",
                }}
              />
            </div>
            <div className="ibar-markers">
              <span className="ibar-m" style={{ color: "var(--grn)" }}>Optimal</span>
              <span className="ibar-m" style={{ color: "var(--gld)" }}>Elevated</span>
              <span className="ibar-m" style={{ color: "var(--ter)" }}>High</span>
              <span className="ibar-m" style={{ color: "var(--red)" }}>Critical</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

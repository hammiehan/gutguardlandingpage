"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import StartBioScanButton from "@/components/auth/StartBioScanButton";
import Reveal from "@/components/landing/Reveal";
import { heroContent, heroRingStates, type HeroChip, type HeroState } from "@/lib/landing-data";

function getChipClass(tone: HeroChip["tone"]) {
  if (tone === "hi") {
    return "chip-hi";
  }

  if (tone === "mid") {
    return "chip-mid";
  }

  return "chip-ok";
}

function TrustIcon({ kind }: { kind: "shield" | "user" }) {
  if (kind === "user") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function Hero() {
  const [state, setState] = useState<HeroState>("before");
  const [displayScore, setDisplayScore] = useState(heroRingStates.before.score);
  const [ringDegrees, setRingDegrees] = useState(0);
  const scoreRef = useRef(heroRingStates.before.score);
  const initializedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const activeState = useMemo(() => heroRingStates[state], [state]);

  useEffect(() => {
    scoreRef.current = displayScore;
  }, [displayScore]);

  useEffect(() => {
    if (prefersReducedMotion) {
      initializedRef.current = true;
      setRingDegrees(heroRingStates.before.progressDegrees);
      setDisplayScore(heroRingStates.before.score);
      return;
    }

    const timer = window.setTimeout(() => {
      initializedRef.current = true;
      setRingDegrees(heroRingStates.before.progressDegrees);
    }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }

    setRingDegrees(activeState.progressDegrees);

    const start = scoreRef.current;
    const target = activeState.score;
    const duration = prefersReducedMotion ? 0 : 900;
    const startedAt = performance.now();
    let frame = 0;

    if (duration === 0) {
      setDisplayScore(target);
      return;
    }

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + (target - start) * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeState.progressDegrees, activeState.score, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let cycleState: HeroState = "before";
    const interval = window.setInterval(() => {
      cycleState = cycleState === "before" ? "after" : "before";
      setState(cycleState);
    }, 6000);

    return () => {
      window.clearInterval(interval);
    };
  }, [prefersReducedMotion]);

  return (
    <section id="hero">
      <div className="hero-noise" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="hero-body">
        <div className="mx">
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal>
                <div className="hero-tag">
                  <div className="tag-dot" />
                  {heroContent.tag}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="hero-h1">
                  {heroContent.titleLead.split("\n").map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                  {" "}
                  <em>
                    {heroContent.titleAccent.split("\n").map((line, index) => (
                      <span key={line}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </em>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="hero-body-copy">
                  <strong>That something is chronic inflammation</strong> — the documented upstream driver across virtually every major disease category. Your inflammatory load is measurable. It has a direction.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="hero-body-copy" style={{ marginBottom: 0 }}>
                  And once you can see the direction, <strong>you can change it.</strong> GutGuard BioScan puts a number on your inflammation. Your enrolled independent physician monitors your GLIS wellness score. A matched protocol moves it. <em style={{ color: "#fff", fontStyle: "normal", fontWeight: 600 }}>The direction is now yours.</em>
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="hero-btns">
                  <StartBioScanButton className="btn-primary" contentName="hero_cta">
                    Find My Score
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </StartBioScanButton>
                  <a href="#how" className="btn-ghost">
                    How it works
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="hero-trust">
                  <div className="trust-item">
                    <TrustIcon kind="shield" />
                    {heroContent.trustItems[0]}
                  </div>
                  <div className="trust-item">
                    <TrustIcon kind="user" />
                    {heroContent.trustItems[1]}
                  </div>
                  <div className="trust-item">
                    <TrustIcon kind="shield" />
                    {heroContent.trustItems[2]}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16} direction="left">
              <div className="hero-ring-side">
                <div className="ring-wrap hero-ring">
                  <div className="ring-glow" style={{ background: activeState.glow }} />
                  <div className="ring-trk" />
                  <div className="ring-fill" style={{ ["--ra" as string]: `${ringDegrees}deg` }} />
                  <div className="ring-ctr">
                    <span className="ring-score" style={{ color: activeState.color }}>
                      {displayScore}
                    </span>
                    <span className="ring-lbl">GLIS</span>
                  </div>
                </div>

                <div className="ring-verdict" style={{ color: activeState.color }}>
                  {activeState.verdict}
                </div>

                <div className="ring-chips">
                  {activeState.chips.map((chip) => (
                    <span key={chip.label} className={`chip-marker ${getChipClass(chip.tone)}`}>
                      {chip.label}
                    </span>
                  ))}
                </div>

                <div className="ring-toggle">
                  <button
                    type="button"
                    className={`rtog ${state === "before" ? "on" : ""}`}
                    onClick={() => setState("before")}
                  >
                    Day 0 — Before
                  </button>
                  <button
                    type="button"
                    className={`rtog ${state === "after" ? "on" : ""}`}
                    onClick={() => setState("after")}
                  >
                    Day 90 — After →
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

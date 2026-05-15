"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/landing/Reveal";
import { proofStats } from "@/lib/landing-data";

function AnimatedCount({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const duration = 1400;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [target]);

  return <>{count}</>;
}

export default function ProofStrip() {
  return (
    <section id="proof">
      <div className="mx">
        <div className="proof-row">
          {proofStats.map((stat, index) => (
            <Reveal key={stat.labelLines.join("-")} delay={index * 0.08}>
              <div className="proof-stat">
                <div className="proof-n" style={{ color: stat.color }}>
                  {index === 0 ? <AnimatedCount target={127} /> : stat.value}
                  {stat.suffix ? <span style={{ fontSize: ".55em", letterSpacing: 0 }}>{stat.suffix}</span> : null}
                </div>
                <div className="proof-l">
                  {stat.labelLines.map((line, lineIndex) => (
                    <span key={line}>
                      {lineIndex > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

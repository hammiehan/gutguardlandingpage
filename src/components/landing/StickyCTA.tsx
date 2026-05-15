"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight * 0.6 : window.innerHeight * 0.6;
      setIsVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div id="sticky" className={isVisible ? "on" : undefined}>
      <div className="sk-l">
        <div className="sk-title">GutGuard Protocol</div>
        <div className="sk-sub">Trial ₱1,299 · Grow ₱13,000 · Physician-reviewed</div>
      </div>
      <a href="#offer" className="sk-btn">
        Start My BioScan →
      </a>
    </div>
  );
}

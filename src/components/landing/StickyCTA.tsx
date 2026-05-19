"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById("offer");

    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", "#offer");
    window.ttq?.track("Contact", { content_name: "sticky_cta" });
  };

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
        <div className="sk-sub">
          Trial {"\u20B1"}1,299 {"\u00B7"} Grow {"\u20B1"}13,000 {"\u00B7"} Physician-reviewed
        </div>
      </div>
      <a href="#offer" className="sk-btn" onClick={handleClick}>
        Start My BioScan {"\u2192"}
      </a>
    </div>
  );
}

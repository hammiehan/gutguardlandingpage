"use client";

import { useEffect, useState } from "react";
import StartBioScanButton from "@/components/auth/StartBioScanButton";

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
        <div className="sk-sub">
          Trial {"\u20B1"}1,299 {"\u00B7"} Grow {"\u20B1"}13,000 {"\u00B7"} Physician-reviewed
        </div>
      </div>
      <StartBioScanButton className="sk-btn" contentName="sticky_cta" signedInChildren={<>Choose Your Protocol {"\u2192"}</>}>
        Start My BioScan {"\u2192"}
      </StartBioScanButton>
    </div>
  );
}

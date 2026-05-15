"use client";

import { useEffect, useState } from "react";

export default function FloatingWhatsapp() {
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
    <a
      id="wa"
      href="https://wa.me/639XXXXXXXXX?text=Hi%2C+I%27d+like+to+ask+about+GutGuard+BioScan"
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className={isVisible ? "on" : undefined}
    >
      {"\u{1F4AC}"}
    </a>
  );
}

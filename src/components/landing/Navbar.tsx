"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TikTokTrackedLink from "@/components/analytics/TikTokTrackedLink";

export default function Navbar() {
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsStuck(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav id="nav" className={isStuck ? "stuck" : undefined}>
      <Link href="/" className="nav-logo">
        <div className="nav-shield">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <span className="nav-wordmark">
          Gut<em>Guard</em>
        </span>
      </Link>
      <a href="gutguard-physician-acquisition.html" className="nav-dr">
        Are you a physician?
      </a>
      <TikTokTrackedLink href="#offer" className="nav-cta" eventPayload={{ content_name: "navbar_cta" }}>
        Start My BioScan {"\u2192"}
      </TikTokTrackedLink>
    </nav>
  );
}

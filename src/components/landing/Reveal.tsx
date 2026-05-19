"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealDirection = "up" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
};

function getOffset(direction: RevealDirection) {
  if (direction === "left") {
    return "rv-l";
  }

  if (direction === "right") {
    return "rv-r";
  }

  return "";
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const directionClass = getOffset(direction);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const isInitiallyVisible = rect.top < viewportHeight - 32 && rect.bottom > 0;

    if (isInitiallyVisible) {
      setIsInView(true);
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    setIsReady(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={["rv", directionClass, isReady ? "rv-ready" : "", isInView ? "in" : "", className].filter(Boolean).join(" ")}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

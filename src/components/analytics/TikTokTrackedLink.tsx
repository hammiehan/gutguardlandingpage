"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { TIKTOK_CONTACT_EVENT } from "@/lib/tiktok";

declare global {
  interface Window {
    ttq?: {
      track: (eventName: string, payload?: Record<string, unknown>) => void;
    };
  }
}

type TikTokTrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName?: string;
  eventPayload?: Record<string, unknown>;
};

export default function TikTokTrackedLink({
  eventName = TIKTOK_CONTACT_EVENT,
  eventPayload,
  onClick,
  href,
  ...props
}: TikTokTrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    window.ttq?.track(eventName, eventPayload);

    if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
      event.preventDefault();

      const target = document.querySelector<HTMLElement>(href);

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  return <a {...props} href={href} onClick={handleClick} />;
}

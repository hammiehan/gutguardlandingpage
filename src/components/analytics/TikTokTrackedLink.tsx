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
  ...props
}: TikTokTrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    window.ttq?.track(eventName, eventPayload);
  };

  return <a {...props} onClick={handleClick} />;
}

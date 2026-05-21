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
  purchaseClickPayload?: Record<string, unknown>;
};

export default function TikTokTrackedLink({
  eventName = TIKTOK_CONTACT_EVENT,
  eventPayload,
  purchaseClickPayload,
  onClick,
  href,
  ...props
}: TikTokTrackedLinkProps) {
  const logPurchaseClick = () => {
    if (!purchaseClickPayload || typeof window === "undefined") {
      return;
    }

    const payload = {
      ...purchaseClickPayload,
      page_url: window.location.href,
      referrer_url: document.referrer || null,
    };
    const body = JSON.stringify(payload);

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(
        "/api/purchase-clicks",
        new Blob([body], { type: "application/json" }),
      );
      return;
    }

    void fetch("/api/purchase-clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    window.ttq?.track(eventName, eventPayload);
    logPurchaseClick();

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

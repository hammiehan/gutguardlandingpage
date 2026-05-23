"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { TIKTOK_CONTACT_EVENT } from "@/lib/tiktok";

type StartBioScanButtonProps = {
  children?: ReactNode;
  className?: string;
  contentName?: string;
  authenticatedHref?: string;
  eventName?: string;
  eventPayload?: Record<string, unknown>;
  purchaseClickPayload?: Record<string, unknown>;
  style?: CSSProperties;
};

export default function StartBioScanButton({
  children = "Start My BioScan",
  className,
  contentName = "start_bioscan_cta",
  authenticatedHref,
  eventName = TIKTOK_CONTACT_EVENT,
  eventPayload,
  purchaseClickPayload,
  style,
}: StartBioScanButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleClick() {
    const supabase = getSupabaseBrowserClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    window.ttq?.track(eventName, eventPayload ?? { content_name: contentName });

    if (session && authenticatedHref) {
      const payload = {
        ...purchaseClickPayload,
        offer_href: authenticatedHref,
        page_url: window.location.href,
        referrer_url: document.referrer || null,
      };

      const body = JSON.stringify(payload);

      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon("/api/purchase-clicks", new Blob([body], { type: "application/json" }));
      } else {
        void fetch("/api/purchase-clicks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
      }

      window.open(authenticatedHref, "_blank", "noopener,noreferrer");
      return;
    }

    if (session) {
      if (pathname === "/") {
        const offerSection = document.getElementById("offer");

        if (offerSection) {
          offerSection.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "#offer");
          return;
        }
      }

      router.push("/#offer");
      return;
    }

    router.push("/login");
  }

  return (
    <button type="button" className={className} style={style} onClick={handleClick}>
      {children}
    </button>
  );
}

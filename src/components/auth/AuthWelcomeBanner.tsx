"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAuthUser } from "@/lib/auth/use-auth-user";

function getFirstName(email: string | undefined) {
  if (!email) {
    return "You";
  }

  const [localPart] = email.split("@");
  const [firstChunk] = localPart.split(/[._-]/);

  if (!firstChunk) {
    return "You";
  }

  return firstChunk.charAt(0).toUpperCase() + firstChunk.slice(1);
}

export default function AuthWelcomeBanner() {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, user } = useAuthUser();
  const justSignedIn = searchParams.get("signed_in") === "1";

  const welcomeName = useMemo(() => getFirstName(user?.email), [user?.email]);

  if (dismissed || !justSignedIn || isLoading || !user || pathname !== "/") {
    return null;
  }

  function handleDismiss() {
    setDismissed(true);
    router.replace("/#offer");
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 76,
        zIndex: 38,
        margin: "16px auto 0",
        width: "min(1120px, calc(100% - 32px))",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backdropFilter: "blur(12px)",
          background: "rgba(10, 17, 28, .84)",
          border: "1px solid rgba(92,184,130,.24)",
          borderRadius: 18,
          boxShadow: "0 18px 60px rgba(0,0,0,.28)",
          color: "#EAF3FF",
          display: "flex",
          gap: 16,
          justifyContent: "space-between",
          padding: "16px 18px",
        }}
      >
        <div>
          <div style={{ color: "#5cb882", fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>
            Signed In
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.6 }}>
            {welcomeName}, your account is active. Choose a BioScan protocol below to continue.
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,.14)",
            borderRadius: 999,
            color: "#EAF3FF",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 14px",
            whiteSpace: "nowrap",
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

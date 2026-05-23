"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StartBioScanButton from "@/components/auth/StartBioScanButton";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuthUser } from "@/lib/auth/use-auth-user";

export default function Navbar() {
  const [isStuck, setIsStuck] = useState(false);
  const router = useRouter();
  const { user } = useAuthUser();

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

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

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
      <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
        {user ? (
          <>
            <div style={{ color: "rgba(255,255,255,.72)", fontSize: 12, lineHeight: 1.35, textAlign: "right" }}>
              <div style={{ color: "#5cb882", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Signed in</div>
              <div style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,.16)",
                borderRadius: 999,
                color: "#fff",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                padding: "10px 14px",
              }}
            >
              Log out
            </button>
          </>
        ) : null}
        <StartBioScanButton className="nav-cta" contentName="navbar_cta" signedInChildren={<>Choose Your Protocol {"\u2192"}</>}>
          Start My BioScan {"\u2192"}
        </StartBioScanButton>
      </div>
    </nav>
  );
}

"use client";

import { useEffect } from "react";

function persistTtclid() {
  const currentUrl = new URL(window.location.href);
  const ttclid = currentUrl.searchParams.get("ttclid");

  if (!ttclid) {
    return;
  }

  document.cookie = `ttclid=${encodeURIComponent(ttclid)}; Max-Age=2592000; Path=/; SameSite=Lax`;
}

export default function TikTokBootstrap() {
  useEffect(() => {
    persistTtclid();
  }, []);

  return null;
}

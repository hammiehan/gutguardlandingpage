"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function getRedirectTo() {
  return `${window.location.origin}/auth/callback`;
}

function signInWithOAuth(provider: "google" | "facebook" | "github") {
  const supabase = getSupabaseBrowserClient();

  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getRedirectTo(),
    },
  });
}

export function signInWithGoogle() {
  return signInWithOAuth("google");
}

export function signInWithFacebook() {
  return signInWithOAuth("facebook");
}

export function signInWithGitHub() {
  return signInWithOAuth("github");
}

export function signInWithEmail(email: string) {
  const supabase = getSupabaseBrowserClient();

  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`,
    },
  });
}

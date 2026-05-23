import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

const EMAIL_VERIFY_TYPES = new Set([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
] as const);

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");

  if (!tokenHash || !type || !EMAIL_VERIFY_TYPES.has(type as (typeof EMAIL_VERIFY_TYPES extends Set<infer T> ? T : never))) {
    return NextResponse.redirect(new URL("/login?error=email_confirmation_failed", requestUrl.origin));
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "signup" | "invite" | "magiclink" | "recovery" | "email_change" | "email",
    });

    if (error) {
      return NextResponse.redirect(new URL("/login?error=email_confirmation_failed", requestUrl.origin));
    }

    return NextResponse.redirect(new URL("/?signed_in=1#offer", requestUrl.origin));
  } catch {
    return NextResponse.redirect(new URL("/login?error=email_confirmation_failed", requestUrl.origin));
  }
}

import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth_callback_failed", requestUrl.origin));
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL("/login?error=auth_callback_failed", requestUrl.origin));
    }

    return NextResponse.redirect(new URL("/", requestUrl.origin));
  } catch {
    return NextResponse.redirect(new URL("/login?error=auth_callback_failed", requestUrl.origin));
  }
}

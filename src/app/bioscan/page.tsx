import Link from "next/link";
import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function BioScanPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">BioScan Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">You are signed in.</h1>
          <p className="mt-3 text-base text-slate-300">
            Your GutGuard BioScan session is active for <span className="font-medium text-white">{user.email}</span>.
          </p>
          <p className="mt-6 text-sm leading-7 text-slate-300">
            This page is now the post-login destination. Replace it with your actual BioScan intake, upload flow, or
            patient dashboard when that part of the product is ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import SocialLoginModal from "@/components/auth/SocialLoginModal";
import {
  signInWithEmail,
  signInWithFacebook,
  signInWithGitHub,
  signInWithGoogle,
} from "@/lib/auth/social-login";

const ERROR_MESSAGES: Record<string, string> = {
  auth_callback_failed: "We could not complete your sign-in. Please try again.",
  email_confirmation_failed: "We could not verify your email sign-in link. Please request a new one.",
  tiktok_invalid_state: "Your TikTok sign-in session expired. Please try again.",
  tiktok_callback_failed: "We could not complete your TikTok sign-in. Please try again.",
};

function LoginPageContent() {
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [emailPending, setEmailPending] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);

  const errorCode = searchParams.get("error");
  const errorMessage = errorCode ? ERROR_MESSAGES[errorCode] ?? "Sign-in failed. Please try again." : null;

  async function handleGoogleLogin() {
    await signInWithGoogle();
  }

  async function handleFacebookLogin() {
    await signInWithFacebook();
  }

  async function handleGitHubLogin() {
    await signInWithGitHub();
  }

  function handleTikTokLogin() {
    window.location.href = "/api/auth/tiktok/start";
  }

  async function handleEmailSubmit() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailMessage("Enter your email address to receive a sign-in link.");
      return;
    }

    setEmailPending(true);
    setEmailMessage(null);

    const { error } = await signInWithEmail(normalizedEmail);

    if (error) {
      setEmailMessage(error.message);
      setEmailPending(false);
      return;
    }

    setEmailMessage("Check your inbox for a secure sign-in link.");
    setEmailPending(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-xl flex-col items-center justify-center text-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">Account Access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Continue to GutGuard</h1>
          <p className="mt-3 text-base text-slate-300">
            Sign in with TikTok, Google, Facebook, GitHub, or email to continue.
          </p>

          {errorMessage ? (
            <p className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Open sign-in options
          </button>
        </div>
      </div>

      <SocialLoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoogleLogin={handleGoogleLogin}
        onFacebookLogin={handleFacebookLogin}
        onGitHubLogin={handleGitHubLogin}
        onTikTokLogin={handleTikTokLogin}
        email={email}
        emailPending={emailPending}
        emailMessage={emailMessage}
        onEmailChange={setEmail}
        onEmailSubmit={handleEmailSubmit}
      />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}

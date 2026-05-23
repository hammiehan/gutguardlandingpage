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

function LoginPageOverlayContent() {
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
    <>
      {errorMessage ? (
        <div
          style={{
            left: "50%",
            maxWidth: 560,
            position: "fixed",
            top: 92,
            transform: "translateX(-50%)",
            width: "calc(100% - 32px)",
            zIndex: 55,
          }}
        >
          <p
            style={{
              background: "rgba(212, 32, 32, .12)",
              border: "1px solid rgba(212, 32, 32, .28)",
              borderRadius: 18,
              boxShadow: "0 18px 50px rgba(0,0,0,.22)",
              color: "#ffe2e2",
              fontSize: 14,
              lineHeight: 1.55,
              padding: "14px 18px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </p>
        </div>
      ) : null}

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
    </>
  );
}

export default function LoginPageOverlay() {
  return (
    <Suspense fallback={null}>
      <LoginPageOverlayContent />
    </Suspense>
  );
}

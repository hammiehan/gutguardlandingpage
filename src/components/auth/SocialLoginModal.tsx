"use client";

import type { ReactNode } from "react";

type SocialLoginModalProps = {
  open: boolean;
  onClose: () => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  onGitHubLogin: () => void;
  onTikTokLogin: () => void;
  email: string;
  emailPending: boolean;
  emailMessage: string | null;
  onEmailChange: (value: string) => void;
  onEmailSubmit: () => void;
};

type ProviderButtonProps = {
  label: string;
  onClick: () => void;
  icon: ReactNode;
  className: string;
};

function ProviderButton({ label, onClick, icon, className }: ProviderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
      <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function SocialLoginModal({
  open,
  onClose,
  onGoogleLogin,
  onFacebookLogin,
  onGitHubLogin,
  onTikTokLogin,
  email,
  emailPending,
  emailMessage,
  onEmailChange,
  onEmailSubmit,
}: SocialLoginModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close social login modal"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-login-modal-title"
        aria-describedby="social-login-modal-description"
        className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="pr-10">
          <h2 id="social-login-modal-title" className="text-2xl font-semibold tracking-tight text-slate-900">
            Sign in to continue
          </h2>
          <p id="social-login-modal-description" className="mt-2 text-sm text-slate-600">
            Choose one login method.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <ProviderButton
            label="Continue with Google"
            onClick={onGoogleLogin}
            className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285v3.955h5.518c-.223 1.273-.963 2.352-2.074 3.076l3.355 2.603c1.955-1.8 3.081-4.451 3.081-7.604 0-.724-.065-1.419-.184-2.03z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.79 0 5.13-.925 6.84-2.502l-3.355-2.603c-.925.62-2.104.992-3.485.992-2.68 0-4.95-1.81-5.762-4.244H2.77v2.684A9.997 9.997 0 0 0 12 22z"
                />
                <path
                  fill="#4A90E2"
                  d="M6.238 13.643A5.996 5.996 0 0 1 5.916 12c0-.57.099-1.125.322-1.643V7.673H2.77A9.997 9.997 0 0 0 2 12c0 1.61.387 3.131 1.07 4.327z"
                />
                <path
                  fill="#FBBC05"
                  d="M12 6.113c1.517 0 2.875.521 3.944 1.547l2.96-2.96C17.116 3.043 14.778 2 12 2 8.092 2 4.728 4.238 2.77 7.673l3.468 2.684C7.05 7.923 9.32 6.113 12 6.113z"
                />
              </svg>
            }
          />

          <ProviderButton
            label="Continue with Facebook"
            onClick={onFacebookLogin}
            className="border-blue-700 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.87.24-1.46 1.49-1.46H16V4.96c-.18-.02-.81-.08-1.54-.08-3.06 0-4.96 1.87-4.96 5.3V11H7v3h2.5v7h4z" />
              </svg>
            }
          />

          <ProviderButton
            label="Continue with GitHub"
            onClick={onGitHubLogin}
            className="border-slate-800 bg-slate-900 text-white hover:bg-black focus:ring-slate-500"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2z" />
              </svg>
            }
          />

          <ProviderButton
            label="Continue with TikTok"
            onClick={onTikTokLogin}
            className="border-slate-900 bg-slate-950 text-white hover:bg-black focus:ring-slate-500"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M14.5 3c.4 2.14 1.67 3.78 3.78 4.35v3.09a7.5 7.5 0 0 1-3.51-1.09v5.72a5.84 5.84 0 1 1-5.84-5.84c.28 0 .56.02.83.07v3.17a2.7 2.7 0 1 0 1.87 2.57V3z" />
              </svg>
            }
          />
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <p className="text-sm font-semibold text-slate-900">Or continue with email</p>
          <div className="mt-3 flex flex-col gap-3">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            />
            <button
              type="button"
              onClick={onEmailSubmit}
              disabled={emailPending}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {emailPending ? "Sending link..." : "Send magic link"}
            </button>
          </div>

          {emailMessage ? (
            <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {emailMessage}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

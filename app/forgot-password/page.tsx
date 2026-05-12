"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
      if (result.error) {
        setError(result.error.message ?? "Failed to send reset email");
      } else {
        setSent(true);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="mx-auto w-full max-w-sm text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Check your email</h1>
          <p className="text-sm text-muted-foreground mb-2">We sent a password reset link to</p>
          <p className="text-sm font-medium text-primary mb-6">{email}</p>
          <p className="text-xs text-muted-foreground">
            Click the link in the email to reset your password. Check your spam folder if you don&apos;t see it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Venarium</p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Forgot password?</h1>
          <p className="text-sm text-muted-foreground">Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-none bg-destructive/10 border-l-2 border-destructive p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="rounded-none border-border focus:border-primary h-11"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.12em] transition hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Remember your password?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
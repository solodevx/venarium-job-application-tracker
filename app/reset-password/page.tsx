"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or expired reset link");
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });
      if (result.error) {
        setError(result.error.message ?? "Failed to reset password");
      } else {
        router.push("/sign-in?reset=true");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Venarium</p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Reset password</h1>
          <p className="text-sm text-muted-foreground">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-none bg-destructive/10 border-l-2 border-destructive p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="rounded-none border-border focus:border-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-xs uppercase tracking-widest text-muted-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              className="rounded-none border-border focus:border-primary h-11"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.12em] transition hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
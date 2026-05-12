"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

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
        <p className="text-sm text-muted-foreground mb-2">
          We sent a verification link to
        </p>
        {email && (
          <p className="text-sm font-medium text-primary mb-6">{email}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Click the link in the email to verify your account. Check your spam folder if you don&apos;t see it.
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
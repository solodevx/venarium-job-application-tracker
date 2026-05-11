"use client";

import { useSession } from "@/lib/auth/auth-client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroCta() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Link href="/dashboard" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto h-11 bg-primary px-8 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-foreground hover:text-background active:bg-foreground active:text-background flex items-center justify-center gap-2">
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </button>
      </Link>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto">
      <Link href="/sign-up" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto h-11 bg-primary px-8 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-foreground hover:text-background active:bg-foreground active:text-background flex items-center justify-center gap-2">
          Start for free
          <ArrowRight className="h-4 w-4" />
        </button>
      </Link>
      <Link href="/sign-in" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto h-11 border border-border px-8 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground">
          Log In
        </button>
      </Link>
    </div>
  );
}

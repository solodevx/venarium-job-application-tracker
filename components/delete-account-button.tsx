"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton({ variant = "settings" }: { variant?: "settings" | "dropdown" }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/delete-account", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to delete account");
        setLoading(false);
        setConfirming(false);
        return;
      }
      router.push("/sign-in");
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
      setConfirming(false);
    }
  }

  if (variant === "dropdown") {
    return (
      <>
        {confirming ? (
          <div className="px-2 py-2 space-y-2">
            <p className="text-xs text-destructive font-medium">Are you sure?</p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 h-7 bg-destructive text-white text-xs font-medium uppercase tracking-widest transition active:bg-destructive/80 disabled:opacity-50"
              >
                {loading ? "..." : "Yes"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 h-7 border border-border text-xs font-medium uppercase tracking-widest transition hover:bg-muted"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="w-full text-right px-2 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors duration-200"
          >
            Delete Account
          </button>
        )}
        {error && <p className="text-xs text-destructive px-2 pb-1">{error}</p>}
      </>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-none bg-destructive/10 border-l-2 border-destructive p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {confirming ? (
        <div className="space-y-3">
          <p className="text-sm text-destructive font-medium">Are you sure? This action is irreversible — all your data will be permanently deleted.</p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 h-11 bg-destructive text-white text-xs font-medium uppercase tracking-[0.12em] transition active:bg-destructive/80 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Yes, delete my account"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="flex-1 h-11 border border-border text-xs font-medium uppercase tracking-[0.12em] transition hover:bg-muted text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="w-full h-11 border border-destructive text-xs font-medium uppercase tracking-[0.12em] text-destructive transition hover:bg-destructive hover:text-white"
        >
          Delete Account
        </button>
      )}
    </div>
  );
}
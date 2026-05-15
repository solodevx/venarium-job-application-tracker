"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signUp.email({ 
  name, 
  email, 
  password,
  callbackURL: "/dashboard",
});
      if (result.error) {
  setError(result.error.message ?? "Failed to sign up");
} else {
  router.push("/verify-email?email=" + encodeURIComponent(email));
}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left — Form 65% */}
      <div className="flex w-full md:w-[65%] flex-col justify-center px-8 py-12 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Venarium
            </p>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Create an account.
            </h1>
            <p className="text-sm text-muted-foreground">
              Start tracking your job applications today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-none bg-destructive/10 border-l-2 border-destructive p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-none border-border focus:border-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-border focus:border-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.12em] transition hover:bg-foreground hover:text-background disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Start for free"}
            </button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right — Image 35% */}
      <div className="hidden md:block md:w-[35%] relative">
        <Image
          src="/images/sign-up-hero.jpg"
          alt="Sign up visual"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

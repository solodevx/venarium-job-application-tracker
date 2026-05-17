"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, signUp } from "@/lib/auth/auth-client";
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

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground tracking-widest">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                })
              }
              className="w-full h-11 border border-border text-xs font-medium uppercase tracking-[0.12em] text-foreground transition hover:bg-muted flex items-center justify-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
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
          sizes="35vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

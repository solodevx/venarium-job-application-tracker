import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a free Venarium account and start tracking your job applications.",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
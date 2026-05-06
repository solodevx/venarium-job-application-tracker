"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton({ variant = "dropdown" }: { variant?: "dropdown" | "mobile" }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.data) {
      router.push("/sign-in");
    } else {
      alert("Error signing out");
    }
  };

  if (variant === "mobile") {
    return (
      <button
        className="w-full text-right px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white bg-[#DB5461] transition-all duration-200 active:bg-red-500"
        onClick={handleSignOut}
      >
        Log Out
      </button>
    );
  }

  return (
    <DropdownMenuItem
      className="rounded-none text-white bg-[#DB5461] focus:bg-red-500 focus:text-white transition-all duration-200"
      onClick={handleSignOut}
    >
      Log Out
    </DropdownMenuItem>
  );
}
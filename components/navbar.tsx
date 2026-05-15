"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";
import Image from "next/image";
import { useState } from "react";
import DeleteAccountButton from "./delete-account-button";

export default function Navbar() {
  const { data: session } = useSession();
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "U";
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  return (
    <nav className="border-b border-border bg-background transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-xl font-bold text-primary"
        >
          <Image
            src="/logo/logo.svg"
            alt="Venarium Logo"
            width={32}
            height={32}
          />
          VENARIUM
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="relative shrink-0 rounded-full p-2 transition-all duration-200 ease-in-out hover:bg-muted"
            aria-label="Toggle theme"
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-4 w-4 text-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-foreground" />
              ))}
          </button>
          <button
            className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-1.5 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
          {session?.user ? (
            <>
              <Link href="/dashboard" className="hidden md:block">
                <Button
                  variant="ghost"
                  className="h-11 rounded-none border border-border px-5 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition hover:bg-muted hover:text-foreground hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
                >
                  Dashboard
                </Button>
              </Link>
              <span className="hidden md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group/avatar-trigger relative shrink-0 rounded-full p-0 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-secondary-foreground/50"
                    >
                      <Avatar className="size-full">
                        <AvatarImage
                          src={session.user.image ?? undefined}
                          alt={`${session.user.name ?? "User"} profile photo`}
                        />
                        <AvatarFallback className="bg-primary text-white transition-all duration-200 ease-in-out group-hover/avatar-trigger:bg-card group-hover/avatar-trigger:text-primary group-data-[state=open]/avatar-trigger:bg-card group-data-[state=open]/avatar-trigger:text-primary">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-56 rounded-none"
                    align="end"
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1 items-end text-right">
                        <p className="text-sm font-medium leading-none uppercase">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground lowercase">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="mx-auto w-[95%]" />
                    <DropdownMenuItem
                      asChild
                      className="rounded-none justify-end"
                    >
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="mx-auto w-[95%]" />
                    <SignOutButton />
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="hidden md:block">
                <Button
                  variant="ghost"
                  className="h-11 rounded-none border border-border px-5 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition hover:bg-muted hover:text-foreground hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up" className="hidden md:block">
                <Button className="h-11 rounded-none bg-primary px-6 text-xs font-medium uppercase tracking-[0.12em] text-white transition hover:bg-card hover:text-primary hover:ring-2 hover:ring-primary hover:ring-offset-2">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-primary text-white px-4 py-6 flex flex-col gap-3 animate-in slide-in-from-top duration-300">
          {session?.user ? (
            <>
              <div className="flex flex-col space-y-1 pb-3 border-b border-primary-foreground/30 items-end gap-2">
                <Avatar className="size-12 transition-all duration-200 active:ring-2 active:ring-white">
                  <AvatarImage
                    src={session.user.image ?? undefined}
                    alt={`${session.user.name ?? "User"} profile photo`}
                  />
                  <AvatarFallback className="bg-white text-primary text-lg font-semibold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium uppercase">
                  {session.user.name}
                </p>
                <p className="text-xs text-primary-foreground/70 lowercase">
                  {session.user.email}
                </p>
              </div>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-end h-11 rounded-none border border-primary-foreground px-5 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition active:bg-primary-foreground active:text-primary"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/settings" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-end h-11 rounded-none border border-primary-foreground px-5 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition active:bg-primary-foreground active:text-primary"
                >
                  Settings
                </Button>
              </Link>
              <SignOutButton variant="mobile" />
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-end h-11 rounded-none border border-primary-foreground px-5 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition active:bg-primary-foreground active:text-primary"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                <Button className="w-full h-11 rounded-none bg-primary-foreground px-6 text-xs font-medium uppercase tracking-[0.12em] text-primary transition active:bg-primary active:text-primary-foreground active:border active:border-primary-foreground justify-end">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

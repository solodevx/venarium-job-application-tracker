"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "U";
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
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
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="h-11 rounded-none border border-zinc-300 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-800 transition hover:bg-zinc-100 hover:text-black hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="group/avatar-trigger shrink-0 cursor-pointer rounded-full bg-primary p-0 transition-colors hover:bg-zinc-100 hover:text-black"
                  >
                    <Avatar className="flex size-full items-center justify-center overflow-hidden after:border-0">
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={`${session.user.name ?? "User"} profile photo`}  
                      />
                      <AvatarFallback className="flex size-full items-center justify-center bg-primary text-sm font-semibold leading-none tracking-normal text-secondary-foreground uppercase transition group-hover/avatar-trigger:bg-zinc-100 group-hover/avatar-trigger:text-black">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="h-11 rounded-none border border-zinc-300 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-800 transition hover:bg-zinc-100 hover:text-black hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="h-11 rounded-none bg-primary px-6 text-xs font-semibold uppercase tracking-[0.12em] text-secondary-foreground transition hover:bg-secondary-foreground hover:text-primary hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
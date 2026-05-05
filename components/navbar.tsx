"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="h-11 rounded-none border border-zinc-300 px-5 text-xs font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-100 hover:text-black hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
                >
                  Dashboard
                </Button>
              </Link>
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
                      <AvatarFallback className="bg-primary text-secondary-foreground transition-all duration-200 ease-in-out group-hover/avatar-trigger:bg-secondary-foreground group-hover/avatar-trigger:text-primary group-data-[state=open]/avatar-trigger:bg-secondary-foreground group-data-[state=open]/avatar-trigger:text-primary">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 rounded-none" align="end">
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
                  <DropdownMenuSeparator className="mx-auto w-[95%]" />
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="h-11 rounded-none border border-zinc-300 px-5 text-xs font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-100 hover:text-black hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="h-11 rounded-none bg-primary px-6 text-xs font-medium uppercase tracking-[0.12em] text-secondary-foreground transition hover:bg-secondary-foreground hover:text-primary hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background">
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
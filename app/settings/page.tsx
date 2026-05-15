"use client";

import { useSession } from "@/lib/auth/auth-client";
import { authClient } from "@/lib/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect, Suspense } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteAccountButton from "@/components/delete-account-button";

function SettingsContent() {
  const { data: session, refetch } = useSession();
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "U";
  const router = useRouter();

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [avatarSuccess, setAvatarSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isOAuthUser, setIsOAuthUser] = useState(false);
  const [accountsLoading, setAccountsLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, router]);

  useEffect(() => {
    async function checkAccountType() {
      try {
        const result = await authClient.listAccounts();
        const accounts = result.data ?? [];
        const hasOAuth = accounts.some((a) => a.providerId !== "credential");
        const hasCredential = accounts.some(
          (a) => a.providerId === "credential",
        );
        setIsOAuthUser(hasOAuth && !hasCredential);
      } catch {
        setIsOAuthUser(false);
      } finally {
        setAccountsLoading(false);
      }
    }
    if (session?.user) checkAccountType();
  }, [session]);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarLoading(true);
    setAvatarError("");
    setAvatarSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setAvatarError(uploadData.error ?? "Upload failed");
        return;
      }

      const result = await authClient.updateUser({
        image: uploadData.url,
      });

      if (result.error) {
        setAvatarError(result.error.message ?? "Failed to update avatar");
      } else {
        setAvatarSuccess("Profile picture updated!");
        refetch();
      }
    } catch {
      setAvatarError("An unexpected error occurred");
    } finally {
      setAvatarLoading(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    try {
      if (isOAuthUser) {
        const result = await authClient.changePassword({
          newPassword: passwordData.newPassword,
          currentPassword: "",
        });
        if (result.error) {
          setPasswordError(result.error.message ?? "Failed to set password");
        } else {
          setPasswordSuccess("Password added successfully!");
          setIsOAuthUser(false);
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } else {
        const result = await authClient.changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        });
        if (result.error) {
          setPasswordError(result.error.message ?? "Failed to change password");
        } else {
          setPasswordSuccess("Password changed successfully!");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      }
    } catch {
      setPasswordError("An unexpected error occurred");
    } finally {
      setPasswordLoading(false);
    }
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-2xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Account
          </p>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Settings
          </h1>
        </div>

        {/* Profile Picture */}
        <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Profile Picture
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt={session.user.name ?? "User"}
                />
                <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarLoading}
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center hover:bg-foreground transition-colors duration-200"
                title="Change profile picture"
                aria-label="Change profile picture"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                title="Upload profile picture"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {session.user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {session.user.email}
              </p>
              {avatarLoading && (
                <p className="text-xs text-muted-foreground mt-1">
                  Uploading...
                </p>
              )}
              {avatarError && (
                <p className="text-xs text-destructive mt-1">{avatarError}</p>
              )}
              {avatarSuccess && (
                <p className="text-xs text-accent mt-1">{avatarSuccess}</p>
              )}
            </div>
          </div>
        </div>

        {/* Change / Add Password */}
        <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            {isOAuthUser ? "Add Password" : "Change Password"}
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            {isOAuthUser
              ? "You signed in with Google. Add a password to also sign in with email."
              : "Update your account password."}
          </p>
          {accountsLoading ? (
            <p className="text-xs text-muted-foreground">Loading...</p>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {passwordError && (
                <div className="rounded-none bg-destructive/10 border-l-2 border-destructive p-3 text-sm text-destructive">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="rounded-none bg-accent/10 border-l-2 border-accent p-3 text-sm text-accent">
                  {passwordSuccess}
                </div>
              )}
              {!isOAuthUser && (
                <div className="space-y-2">
                  <Label
                    htmlFor="currentPassword"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="rounded-none border-border focus:border-primary h-11"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {isOAuthUser ? "Password" : "New Password"}
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  minLength={8}
                  className="rounded-none border-border focus:border-primary h-11"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  minLength={8}
                  className="rounded-none border-border focus:border-primary h-11"
                />
              </div>
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full h-11 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.12em] transition hover:bg-foreground hover:text-background disabled:opacity-50"
              >
                {passwordLoading
                  ? "Saving..."
                  : isOAuthUser
                    ? "Add Password"
                    : "Update Password"}
              </button>
            </form>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-destructive/30">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-destructive mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Once you delete your account all your data will be permanently
            removed. This cannot be undone.
          </p>
          <DeleteAccountButton variant="settings" />
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsContent />
    </Suspense>
  );
}

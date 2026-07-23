"use client";

import * as React from "react";
import Image from "next/image";
import { Check } from "@phosphor-icons/react";
import { Field } from "@/components/auth/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/auth/password-field";
import type { DashUser } from "@/types/dashboard";
import { updateProfile, updatePassword } from "@/lib/settings-actions";
import { avatar, cn } from "@/lib/utils";

const LEVELS = ["ND", "HND", "BSc", "PGD", "MSc", "PhD"];

function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-border-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[1.375rem]" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function SettingsForm({ user }: { user: DashUser }) {
  const [profile, setProfile] = React.useState({
    name: user.name,
    email: user.email,
    institution: user.institution,
    department: user.department,
    level: user.level,
  });
  const [prefs, setPrefs] = React.useState({
    purchases: true,
    priceDrops: true,
    newMatches: false,
    newsletter: true,
  });
  const [password, setPassword] = React.useState({ current: "", next: "" });
  const [saved, setSaved] = React.useState<string | null>(null);
  const [error, setError] = React.useState<{ section: string; message: string } | null>(null);
  const [pending, startTransition] = React.useTransition();

  function flashSaved(section: string) {
    setSaved(section);
    window.setTimeout(() => setSaved((s) => (s === section ? null : s)), 2500);
  }

  function saveProfile() {
    setError(null);
    const fd = new FormData();
    fd.set("name", profile.name);
    fd.set("email", profile.email);
    fd.set("institution", profile.institution);
    fd.set("department", profile.department);
    fd.set("level", profile.level);
    startTransition(async () => {
      const res = await updateProfile(fd);
      if (res.ok) flashSaved("profile");
      else setError({ section: "profile", message: res.error ?? "Could not save." });
    });
  }

  function savePassword() {
    setError(null);
    const fd = new FormData();
    fd.set("current", password.current);
    fd.set("next", password.next);
    startTransition(async () => {
      const res = await updatePassword(fd);
      if (res.ok) {
        flashSaved("password");
        setPassword({ current: "", next: "" });
      } else {
        setError({ section: "password", message: res.error ?? "Could not update." });
      }
    });
  }

  const field = (k: keyof typeof profile, v: string) =>
    setProfile((p) => ({ ...p, [k]: v }));

  return (
    <div className="grid gap-6">
      <Card title="Profile" description="This information appears on your receipts and reviews.">
        <div className="flex items-center gap-4">
          <Image
            src={avatar(user.avatarSeed)}
            alt=""
            width={64}
            height={64}
            className="size-16 rounded-full object-cover"
          />
          <p className="text-sm text-muted-foreground">
            Your avatar is generated automatically and is unique to your account.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveProfile();
          }}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          <Field id="name" label="Full name">
            <Input id="name" value={profile.name} onChange={(e) => field("name", e.target.value)} className="h-12" />
          </Field>
          <Field id="email" label="Email address">
            <Input id="email" type="email" value={profile.email} onChange={(e) => field("email", e.target.value)} className="h-12" />
          </Field>
          <Field id="institution" label="Institution">
            <Input id="institution" value={profile.institution} onChange={(e) => field("institution", e.target.value)} className="h-12" />
          </Field>
          <Field id="department" label="Department">
            <Input id="department" value={profile.department} onChange={(e) => field("department", e.target.value)} className="h-12" />
          </Field>
          <Field id="level" label="Level">
            <select
              id="level"
              value={profile.level}
              onChange={(e) => field("level", e.target.value)}
              className="h-12 w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-4 text-[0.95rem] text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex flex-col gap-2 sm:col-span-2">
            {error?.section === "profile" ? (
              <p className="text-sm font-medium text-rose">{error.message}</p>
            ) : null}
            <Button type="submit" size="md" disabled={pending}>
              {saved === "profile" ? (
                <>
                  <Check weight="bold" className="size-4" aria-hidden />
                  Saved
                </>
              ) : pending ? (
                "Saving…"
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Email notifications" description="Choose what we email you about.">
        <div className="divide-y divide-border">
          <Switch
            checked={prefs.purchases}
            onChange={(v) => setPrefs((p) => ({ ...p, purchases: v }))}
            label="Purchase receipts"
            description="Confirmation and receipt after every payment"
          />
          <Switch
            checked={prefs.priceDrops}
            onChange={(v) => setPrefs((p) => ({ ...p, priceDrops: v }))}
            label="Price drops"
            description="When a resource on your wishlist gets cheaper"
          />
          <Switch
            checked={prefs.newMatches}
            onChange={(v) => setPrefs((p) => ({ ...p, newMatches: v }))}
            label="Saved-search matches"
            description="New resources that match your saved searches"
          />
          <Switch
            checked={prefs.newsletter}
            onChange={(v) => setPrefs((p) => ({ ...p, newsletter: v }))}
            label="Newsletter"
            description="Study guides and platform updates"
          />
        </div>
      </Card>

      <Card title="Password" description="Update the password you use to sign in.">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            savePassword();
          }}
          className="grid gap-4 sm:max-w-md"
        >
          <Field id="current" label="Current password">
            <PasswordField
              id="current"
              value={password.current}
              onChange={(v) => setPassword((p) => ({ ...p, current: v }))}
            />
          </Field>
          <Field id="next" label="New password">
            <PasswordField
              id="next"
              value={password.next}
              onChange={(v) => setPassword((p) => ({ ...p, next: v }))}
              autoComplete="new-password"
              placeholder="Create a new password"
              showStrength
            />
          </Field>
          <div className="grid gap-2">
            {error?.section === "password" ? (
              <p className="text-sm font-medium text-rose">{error.message}</p>
            ) : null}
            <Button type="submit" size="md" disabled={pending} className="justify-self-start">
              {saved === "password" ? (
                <>
                  <Check weight="bold" className="size-4" aria-hidden />
                  Updated
                </>
              ) : pending ? (
                "Updating…"
              ) : (
                "Update password"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  List,
  X,
  Bell,
  CaretDown,
  ArrowSquareOut,
  SignOut,
  Gear,
  Storefront,
} from "@phosphor-icons/react";
import { Logo } from "@/components/layout/logo";
import { dashNav } from "./nav-items";
import { currentUser, notifications } from "@/lib/dashboard-data";
import { avatar, cn } from "@/lib/utils";

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="grid gap-1" aria-label="Dashboard">
      {dashNav.map((item) => {
        const active = isActive(pathname, item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-sm)]"
                : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground",
            )}
          >
            <item.icon
              weight={active ? "fill" : "regular"}
              className="size-5 shrink-0"
              aria-hidden
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <Link
      href="/browse"
      className="flex items-center gap-3 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
    >
      <Storefront weight="bold" className="size-5" aria-hidden />
      Back to marketplace
    </Link>
  );
}

function UserMenu() {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/dashboard/notifications"
        aria-label={`Notifications, ${unread} unread`}
        className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground"
      >
        <Bell weight="bold" className="size-5" aria-hidden />
        {unread > 0 ? (
          <span className="absolute right-1.5 top-1.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[0.6rem] font-bold text-white">
            {unread}
          </span>
        ) : null}
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-surface-subtle"
          >
            <Image
              src={avatar(currentUser.avatarSeed)}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <span className="hidden text-sm font-semibold text-foreground sm:block">
              {currentUser.name.split(" ")[0]}
            </span>
            <CaretDown weight="bold" className="size-3.5 text-faint-foreground" aria-hidden />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="z-[90] w-56 rounded-2xl border border-border bg-surface p-1.5 shadow-[var(--shadow-lg)]"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {currentUser.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
            <div className="my-1 h-px bg-border" />
            <DropdownMenu.Item asChild>
              <Link
                href="/dashboard/settings"
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground outline-none transition-colors hover:bg-surface-subtle data-[highlighted]:bg-surface-subtle"
              >
                <Gear weight="bold" className="size-4 text-muted-foreground" aria-hidden />
                Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                href="/"
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground outline-none transition-colors hover:bg-surface-subtle data-[highlighted]:bg-surface-subtle"
              >
                <ArrowSquareOut weight="bold" className="size-4 text-muted-foreground" aria-hidden />
                View site
              </Link>
            </DropdownMenu.Item>
            <div className="my-1 h-px bg-border" />
            <DropdownMenu.Item asChild>
              <Link
                href="/login"
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-rose outline-none transition-colors hover:bg-rose/5 data-[highlighted]:bg-rose/5"
              >
                <SignOut weight="bold" className="size-4" aria-hidden />
                Log out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-[100dvh] bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100dvh] flex-col border-r border-border bg-surface p-4 lg:flex">
        <div className="px-2 py-2">
          <Link href="/" aria-label="Sparklyn home">
            <Logo />
          </Link>
        </div>
        <div className="mt-6 flex-1">
          <SidebarNav />
        </div>
        <SidebarFooter />
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border bg-surface/85 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-subtle lg:hidden"
                >
                  <List weight="bold" className="size-6" aria-hidden />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease] lg:hidden" />
                <Dialog.Content className="fixed inset-y-0 left-0 z-[80] flex w-[82%] max-w-xs flex-col bg-surface p-4 shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[slide-in-left_0.28s_cubic-bezier(0.16,1,0.3,1)] lg:hidden">
                  <div className="flex items-center justify-between px-2 py-2">
                    <Logo />
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle"
                      >
                        <X weight="bold" className="size-5" aria-hidden />
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Title className="sr-only">Dashboard navigation</Dialog.Title>
                  <div className="mt-6 flex-1">
                    <SidebarNav onNavigate={() => setOpen(false)} />
                  </div>
                  <SidebarFooter />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <Link href="/" className="lg:hidden" aria-label="Sparklyn home">
              <Logo />
            </Link>
          </div>

          <UserMenu />
        </header>

        <main id="main" className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

import { ShieldCheck, Lock } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./logo";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Research Projects", href: "/browse?type=research-project" },
      { label: "Past Questions", href: "/browse?type=past-questions" },
      { label: "Business Plans", href: "/browse?type=business-plan" },
      { label: "Journals", href: "/browse?type=journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Refund policy", href: "/refunds" },
      { label: "Browse resources", href: "/browse" },
      { label: "Study assistant", href: "/dashboard/assistant" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Refund policy", href: "/refunds" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The academic marketplace helping Nigerian students find, preview and
              download vetted resources in seconds.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Lock weight="fill" className="size-3.5 text-emerald" aria-hidden />
                Secure checkout
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck weight="fill" className="size-3.5 text-primary" aria-hidden />
                Paystack &amp; Flutterwave
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-bold text-foreground">{col.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sparklyn. Built for Nigerian students.
          </p>
          <p className="text-sm text-muted-foreground">
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

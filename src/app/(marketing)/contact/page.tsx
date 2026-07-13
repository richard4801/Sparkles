import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with the Sparklyn team — support, refunds, partnerships and more.",
};

const details = [
  { icon: EnvelopeSimple, label: "Email", value: "hello@sparklyn.ng" },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title="We&apos;d love to hear from you"
        subtitle="Questions about a resource, a refund, or selling on Sparklyn? Send us a message."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Get in touch</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Fill in the form and we&apos;ll reply by email. For order issues, include your
              order reference (e.g. <code>SPK-10428</code>).
            </p>
            <ul className="mt-6 grid gap-4">
              {details.map((d) => (
                <li key={d.label} className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <d.icon weight="fill" className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="font-semibold text-foreground">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Refund policy",
  description: "When and how you can get a refund on a Sparklyn purchase.",
};

export default function RefundsPage() {
  return (
    <main id="main">
      <PageHero eyebrow="Legal" title="Refund policy" />
      <Prose>
        <p>
          Because resources are digital and delivered instantly, we handle refunds carefully
          but fairly. Last updated {new Date().getFullYear()}.
        </p>

        <h2>When you can get a refund</h2>
        <ul>
          <li>The file is corrupt, unreadable, or won&apos;t download.</li>
          <li>The resource is materially different from its preview, abstract or description.</li>
          <li>You were charged more than once for the same order.</li>
        </ul>

        <h2>When we can&apos;t refund</h2>
        <ul>
          <li>You&apos;ve downloaded the resource and simply changed your mind.</li>
          <li>You bought the wrong item but the delivered file matches its listing.</li>
        </ul>
        <p>
          Previewing the abstract, table of contents and reviews before buying is the best
          way to avoid this.
        </p>

        <h2>How to request one</h2>
        <p>
          Contact us within 7 days of purchase via the{" "}
          <a href="/contact">contact page</a> with your order reference (for example{" "}
          <code>SPK-10428</code>). Approved refunds are returned to your original payment
          method within 5–10 business days.
        </p>
      </Prose>
    </main>
  );
}

import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of the Sparklyn marketplace.",
};

export default function TermsPage() {
  return (
    <main id="main">
      <PageHero eyebrow="Legal" title="Terms of service" />
      <Prose>
        <p>
          These terms govern your use of Sparklyn (&quot;the platform&quot;). By creating an
          account or buying a resource you agree to them. Last updated{" "}
          {new Date().getFullYear()}.
        </p>

        <h2>1. Accounts</h2>
        <p>
          You must provide accurate information and keep your login secure. You are
          responsible for activity under your account. You must be a student, educator or
          otherwise have a legitimate academic reason to use the platform.
        </p>

        <h2>2. Buying resources</h2>
        <p>
          Resources are sold for reference, study and inspiration. Each purchase grants you
          a personal, non-transferable licence to download and use the resource. You may not
          resell, redistribute or submit purchased work as your own where doing so breaches
          your institution&apos;s rules.
        </p>

        <h2>3. Selling resources</h2>
        <p>
          If you list a resource you confirm that you own it or have the right to sell it,
          that it does not infringe anyone&apos;s copyright, and that it is your original work
          or properly attributed. Sparklyn may remove any listing that breaches these terms.
        </p>

        <h2>4. Academic integrity</h2>
        <p>
          Sparklyn is a study aid. Submitting purchased material as your own for assessment
          may breach your institution&apos;s academic-integrity policy. You are solely
          responsible for how you use what you buy.
        </p>

        <h2>5. Payments</h2>
        <p>
          Payments are processed by Paystack and Flutterwave. Prices are shown in Naira and
          are the final amount you pay. See our refund policy for returns.
        </p>

        <h2>6. Liability</h2>
        <p>
          The platform is provided &quot;as is&quot;. To the extent permitted by law, Sparklyn
          is not liable for how resources are used or for any academic outcome.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update these terms. Continued use after an update means you accept the
          revised terms.
        </p>
      </Prose>
    </main>
  );
}

import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Sparklyn collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <Prose>
        <p>
          This policy explains what data Sparklyn collects and how we use it. Last updated{" "}
          {new Date().getFullYear()}.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>Account details you provide — name, email, institution, department and level.</li>
          <li>Order and download history so you can access what you&apos;ve bought.</li>
          <li>Basic usage data to keep the platform secure and improve it.</li>
        </ul>

        <h2>What we don&apos;t store</h2>
        <p>
          We never see or store your full card details. Payments are handled entirely by
          Paystack and Flutterwave, who are PCI-compliant.
        </p>

        <h2>How we use your data</h2>
        <ul>
          <li>To deliver resources you buy and show your purchase history.</li>
          <li>To send receipts and important account notifications.</li>
          <li>To send study updates only if you opt in — you can unsubscribe anytime.</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell your data. We share only what&apos;s necessary with payment
          processors to complete a transaction, and where required by law.
        </p>

        <h2>Your rights</h2>
        <p>
          You can view and update your details in your dashboard settings, and request
          deletion of your account by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about your data? Reach us via the <a href="/contact">contact page</a>.
        </p>
      </Prose>
    </main>
  );
}

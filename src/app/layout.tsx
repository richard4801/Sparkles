import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Self-hosted variable fonts (Plus Jakarta Sans for display, Inter for body).
// Self-hosting avoids a build-time fetch to Google Fonts and keeps the fonts
// versioned with the app.
const jakarta = localFont({
  src: "../fonts/plus-jakarta-sans-variable.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "200 800",
});

const inter = localFont({
  src: "../fonts/inter-variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const siteUrl = "https://sparklyn.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sparklyn - Nigeria's academic resource marketplace",
    template: "%s | Sparklyn",
  },
  description:
    "Find research projects, past questions, journals and business plans from Nigerian universities. Preview, buy securely and download in seconds.",
  keywords: [
    "research projects",
    "past questions",
    "final year project",
    "Nigerian universities",
    "seminar papers",
    "business plans",
    "academic resources",
  ],
  authors: [{ name: "Sparklyn" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Sparklyn",
    title: "Sparklyn - Nigeria's academic resource marketplace",
    description:
      "Preview, buy and download vetted academic resources from Nigerian universities in seconds.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparklyn - Nigeria's academic resource marketplace",
    description:
      "Preview, buy and download vetted academic resources from Nigerian universities in seconds.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#6c4cf5",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

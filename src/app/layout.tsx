import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted Montserrat (variable) for the whole site — display and body.
// Self-hosting avoids a build-time fetch to Google Fonts and keeps the font
// versioned with the app.
const montserrat = localFont({
  src: "../fonts/montserrat-variable.woff2",
  variable: "--font-montserrat",
  display: "swap",
  weight: "100 900",
});

const siteUrl = "https://skola.edu.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skola - Nigeria's academic resource marketplace",
    template: "%s | Skola",
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
  authors: [{ name: "Skola" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Skola",
    title: "Skola - Nigeria's academic resource marketplace",
    description:
      "Preview, buy and download vetted academic resources from Nigerian universities in seconds.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skola - Nigeria's academic resource marketplace",
    description:
      "Preview, buy and download vetted academic resources from Nigerian universities in seconds.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

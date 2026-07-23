import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Account avatars are generated SVGs served from our own /api/avatar route.
    // Allowing SVG is safe here because we only ever serve our own generated
    // markup (never user-uploaded SVG), and the CSP sandbox neutralises scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    // Admin resource-file uploads go through a server action; allow larger PDFs.
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default nextConfig;

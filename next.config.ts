import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography during Phase 1. Swap for the real asset CDN
    // (Cloudflare R2 / S3) when the backend lands.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  experimental: {
    // Admin resource-file uploads go through a server action; allow larger PDFs.
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default nextConfig;

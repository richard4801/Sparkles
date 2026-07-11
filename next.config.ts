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
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    // If you later host photos on an external service (e.g. Cloudinary),
    // add its domain here:
    // remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // Old URLs from the previous version of the site.
  async redirects() {
    return [
      { source: "/gallery", destination: "/our-work", permanent: true },
      { source: "/services/:slug", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;

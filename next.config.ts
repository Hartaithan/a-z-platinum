import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/image/ps/:path*",
        destination: "https://image.api.playstation.com/:path*",
      },
      {
        source: "/api/image/obj/:path*",
        destination: "https://psnobj.prod.dl.playstation.net/:path*",
      },
      {
        source: "/api/image/rsc/:path*",
        destination: "http://psn-rsc.prod.dl.playstation.net/:path*",
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);

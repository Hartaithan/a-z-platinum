import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/image/:path*",
        destination: "http://psn-rsc.prod.dl.playstation.net/:path*",
      },
      {
        source: "/api/image/:path*",
        destination:
          "http://static-resource.np.community.playstation.net/:path*",
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);

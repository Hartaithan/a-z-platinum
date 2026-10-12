import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const nextConfig: NextConfig = {
  env: { APP_VERSION: version },
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

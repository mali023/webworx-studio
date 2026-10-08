import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      // the /aussie invite is a static page living in public/
      { source: "/aussie", destination: "/aussie/index.html" },
    ];
  },
};

export default nextConfig;

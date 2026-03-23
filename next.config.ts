import type { NextConfig } from "next";

const isNativeBuild = process.env.BUILD_TARGET === "native";

const nextConfig: NextConfig = {
  ...(isNativeBuild ? { output: "export" } : {}),
  trailingSlash: isNativeBuild,
  output: 'export',
  images: {
    unoptimized: isNativeBuild,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
import type { NextConfig } from "next";

const isNativeBuild = process.env.BUILD_TARGET === "native";

const nextConfig: NextConfig = {
  ...(isNativeBuild
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {
        async headers() {
          return [
            {
              source: "/engage/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
              ],
            },
          ];
        },
      }),

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

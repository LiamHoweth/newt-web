import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: "/newt-web",
      assetPrefix: "/newt-web/",
      trailingSlash: true,
      images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "*.supabase.co",
          },
        ],
      },
    }
  : {
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "*.supabase.co",
          },
        ],
      },
    };

export default nextConfig;

initOpenNextCloudflareForDev();

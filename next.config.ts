import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

/** Cloudflare Workers and static export hosts have no Next.js image optimizer. */
const images: NextConfig["images"] = {
  unoptimized: true,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*.supabase.co",
    },
  ],
};

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: "/newt-web",
      assetPrefix: "/newt-web/",
      trailingSlash: true,
      images,
    }
  : {
      images,
    };

export default nextConfig;

initOpenNextCloudflareForDev();

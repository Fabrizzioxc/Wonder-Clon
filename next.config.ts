// next.config.ts (Next 15+)
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
}

export default nextConfig

import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    memoryBasedWorkersCount: true,
    workerThreads: false,
    cpus: 1,
  },
  turbopack: {
    root: __dirname,
  },
};

export default withNextIntl(nextConfig);

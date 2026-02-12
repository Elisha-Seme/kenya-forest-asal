import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/kenya-forest-asal',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;

import type { NextConfig } from "next";
import path from 'path';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 85, 90],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  trailingSlash: false,
  distDir: '.next',
  cleanDistDir: true,
  async headers() {
    return [
      {
        source: '/:path*.(webp|avif|jpg|jpeg|png|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/.well-known/matrix/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

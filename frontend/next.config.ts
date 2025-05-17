import type { NextConfig } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5328';
const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `${baseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;

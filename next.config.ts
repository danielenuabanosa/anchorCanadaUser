<<<<<<< HEAD
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
    ],
  },
=======
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
>>>>>>> provider/main
};

export default nextConfig;

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
  },
  experimental: {
    // This is needed to allow cross-origin requests from the preview environment.
    allowedDevOrigins: ["https://6000-firebase-studio-*.cluster-*.cloudworkstations.dev"],
  }
};

export default nextConfig;

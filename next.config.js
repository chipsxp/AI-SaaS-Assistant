/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: "https://replicate.delivery/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

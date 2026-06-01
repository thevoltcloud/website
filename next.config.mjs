/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bundle the gated data-room files with the download route's serverless
  // function (they live outside /public so they can't be fetched statically).
  outputFileTracingIncludes: {
    '/api/investors/download': ['./investor-assets/**'],
    '/investors': ['./investor-assets/investor-data.json'],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;

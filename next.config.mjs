/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Type errors fail the build; lint is handled by typecheck in CI.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

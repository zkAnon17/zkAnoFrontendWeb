/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Next.js 16 no longer supports configuring ESLint via next.config.
  // Use an eslint.config.* file or the `next lint` CLI options instead.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

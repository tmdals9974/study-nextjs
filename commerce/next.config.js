/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos', 'raw.githubusercontent.com', 'cdn.shopify.com'],
  },
};

module.exports = nextConfig;

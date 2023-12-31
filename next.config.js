/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ['lohitcdn.blob.core.windows.net'], // Only the root domain
  },  
};

module.exports = nextConfig;
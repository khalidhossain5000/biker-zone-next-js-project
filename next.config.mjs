/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co"], // whitelist your image host here
  },
};

export default nextConfig;

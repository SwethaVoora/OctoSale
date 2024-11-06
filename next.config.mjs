/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "octosale.vercel.app",
        protocol: "https",
      },
    ],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  },
};

export default nextConfig;

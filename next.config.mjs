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
};

export default nextConfig;

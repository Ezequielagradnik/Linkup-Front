/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.BACKEND_URL}/api/:path*`,
        },
      ]
    },
    env: {
      BACKEND_URL: process.env.BACKEND_URL || "https://linkup-backend.vercel.app",
    },
  }
  
  module.exports = nextConfig
  
  
  
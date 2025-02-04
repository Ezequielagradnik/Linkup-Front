/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination:
            process.env.NODE_ENV === "production"
              ? "https://linkup-backend.vercel.app/api/:path*"
              : "http://localhost:5000/api/:path*", // Ajusta este puerto si es diferente
        },
      ]
    },
  }
  
  module.exports = nextConfig
  
  
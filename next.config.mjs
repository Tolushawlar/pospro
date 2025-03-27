/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "boslightmulti-serviceslimited.com" }],
      //   destination: "https://www.boslightmulti-serviceslimited.com/:path*",
      //   permanent: true, // 301 permanent redirect
      // },
    ];
  },
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salespro.livepetal.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

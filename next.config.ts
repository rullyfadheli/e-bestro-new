import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dzgtfooivmtjsteqttrn.supabase.co",
        pathname: "/storage/v1/object/sign/profile-picture/avatars/**",
      },
    ],
  },
  // images: {
  //   domains: ["dzgtfooivmtjsteqttrn.supabase.co"],
  // },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    // Return the modified config
    return config;
  },
};

export default nextConfig;

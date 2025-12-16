import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "llamameta-fake-flux-pro-unlimited.hf.space",
        pathname: "/gradio_api/**",
      },
    ],
  },
};

export default nextConfig;

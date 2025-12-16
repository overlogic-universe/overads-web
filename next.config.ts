import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // HuggingFace / Gradio (image.webp)
      {
        protocol: "https",
        hostname: "llamameta-fake-flux-pro-unlimited.hf.space",
        pathname: "/gradio_api/**",
      },

      // Instagram profile picture
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "instagram.fcgk*.*.cdninstagram.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

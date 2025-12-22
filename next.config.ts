const nextConfig: any = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
       {
        protocol: "https",
        hostname: "image.pollinations.ai",
        pathname: "/**",
      },
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

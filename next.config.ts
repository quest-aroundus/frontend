import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["aroundus-event-bucket.s3.us-east-1.amazonaws.com", "secure.toronto.ca"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    // 환경변수에서 API URL 가져오기, 기본값 설정
    const apiBaseUrl = process.env.NEXT_API_BASE_URL || "http://localhost:8000";

    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

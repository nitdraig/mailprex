/** @type {import('next').NextConfig} */
const publicApiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").trim();
const serverApiUrl = (process.env.API_URL || publicApiUrl || "http://localhost:5000").trim();
const useApiProxy = publicApiUrl === "/api";

const googleAuthHeaders = [
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig = {
  async rewrites() {
    if (useApiProxy) {
      return [
        {
          source: "/api/:path*",
          destination: `${serverApiUrl.replace(/\/$/, "")}/:path*`,
        },
      ];
    }
    return [];
  },
  async headers() {
    return [
      {
        source: "/login",
        headers: googleAuthHeaders,
      },
      {
        source: "/register",
        headers: googleAuthHeaders,
      },
    ];
  },
};

export default nextConfig;

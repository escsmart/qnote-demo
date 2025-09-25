/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

// const isDev = process.env.NODE_ENV !== "production";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // disable: isDev,
  disable: process.env.NODE_ENV === "development",
  register: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.allservice.in.th",
        pathname: "/inote/images/**", // Allows any path under /users/
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
        pathname: "/**", // Allows any path under /users/
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        pathname: "/**", // Allows any path under /users/
      },
      {
        protocol: "https",
        hostname: "qnote-demo.vercel.app",
        pathname: "/**", // Allows any path under /users/
      },
      {
        protocol: "http",
        hostname: "192.168.2.51",
        port: "5000", // Optional: specify if a non-standard port is used
        pathname: "/**", // Allows any path under /users/
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

export default withPWA(nextConfig);

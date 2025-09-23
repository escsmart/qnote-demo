/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  //   disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
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
        protocol: "http",
        hostname: "192.168.2.51",
        port: "5000", // Optional: specify if a non-standard port is used
        pathname: "/inote/images/**", // Allows any path under /users/
      },
    ],
    // remotePatterns: [new URL("http://192.168.2.51:5000/inote/images/**")],
    // remotePatterns: [new URL("https://api.allservice.in.th/inote/images/**")],
  },
};

export default withPWA(nextConfig);

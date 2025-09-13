import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Prompt } from "next/font/google";

//เพิ่ม font google
const prompt = Prompt({
  weight: ["400", "600", "800", "900"],
  subsets: ["latin", "thai"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  manifest: "/manifest.json",
  title: "Shorted Link Easy",
  description: "create link short fast and easy",
  keywords: "shortlink, sharelink",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

// set layout และ export เพื่อใช้งาน
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={`${prompt.className} antialiased`}>{children}</body>
    </html>
  );
}

import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import type { Viewport } from "next";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "white",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <Analytics />

      <body className={`${inter.className} w-screen h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

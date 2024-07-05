import { AppProps } from "next/app";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <html lang="en">
        <body className={`${inter.className} w-screen h-screen`}>
          {children}
        </body>
      </html>
    </html>
  );
}

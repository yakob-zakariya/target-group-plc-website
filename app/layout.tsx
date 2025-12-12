import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Target Group PLC | Building Tomorrow's Solutions",
    template: "%s | Target Group PLC",
  },
  description:
    "Target Group PLC is a diversified conglomerate specializing in construction materials, agro-industry manufacturing, import/export, education, and IT services.",
  keywords: [
    "Target Group PLC",
    "construction materials",
    "agro industry",
    "import export",
    "education",
    "IT services",
    "Ethiopia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

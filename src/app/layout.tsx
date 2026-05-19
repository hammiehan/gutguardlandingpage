import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GutGuard BioScan — Find Out Your Inflammatory Score",
  description:
    "Your inflammatory load is measurable. It has a direction. GutGuard BioScan gives it a number — reviewed by a licensed Philippine physician within 48 hours.",
  openGraph: {
    title: "GutGuard BioScan — Find Out Your Inflammatory Score",
    description:
      "Upload your existing blood panel. A GutGuard independent licensed physician reviews 8 inflammatory markers and calculates your GLIS score within 48 hours.",
    type: "website",
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C1017",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}

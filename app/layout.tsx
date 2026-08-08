import type { Metadata } from "next";

import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nextool.online"),

  title: {
    default: "Nextool",
    template: "%s | Nextool",
  },

  description:
    "Fast online tools and calculators for developers, students and everyday tasks.",

  applicationName: "Nextool",

  keywords: [
    "online tools",
    "calculators",
    "developer tools",
    "percentage calculator",
    "rule of three",
    "utilities",
  ],


  authors: [
    {
      name: "Nextool",
    },
  ],

  creator: "Nextool",
  publisher: "Nextool",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Nextool",
    title: "Nextool",
    description:
      "Fast online tools and calculators for developers, students and everyday tasks.",
    url: "https://www.nextool.online",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nextool",
    description:
      "Fast online tools and calculators for developers, students and everyday tasks.",
  },

  alternates: {
    canonical: "https://www.nextool.online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>

      <GoogleAnalytics gaId="G-EJX36KEV94" />
    </html>
  );
}
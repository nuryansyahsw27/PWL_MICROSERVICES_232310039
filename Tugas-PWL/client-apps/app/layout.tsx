import type {
  Metadata,
} from "next";

import "./globals.css";

import {
  AuthProvider,
} from "@/contexts/AuthContext";

import {
  Geist,
} from "next/font/google";

import {
  cn,
} from "@/lib/utils";

import ServiceWorker from "@/components/ServiceWorker";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title:
    "Library Management System",

  description:
    "Library Management System",

  manifest:
    "/manifest.webmanifest",

  icons: {
    icon:
      "/icon-192.png",

    apple:
      "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ServiceWorker />

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


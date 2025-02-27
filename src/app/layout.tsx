import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metaData } from "@/lib/helpers/meta-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="15Lntdm-zNTGQbXd27NlqwaIP6aRL2nZtcxCEi4QiTM"
        />
      </head>
      <body
        style={{
          cursor: "url('data:image/png;base64,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'), auto",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

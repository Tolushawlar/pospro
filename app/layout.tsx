import React from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import "./globals.css";
// Consider using variable font if available
// import "@fontsource-variable/tomorrow";
import "@fontsource/tomorrow/100.css";
import "@fontsource/tomorrow/200.css";
import "@fontsource/tomorrow/300.css";
import "@fontsource/tomorrow/400.css";
import "@fontsource/tomorrow/500.css";
import "@fontsource/lato";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "pospro",
  description: "store products listing application",
  icons: {
    icon: "https://www.boslightmulti-serviceslimited.com/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={`${rubik.variable} antialiased`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
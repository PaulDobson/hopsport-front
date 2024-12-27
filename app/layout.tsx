import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "./providers";
import clsx from "clsx";
import { fontSans } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "HopSport",
  description: "HopSport is a advanced sports platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="sport-dark text-foreground bg-background">
      <body
        className={clsx("h-screen font-sans antialiased", fontSans.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

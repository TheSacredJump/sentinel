import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Sentinel | Email Organizer",
  description: "Never miss important emails again.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

    <html lang="en" className={`${GeistSans.variable} bg-neutral-950 text-neutral-50`}>
      <body>
        {children}
      </body>
    </html>
  );
}
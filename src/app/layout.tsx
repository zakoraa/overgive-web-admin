import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/core/providers/app-provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overgive Admin",
  description:
    "Overgive Admin is a management panel for a web-based donation crowdfunding platform integrated with blockchain technology to ensure transparency, accountability, and secure administration of donation campaigns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

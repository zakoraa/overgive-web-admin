import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/core/providers/app-provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overgive Admin – Donation Management Dashboard",
  description:
    "Overgive Admin is an administrative dashboard for managing a blockchain-integrated donation crowdfunding platform, designed to ensure transparency, accountability, and secure campaign operations.",

  applicationName: "Overgive Admin",
  creator: "Muhammad Rafli Silehu",
  publisher: "Overlogic",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Overgive Admin – Donation Management Dashboard",
    description:
      "Administrative dashboard for managing donation campaigns, distributors, and settlements on the Overgive blockchain-based crowdfunding platform.",
    url: "https://overgive-web-admin.vercel.app",
    siteName: "Overgive Admin",
    images: [
      {
        url: "/images/overgive-logo.png",
        width: 1200,
        height: 630,
        alt: "Overgive Admin Dashboard",
      },
    ],
    type: "website",
  },
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

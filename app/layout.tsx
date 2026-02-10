import type { Metadata } from "next";
import { Caveat_Brush, Geist, Geist_Mono, Kablammo } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import QueryProvider from "@/providers/QueryProvider";
import GoogleAnalytics from "@/ui/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import clientEnv from "@/utils/clientEnv";
import { Toaster } from "@/components/ui/sonner";

const kablammo = Kablammo({
  variable: "--font-kablammo",
  subsets: ["latin"],
});

const caveatBrush = Caveat_Brush({
  weight: ["400"],
  variable: "--font-caveat-brush",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_URL),
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "social media growth",
    "Facebook engagement",
    "YouTube subscribers",
    "Instagram growth",
    "earn rewards",
    "campaigns",
    "follow for follow website",
    "exchange follows",
    "follow back",
  ],
  alternates: {
    canonical: clientEnv.NEXT_PUBLIC_URL,
  },
  authors: [{ name: "GGfollows" }],
  creator: "GGfollows",
  publisher: "GGfollows",
  other: {
    "application-name": "GGfollows",
    monetag: "7999807836eec752081414780b752f5e",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} ${kablammo.variable} ${caveatBrush.variable} antialiased font-sans`}
      >
        <AuthSessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </AuthSessionProvider>
        {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && <GoogleAnalytics />}
        {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && <Analytics />}
        <Toaster />
      </body>
    </html>
  );
}

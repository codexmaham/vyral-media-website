import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import StickyBookCTA from "@/components/StickyBookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Vyral Media | We Build Brands People Remember",
  description:
    "Premium digital agency specializing in performance marketing, branding, videography, web development and AI solutions.",
  keywords: ["digital agency", "branding", "performance marketing", "web development", "AI solutions"],
  icons: {
    icon: "/vyral-icon.png",
    apple: "/vyral-icon.png",
  },
  openGraph: {
    title: "Vyral Media | We Build Brands People Remember",
    description: "Premium digital agency specializing in performance marketing, branding, videography, web development and AI solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
          <StickyBookCTA />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

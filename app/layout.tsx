import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggleFloat from "@/components/theme-toggle-float";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Venarium — Job Application Tracker",
    template: "%s | Venarium",
  },
  description:
    "Venarium is a free kanban-style job application tracker. Organize your job search, track applications from wishlist to offer, and never lose sight of an opportunity.",
  keywords: [
    "job application tracker",
    "job search organizer",
    "kanban job tracker",
    "career pipeline",
    "job hunt tool",
    "free job tracker",
  ],
  authors: [{ name: "solo.devx", url: "https://github.com/solodevx" }],
  creator: "solo.devx",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://venarium.vercel.app",
    title: "Venarium — Job Application Tracker",
    description:
      "Track every opportunity. Stay ahead. A free kanban board for your job search.",
    siteName: "Venarium",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Venarium Job Application Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venarium — Job Application Tracker",
    description:
      "Track every opportunity. Stay ahead. A free kanban board for your job search.",
    creator: "@_solodevx",
    images: ["/images/hero-1.jpg"],
  },
  icons: {
    icon: "/logo/logo.svg",
  },
  metadataBase: new URL("https://venarium.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <ThemeToggleFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}

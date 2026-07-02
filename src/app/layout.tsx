import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { EasterEgg } from "@/components/easter-egg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", preload: false });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", preload: false });

const siteUrl = "https://himanshupandey.me"; // your real deployed domain

export const metadata: Metadata = {
  title: {
    default: "Himanshu Pandey — Software Engineer",
    template: "%s | Himanshu Pandey",
  },
  description:
    "Software Engineer specialising in full-stack web apps, real-time systems, and AI integrations. Based in India. Open for freelance projects and collaborations.",
  keywords: [
    "Himanshu Pandey",
    "software engineer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "Node.js",
    "TypeScript",
    "AI integrations",
    "portfolio",
    "India",
  ],
  authors: [{ name: "Himanshu Pandey", url: siteUrl }],
  creator: "Himanshu Pandey",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Himanshu Pandey",
    title: "Himanshu Pandey — Software Engineer",
    description:
      "Full-stack engineer building scalable web apps, real-time systems, and AI-powered products. Check out my projects and get in touch.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Himanshu Pandey — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Pandey — Software Engineer",
    description:
      "Full-stack engineer building scalable web apps, real-time systems, and AI-powered products.",
    images: ["/og-image.png"],
    creator: "@hpandey_14",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Himanshu Pandey",
  url: siteUrl,
  jobTitle: "Software Engineer",
  description:
    "Full-stack software engineer specialising in React, Next.js, Node.js, and AI integrations.",
  image: `${siteUrl}/og-image.png`,
  sameAs: [
    "https://github.com/14-himanshu",
    "https://www.linkedin.com/in/himanshupandey14/",
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
    "WebSockets", "AI integrations", "LangGraph", "FastAPI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} font-sans`}>
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise-overlay" />
          <div className="mesh-gradient" />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster
            position="top-center"
            theme="system"
            richColors
            closeButton
          />
          <EasterEgg />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

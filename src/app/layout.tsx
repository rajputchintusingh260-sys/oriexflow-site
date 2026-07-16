import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const SITE = "https://oriexflow.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "OriexFlow — Cinematic content. Shipped in 48 hours.",
  description:
    "Premium video & content studio for creators, SaaS founders, and personal brands. Cinematic short-form, YouTube editing, brand films, and content systems — delivered in 48 hours.",
  keywords: ["video editing agency", "short-form video", "YouTube editing", "brand films", "content systems"],
  openGraph: {
    title: "OriexFlow — Cinematic content. Shipped in 48 hours.",
    description:
      "Premium short-form, YouTube edits, and brand films — delivered in 48 hours.",
    url: SITE,
    siteName: "OriexFlow",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OriexFlow — Cinematic content. Shipped in 48 hours.",
    description: "Premium short-form, YouTube edits, and brand films — delivered in 48 hours.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "OriexFlow",
      url: SITE,
      email: "hello@oriexflow.com",
      slogan: "Cinematic content. Shipped in 48 hours.",
      sameAs: [
        "https://youtube.com/@oriexflow",
        "https://instagram.com/oriexflow",
        "https://x.com/oriexflow",
        "https://linkedin.com/company/oriexflow",
      ],
    },
    {
      "@type": "Service",
      serviceType: "Video editing and content production",
      provider: { "@id": `${SITE}/#org` },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "OriexFlow services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Short-form video" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "YouTube long-form editing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand films & ads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content systems & strategy" } },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <Preloader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

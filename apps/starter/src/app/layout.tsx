import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/*
  STEP 2: Set your fonts.
  Match --font-display / --font-body to the brand.
  See: https://fonts.google.com
*/
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/*
  STEP 3: Set site metadata.
  metadataBase must match your production domain.
  See the SEO guide: /docs/guides/seo
*/
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200"),
  title: {
    default: "My Client — Miami's Premier Service",
    template: "%s | My Client",
  },
  description: "Replace with a compelling one-sentence description of the business.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "My Client",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}

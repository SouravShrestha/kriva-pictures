import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/footer/Footer";
import bannerService from "@/services/bannerService";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.krivapictures.com.au"),
  title: {
    default: "Kriva Pictures | Professional Photography",
    template: "%s | Kriva Pictures",
  },
  description:
    "Kriva Pictures — Professional photography services capturing life's most beautiful moments. Explore our portfolio of stunning visual storytelling.",
  keywords: [
    "Kriva Pictures",
    "photography",
    "professional photographer",
    "portrait",
    "wedding",
    "event photography",
    "visual storytelling",
  ],
  authors: [{ name: "Kriva Pictures" }],
  openGraph: {
    title: "Kriva Pictures | Professional Photography",
    description:
      "Professional photography services capturing life's most beautiful moments.",
    type: "website",
    url: "https://www.krivapictures.com.au",
    images: [{ url: "/logo512.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kriva Pictures | Professional Photography",
    description:
      "Professional photography services capturing life's most beautiful moments.",
    images: ["/logo512.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerImages = await bannerService.fetchImageUrls("kp-footer-banner");

  return (
    <html lang="en">
      <body className="bg-mainBg min-h-screen">
        <NextTopLoader
          color="#a855f7"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #a855f7,0 0 5px #ec4899"
        />
        {children}
        <Footer footerImages={footerImages} />
      </body>
    </html>
  );
}

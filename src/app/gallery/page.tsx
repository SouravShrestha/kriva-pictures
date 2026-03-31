import Navbar from "@/components/Navbar";
import bannerService from "@/services/bannerService";
import galleryService from "@/services/galleryService";
import SplideGalleryBanner from "@/components/gallery/SplideGalleryBanner";
import GalleryMain from "@/components/gallery/GalleryMain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery of beautiful photography — maternity, newborn, baby milestones, family sessions, and special occasions.",
};

export default async function GalleryPage() {
  const [bannerImages, categories] = await Promise.all([
    bannerService.fetchImageUrls("kp-gallery-banner"),
    galleryService.resolveCategories(),
  ]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="w-full relative">
          <SplideGalleryBanner images={bannerImages} />
        </div>
        <GalleryMain categories={categories} />
      </div>
    </>
  );
}

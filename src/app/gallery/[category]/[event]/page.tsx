import Navbar from "@/components/Navbar";
import galleryService, { fetchEventImages } from "@/services/galleryService";
import GalleryView from "@/components/gallery/GalleryView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; event: string }>;
}

export async function generateStaticParams() {
  return galleryService
    .getCategorySlugs()
    .flatMap((categorySlug) => galleryService.getEventSlugs(categorySlug));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, event: eventSlug } = await params;
  const event = await galleryService.resolveEventBySlug(categorySlug, eventSlug);
  return {
    title: event?.name ?? "Gallery",
    description: `View ${event?.name ?? "gallery"} photos by Kriva Pictures.`,
  };
}

export default async function GalleryViewPage({ params }: Props) {
  const { category: categorySlug, event: eventSlug } = await params;

  const [event, images] = await Promise.all([
    galleryService.resolveEventBySlug(categorySlug, eventSlug),
    fetchEventImages(categorySlug, eventSlug),
  ]);

  if (!event) notFound();

  return (
    <>
      <Navbar />
      <GalleryView event={event} images={images} categorySlug={categorySlug} />
    </>
  );
}

import type { MetadataRoute } from "next";
import galleryData from "@/data/gallery.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krivapictures.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/packages`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const galleryRoutes: MetadataRoute.Sitemap = galleryData.categories.flatMap((cat) => [
    {
      url: `${BASE_URL}/gallery/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...cat.events.map((event) => ({
      url: `${BASE_URL}/gallery/${cat.slug}/${event.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [...staticRoutes, ...galleryRoutes];
}

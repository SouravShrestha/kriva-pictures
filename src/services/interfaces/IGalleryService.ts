import type { GalleryCategory, GalleryEvent } from "@/types/gallery";

export interface IGalleryService {
  getCategorySlugs(): string[];
  getEventSlugs(categorySlug: string): { category: string; event: string }[];
  resolveCategories(): Promise<GalleryCategory[]>;
  resolveCategoryBySlug(categorySlug: string): Promise<GalleryCategory | null>;
  resolveEventBySlug(categorySlug: string, eventSlug: string): Promise<GalleryEvent | null>;
  getEventImageUrls(event: GalleryEvent): Promise<string[]>;
}

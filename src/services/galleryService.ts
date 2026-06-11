import cloudinaryClient from "@/lib/cloudinary";
import galleryData from "@/data/gallery.json";
import type { GalleryCategoryConfig, GalleryCategory, GalleryEvent } from "@/types/gallery";
import type { IGalleryService } from "./interfaces/IGalleryService";

const categories = galleryData.categories as GalleryCategoryConfig[];

interface FolderResources {
  coverImage: string;
  images: string[];
}

async function fetchFolderResources(folderPath: string): Promise<FolderResources> {
  const all: { publicId: string; secureUrl: string }[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinaryClient.search({
      expression: `folder="${folderPath}"`,
      sort_by: [{ key: "public_id", direction: "asc" }],
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const r of result.resources) {
      if (r.secure_url) {
        all.push({ publicId: r.public_id, secureUrl: r.secure_url });
      }
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  const coverEntry = all.find((r) => r.publicId.startsWith("cover"));
  const images = all.map((r) => r.secureUrl);
  const coverImage = coverEntry?.secureUrl ?? images[0] ?? "";

  return { coverImage, images };
}

async function resolveEvent(
  cloudinaryFolder: string,
  slug: string,
  name: string,
  date: string
): Promise<GalleryEvent> {
  const { coverImage } = await fetchFolderResources(`${cloudinaryFolder}/${slug}`);
  return { slug, name, date, coverImage };
}

export async function fetchEventImages(categorySlug: string, eventSlug: string): Promise<string[]> {
  const cat = categories.find((c) => c.slug === categorySlug);
  if (!cat) return [];

  const { images } = await fetchFolderResources(`${cat.cloudinaryFolder}/${eventSlug}`);
  return images;
}

const galleryService: IGalleryService = {
  getCategorySlugs(): string[] {
    return categories.map((c) => c.slug);
  },

  getEventSlugs(categorySlug: string): { category: string; event: string }[] {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return [];
    return cat.events.map((e) => ({ category: categorySlug, event: e.slug }));
  },

  async resolveCategories(): Promise<GalleryCategory[]> {
    return Promise.all(
      categories.map(async (cat) => {
        const events = await Promise.all(
          cat.events.map((e) => resolveEvent(cat.cloudinaryFolder, e.slug, e.name, e.date))
        );
        const coverImage = events[0]?.coverImage ?? "";
        return {
          slug: cat.slug,
          name: cat.name,
          cloudinaryFolder: cat.cloudinaryFolder,
          coverImage,
          events,
        };
      })
    );
  },

  async resolveCategoryBySlug(categorySlug: string): Promise<GalleryCategory | null> {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return null;

    const events = await Promise.all(
      cat.events.map((e) => resolveEvent(cat.cloudinaryFolder, e.slug, e.name, e.date))
    );
    const coverImage = events[0]?.coverImage ?? "";
    return {
      slug: cat.slug,
      name: cat.name,
      cloudinaryFolder: cat.cloudinaryFolder,
      coverImage,
      events,
    };
  },

  async resolveEventBySlug(
    categorySlug: string,
    eventSlug: string
  ): Promise<GalleryEvent | null> {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return null;
    const eventConfig = cat.events.find((e) => e.slug === eventSlug);
    if (!eventConfig) return null;
    return resolveEvent(cat.cloudinaryFolder, eventConfig.slug, eventConfig.name, eventConfig.date);
  },

  async getEventImageUrls(event: GalleryEvent): Promise<string[]> {
    const cat = categories.find((c) => c.events.some((e) => e.slug === event.slug));
    if (!cat) return [];
    return fetchEventImages(cat.slug, event.slug);
  },
};

export default galleryService;

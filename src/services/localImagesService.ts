import imagesData from "@/data/images.json";
import type { IImagesService } from "./interfaces/IImagesService";

const sectionImageMap = imagesData.sectionImages as Record<string, string>;

/**
 * Maps slug → full filename with extension for local assets.
 * Update this when adding new images to src/assets/images/section-images/.
 */
const localFilenames: Record<string, string> = {
  "section-1a": "section-1a.jpg",
  "section-2a": "section-2a.png",
  "section-2b": "section-2b.png",
  "section-2c": "section-2c.png",
  "section-3a": "section-3a.png",
  "section-3b": "section-3b.png",
  "section-4a": "section-4a.png",
  "section-4b": "section-4b.png",
  "slide-nav": "slide-nav.png",
};

function resolveLocalPath(slug: string): string | null {
  const filename = localFilenames[slug];
  return filename ? `/section-images/${filename}` : null;
}

const localImagesService: IImagesService = {
  async getImagesByTag(tag: string): Promise<string[]> {
    return Object.values(sectionImageMap)
      .filter((slug) => slug.startsWith(tag))
      .map(resolveLocalPath)
      .filter((url): url is string => url !== null);
  },

  async getFirstImageByTag(tag: string): Promise<string | null> {
    const slug = Object.values(sectionImageMap).find((s) => s.startsWith(tag));
    return slug ? resolveLocalPath(slug) : null;
  },
};

export default localImagesService;

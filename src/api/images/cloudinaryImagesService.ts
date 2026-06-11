import { cache } from "react";
import cloudinaryClient from "@/lib/cloudinary";
import type { IImagesService } from "./IImagesService";

const FOLDER = "kp-sections";

const fetchAllSectionResources = cache(
  async (): Promise<{ publicId: string; secureUrl: string }[]> => {
    const all: { publicId: string; secureUrl: string }[] = [];
    let nextCursor: string | undefined;

    do {
      const result = await cloudinaryClient.search({
        expression: `folder="${FOLDER}"`,
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

    return all;
  }
);

const cloudinaryImagesService: IImagesService = {
  async getImagesByTag(tag: string): Promise<string[]> {
    const resources = await fetchAllSectionResources();
    return resources
      .filter((r) => r.publicId.startsWith(tag))
      .map((r) => r.secureUrl);
  },

  async getFirstImageByTag(tag: string): Promise<string | null> {
    const images = await this.getImagesByTag(tag);
    return images[0] ?? null;
  },
};

export default cloudinaryImagesService;


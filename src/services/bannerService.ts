import cloudinaryClient from "@/lib/cloudinary";
import type { IBannerService } from "./interfaces/IBannerService";

const bannerService: IBannerService = {
  async fetchImageUrls(folderName: string): Promise<string[]> {
    const allUrls: string[] = [];
    let nextCursor: string | undefined = undefined;

    try {
      do {
        const result = await cloudinaryClient.search({
          expression: `folder:"${folderName}"`,
          max_results: 100,
          next_cursor: nextCursor,
        });

        for (const resource of result.resources) {
          if (resource.secure_url) {
            allUrls.push(resource.secure_url as string);
          }
        }

        nextCursor = result.next_cursor;
      } while (nextCursor);
    } catch (error) {
      console.error(`Failed to fetch Cloudinary images for folder "${folderName}":`, error);
    }

    return allUrls;
  },
};

export default bannerService;

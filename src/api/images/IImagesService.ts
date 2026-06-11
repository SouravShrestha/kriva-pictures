/**
 * Tag is the slug portion of the Cloudinary public_id (without folder prefix).
 * Matching is prefix-based, so "section-2" matches "section-2a", "section-2b", "section-2c".
 * Tag values come from the `sectionImages` map in `src/data/images.json`.
 */
export interface IImagesService {
  getImagesByTag(tag: string): Promise<string[]>;
  getFirstImageByTag(tag: string): Promise<string | null>;
}

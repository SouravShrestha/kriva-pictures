export interface IImagesService {
  getImagesByTag(tag: string): Promise<string[]>;
  getFirstImageByTag(tag: string): Promise<string | null>;
}

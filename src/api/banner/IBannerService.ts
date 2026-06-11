export interface IBannerService {
  fetchImageUrls(folderName: string): Promise<string[]>;
}

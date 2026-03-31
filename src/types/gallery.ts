export interface GalleryEventConfig {
  slug: string;
  name: string;
  date: string;
}

export interface GalleryCategoryConfig {
  slug: string;
  name: string;
  cloudinaryFolder: string;
  events: GalleryEventConfig[];
}

export interface GalleryEvent extends GalleryEventConfig {
  coverImage: string;
}

export interface GalleryCategory extends Omit<GalleryCategoryConfig, "events"> {
  coverImage: string;
  events: GalleryEvent[];
}

import type { IImagesService } from "./interfaces/IImagesService";
import cloudinaryImagesService from "./cloudinaryImagesService";
import localImagesService from "./localImagesService";

const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === "true";

const imagesService: IImagesService = useLocal
  ? localImagesService
  : cloudinaryImagesService;

export default imagesService;

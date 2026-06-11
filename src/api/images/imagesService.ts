import type { IImagesService } from "./IImagesService";
import cloudinaryImagesService from "./cloudinaryImagesService";
import localImagesService from "./localImagesService";

const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === "true";
console.log(`[imagesService] NEXT_PUBLIC_USE_LOCAL_IMAGES="${process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES}" | useLocal=${useLocal}`);

const imagesService: IImagesService = useLocal
  ? localImagesService
  : cloudinaryImagesService;

export default imagesService;

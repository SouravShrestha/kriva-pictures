import packagesData from "@/data/packages.json";
import addonsData from "@/data/addons.json";
import type { Package, Addon } from "@/types/packages";
import type { IPackagesService } from "./interfaces/IPackagesService";

const packagesService: IPackagesService = {
  getPackages(): Package[] {
    return packagesData as Package[];
  },

  getAddons(): Addon[] {
    return addonsData as Addon[];
  },
};

export default packagesService;

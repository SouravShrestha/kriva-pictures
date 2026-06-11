import packagesData from "@/data/packages.json";
import addonsData from "@/data/addons.json";
import type { Package, Addon } from "@/types/packages";
import type { IPackagesService } from "./IPackagesService";

const packagesService: IPackagesService = {
  getPackages(): Package[] {
    return packagesData satisfies Package[];
  },

  getAddons(): Addon[] {
    return addonsData satisfies Addon[];
  },
};

export default packagesService;

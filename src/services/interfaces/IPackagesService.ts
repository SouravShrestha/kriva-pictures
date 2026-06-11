import type { Package, Addon } from "@/types/packages";

export interface IPackagesService {
  getPackages(): Package[];
  getAddons(): Addon[];
}

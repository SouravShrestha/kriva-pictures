export interface PackageInclude {
  icon: string;
  text: string;
}

export interface Package {
  id: string;
  name: string;
  ideal_for: string;
  includes: PackageInclude[];
  price_aud: number;
  image: string;
}

export interface Addon {
  id: string;
  name: string;
  price_aud: number;
  unit: string | null;
  delivery: string | null;
}

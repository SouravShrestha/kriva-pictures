export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/packages", label: "PACKAGES" },
  { href: "/contact", label: "CONTACT" },
];

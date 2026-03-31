"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import menuIcon from "@/assets/icons/menu.png";
import logoIcon from "@/assets/icons/logo.png";
import SlidingNavbar from "./SlidingNavbar";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/packages", label: "PACKAGES" },
  { href: "/contact", label: "CONTACT" },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setIsSticky(false);
      return;
    }
    const handleScroll = () => {
      if (!navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const banner = document.querySelector(".splideHome");
      const bannerRect = banner ? banner.getBoundingClientRect() : null;
      if (navRect.top <= 0 && (!bannerRect || bannerRect.bottom <= 0)) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const stickyStyle =
    isSticky && pathname === "/"
      ? { height: "72px", position: "fixed" as const }
      : { height: "72px" };

  return (
    <>
      <nav
        ref={navRef}
        className={`flex items-center justify-between md:pl-4 bg-mainBg border-borderColor transition-all duration-300 z-50 border-t-0 w-full h-64 ${
          pathname === "/" ? "border-b-1.5" : "border-b-0"
        }`}
        style={
          isSticky &&
          pathname === "/" &&
          typeof window !== "undefined" &&
          window.innerWidth >= 768
            ? stickyStyle
            : { height: "72px" }
        }
      >
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-2.5 h-9 ml-8">
            <img
              src={logoIcon.src}
              alt="Kriva Pictures Logo"
              className="h-[29px] w-auto md:h-9"
            />
            <div className="md:h-10 h-9 flex flex-col justify-around leading-none">
              <span className="font-barlow text-sm tracking-wide leading-none">
                KRIVA PICTURES
              </span>
              <span className="block text-[10.5px] font-almarai tracking-wide leading-none">
                PHOTOGRAPHY
              </span>
            </div>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="py-4 px-8 gap-8">
            <ul className="hidden space-x-7 md:flex mdxl:space-x-10 lg:space-x-14 text-mainText font-barlow font-medium tracking-wide text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-mainText cursor-pointer ${
                      (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                        ? "border-b border-borderColor"
                        : "hover:border-b border-borderColor"
                    }`}
                    style={{ paddingBottom: "4px" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="px-8 flex items-center border-l-0 border-borderColor cursor-pointer"
            style={{ height: "72px" }}
            onClick={() => setShowMenu(true)}
          >
            <img src={menuIcon.src} alt="Menu" className="w-4 h-4" />
          </div>
        </div>
      </nav>
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setShowMenu(false)}
            aria-label="Close menu overlay"
          />
          <SlidingNavbar
            onClose={() => setShowMenu(false)}
            onMenuItemClick={() => setShowMenu(false)}
          />
        </>
      )}
    </>
  );
};

export default Navbar;

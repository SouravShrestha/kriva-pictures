"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import img1 from "@/assets/images/section-images/section-3a.png";
import instaIcon from "@/assets/icons/insta.png";
import fbIcon from "@/assets/icons/fb.png";
import crossIcon from "@/assets/icons/cross.png";
import texts from "@/resources/texts";
import ImagePlaceholder from "./ImagePlaceholder";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

interface SlidingNavbarProps {
  onClose: () => void;
  onMenuItemClick: () => void;
}

const SlidingNavbar = ({ onClose, onMenuItemClick }: SlidingNavbarProps) => {
  const pathname = usePathname();

  return (
    <div
      className="fixed top-0 right-0 h-full w-full rg:w-[660px] z-50 bg-[#ede7df] transition-all duration-500 border-l border-borderColor flex flex-col justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 hover:scale-110 transition-transform z-50"
        aria-label="Close menu"
      >
        <img src={crossIcon.src} alt="Close" className="w-7 h-7" />
      </button>
      <div className="flex flex-col md:flex-row flex-1 md:flex-0 p-8">
        <h2 className="font-meysha text-4xl md:hidden mt-[8vh] text-left tracking-wide">
          Kriva Pictures
        </h2>
        <div className="md:flex hidden flex-col items-start justify-between w-full sm:p-6">
          <div>
            <h2 className="font-meysha text-4xl mb-8 rotate-[-5deg]">Nice to meet you!</h2>
            <div className="relative">
              <img
                src={img1.src}
                alt="Kriva Pictures"
                className="w-72 h-48 object-cover rounded-none mb-8 relative z-10"
              />
              <div className="w-72 h-48 object-cover rounded-none mb-8 absolute top-0 bg-colorSecondary">
                <ImagePlaceholder />
              </div>
            </div>
            <p className="font-almarai text-base text-mainText max-w-xs leading-7 text-justify w-72">
              {texts.slidingNavbar.bio}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end justify-between w-full sm:w-2/4 md:w-1/3 md:p-14 p-8 py-10 relative border-l-1.5 md:border-l-0 border-borderColor mt-12 md:mt-0">
          <nav className="flex flex-col items-start md:items-end justify-center flex-1 gap-y-8">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={onMenuItemClick}
                  className={`font-barlow md:font-ttjenevers text-xl md:text-xl border-b-1.5 hover:border-borderColor cursor-pointer ${
                    pathname === link.href ? "border-borderColor" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="w-full flex flex-row px-8 md:px-14 pr-12 mb-14 justify-between items-center">
        <span className="font-almarai text-sm font-medium">FOLLOW US</span>
        <div className="md:w-2/5 w-1/4 border-b-1.5 border-borderColor" />
        <div className="flex flex-row gap-6 text-2xl">
          <a
            href={texts.footer.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={instaIcon.src} alt="Instagram" className="w-5 h-5" />
          </a>
          <a
            href={texts.footer.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={fbIcon.src} alt="Facebook" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SlidingNavbar;

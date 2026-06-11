"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import fbIcon from "@/assets/icons/fb.png";
import instaIcon from "@/assets/icons/insta.png";
import phoneIcon from "@/assets/icons/phone.png";
import emailIcon from "@/assets/icons/email.png";
import locationIcon from "@/assets/icons/location.png";
import texts from "@/resources/texts";
import ContactForm from "./ContactForm";
import FooterGallery from "./FooterGallery";

const FOOTER_LINKS = [
  { to: "/", label: "HOME" },
  { to: "/gallery", label: "GALLERY" },
  { to: "/packages", label: "PACKAGES" },
  { to: "/contact", label: "CONTACT" },
  { to: "/faq", label: "FAQ" },
];

interface FooterProps {
  footerImages?: string[];
}

const Footer = ({ footerImages = [] }: FooterProps) => {
  const pathname = usePathname();
  return (
    <footer className="border-t border-borderColor w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row border-b border-borderColor h-full">
          {/* Left: Contact Form */}
          <div className="basis-2/5 grow-0 shrink-0 py-12 md:py-8 border-b md:border-b-0 md:border-r border-borderColor md:px-12 px-8">
            <h3 className="font-ttjenevers text-2xl mb-4 mt-2">
              {texts.footer.bookSession}
            </h3>
            <ContactForm />
          </div>
          {/* Right: Menu & Contact */}
          <div className="md:basis-3/5 grow-0 shrink-0">
            <div className="flex flex-col h-full">
              <div className="py-8 md:pl-8 pl-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-meysha text-4xl tracking-wider">
                    Menu
                  </span>
                  <div className="flex gap-4 pr-8">
                    <a
                      href={texts.footer.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <img
                        src={instaIcon.src}
                        alt="Instagram"
                        className="w-6 h-6"
                      />
                    </a>
                    <a
                      href={texts.footer.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <img
                        src={fbIcon.src}
                        alt="Facebook"
                        className="w-6 h-6"
                      />
                    </a>
                  </div>
                </div>
                <hr className="md:ml-20 ml-6 border-borderColor" />
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 font-barlow tracking-wider text-base ml-8 md:ml-20 mt-10">
                  {FOOTER_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      href={link.to}
                      className={`hover:text-mainText cursor-pointer w-fit ${
                        (
                          link.to === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.to)
                        )
                          ? "border-b-1.5 border-borderColor"
                          : "hover:border-b-1.5 border-borderColor"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8 flex md:flex-row justify-start md:justify-end items-start md:items-end md:mb-8 py-12">
                <div className="font-meysha text-4xl text-right rotate-[-30deg] -ml-4 md:ml-0">
                  Quick
                  <br />
                  Contact
                </div>
                <div className="md:ml-20 ml-8">
                  <div className="flex items-center gap-2 mb-5 font-almarai text-sm tracking-wide">
                    <img
                      src={emailIcon.src}
                      alt="email"
                      className="w-4 h-4 mr-2"
                    />
                    <a
                      href={`mailto:${texts.footer.email}`}
                      className="hover:underline"
                    >
                      {texts.footer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mb-5 font-almarai text-sm tracking-wide">
                    <img
                      src={phoneIcon.src}
                      alt="phone"
                      className="w-4 h-4 mr-2"
                    />
                    <a
                      href={`tel:${texts.footer.phone}`}
                      className="hover:underline"
                    >
                      {texts.footer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 font-almarai text-sm">
                    <img
                      src={locationIcon.src}
                      alt="location"
                      className="w-4 h-4 mr-2"
                    />
                    {texts.footer.address[0]}
                    <br />
                    {texts.footer.address[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FooterGallery images={footerImages} />
          <div className="flex flex-col md:flex-row justify-between md:items-center items-center gap-y-2 px-4 py-6 text-xs font-almarai">
            <span>© KRIVA PICTURES 2025. ALL RIGHTS RESERVED.</span>
            <span>PHOTOS BY KRIVA PICTURES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

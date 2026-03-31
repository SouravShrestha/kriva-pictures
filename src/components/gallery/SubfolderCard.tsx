"use client";

import Link from "next/link";
import { formatEventDate } from "@/utils/dateUtils";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { GalleryEvent } from "@/types/gallery";

interface SubfolderCardProps {
  event: GalleryEvent;
  categorySlug: string;
  reverse?: boolean;
}

const SubfolderCard = ({ event, categorySlug, reverse = false }: SubfolderCardProps) => {
  const eventDateStr = formatEventDate(event.date);
  const galleryPath = `/gallery/${categorySlug}/${event.slug}`;

  const labelPanel = (rotation: string) => (
    <div className="flex flex-col items-center justify-center w-full h-20 md:w-28 transition-all duration-300 md:h-[518px] bg-[#e1ddd4]/80">
      <div className={`transform ${rotation} flex flex-col items-center justify-center w-[518px] h-10`}>
        <span className="md:group-hover:border-borderColor border-b border-transparent transition-all duration-300 text-lg md:text-xl text-mainText font-barlow tracking-wide uppercase">
          {event.name}
        </span>
        <span className="text-base text-mainText mt-1 md:mt-2">{eventDateStr}</span>
      </div>
    </div>
  );

  return (
    <Link
      href={galleryPath}
      className={`flex flex-col w-full hover:cursor-pointer relative group md:flex-row${reverse ? "-reverse" : ""}`}
    >
      {/* On mobile, label always renders below the image (order-last). On desktop, flex-row / flex-row-reverse handles position. */}
      <div className={`md:hidden order-last`}>{labelPanel("")}</div>

      <div className={`hidden md:flex ${reverse ? "order-first" : "order-last"}`}>
        {labelPanel(reverse ? "md:-rotate-90" : "md:rotate-90")}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none z-10" />
        <div className="w-full h-[518px] relative z-0">
          {event.coverImage ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-colorSecondary z-0">
                <ImagePlaceholder />
              </div>
              <img
                src={event.coverImage}
                alt={event.name}
                className="w-full h-full object-cover relative z-10"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-colorSecondary">
              <ImagePlaceholder />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SubfolderCard;

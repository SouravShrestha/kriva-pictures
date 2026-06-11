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

const SubfolderCard = ({ event, categorySlug, reverse }: SubfolderCardProps) => {
  const eventDateStr = formatEventDate(event.date);
  const galleryPath = `/gallery/${categorySlug}/${event.slug}`;

  return (
    <Link
      href={galleryPath}
      className="group block relative overflow-hidden bg-colorSecondary aspect-[4/5] w-full"
    >
      {/* Cover image */}
      {event.coverImage ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-colorSecondary z-0">
            <ImagePlaceholder />
          </div>
          <img
            src={event.coverImage}
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-colorSecondary z-10">
          <ImagePlaceholder />
        </div>
      )}

      {/* Gradient overlay — always visible at bottom, darkens on hover */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

      {/* Text info */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <span className="block font-barlow text-xs tracking-[0.2em] uppercase text-white/60 mb-1.5">
          {eventDateStr}
        </span>
        <span className="block font-meysha text-2xl md:text-3xl text-white leading-tight">
          {event.name}
        </span>

        {/* "View gallery" cue — slides up on hover */}
        <span className="mt-3 inline-flex items-center gap-2 font-barlow text-xs tracking-[0.18em] uppercase text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          View Gallery
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
          >
            <path
              d="M0 5H19M15 1L19 5L15 9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default SubfolderCard;

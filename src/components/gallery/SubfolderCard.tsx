"use client";

import Image from "next/image";
import Link from "next/link";
import { formatEventDate } from "@/utils/dateUtils";
import { withCloudinaryOptimization } from "@/utils/cloudinaryUtils";
import ArrowIcon from "@/components/shared/ArrowIcon";
import type { GalleryEvent } from "@/types/gallery";

interface SubfolderCardProps {
  event: GalleryEvent;
  categorySlug: string;
}

const SubfolderCard = ({ event, categorySlug }: SubfolderCardProps) => {
  const eventDateStr = formatEventDate(event.date);
  const galleryPath = `/gallery/${categorySlug}/${event.slug}`;

  return (
    <Link
      href={galleryPath}
      className="group block relative overflow-hidden bg-colorSecondary aspect-[4/5] w-full"
    >
      {event.coverImage ? (
        <Image
          src={withCloudinaryOptimization(event.coverImage)}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-colorSecondary z-10" />
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
          <ArrowIcon className="w-5" />
        </span>
      </div>
    </Link>
  );
};

export default SubfolderCard;

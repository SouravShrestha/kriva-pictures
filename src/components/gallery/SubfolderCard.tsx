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
      className="group block relative overflow-hidden bg-colorSecondary aspect-[3/4] w-full"
    >
      {event.coverImage ? (
        <Image
          src={withCloudinaryOptimization(event.coverImage)}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-colorSecondary z-10" />
      )}

      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <span className="block font-barlow text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2">
          {eventDateStr}
        </span>
        <span className="block font-meysha text-2xl md:text-3xl text-white leading-tight mb-2">
          {event.name}
        </span>

        <span className="mt-4 inline-flex items-center gap-2 font-barlow text-[11px] tracking-[0.2em] uppercase text-white/60 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-100">
          View Gallery
          <ArrowIcon className="w-5" />
        </span>
      </div>
    </Link>
  );
};

export default SubfolderCard;

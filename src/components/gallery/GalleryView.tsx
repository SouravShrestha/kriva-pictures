"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import arrowIcon from "@/assets/icons/arrow.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { formatEventDate } from "@/utils/dateUtils";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { GalleryEvent } from "@/types/gallery";

interface GalleryViewProps {
  event: GalleryEvent;
  images: string[];
  categorySlug: string;
}

const GalleryView = ({ event, images, categorySlug }: GalleryViewProps) => {
  const eventDateStr = formatEventDate(event.date);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length,
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-mainBg pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between md:px-8 md:py-6 md:min-h-64">
          <Link
            href={`/gallery`}
            className="flex items-center gap-2 md:border-r pr-20 border-borderColor hover:underline py-10 cursor-pointer"
          >
            <img
              src={(arrowIcon as { src: string }).src}
              alt="Back"
              className="w-8 h-4 rotate-180"
            />
            <span className="font-ttjenevers text-base tracking-wide ml-4 uppercase">
              Back to gallery
            </span>
          </Link>
          <div className="flex-1 flex flex-col items-center md:py-8 mt-4 px-8">
            <span className="font-meysha font-medium text-4xl md:text-5xl text-center">
              {event.name}
            </span>
            <span className="text-base mt-4 font-almarai tracking-wide mb-10">
              {eventDateStr}
            </span>
          </div>
          <div className="w-40" />
        </div>

        {images.length === 0 ? (
          <div className="flex justify-center items-center py-20 h-[40vh]">
            <p className="font-almarai text-mainText">
              No images available for this event yet.
            </p>
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 900: 2, 1400: 3, 1800: 4 }}
          >
            <Masonry gutter="8px">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer group"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-colorSecondary z-0 min-h-32 min-w-64">
                    <ImagePlaceholder />
                  </div>
                  <img
                    src={imgUrl}
                    alt={`gallery-img-${idx}`}
                    className="relative z-10 transition-opacity duration-200 group-hover:opacity-85"
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-6 text-white text-4xl leading-none hover:opacity-70 transition-opacity z-10"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Counter */}
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white/60 text-sm font-almarai tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </span>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 text-white hover:opacity-70 transition-opacity p-3 z-10"
            aria-label="Previous image"
          >
            <img
              src={(arrowIcon as { src: string }).src}
              alt="Previous"
              className="w-8 h-4 rotate-180 invert"
            />
          </button>

          {/* Image */}
          <img
            src={images[lightboxIndex]}
            alt={`fullscreen-${lightboxIndex}`}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 text-white hover:opacity-70 transition-opacity p-3 z-10"
            aria-label="Next image"
          >
            <img
              src={(arrowIcon as { src: string }).src}
              alt="Next"
              className="w-8 h-4 invert"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryView;

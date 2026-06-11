"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { formatEventDate } from "@/utils/dateUtils";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import ArrowIcon from "@/components/shared/ArrowIcon";
import { withCloudinaryOptimization } from "@/utils/cloudinaryUtils";
import { useInView } from "@/utils/useInView";
import type { GalleryEvent } from "@/types/gallery";
import crossIcon from "@/assets/icons/cross-light.png";

interface GalleryViewProps {
  event: GalleryEvent;
  images: string[];
  categorySlug: string;
}

const GalleryImage = ({
  imgUrl,
  idx,
  onClick,
}: {
  imgUrl: string;
  idx: number;
  onClick: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-colorSecondary z-0 min-h-32 min-w-64">
        <ImagePlaceholder />
      </div>
      <img
        src={withCloudinaryOptimization(imgUrl)}
        alt={`gallery-img-${idx}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`relative z-10 transition-all duration-500 group-hover:opacity-90 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
};

const GalleryView = ({ event, images, categorySlug }: GalleryViewProps) => {
  const eventDateStr = formatEventDate(event.date);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView(0.1);

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
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col items-center px-8 pt-12 md:pt-16 pb-6"
        >
          <Link
            href="/gallery"
            className={`inline-flex items-center gap-3 mb-8 font-barlow text-xs tracking-[0.2em] uppercase text-mainText/50 hover:text-mainText hover:underline transition-colors duration-300 ${
              headerInView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <ArrowIcon className="w-5 h-3 rotate-180" />
            Back to gallery
          </Link>

          <h1
            className={`font-meysha text-4xl md:text-5xl text-mainText text-center leading-loose py-1 ${
              headerInView
                ? "animate-fade-up [animation-delay:100ms]"
                : "opacity-0"
            }`}
          >
            {event.name}
          </h1>

          <span
            className={`text-sm mt-3 font-almarai tracking-[0.15em] uppercase text-mainText/70 ${
              headerInView
                ? "animate-fade-up [animation-delay:180ms]"
                : "opacity-0"
            }`}
          >
            {eventDateStr}
          </span>

          <div
            className={`mt-8 w-16 h-px bg-borderColor/20 ${
              headerInView
                ? "animate-fade-in [animation-delay:250ms]"
                : "opacity-0"
            }`}
          />
        </div>

        {images.length === 0 ? (
          <div className="flex justify-center items-center py-20 h-[40vh]">
            <p className="font-almarai text-mainText/50 tracking-wide">
              No images available for this event yet.
            </p>
          </div>
        ) : (
          <div className="px-2 md:px-4">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 900: 2, 1400: 3, 1800: 4 }}
            >
              <Masonry gutter="6px">
                {images.map((imgUrl, idx) => (
                  <GalleryImage
                    key={idx}
                    imgUrl={imgUrl}
                    idx={idx}
                    onClick={() => openLightbox(idx)}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-6 hover:scale-110 transition-transform z-50"
            aria-label="Close menu"
          >
            <img src={crossIcon.src} alt="Close" className="w-6 h-6" />
          </button>

          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-white/90 text-xs font-barlow tracking-[0.2em] px-4 py-1.5">
            {lightboxIndex + 1} / {images.length}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 text-white hover:opacity-70 transition-opacity p-3 z-10"
            aria-label="Previous image"
          >
            <ArrowIcon className="w-8 h-4 rotate-180 text-white" />
          </button>

          <img
            src={withCloudinaryOptimization(images[lightboxIndex])}
            alt={`fullscreen-${lightboxIndex}`}
            loading="eager"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 text-white hover:opacity-70 transition-opacity p-3 z-10"
            aria-label="Next image"
          >
            <ArrowIcon className="w-8 h-4 text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryView;

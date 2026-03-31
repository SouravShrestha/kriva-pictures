"use client";

import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface SplideBannerProps {
  images: string[];
}

const SplideBanner = ({ images }: SplideBannerProps) => {
  const splideRef = useRef<{ splide?: { go: (index: number) => void } }>(null);


  // Scroll banner once on mount to ensure all images load properly
  useEffect(() => {
    if (splideRef.current && images.length > 1) {
      const timeout = setTimeout(() => {
        splideRef.current?.splide?.go(1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="relative flex items-center justify-center w-full h-[calc(70vh)] md:h-[calc(100vh-72px)] bg-colorSecondary">
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-[calc(70vh)] md:h-[calc(100vh-72px)]">
      <Splide
        className="splideHome"
        key={images.length}
        ref={splideRef}
        options={{
          type: "loop",
          focus: "center",
          pauseOnFocus: false,
          pauseOnHover: false,
          autoplay: images.length > 1,
          interval: 5000,
          fixedWidth: "100%",
          padding: "10%",
          arrows: false,
          pagination: false,
          drag: true,
          breakpoints: {
            1440: { padding: "15%" },
            1280: { padding: "5%" },
            1024: { padding: "0%" },
            768: { padding: "0%" },
          },
        }}
        style={{ height: "calc(100vh - 72px)" }}
      >
        {images.map((img, idx) =>
          img ? (
            <SplideSlide key={idx}>
              <div className="relative">
                <img
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  className="transition-all duration-2000 h-full w-full object-cover relative z-10"
                  style={{ height: "calc(100vh - 72px)" }}
                />
                <div
                  className="h-full w-full absolute top-0 bg-colorSecondary border-r border-mainBg"
                  style={{ height: "calc(100vh - 72px)" }}
                >
                  <ImagePlaceholder />
                </div>
              </div>
            </SplideSlide>
          ) : null
        )}
      </Splide>
    </div>
  );
};

export default SplideBanner;

"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";
import "@splidejs/splide/dist/css/splide.min.css";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface SplideGalleryBannerProps {
  images: string[];
}

const SplideGalleryBanner = ({ images }: SplideGalleryBannerProps) => {
  const splideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length && splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        perPage: 2,
        perMove: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        autoplay: true,
        interval: 6000,
        arrows: false,
        pagination: false,
        drag: true,
        gap: "6px",
        lazyLoad: "nearby",
        breakpoints: {
          800: {
            grid: { rows: 2, cols: 1 },
          },
        },
        grid: {
          rows: 2,
          cols: 2,
          gap: { row: "6px", col: "6px" },
        },
      });
      splide.mount({ Grid });
      return () => { splide.destroy(); };
    }
  }, [images]);


  if (images.length === 0) {
    return (
      <div className="w-full h-[32rem] border-borderColor border-b-0 flex items-center justify-center bg-colorSecondary">
        <ImagePlaceholder title="loading gallery" />
      </div>
    );
  }

  return (
    <div className="w-full h-[32rem] border-borderColor border-b-0 relative">
      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((img, idx) =>
              img ? (
                <li className="splide__slide" key={idx}>
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-colorSecondary">
                      <ImagePlaceholder />
                    </div>
                    <img
                      src={img}
                      alt={`Gallery Banner ${idx + 1}`}
                      className="object-cover h-64 w-full relative"
                    />
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SplideGalleryBanner;

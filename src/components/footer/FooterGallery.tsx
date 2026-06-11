"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface FooterGalleryProps {
  images: string[];
}

const FooterGallery = ({ images }: FooterGalleryProps) => {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-44 md:h-72 bg-colorSecondary">
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full mt-6 gap-x-2">
      <Splide
        key={images.length}
        options={{
          type: "loop",
          start: 0,
          perPage: 4.5,
          breakpoints: {
            1536: { perPage: 4.5 },
            1360: { perPage: 4.25 },
            1280: { perPage: 4 },
            1220: { perPage: 3.75 },
            1120: { perPage: 3.5 },
            1040: { perPage: 3.25 },
            970: { perPage: 3 },
            890: { perPage: 2.75 },
            820: { perPage: 2.5 },
            768: { perPage: 4 },
            720: { perPage: 3.5 },
            680: { perPage: 3.25 },
            640: { perPage: 3 },
            560: { perPage: 2.75 },
            520: { perPage: 2.5 },
            460: { perPage: 2.25 },
            420: { perPage: 2 },
            380: { perPage: 1.75 },
            340: { perPage: 1.5 },
            300: { perPage: 1.25 },
            260: { perPage: 1 },
          },
          focus: "center",
          pauseOnFocus: false,
          pauseOnHover: false,
          autoplay: images.length > 1,
          interval: 4000,
          arrows: false,
          pagination: false,
          drag: true,
        }}
      >
        {images.map((img, idx) =>
          img ? (
            <SplideSlide key={images.length + idx}>
              <div className="relative">
                <img
                  src={img}
                  alt={`Footer Gallery ${idx + 1}`}
                  className="object-cover object-center transition-all duration-2000 h-44 w-44 md:h-72 md:w-72 lg:h-72 lg:w-72 relative z-10"
                />
                <div className="h-44 w-44 md:h-72 md:w-72 lg:h-72 lg:w-72 absolute top-0 bg-colorSecondary">
                  <ImagePlaceholder />
                </div>
              </div>
            </SplideSlide>
          ) : null,
        )}
      </Splide>
    </div>
  );
};

export default FooterGallery;

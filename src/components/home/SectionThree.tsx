"use client";

import { useEffect, useState, useCallback } from "react";
import quoteIcon from "@/assets/icons/quote.png";
import arrowIcon from "@/assets/icons/arrow.svg";
import type { Testimonial } from "@/types/testimonials";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface SectionThreeProps {
  testimonials: Testimonial[];
  imageUrl: string | null;
}

const EMPTY_TESTIMONIAL: Testimonial = {
  heading: "",
  details: "",
  name: "",
  occasion: "",
  image_url: "",
};

const SectionThree = ({ testimonials, imageUrl }: SectionThreeProps) => {
  const [current, setCurrent] = useState(0);

  const handlePrevious = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  }, [testimonials.length]);

  const testimonial = testimonials[current] ?? EMPTY_TESTIMONIAL;

  return (
    <section className="w-full border-t border-borderColor flex flex-col items-center justify-center">
      <div className="w-full flex-col items-center justify-center overflow-hidden relative min-h-[60vh]">
        <div className="relative w-full">
          <img
            src={imageUrl ?? undefined}
            alt="child and dog"
            className="object-cover object-center h-[50vh] md:h-auto w-full relative z-10 min-h-auto md:min-h-[60vh]"
          />
          <div className="h-full w-full top-0 bg-colorSecondaryDark absolute">
            <ImagePlaceholder />
          </div>
        </div>
        <div className="absolute z-10 flex flex-col items-end justify-center pr-12 pt-8 md:top-10 right-5">
          <div className="text-right">
            <span className="block text-white text-5xl font-ttjenevers tracking-wide leading-tight">
              LETS DO THINGS
            </span>
            <span className="block text-white text-5xl font-ttjenevers tracking-wide leading-tight mt-6">
              a Little{" "}
              <span className="font-meysha text-5xl ml-2">differently</span>
            </span>
          </div>
        </div>
      </div>

      <div className="ml-1/2 w-full px-8 md:px-0 flex flex-1 justify-center -translate-y-1/4 z-30 flex-col">
        <div className="flex-row flex items-center gap-4 md:gap-8 justify-center w-full">
          <button
            className="md:flex flex-row items-center text-mainText text-lg font-barlow mt-0 hidden"
            onClick={handlePrevious}
            disabled={testimonials.length === 0}
          >
            <img
              src={(arrowIcon as { src: string }).src}
              alt="previous"
              className="w-8 h-8 rotate-180"
            />
            <div className="flex flex-col gap-1 ml-5">
              <span className="text-xs tracking-widest font-semibold">PR</span>
              <span className="text-xs tracking-widest font-semibold">EV</span>
            </div>
          </button>
          <div className="flex flex-col md:flex-row bg-mainBg border border-borderColor max-w-5xl z-30 w-full md:h-[422px]">
            <div className="flex-1 flex flex-col justify-center md:p-8 p-5 pt-8 border-b md:border-b-0 md:border-r border-borderColor items-center md:items-start h-[282px] md:h-[422px]">
              <div className="flex justify-between items-center w-full mb-6">
                <button
                  className="md:hidden flex flex-row items-center text-mainText text-lg font-barlow mt-0"
                  onClick={handlePrevious}
                  disabled={testimonials.length === 0}
                >
                  <img
                    src={(arrowIcon as { src: string }).src}
                    alt="previous"
                    className="w-8 h-8 rotate-180"
                  />
                  <div className="flex flex-col gap-1 ml-5">
                    <span className="text-xs tracking-widest font-semibold">
                      PR
                    </span>
                    <span className="text-xs tracking-widest font-semibold">
                      EV
                    </span>
                  </div>
                </button>
                <img
                  src={quoteIcon.src}
                  alt="quote"
                  className="w-5 h-5 mb-6 "
                />
                <button
                  className="md:hidden flex flex-row items-center text-mainText text-lg font-barlow mt-0"
                  onClick={handleNext}
                  disabled={testimonials.length === 0}
                >
                  <div className="flex flex-col gap-1 mr-5">
                    <span className="text-xs tracking-widest font-semibold">
                      NE
                    </span>
                    <span className="text-xs tracking-widest font-semibold">
                      XT
                    </span>
                  </div>
                  <img
                    src={(arrowIcon as { src: string }).src}
                    alt="next"
                    className="w-8 h-8"
                  />
                </button>
              </div>
              <div className="font-ttjenevers text-xl md:text-2xl text-mainText mt-6 mb-10 md:mt-4 md:mb-6 tracking-wide leading-snug text-center md:text-left">
                {testimonial.heading}
              </div>
              <div className="font-almarai text-base text-mainText tracking-wide leading-relaxed text-center md:text-left mb-6">
                {testimonial.details}
              </div>
            </div>
            <div className="flex-1 flex md:flex-row flex-col items-center justify-center relative">
              <div className="flex items-center justify-center h-full w-full md:w-16 rg:flex py-4 md:py-0">
                <span className="text-mainText text-sm md:text-base font-almarai md:absolute tracking-widest md:[transform:rotate(-90deg)] text-center justify-center w-full md:w-full md:text-start flex gap-x-4 items-center">
                  <span>{testimonial.name}</span>
                  {testimonial.name && (
                    <span className="border-l border-borderColor py-3" />
                  )}
                  <span>{testimonial.occasion}</span>
                </span>
              </div>
              {testimonial.image_url && (
                <div className="relative w-full md:w-[420px] md:min-w-[420px]">
                  <img
                    src={testimonial.image_url}
                    alt="testimonial event"
                    className="w-full md:w-[420px] md:min-w-[420px] object-cover object-center h-[280px] md:h-[420px] border-t md:border-t-0 md:border-l border-borderColor z-20 relative"
                  />
                  <div className="absolute w-full md:w-[420px] md:min-w-[420px] object-cover object-center h-[280px] md:h-[420px] border-t md:border-t-0 md:border-l border-transparent top-0 z-10 bg-colorSecondary">
                    <ImagePlaceholder />
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="md:flex flex-row items-center text-mainText text-lg font-barlow mt-0 hidden"
            onClick={handleNext}
            disabled={testimonials.length === 0}
          >
            <div className="flex flex-col gap-1 mr-5">
              <span className="text-xs tracking-widest font-semibold">NE</span>
              <span className="text-xs tracking-widest font-semibold">XT</span>
            </div>
            <img
              src={(arrowIcon as { src: string }).src}
              alt="next"
              className="w-8 h-8"
            />
          </button>
        </div>

        <div
          className="w-full pointer-events-none select-none"
          style={{ transform: "translateY(-15%)" }}
        >
          <span className="block w-full text-center text-[4rem] md:text-[12rem] font-ttjenevers text-mainText/10 leading-none tracking-wider">
            LOVE{" "}
            <span className="font-meysha text-[3rem] md:text-[9rem] align-middle -ml-6 md:-ml-12">
              notes
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;

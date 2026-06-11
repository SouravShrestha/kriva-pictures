"use client";

import Link from "next/link";
import ArrowIcon from "@/components/shared/ArrowIcon";
import type { GalleryCategory } from "@/types/gallery";
import SubfolderCard from "./SubfolderCard";
import { useInView } from "@/utils/useInView";

interface CategoryViewProps {
  category: GalleryCategory;
  categorySlug: string;
}

const CategoryView = ({ category, categorySlug }: CategoryViewProps) => {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);
  const { ref: gridRef, inView: gridInView } = useInView(0.05);

  return (
    <div className="min-h-screen flex flex-col bg-mainBg">
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
          Back to all galleries
        </Link>

        <h1
          className={`font-meysha text-4xl md:text-5xl text-mainText text-center leading-loose py-1 ${
            headerInView ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"
          }`}
        >
          {category.name}
        </h1>

        <div
          className={`mt-8 w-16 h-px bg-borderColor/20 ${
            headerInView ? "animate-fade-in [animation-delay:200ms]" : "opacity-0"
          }`}
        />
      </div>

      <div
        ref={gridRef as React.RefObject<HTMLDivElement>}
        className="px-6 md:px-12 lg:px-16 pb-24 pt-4"
      >
        {category.events.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-almarai text-mainText/50 tracking-wide">
              No events in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 rg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {category.events.map((event, i) => (
              <div
                key={event.slug}
                className={gridInView ? "animate-fade-up" : "opacity-0"}
                style={gridInView ? { animationDelay: `${Math.min(i * 80, 400)}ms` } : undefined}
              >
                <SubfolderCard
                  event={event}
                  categorySlug={categorySlug}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;

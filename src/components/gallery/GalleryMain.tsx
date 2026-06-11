"use client";

import { useState } from "react";
import type { GalleryCategory } from "@/types/gallery";
import SubfolderCard from "./SubfolderCard";
import { useInView } from "@/utils/useInView";

interface GalleryMainProps {
  categories: GalleryCategory[];
}

const GalleryMain = ({ categories }: GalleryMainProps) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.slug ?? "");
  const { ref: tabRef, inView: tabInView } = useInView(0.1);
  const { ref: gridRef, inView: gridInView } = useInView(0.05);

  const activeCategory = categories.find((c) => c.slug === activeTab);
  const subfolders = activeCategory?.events ?? [];

  return (
    <div className="min-h-screen bg-mainBg">
      {categories.length > 0 && (
        <div
          ref={tabRef as React.RefObject<HTMLDivElement>}
          className="px-6 md:px-16 pt-14 pb-10"
        >
          <p
            className={`font-almarai text-sm tracking-widest text-mainText/60 mb-8 text-center ${
              tabInView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Browse by collection
          </p>

          <div
            className={`flex justify-center gap-8 md:gap-12 flex-wrap ${
              tabInView ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"
            }`}
          >
            {categories.map((tab) => {
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(tab.slug)}
                  title={tab.name}
                  className={`font-barlow text-sm tracking-[0.15em] uppercase transition-colors duration-300 pb-[4px] ${
                    isActive
                      ? "text-mainText border-b border-borderColor"
                      : "text-mainText/80 hover:text-mainText hover:border-b border-borderColor"
                  }`}
                >
                  {tab.name.charAt(0).toUpperCase() +
                    tab.name.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-10 h-px bg-borderColor/10 ${
              tabInView ? "animate-fade-in [animation-delay:200ms]" : "opacity-0"
            }`}
          />
        </div>
      )}

      <div
        ref={gridRef as React.RefObject<HTMLDivElement>}
        className="px-6 md:px-12 lg:px-16 pb-24"
      >
        {subfolders.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-almarai text-mainText/50 tracking-wide">
              No sessions in this collection yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 rg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {subfolders.map((event, i) => (
              <div
                key={event.slug}
                className={gridInView ? `animate-fade-up` : "opacity-0"}
                style={gridInView ? { animationDelay: `${Math.min(i * 80, 400)}ms` } : undefined}
              >
                <SubfolderCard
                  event={event}
                  categorySlug={activeCategory?.slug ?? ""}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryMain;

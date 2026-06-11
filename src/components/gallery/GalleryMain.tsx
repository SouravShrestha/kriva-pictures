"use client";

import { useState } from "react";
import type { GalleryCategory } from "@/types/gallery";
import SubfolderCard from "./SubfolderCard";

interface GalleryMainProps {
  categories: GalleryCategory[];
}

const GalleryMain = ({ categories }: GalleryMainProps) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.name ?? "");

  const activeCategory = categories.find((c) => c.name === activeTab);
  const subfolders = activeCategory?.events ?? [];

  return (
    <div className="min-h-screen bg-mainBg">
      {/* ── Category Tab Bar ── */}
      {categories.length > 0 && (
        <div className="px-6 md:px-16 pt-14 pb-10">
          {/* Eyebrow label */}
          <p className="font-almarai text-xs tracking-[0.25em] uppercase text-mainText mb-6 text-center">
            Browse by collection
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(tab.name)}
                  title={tab.name}
                  className={`relative px-7 py-2.5 font-barlow text-sm tracking-[0.15em] uppercase transition-all duration-300 border ${
                    isActive
                      ? "bg-mainText text-mainBg border-mainText"
                      : "bg-transparent text-mainText border-mainText/40 hover:border-mainText hover:text-mainText"
                  }`}
                >
                  {tab.name.charAt(0).toUpperCase() +
                    tab.name.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>

          {/* Thin divider */}
          <div className="mt-10 h-px bg-mainText/10" />
        </div>
      )}

      {/* ── Event Grid ── */}
      <div className="px-6 md:px-12 lg:px-16 pb-24">
        {subfolders.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-almarai text-mainText/50 tracking-wide">
              No sessions in this collection yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 rg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {subfolders.map((event) => (
              <SubfolderCard
                key={event.slug}
                event={event}
                categorySlug={activeCategory?.slug ?? ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryMain;

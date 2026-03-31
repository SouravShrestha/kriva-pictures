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
    <div className="min-h-screen">
      {categories.length > 0 && (
        <div className="relative px-6 md:px-10 py-10 flex justify-start border-b-0 border-mainText">
          <div className="flex gap-x-12 z-10 flex-wrap">
            {categories.map((tab) => (
              <button
                key={tab.slug}
                className={`px-1 pb-1 transition-all uppercase duration-300 tracking-wider font-barlow border-b hover:border-mainText hover:text-mainText text-base truncate max-w-xs mb-4 ${
                  activeTab === tab.name
                    ? "text-mainText border-mainText"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.name)}
                title={tab.name}
              >
                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col mb-16 gap-y-12 items-center">
        {subfolders.map((event, idx) => (
          <SubfolderCard
            key={event.slug}
            event={event}
            categorySlug={activeCategory?.slug ?? ""}
            reverse={idx % 2 !== 1}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryMain;

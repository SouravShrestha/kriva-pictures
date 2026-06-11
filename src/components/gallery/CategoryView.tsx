import Link from "next/link";
import arrowIcon from "@/assets/icons/arrow.svg";
import type { GalleryCategory } from "@/types/gallery";
import SubfolderCard from "./SubfolderCard";

interface CategoryViewProps {
  category: GalleryCategory;
  categorySlug: string;
}

const CategoryView = ({ category, categorySlug }: CategoryViewProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between md:px-8 md:py-6 md:min-h-40">
        <Link
          href="/gallery"
          className="flex items-center gap-2 md:border-r pr-20 border-borderColor hover:underline py-10 cursor-pointer"
        >
          <img src={(arrowIcon as { src: string }).src} alt="Back" className="w-8 h-4 rotate-180" />
          <span className="font-ttjenevers text-base tracking-wide ml-4 uppercase">
            Back to all galleries
          </span>
        </Link>
        <div className="flex-1 flex flex-col items-center md:py-8 mt-4 px-8">
          <span className="font-meysha font-medium text-4xl md:text-5xl text-center">
            {category.name}
          </span>
        </div>
        <div className="w-40" />
      </div>

      <div className="min-h-screen flex flex-col mb-16 gap-y-12 items-center">
        {category.events.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-almarai text-mainText">No events in this category yet.</p>
          </div>
        ) : (
          category.events.map((event, idx) => (
            <SubfolderCard
              key={event.slug}
              event={event}
              categorySlug={categorySlug}
              reverse={idx % 2 !== 1}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryView;

import Link from "next/link";
import arrowIcon from "@/assets/icons/arrow.svg";
import { getIcon } from "@/utils/iconMapping";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Package } from "@/types/packages";

interface PackageCardProps {
  pkg: Package;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <div className="w-full">
      <div className="bg-[#ede7df] overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-colorSecondary">
            <ImagePlaceholder />
          </div>
          {pkg.image && (
            <img
              src={pkg.image}
              alt={pkg.name}
              className="relative w-full h-60 sm:h-72 md:h-[30rem] object-cover z-20"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4 sm:px-10 sm:py-6 z-30">
            <h2 className="text-2xl sm:text-3xl font-meysha text-white mb-2">{pkg.name}</h2>
            <p className="text-sm sm:text-base text-white/90 font-almarai">{pkg.ideal_for}</p>
          </div>
        </div>

        <div className="p-6 md:p-12">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex items-end">
              <span className="text-5xl font-barlow text-mainText tracking-wide">
                ${pkg.price_aud}
              </span>
              <span className="text-lg font-almarai text-mainText ml-2"> per session</span>
            </div>
            <Link
              href={`/contact?package=${encodeURIComponent(pkg.name)}`}
              className="w-full bg-white sm:w-auto border-1.5 border-borderColor px-6 py-2 hover:bg-gray-50 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-mainText font-barlow tracking-wide text-lg uppercase">
                Book YOUR session now
              </span>
              <img src={(arrowIcon as { src: string }).src} alt="Arrow" className="w-8 h-8" />
            </Link>
          </div>
          <div className="mt-6 md:mt-8">
            <h3 className="text-xl font-barlow tracking-wide text-mainText mb-4">
              What's included:
            </h3>
            <ul className="space-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:w-2/3 md:gap-y-2 md:space-y-0">
              {pkg.includes.map((feature, idx) => {
                const icon = getIcon(feature.icon);
                return (
                  <li key={idx} className="flex items-start">
                    <span className="text-mainText mr-2 mt-1">
                      {icon && (
                        <img
                          src={icon.src}
                          alt={feature.icon}
                          className="w-4 h-4"
                        />
                      )}
                    </span>
                    <span className="text-mainText font-almarai ml-1">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

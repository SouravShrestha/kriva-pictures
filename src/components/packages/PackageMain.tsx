"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import PackageCard from "./PackageCard";
import MenuCard from "./MenuCard";
import arrowIcon from "@/assets/icons/arrow.svg";
import starIcon from "@/assets/icons/star.png";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import packagesIcon from "@/assets/icons/packages.png";
import type { Package } from "@/types/packages";

interface PackageMainProps {
  packages: Package[];
}

const PackageMain = ({ packages }: PackageMainProps) => {
  const [activePackage, setActivePackage] = useState<Package | null>(packages[0] ?? null);
  const [gridCols, setGridCols] = useState(3);
  const topMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateGridCols = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 5;
      if (width >= 768) return 4;
      if (width >= 640) return 3;
      return 2;
    };

    const handleResize = () => setGridCols(calculateGridCols());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTopMenu = () => {
    topMenuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigatePrev = () => {
    if (!activePackage) return;
    const currentIndex = packages.findIndex((p) => p.name === activePackage.name);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : packages.length - 1;
    setActivePackage(packages[prevIndex] ?? null);
  };

  const navigateNext = () => {
    if (!activePackage) return;
    const currentIndex = packages.findIndex((p) => p.name === activePackage.name);
    const nextIndex = currentIndex < packages.length - 1 ? currentIndex + 1 : 0;
    setActivePackage(packages[nextIndex] ?? null);
  };

  return (
    <div className="min-h-screen bg-mainBg py-8 sm:py-12 lg:py-16">
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-meysha text-mainText mb-6 md:mb-12 leading-relaxed">
          Capture Your Story, Beautifully
        </h1>
        <p className="text-base sm:text-lg text-mainText font-almarai max-w-3xl mx-auto leading-7">
          We get it, life&apos;s moments are precious. That&apos;s why we&apos;ve
          designed flexible photography packages for every occasion. All delivered
          digitally, beautifully edited, and ready to cherish forever.
        </p>
        <p className="text-base sm:text-lg text-mainText font-almarai mt-4">
          For custom quotes and add-ons{" "}
          <Link
            href="/contact"
            className="text-mainText hover:text-mainText underline underline-offset-2 transition-colors duration-200"
          >
            contact us here
          </Link>
        </p>
      </div>

      <div className="px-5 md:px-32">
        {packages.length === 0 ? (
          <div className="flex w-full bg-colorSecondary justify-center items-center mt-9 md:mt-14 h-[50vh]">
            <ImagePlaceholder icon={packagesIcon} title="No packages available" />
          </div>
        ) : (
          <>
            <div ref={topMenuRef} className="sm:mb-8 items-center flex justify-center pt-9 md:pt-14 flex-1 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-3 sm:gap-x-4 mb-8 w-full">
                {packages.map((pkg) => (
                  <MenuCard
                    key={pkg.id}
                    pkg={pkg}
                    isActive={activePackage?.name === pkg.name}
                    onClick={() => {
                      setActivePackage(pkg);
                      scrollToTopMenu();
                    }}
                  />
                ))}
              </div>
            </div>

            {activePackage && (
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={navigatePrev}
                  className="flex items-center justify-center h-12 w-12"
                >
                  <img
                    src={(arrowIcon as { src: string }).src}
                    alt="Previous"
                    className="w-10 h-10 transform rotate-180"
                  />
                </button>
                <div className="text-center">
                  <div className="text-lg text-mainText tracking-wide font-barlow md:text-2xl">
                    {activePackage.name}
                  </div>
                  <div className="text-sm font-almarai md:text-base md:mt-1">
                    {activePackage.ideal_for}
                  </div>
                </div>
                <button
                  onClick={navigateNext}
                  className="flex items-center justify-center w-12 h-12"
                >
                  <img
                    src={(arrowIcon as { src: string }).src}
                    alt="Next"
                    className="w-10 h-10 transform"
                  />
                </button>
              </div>
            )}

            {activePackage && <PackageCard pkg={activePackage} />}

            <div className="flex justify-end items-center mt-8">
              <img src={starIcon.src} alt="Star" className="h-3 w-3 mr-2" />
              <p className="text-sm sm:text-base text-mainText font-almarai">
                For custom quotes and add-ons{" "}
                <Link
                  href="/contact"
                  className="text-mainText underline underline-offset-2 transition-colors duration-200"
                >
                  contact us here
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageMain;

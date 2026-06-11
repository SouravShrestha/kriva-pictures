"use client";

import Image from "next/image";
import Link from "next/link";
import texts from "@/resources/texts";
import arrowIcon from "@/assets/icons/arrow.svg";
import { withCloudinaryOptimization } from "@/utils/cloudinaryUtils";
import { useInView } from "@/utils/useInView";

interface SectionOneProps {
  imageUrl: string | null;
}

const SectionOne = ({ imageUrl }: SectionOneProps) => {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full flex rg:flex-row md:mt-0 flex-col-reverse flex-1 md:h-[calc(100vh-64px)] mt-4 items-center"
    >
      <div
        className={`flex items-start rg:items-center justify-center h-72 w-full md:h-auto md:w-auto min-w-[35%] transition-opacity duration-700 ${
          inView ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="relative w-full h-72 rg:h-[calc(100vh-64px)]">
          <Image
            src={withCloudinaryOptimization(imageUrl ?? "")}
            alt="Celebration"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover z-10"
          />
        </div>
      </div>
      <div className="flex items-center justify-center h-full w-full md:w-32 rg:flex">
        <span
          className="text-mainText text-2xl md:text-4xl font-meysha tracking-wide md:absolute md:-ml-24 md:whitespace-nowrap md:[transform:rotate(90deg)] text-center w-full md:w-fit md:text-start"
          style={{ whiteSpace: "normal" }}
        >
          {texts.sectionOne.heading}
        </span>
      </div>
      <div className="flex flex-col flex-1 items-start justify-center h-full rg:pl-20 md:p-12 p-8">
        <div
          className={`flex flex-col rg:text-5xl text-4xl font-ttjenevers items-start tracking-wide ${
            inView ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <span>{texts.sectionOne.celebrations}</span>
          <span className="font-meysha -my-3 mb-0">{texts.sectionOne.and}</span>
          <span>{texts.sectionOne.moments}</span>
        </div>
        <span
          className={`mt-8 max-w-lg text-xl font-ttjenevers tracking-wide ${
            inView ? "animate-fade-up [animation-delay:150ms]" : "opacity-0"
          }`}
        >
          {texts.sectionOne.subheading}
        </span>
        <span
          className={`mt-8 max-w-xl text-base font-almarai leading-7 hidden md:block ${
            inView ? "animate-fade-up [animation-delay:250ms]" : "opacity-0"
          }`}
        >
          {texts.sectionOne.description}
        </span>
        <span
          className={`mt-8 max-w-xl text-base font-almarai leading-8 block tracking-wide md:hidden ${
            inView ? "animate-fade-up [animation-delay:250ms]" : "opacity-0"
          }`}
        >
          {texts.sectionOne.descriptionShort}
        </span>
        <div
          className={`w-full flex justify-end md:justify-start my-2 md:mt-5 ${
            inView ? "animate-fade-up [animation-delay:350ms]" : "opacity-0"
          }`}
        >
          <Link href="/packages" className="cursor-pointer mt-8">
            <button className="flex gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline">
              {texts.sectionOne.button}
              <img
                src={arrowIcon.src}
                alt="arrow"
                className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;

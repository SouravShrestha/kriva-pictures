"use client";

import Image from "next/image";
import Link from "next/link";
import arrowIcon from "@/assets/icons/arrow.svg";
import texts from "@/resources/texts";
import { withCloudinaryOptimization } from "@/utils/cloudinaryUtils";
import { useInView } from "@/utils/useInView";

interface SectionTwoProps {
  images: string[];
}

const SectionTwo = ({ images }: SectionTwoProps) => {
  const { ref: sectionRef, inView } = useInView(0.1);

  const delays = ["[animation-delay:0ms]", "[animation-delay:150ms]", "[animation-delay:300ms]"];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full bg-colorSecondary border-borderColor"
    >
      <div className="mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-borderColor">
        {texts.sectionTwo.services.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col items-center px-6 py-10 flex-1 ${
              inView ? `animate-fade-up ${delays[i] ?? ""}` : "opacity-0"
            }`}
          >
            <div className="relative h-64 w-full md:w-64 rounded-sm mb-8">
              <Image
                src={withCloudinaryOptimization(images[i] ?? "")}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-cover z-10 rounded-sm"
              />
            </div>
            <h2 className="font-meysha text-4xl mb-6 text-center">{s.title}</h2>
            <p className="font-almarai leading-7 text-base text-justify text-mainText max-w-xs">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-borderColor flex justify-end items-center md:px-8 px-6 py-4">
        <Link
          href="/packages"
          className="cursor-pointer"
        >
          <span className="relative flex gap-2 text-mainText font-barlow tracking-widest text-base group uppercase pb-[3px] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-mainText after:w-0 hover:after:w-full after:transition-all after:duration-300">
            {texts.sectionTwo.button}
            <img
              src={arrowIcon.src}
              alt="arrow"
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default SectionTwo;

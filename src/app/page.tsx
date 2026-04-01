import bannerService from "@/services/bannerService";
import sectionImagesService from "@/services/sectionImagesService";
import SplideBanner from "@/components/home/SplideBanner";
import SectionOne from "@/components/home/SectionOne";
import SectionTwo from "@/components/home/SectionTwo";
import SectionThree from "@/components/home/SectionThree";
import SectionFour from "@/components/home/SectionFour";
import MovingTextBanner from "@/components/MovingTextBanner";
import Navbar from "@/components/Navbar";
import testimonialsData from "@/data/testimonials.json";
import sectionImageTags from "@/data/images.json";
import type { Testimonial } from "@/types/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kriva Pictures | Professional Photography",
  description:
    "Welcome to Kriva Pictures. We capture your most special celebrations and moments beautifully.",
};

export default async function HomePage() {
  const tags = sectionImageTags.sectionImages;

  const [
    bannerImages,
    section1a,
    section2a,
    section2b,
    section2c,
    section3a,
    section4a,
    section4b,
    slideNav,
  ] = await Promise.all([
    bannerService.fetchImageUrls("kp-main-banner"),
    sectionImagesService.getFirstImageByTag(tags.section1a),
    sectionImagesService.getFirstImageByTag(tags.section2a),
    sectionImagesService.getFirstImageByTag(tags.section2b),
    sectionImagesService.getFirstImageByTag(tags.section2c),
    sectionImagesService.getFirstImageByTag(tags.section3a),
    sectionImagesService.getFirstImageByTag(tags.section4a),
    sectionImagesService.getFirstImageByTag(tags.section4b),
    sectionImagesService.getFirstImageByTag(tags.slideNav),
  ]);

  const section2Images = [section2a, section2b, section2c].filter(
    (u): u is string => u !== null,
  );
  const testimonials = testimonialsData as Testimonial[];

  return (
    <>
      <div className="bg-mainBg text-mainText md:min-h-screen relative flex flex-col">
        <SplideBanner images={bannerImages} />
        <Navbar navImageUrl={slideNav} />
      </div>
      <div className="bg-mainBg text-mainText relative flex flex-col">
        <SectionOne imageUrl={section1a} />
        <MovingTextBanner />
        <SectionTwo images={section2Images} />
        <SectionThree testimonials={testimonials} imageUrl={section3a} />
        <SectionFour imageUrl4a={section4a} imageUrl4b={section4b} />
      </div>
    </>
  );
}

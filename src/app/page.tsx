import bannerService from "@/services/bannerService";
import SplideBanner from "@/components/home/SplideBanner";
import SectionOne from "@/components/home/SectionOne";
import SectionTwo from "@/components/home/SectionTwo";
import SectionThree from "@/components/home/SectionThree";
import SectionFour from "@/components/home/SectionFour";
import MovingTextBanner from "@/components/MovingTextBanner";
import Navbar from "@/components/Navbar";
import testimonialsData from "@/data/testimonials.json";
import type { Testimonial } from "@/types/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kriva Pictures | Professional Photography",
  description:
    "Welcome to Kriva Pictures. We capture your most special celebrations and moments beautifully.",
};

export default async function HomePage() {
  const bannerImages = await bannerService.fetchImageUrls("kp-main-banner");
  const testimonials = testimonialsData as Testimonial[];

  return (
    <>
      <div className="bg-mainBg text-mainText md:min-h-screen relative flex flex-col">
        <SplideBanner images={bannerImages} />
        <Navbar />
      </div>
      <div className="bg-mainBg text-mainText relative flex flex-col">
        <SectionOne />
        <MovingTextBanner />
        <SectionTwo />
        <SectionThree testimonials={testimonials} />
        <SectionFour />
      </div>
    </>
  );
}

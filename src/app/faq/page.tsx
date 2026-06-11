import Navbar from "@/components/Navbar";
import FaqMain from "@/components/faq/FaqMain";
import faqService from "@/services/faqService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about Kriva Pictures photography sessions, pricing, and booking.",
};

export default function FaqPage() {
  const categories = faqService.getCategories();

  return (
    <>
      <Navbar />
      <FaqMain categories={categories} />
    </>
  );
}

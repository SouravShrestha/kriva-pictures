import faqData from "@/data/faqs.json";
import type { FaqCategory } from "@/types/faq";
import type { IFaqService } from "./IFaqService";

const faqService: IFaqService = {
  getCategories(): FaqCategory[] {
    return faqData satisfies FaqCategory[];
  },
};

export default faqService;

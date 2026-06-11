import faqData from "@/data/faqs.json";
import type { FaqCategory } from "@/types/faq";
import type { IFaqService } from "./interfaces/IFaqService";

const faqService: IFaqService = {
  getCategories(): FaqCategory[] {
    return faqData as FaqCategory[];
  },
};

export default faqService;

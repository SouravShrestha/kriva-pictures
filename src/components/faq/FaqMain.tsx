"use client";

import { useState } from "react";
import Link from "next/link";
import arrowIcon from "@/assets/icons/arrow.svg";
import type { FaqCategory } from "@/types/faq";

interface FaqMainProps {
  categories: FaqCategory[];
}

const FaqMain = ({ categories }: FaqMainProps) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-mainBg text-mainText min-h-screen">
      <div className="relative bg-cover bg-center flex items-center justify-center md:py-16 py-8">
        <div className="text-center z-10">
          <p className="text-sm md:text-base font-almarai tracking-widest uppercase mb-8">
            What you need to know
          </p>
          <h1 className="text-4xl md:text-5xl font-meysha tracking-wide">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-0 -mt-4 md:mt-0">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-almarai text-mainText">No FAQs available at the moment.</p>
          </div>
        ) : (
          categories.map((category, categoryIndex) => (
            <div key={category.id ?? categoryIndex} className="mb-16">
              <div className="flex items-center mb-6 mt-12">
                <h2 className="text-base md:text-lg font-barlow tracking-wider uppercase">
                  {categoryIndex + 1}. {category.name}
                </h2>
              </div>
              <div className="space-y-0">
                {category.faqs?.map((faq, faqIndex) => {
                  const key = `${category.id}-${faq.id}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={faq.id ?? faqIndex} className="border-b border-borderColor">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full py-6 md:py-8 flex items-start justify-between text-left"
                      >
                        <h3 className="text-lg md:text-xl font-ttjenevers tracking-wide text-mainText pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <svg
                            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="pb-8">
                          <p className="text-base md:text-lg font-almarai text-mainText tracking-wide leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        <div className="md:my-24 my-12 text-center">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-ttjenevers tracking-wide mb-4">
              Still have questions?
            </h3>
            <p className="text-base md:text-lg font-almarai text-mainText tracking-wide mb-8">
              We&apos;re here to help! Reach out to us directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-2 bg-white border-1.5 border-mainText text-mainText tracking-wider uppercase text-sm hover:underline transition-colors duration-300 font-barlow"
          >
            Contact Us
            <img src={(arrowIcon as { src: string }).src} alt="arrow" className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqMain;

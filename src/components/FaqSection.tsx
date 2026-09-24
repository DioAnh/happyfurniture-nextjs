'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const FaqSection = () => {
  const t = useTranslations('FAQ');
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // Tạo mảng động từ JSON
  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') },
    { question: t('q6'), answer: t('a6') },
    { question: t('q7'), answer: t('a7') }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="pb-24 pt-0 md:pt-12 bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-maroon mb-2">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[3px] font-bold">{t('tag')}</span>
          </div>
          <h2 className="text-[32px] md:text-[45px] font-serif font-bold text-wood mb-4">{t('title')}</h2>
          <p className="text-wood/60 text-base">{t('desc')}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className={`bg-white border transition-all duration-300 rounded-xl overflow-hidden ${isActive ? 'border-maroon/30 shadow-md' : 'border-wood/10 shadow-sm hover:border-maroon/20'}`}>
                <button onClick={() => toggleFaq(index)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none">
                  <h3 className={`text-base md:text-lg font-bold leading-snug transition-colors ${isActive ? 'text-maroon' : 'text-wood'}`}>
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-ivory flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 bg-maroon text-white' : 'text-wood/50'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <div className="px-6 pb-6 pt-2 border-t border-wood/5">
                        <p className="text-wood/70 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
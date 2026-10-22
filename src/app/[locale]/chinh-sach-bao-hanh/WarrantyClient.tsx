'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Wrench, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WarrantyClient() {
  const t = useTranslations('WarrantyPage');

  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-sm shadow-sm border border-wood/5"
        >
          <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-8 border-b border-wood/10 pb-6">
            {t('title')}
          </h1>
          <div className="prose prose-wood max-w-none space-y-10">
            <section>
              <h2 className="text-xl font-bold text-maroon flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6" /> {t('sec1Title')}
              </h2>
              <p className="text-wood/70 leading-relaxed">
                {t('sec1Desc')}
              </p>
            </section>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-ivory/50 p-6 rounded-sm text-center">
                <Clock className="w-8 h-8 text-maroon mx-auto mb-4" />
                <h3 className="font-bold text-wood mb-2">{t('b1Title')}</h3>
                <p className="text-[12px] text-wood/60 uppercase tracking-widest">{t('b1Desc')}</p>
              </div>
              <div className="bg-ivory/50 p-6 rounded-sm text-center">
                <Wrench className="w-8 h-8 text-maroon mx-auto mb-4" />
                <h3 className="font-bold text-wood mb-2">{t('b2Title')}</h3>
                <p className="text-[12px] text-wood/60 uppercase tracking-widest">{t('b2Desc')}</p>
              </div>
              <div className="bg-ivory/50 p-6 rounded-sm text-center">
                <CheckCircle2 className="w-8 h-8 text-maroon mx-auto mb-4" />
                <h3 className="font-bold text-wood mb-2">{t('b3Title')}</h3>
                <p className="text-[12px] text-wood/60 uppercase tracking-widest">{t('b3Desc')}</p>
              </div>
            </div>
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-wood">{t('scopeTitle')}</h2>
              <div className="space-y-4">
                <div className="p-4 border border-wood/10 rounded-sm">
                  <h4 className="font-bold text-wood mb-2">{t('freeTitle')}</h4>
                  <ul className="text-sm text-wood/70 space-y-2 list-disc pl-5">
                    <li>{t('free1')}</li>
                    <li>{t('free2')}</li>
                    <li>{t('free3')}</li>
                  </ul>
                </div>
                <div className="p-4 border border-wood/10 rounded-sm">
                  <h4 className="font-bold text-wood mb-2">{t('nonFreeTitle')}</h4>
                  <ul className="text-sm text-wood/70 space-y-2 list-disc pl-5">
                    <li>{t('nonFree1')}</li>
                    <li>{t('nonFree2')}</li>
                    <li>{t('nonFree3')}</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="bg-ivory p-8 rounded-sm">
              <h4 className="font-bold text-wood mb-4 uppercase tracking-widest text-xs">{t('procTitle')}</h4>
              <ol className="text-sm text-wood/70 space-y-4 list-decimal pl-5">
                <li>{t('proc1')} <span className="font-bold text-maroon">0909.163.593</span>.</li>
                <li>{t('proc2')}</li>
                <li>{t('proc3')}</li>
              </ol>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
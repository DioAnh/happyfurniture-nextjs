'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Wallet, Landmark, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PaymentClient() {
  const t = useTranslations('PaymentPage');

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
              <p className="text-wood/70 leading-relaxed mb-6">
                {t('sec1Desc')}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-ivory/50 p-6 rounded-sm border border-wood/5">
                  <h3 className="font-bold text-wood mb-3 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-maroon" /> {t('c1Title')}
                  </h3>
                  <p className="text-sm text-wood/60">
                    {t('c1Desc1')}<span className="font-bold text-wood">20%</span>{t('c1Desc2')}
                  </p>
                </div>
                <div className="bg-ivory/50 p-6 rounded-sm border border-wood/5">
                  <h3 className="font-bold text-wood mb-3 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-maroon" /> {t('c2Title')}
                  </h3>
                  <p className="text-sm text-wood/60">
                    {t('c2Desc1')}<span className="font-bold text-wood">50%</span>{t('c2Desc2')}
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-wood mb-4">{t('methodsTitle')}</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 border border-wood/10 rounded-sm">
                  <Landmark className="w-6 h-6 text-maroon shrink-0" />
                  <div>
                    <h4 className="font-bold text-wood">{t('m1Title')}</h4>
                    <p className="text-sm text-wood/60">{t('m1Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-wood/10 rounded-sm">
                  <Wallet className="w-6 h-6 text-maroon shrink-0" />
                  <div>
                    <h4 className="font-bold text-wood">{t('m2Title')}</h4>
                    <p className="text-sm text-wood/60">{t('m2Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-wood/10 rounded-sm">
                  <CreditCard className="w-6 h-6 text-maroon shrink-0" />
                  <div>
                    <h4 className="font-bold text-wood">{t('m3Title')}</h4>
                    <p className="text-sm text-wood/60">{t('m3Desc')}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-maroon/5 p-8 rounded-sm border-l-4 border-maroon">
              <h4 className="font-bold text-maroon mb-2">{t('noteTitle')}</h4>
              <ul className="text-sm text-wood/70 space-y-2 list-disc pl-5">
                <li>{t('note1')}</li>
                <li>{t('note2')}</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
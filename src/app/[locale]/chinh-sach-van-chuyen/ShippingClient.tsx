'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, PackageCheck, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ShippingClient() {
  const t = useTranslations('ShippingPage');

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
                <Truck className="w-6 h-6" /> {t('sec1Title')}
              </h2>
              <p className="text-wood/70 leading-relaxed">
                {t('sec1Desc')}
              </p>
            </section>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-wood/10 p-6 rounded-sm">
                <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center text-maroon mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-wood mb-2">{t('c1Title')}</h3>
                <p className="text-sm text-wood/60 leading-relaxed">
                  {t('c1Desc1')}<span className="font-bold text-maroon">{t('c1Highlight')}</span>{t('c1Desc2')}
                </p>
              </div>
              <div className="border border-wood/10 p-6 rounded-sm">
                <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center text-maroon mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-wood mb-2">{t('c2Title')}</h3>
                <p className="text-sm text-wood/60 leading-relaxed">
                  {t('c2Desc1')}<span className="font-bold text-wood">{t('c2Highlight')}</span>{t('c2Desc2')}
                </p>
              </div>
            </div>
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-wood">{t('feeTitle')}</h2>
              <div className="overflow-hidden rounded-sm border border-wood/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ivory text-wood uppercase tracking-widest text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4">{t('thArea')}</th>
                      <th className="px-6 py-4">{t('thShip')}</th>
                      <th className="px-6 py-4">{t('thInstall')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-wood/10 text-wood/70">
                    <tr>
                      <td className="px-6 py-4 font-bold text-wood">{t('r1Area')}</td>
                      <td className="px-6 py-4 text-maroon font-bold">{t('free')}</td>
                      <td className="px-6 py-4 text-maroon font-bold">{t('free')}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-wood">{t('r2Area')}</td>
                      <td className="px-6 py-4">{t('r2Ship')}</td>
                      <td className="px-6 py-4 text-maroon font-bold">{t('free')}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-wood">{t('r3Area')}</td>
                      <td className="px-6 py-4">{t('r3Ship')}</td>
                      <td className="px-6 py-4">{t('r3Install')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-wood mb-4">{t('procTitle')}</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">01</div>
                  <p className="text-sm text-wood/70 pt-1">{t('p1')}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">02</div>
                  <p className="text-sm text-wood/70 pt-1">{t('p2')}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">03</div>
                  <p className="text-sm text-wood/70 pt-1">{t('p3')}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">04</div>
                  <p className="text-sm text-wood/70 pt-1">{t('p4')}</p>
                </div>
              </div>
            </section>
            <div className="bg-ivory/50 p-6 rounded-sm flex items-center gap-4 border border-wood/5">
              <PackageCheck className="w-8 h-8 text-maroon shrink-0" />
              <p className="text-sm text-wood/60 italic">
                {t('note')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
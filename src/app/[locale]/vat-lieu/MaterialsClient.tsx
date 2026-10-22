'use client';

import React from 'react';
import { motion } from 'motion/react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useTranslations } from 'next-intl';

const getMaterialImageUrl = (code: string) => {
  let formattedCode = code;
  if (code.startsWith('BT')) {
    formattedCode = code.replace('BT', 'BT_');
  }
  return `https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/materials/${formattedCode}_MDF_Melamine_Chong_Am_E2_Ba_Thanh.webp`;
};

const MATERIAL_CODES: Array<{ id: string; code: string; type: string; hex?: string }> = [
  { id: 'm1', code: 'BT120', type: 'MDF LMR Melamine E2' },
  { id: 'm2', code: 'BT123', type: 'MDF LMR Melamine E2' },
  { id: 'm3', code: 'BT131', type: 'MDF LMR Melamine E2' },
  { id: 'm4', code: 'BT178', type: 'MDF LMR Melamine E2' },
  { id: 'm5', code: 'BT180', type: 'MDF LMR Melamine E2' },
  { id: 'm6', code: 'BT26', type: 'MDF LMR Melamine E2' },
  { id: 'm7', code: 'BT56', type: 'MDF LMR Melamine E2' },
  { id: 'm8', code: 'BT58', type: 'MDF LMR Melamine E2' },
  { id: 'm9', code: 'CR', type: 'MDF LMR Melamine E2', hex: '#EAE6DA' },
  { id: 'm10', code: 'DS', type: 'MDF LMR Melamine E2', hex: '#2B3A42' },
  { id: 'm11', code: 'LG', type: 'MDF LMR Melamine E2', hex: '#D9D9D9' },
  { id: 'm12', code: 'MB', type: 'MDF LMR Melamine E2', hex: '#242424' },
  { id: 'm13', code: 'SW', type: 'MDF LMR Melamine E2', hex: '#FAFAFA' },
  { id: 'm14', code: 'WC', type: 'MDF LMR Melamine E2', hex: '#F4F0EA' }
];

export default function MaterialsClient() {
  const t = useTranslations('MaterialsPage');

  return (
    <div className="pt-24 pb-32 bg-ivory min-h-screen">
      <section className="px-6 mb-20 text-center max-w-4xl mx-auto">
        <h1 className="text-[40px] md:text-[56px] font-serif font-bold text-wood mb-6">{t('title')}</h1>
        <div className="w-20 h-1 bg-maroon mx-auto mb-8" />
        <p
          className="text-wood/70 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: t.raw('descHtml') }}
        />
      </section>

      <section className="px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14">
          {MATERIAL_CODES.map((item, index) => {
            const name = t(`items.${item.code}.name`);
            const texture = t(`items.${item.code}.texture`);
            const story = t(`items.${item.code}.story`);

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-square w-full bg-white overflow-hidden rounded-sm mb-6 border border-wood/10 shadow-sm cursor-pointer">
                  {item.hex ? (
                    <div 
                      className="w-full h-full transition-transform duration-1000 group-hover:scale-110" 
                      style={{ backgroundColor: item.hex }} 
                    />
                  ) : (
                    <OptimizedImage 
                      src={getMaterialImageUrl(item.code)} 
                      alt={name} 
                      tier="card"
                      aspectRatio="square" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-wood/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-[3px] font-bold border border-white/50 px-4 py-2 backdrop-blur-sm">
                      {t('hoverZoom')}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3 border-b border-wood/10 pb-3">
                    <h3 className="font-bold text-wood text-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-maroon block"></span>{item.code}
                    </h3>
                    <span className="text-xs uppercase tracking-widest text-wood/50 font-bold">{item.type}</span>
                  </div>
                  <h4 className="font-serif font-bold text-wood mb-2 text-xl">{name}</h4>
                  <p className="text-sm font-bold text-maroon mb-4 italic">&quot;{texture}&quot;</p>
                  <p className="text-sm text-wood/70 leading-relaxed max-w-sm mt-auto">{story}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-6 mt-32 max-w-5xl mx-auto text-center bg-wood p-12 lg:p-20 text-ivory rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-ivory/80 leading-relaxed mb-10 max-w-2xl mx-auto">{t('ctaDesc')}</p>
          <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-maroon text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-maroon transition-all shadow-xl">
            {t('ctaBtn')}
          </a>
        </div>
      </section>
    </div>
  );
}
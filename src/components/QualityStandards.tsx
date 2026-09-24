'use client';

import React from 'react';
import { ShieldCheck, Layers, Hammer, Leaf, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface QualityStandardsProps {
  showPricing?: boolean; 
}

export const QualityStandards = ({ showPricing = true }: QualityStandardsProps) => {
  const tQ = useTranslations('Quality');
  const tP = useTranslations('Pricing');

  return (
    <section className="py-24 bg-white border-t border-wood/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-maroon mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[3px] font-bold">{tQ('tag')}</span>
          </div>
          <h2 className="text-[32px] md:text-[45px] font-serif font-bold text-wood mb-4 leading-tight">
            {tQ('title')}
          </h2>
          <p className="text-wood/60 text-base md:text-lg">
            {tQ('desc')}
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${showPricing ? 'mb-24' : ''}`}>
          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">{tQ('c1Title')}</h3>
            <p className="text-wood/70 text-sm leading-relaxed">{tQ('c1Desc')}</p>
          </div>

          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">{tQ('c2Title')}</h3>
            <p className="text-wood/70 text-sm leading-relaxed">{tQ('c2Desc')}</p>
          </div>

          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">{tQ('c3Title')}</h3>
            <p className="text-wood/70 text-sm leading-relaxed">{tQ('c3Desc')}</p>
          </div>

          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">{tQ('c4Title')}</h3>
            <p className="text-wood/70 text-sm leading-relaxed">{tQ('c4Desc')}</p>
          </div>
        </div>

        {showPricing && (
          <div className="bg-wood text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon rounded-full blur-[100px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10" />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-[28px] md:text-[36px] font-serif font-bold mb-3">{tP('title')}</h2>
                <p className="text-white/70 max-w-2xl mx-auto">{tP('desc')}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <h4 className="text-lg font-bold text-white mb-2">{tP('apt1')}</h4>
                  <p className="text-sm text-white/60 mb-4">{tP('apt1Area')}</p>
                  <div className="text-2xl font-bold text-maroon bg-white py-3 rounded-xl mb-4">
                    {tP('from')} 45.000.000đ
                  </div>
                  <ul className="text-left text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> {tP('apt1F1')}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> {tP('apt1F2')}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> {tP('apt1F3')}</li>
                  </ul>
                </div>

                <div className="bg-maroon border border-maroon p-6 rounded-2xl text-center transform md:-translate-y-4 shadow-2xl">
                  <div className="bg-white text-maroon text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full inline-block mb-3">
                    {tP('popular')}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{tP('apt2')}</h4>
                  <p className="text-sm text-white/60 mb-4">{tP('apt2Area')}</p>
                  <div className="text-2xl font-bold text-maroon bg-white py-3 rounded-xl mb-4">
                    {tP('from')} 75.000.000đ
                  </div>
                  <ul className="text-left text-sm text-white/90 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5"/> {tP('apt2F1')}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5"/> {tP('apt2F2')}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5"/> {tP('apt2F3')}</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <h4 className="text-lg font-bold text-white mb-2">{tP('apt3')}</h4>
                  <p className="text-sm text-white/60 mb-4">{tP('apt3Area')}</p>
                  <div className="text-2xl font-bold text-maroon bg-white py-3 rounded-xl mb-4">
                    {tP('from')} 120.000.000đ
                  </div>
                  <ul className="text-left text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> {tP('apt3F1')}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> {tP('apt3F2')}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> {tP('apt3F3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, Ruler, Lightbulb, Calculator, PenTool, FileCheck, Wallet, Factory, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WorkflowClient() {
  const t = useTranslations('WorkflowPage');

  const steps = [
    { id: '01', title: t('s1Title'), desc: t('s1Desc'), icon: Search, color: 'bg-blue-50 text-blue-600' },
    { id: '02', title: t('s2Title'), desc: t('s2Desc'), icon: Ruler, color: 'bg-orange-50 text-orange-600' },
    { id: '03', title: t('s3Title'), desc: t('s3Desc'), icon: Lightbulb, color: 'bg-yellow-50 text-yellow-600' },
    { id: '04', title: t('s4Title'), desc: t('s4Desc'), icon: Calculator, color: 'bg-green-50 text-green-600' },
    { id: '05', title: t('s5Title'), desc: t('s5Desc'), icon: PenTool, color: 'bg-purple-50 text-purple-600' },
    { id: '06', title: t('s6Title'), desc: t('s6Desc'), icon: FileCheck, color: 'bg-cyan-50 text-cyan-600' },
    { id: '07', title: t('s7Title'), desc: t('s7Desc'), icon: Wallet, color: 'bg-maroon/5 text-maroon' },
    { id: '08', title: t('s8Title'), desc: t('s8Desc'), icon: Factory, color: 'bg-slate-50 text-slate-600' },
    { id: '09', title: t('s9Title'), desc: t('s9Desc'), icon: Truck, color: 'bg-indigo-50 text-indigo-600' },
    { id: '10', title: t('s10Title'), desc: t('s10Desc'), icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t('schemaName'),
    "description": t('schemaDesc'),
    "totalTime": "P20D",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.desc
    }))
  };

  return (
    <div className="bg-ivory min-h-screen py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">{t('tag')}</h2>
          <h1 className="text-[32px] md:text-[50px] font-serif font-bold text-wood leading-tight">
            {t('title1')} <br />
            <span className="italic text-maroon">{t('title2')}</span>
          </h1>
          <p className="mt-6 text-wood/60 max-w-2xl mx-auto">
            {t('desc')}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-wood/10 -translate-x-1/2" />
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-20 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-wood/5 hover:border-maroon/20 transition-all group">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${step.color}`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-wood mb-3">
                      <span className="text-maroon/20 mr-2 font-mono">{step.id}.</span>{step.title}
                    </h3>
                    <p className="text-wood/60 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-ivory border-4 border-white shadow-sm z-10 items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-maroon" />
                </div>
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 bg-wood p-10 md:p-16 rounded-3xl text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Factory className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8">{t('summaryTitle')}</h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">{t('sum1Title')}</h4>
                <p className="text-sm text-white/70">{t('sum1Desc')}<span className="text-white font-bold">{t('sum1Bold')}</span>.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">{t('sum2Title')}</h4>
                <p className="text-sm text-white/70"><span className="text-white font-bold">{t('sum2Bold')}</span>{t('sum2Desc')}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">{t('sum3Title')}</h4>
                <p className="text-sm text-white/70">{t('sum3Desc1')}<span className="text-white font-bold">{t('sum3Bold')}</span>{t('sum3Desc2')}</p>
              </div>
            </div>
            <div className="mt-12">
              <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-maroon text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-maroon transition-all">
                {t('ctaBtn')} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
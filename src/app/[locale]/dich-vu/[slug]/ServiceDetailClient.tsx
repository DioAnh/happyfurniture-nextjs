'use client';

import React from 'react';
import { Link, useRouter } from '@/routing';
import { motion, useScroll, useTransform } from 'motion/react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Target, Phone, ArrowLeft, ShieldCheck, Zap, Award, Gem, HardHat, Factory } from 'lucide-react';
import { QualityStandards } from '@/components/QualityStandards';
import { FaqSection } from '@/components/FaqSection';
import { QuickLeadCTA } from '@/components/QuickLeadCTA';
import { useTranslations } from 'next-intl';

const Counter = ({ to, delay }: { from: number; to: number | string; delay: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="inline-block"
    >
      {to}
    </motion.span>
  );
};

const SERVICE_CONFIGS = [
  {
    slug: 'can-ho-cho-thue',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1600607687940-47a04b629733?q=80&w=1200',
    metricValues: [30, 15, 5],
    calloutCoords: [{ x: 30, y: 40 }, { x: 70, y: 60 }],
    featureIcons: [Zap, ShieldCheck, Target]
  },
  {
    slug: 'nha-pho-chung-cu',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200',
    metricValues: [100, 25, 12],
    calloutCoords: [{ x: 20, y: 30 }, { x: 80, y: 50 }],
    featureIcons: [Gem, Target, ShieldCheck]
  },
  {
    slug: 'gia-cong-noi-that',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200',
    metricValues: [7, 300, 0],
    calloutCoords: [{ x: 30, y: 45 }, { x: 70, y: 55 }],
    featureIcons: [Factory, Zap, Award]
  },
  {
    slug: 'thi-cong-lap-dat',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200',
    metricValues: [1000, 99, 50],
    calloutCoords: [{ x: 25, y: 40 }, { x: 75, y: 60 }],
    featureIcons: [HardHat, ShieldCheck, Zap]
  },
  {
    slug: 'thau-du-an-chung-cu',
    image: 'https://images.unsplash.com/photo-1556912177-c5403063984d?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    metricValues: [500, 10, 100],
    calloutCoords: [{ x: 30, y: 40 }, { x: 70, y: 55 }],
    featureIcons: [Factory, ShieldCheck, Award]
  }
] as const;

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const t = useTranslations('ServiceDetail');
  const tCaps = useTranslations('HomeMain.caps');
  const { scrollYProgress } = useScroll();
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const config = SERVICE_CONFIGS.find((s) => s.slug === slug);

  if (!config) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory">
        <h1 className="text-3xl font-bold text-maroon mb-4">{t('notFound')}</h1>
        <Link href="/dich-vu" className="text-wood hover:text-maroon underline">
          {t('backToServices')}
        </Link>
      </div>
    );
  }

  const interiorPhotos = Array.from({ length: 15 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return {
      url: `https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_${num}.webp`,
      caption: tCaps(`in${i + 1}`)
    };
  });

  const sKey = `items.${config.slug}` as const;

  const metrics = [
    { value: config.metricValues[0], unit: t(`${sKey}.m1Unit`), label: t(`${sKey}.m1Label`), delay: 0 },
    { value: config.metricValues[1], unit: t(`${sKey}.m2Unit`), label: t(`${sKey}.m2Label`), delay: 0.2 },
    { value: config.metricValues[2], unit: t(`${sKey}.m3Unit`), label: t(`${sKey}.m3Label`), delay: 0.4 }
  ];

  const callouts = [
    { x: config.calloutCoords[0].x, y: config.calloutCoords[0].y, title: t(`${sKey}.c1Title`), desc: t(`${sKey}.c1Desc`) },
    { x: config.calloutCoords[1].x, y: config.calloutCoords[1].y, title: t(`${sKey}.c2Title`), desc: t(`${sKey}.c2Desc`) }
  ];

  const features = [
    { icon: config.featureIcons[0], title: t(`${sKey}.f1Title`), desc: t(`${sKey}.f1Desc`) },
    { icon: config.featureIcons[1], title: t(`${sKey}.f2Title`), desc: t(`${sKey}.f2Desc`) },
    { icon: config.featureIcons[2], title: t(`${sKey}.f3Title`), desc: t(`${sKey}.f3Desc`) }
  ];

  return (
    <div className="bg-ivory pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 mt-4 relative z-20">
        <button 
          onClick={() => router.push('/dich-vu')}
          className="flex items-center gap-2 text-wood/60 hover:text-maroon font-semibold tracking-[0.2em] uppercase text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t('breadcrumb')}
        </button>
      </div>

      {/* Hero Header */}
      <section className="relative px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-end justify-between border-b border-wood/10 pb-12">
            <div className="md:w-2/3">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-sm mb-6 block uppercase tracking-widest text-maroon"
              >
                &quot;{t(`${sKey}.audience`)}&quot;
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-[5.5rem] font-serif font-bold text-wood leading-[1.05] tracking-tight"
              >
                {t(`${sKey}.title`)}
              </motion.h1>
            </div>
            <div className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-wood/70 text-lg leading-relaxed"
              >
                {t(`${sKey}.description`)}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-maroon/80 font-semibold tracking-[0.2em] uppercase text-xs mb-4">{t('metricsTag')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wood">{t('metricsTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-wood/5 pt-12">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="h-32 flex items-end justify-center mb-6 overflow-hidden">
                  <span className="text-[5rem] md:text-[6rem] font-serif font-black text-maroon leading-none tracking-tighter group-hover:scale-110 transition-transform duration-500">
                    <Counter from={0} to={metric.value} delay={metric.delay} />
                  </span>
                  <span className="text-2xl font-serif font-bold text-wood/50 mb-4 ml-2">{metric.unit}</span>
                </div>
                <div className="w-12 h-px bg-maroon/30 mb-6" />
                <h4 className="text-lg font-semibold text-wood">{metric.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION DỰ ÁN THỰC TẾ SLIDER */}
      <section className="py-24 bg-white overflow-hidden border-t border-wood/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">{t('galleryTag')}</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-4">
              {t('galleryTitle')}
            </h3>
            <p className="text-wood/60 text-sm md:text-base">{t('galleryDesc')}</p>
            <div className="w-20 h-1 bg-maroon mx-auto mt-6" />
          </div>

          <div className="-mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {interiorPhotos.map((photo, index) => (
                <div key={index} className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start">
                  <div className="group relative overflow-hidden bg-wood/5 aspect-[3/4]">
                    <OptimizedImage 
                      src={photo.url} alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood/90 via-wood/20 to-transparent opacity-90 flex items-end p-6 md:p-8">
                      <p className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Callouts */}
      <section className="py-32 bg-ivory relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-maroon/80 font-semibold tracking-[0.2em] uppercase text-xs mb-4">{t('techTag')}</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood">
                {t('techTitle1')}<span className="text-maroon italic">{t('techTitle2')}</span>
              </h2>
            </div>
            <p className="text-wood/70 text-lg leading-relaxed max-w-sm md:text-right">{t('techDesc')}</p>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-sm overflow-hidden bg-wood/5 shadow-2xl">
            <motion.div style={{ scale: scaleImage }} className="w-full h-full">
              <OptimizedImage
                src={config.technicalImage || config.image}
                alt={t(`${sKey}.title`)}
                aspectRatio="video"
                className="w-full h-full object-cover filter brightness-75"
                priority={true}
              />
            </motion.div>
            
            <div className="absolute inset-0 z-10 hidden md:block">
              {callouts.map((callout, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="absolute flex flex-col items-center"
                  style={{ top: `${callout.y}%`, left: `${callout.x}%` }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-maroon rounded-full cursor-pointer hover:scale-150 transition-transform relative z-20">
                      <div className="absolute inset-0 rounded-full bg-maroon/40 animate-ping" />
                    </div>
                    <div className={`absolute w-px h-16 bg-white/50 ${callout.y > 50 ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2`} />
                    <div className={`absolute w-64 p-4 bg-white/95 backdrop-blur-sm shadow-xl rounded-sm ${callout.y > 50 ? 'bottom-[calc(100%+4rem)]' : 'top-[calc(100%+4rem)]'} left-1/2 -translate-x-1/2 text-center`}>
                      <h5 className="font-bold text-wood border-b border-wood/10 pb-2 mb-2">{callout.title}</h5>
                      <p className="text-wood/60 text-sm leading-relaxed">{callout.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 bg-black/40 md:hidden flex flex-col justify-center px-6">
              <div className="space-y-4">
                {callouts.map((callout, idx) => (
                  <div key={idx} className="bg-white/90 backdrop-blur-md p-4 rounded-sm border-l-4 border-maroon">
                    <h5 className="font-bold text-wood">{callout.title}</h5>
                    <p className="text-wood/70 text-sm mt-1">{callout.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="pt-10 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-wood/10 rounded-sm overflow-hidden">
            {features.map((feature, fIndex) => (
              <div 
                key={fIndex} 
                className="bg-white p-12 hover:bg-maroon hover:text-white transition-colors duration-500 group flex flex-col items-start"
              >
                <div className="w-16 h-16 rounded-full border border-maroon/20 flex items-center justify-center mb-8 group-hover:border-white/30 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-maroon group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-wood group-hover:text-white mb-4 transition-colors font-serif">{feature.title}</h4>
                <p className="text-wood/60 group-hover:text-white/80 leading-relaxed transition-colors">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QualityStandards />
      <FaqSection />
      <QuickLeadCTA />
    </div>
  );
}
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from '@/routing';
import { ArrowRight, ShieldCheck, Factory, Users, Award, Zap, Star, Download, ChevronDown } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { FaqSection } from '@/components/FaqSection';
import { QualityStandards } from '@/components/QualityStandards';
import { ProductCategories } from '@/components/ProductCategories';
import { useTranslations } from 'next-intl';

export const HOME_IMAGES = {
  heroBanner: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/main-pages/noi-that-phong-ngu-mdf-melamine-thuan-an-binh-duong.webp',
  serviceRetail: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
  serviceRental: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop',
  serviceTownhouse: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop',
  uspWorkshop: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_002.webp'
};

export default function HomeClient() {
  const t = useTranslations('HomeMain');
  
  const workshopPhotos = [
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_001.webp', caption: t('caps.ws1') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_002.webp', caption: t('caps.ws2') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_003.webp', caption: t('caps.ws3') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_004.webp', caption: t('caps.ws4') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_005.webp', caption: t('caps.ws5') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_006.webp', caption: t('caps.ws6') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_007.webp', caption: t('caps.ws7') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_008.webp', caption: t('caps.ws8') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_009.webp', caption: t('caps.ws9') }
  ];

  const interiorPhotos = [
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_001.webp', caption: t('caps.in1') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_002.webp', caption: t('caps.in2') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_003.webp', caption: t('caps.in3') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_004.webp', caption: t('caps.in4') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_005.webp', caption: t('caps.in5') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_006.webp', caption: t('caps.in6') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_007.webp', caption: t('caps.in7') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_008.webp', caption: t('caps.in8') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_009.webp', caption: t('caps.in9') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_010.webp', caption: t('caps.in10') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_011.webp', caption: t('caps.in11') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_012.webp', caption: t('caps.in12') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_013.webp', caption: t('caps.in13') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_014.webp', caption: t('caps.in14') },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_015.webp', caption: t('caps.in15') },
  ];

  const workshopScrollRef = useRef<HTMLDivElement>(null);
  const interiorScrollRef = useRef<HTMLDivElement>(null);
  const [indicatorOpacity, setIndicatorOpacity] = useState(1);

  useEffect(() => {
    const autoScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;
        if (isAtEnd) {
          ref.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const itemWidth = ref.current.children[0].clientWidth;
          ref.current.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
        }
      }
    };

    const timer = setInterval(() => {
      autoScroll(workshopScrollRef);
      autoScroll(interiorScrollRef);
    }, 3000); 

    const handleScrollFade = () => {
      const op = Math.max(1 - window.scrollY / 200, 0);
      setIndicatorOpacity(op);
    };
    window.addEventListener('scroll', handleScrollFade, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScrollFade);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className="overflow-hidden bg-ivory">
      
      <section className="relative w-full min-h-[calc(100vh+80px)] flex items-center justify-center -mt-[80px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src={HOME_IMAGES.heroBanner} alt="Happy Furniture" 
            tier="original"
            className="w-full h-full object-cover object-center" priority={true}
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
        </div>

        <div className="relative z-20 text-center px-6 mt-16 max-w-4xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.h1 variants={itemVariants} className="flex flex-col gap-3 md:gap-4 text-white mb-8 drop-shadow-lg">
              <span className="text-[40px] sm:text-[56px] md:text-[76px] leading-none font-sans font-extrabold uppercase tracking-tighter cursor-default">
                {"HAPPY  FURNITURE".split('').map((char, index) => (
                  <span key={index} className="inline-block transition-colors duration-300 hover:text-maroon">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="text-[32px] sm:text-[42px] md:text-[52px] leading-none font-serif italic font-light tracking-wide text-white/90">
                {t('heroSlogan')}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[15px] sm:text-[17px] text-white/80 font-light leading-relaxed mb-10 max-w-2xl drop-shadow-md">
              {t('heroDesc')}
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href="/san-pham" className="group relative inline-flex items-center justify-center border border-white/80 hover:border-maroon transition-colors duration-500 shadow-xl overflow-hidden rounded-sm">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute inset-0 bg-white/10 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0"
                />
                <div className="absolute inset-0 bg-maroon opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 px-10 py-4 text-white font-bold tracking-[0.2em] text-[11px] uppercase pointer-events-none">
                  {t('heroBtn')}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none" style={{ opacity: indicatorOpacity }}
        >
          <ChevronDown className="w-10 h-10 text-white/60" strokeWidth={1} />
        </motion.div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-[50px] md:text-[80px] font-serif font-extrabold text-maroon mb-6 tracking-tighter leading-none">
              HAPPY FURNITURE
            </h2>
            <div className="w-20 h-1 bg-maroon mx-auto mb-8" />
            <p className="text-lg md:text-xl text-wood/70 leading-relaxed font-medium">
              {t('introDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-ivory/50 border-t border-wood/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-3">{t('wsTag')}</h2>
              <h3 className="text-[32px] md:text-[45px] font-serif font-bold text-wood">{t('wsTitle')}</h3>
            </div>
            <Link href="/xuong-san-xuat-noi-that" className="inline-flex items-center gap-2 text-maroon font-bold text-xs uppercase tracking-widest border-b-2 border-maroon pb-1 hover:text-wood hover:border-wood transition-colors shrink-0">
              {t('wsLink')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mx-6 px-6 md:mx-0 md:px-0">
            <div ref={workshopScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {workshopPhotos.map((photo, index) => (
                <div key={index} className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start">
                  <div className="group relative overflow-hidden bg-wood/5 aspect-[3/4]">
                    <OptimizedImage src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
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

      <section className="bg-maroon py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">{t('catTitle')}</h2>
            <p className="text-white/70 text-lg">{t('catDesc')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-4 w-full">
            <Link href="/san-pham" 
                  className="w-full lg:w-auto bg-white text-maroon px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-wood hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl">
              <Download className="w-4 h-4 shrink-0" /> {t('catBtn1')}
            </Link>
            
            <a href="https://drive.google.com/file/d/1vA3qgSCkx1_5xFhajBdmnUzPCyM7oJsT/view?usp=sharing" target="_blank" rel="noreferrer" 
               className="w-full lg:w-auto bg-transparent border border-white/40 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-maroon transition-all flex items-center justify-center gap-3">
              <Download className="w-4 h-4 shrink-0" /> {t('catBtn2')}
            </a>
            
            <Link href="/vat-lieu" 
                  className="w-full lg:w-auto bg-wood border border-wood text-ivory px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-maroon hover:border-white transition-all flex items-center justify-center gap-3">
              <Star className="w-4 h-4 shrink-0" /> {t('catBtn3')}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-3">{t('inTag')}</h2>
              <h3 className="text-[32px] md:text-[45px] font-serif font-bold text-wood">{t('inTitle')}</h3>
            </div>
            <Link href="/du-an" className="inline-flex items-center gap-2 text-maroon font-bold text-xs uppercase tracking-widest border-b-2 border-maroon pb-1 hover:text-wood hover:border-wood transition-colors shrink-0">
              {t('inLink')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mx-6 px-6 md:mx-0 md:px-0">
            <div ref={interiorScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {interiorPhotos.map((photo, index) => (
                <div key={index} className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start">
                  <div className="group relative overflow-hidden bg-wood/5 aspect-[3/4]">
                    <OptimizedImage src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
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

      <section className="py-24 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">{t('philTag')}</h2>
                <h3 className="text-[40px] md:text-[50px] font-serif font-bold text-wood leading-tight">
                  {t('philTitle1')} <br />
                  <span className="italic text-maroon">{t('philTitle2')}</span>
                </h3>
              </div>
              <p className="text-wood/70 leading-relaxed text-lg">{t('philDesc')}</p>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white h-[400px] w-full">
                <OptimizedImage src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop" alt={`${t('philTag')} - Happy Furniture`} className="w-full h-full" priority={true} />
                <div className="absolute inset-0 bg-maroon/10 mix-blend-multiply" />
              </motion.div>
            </motion.div>

            <div className="grid gap-6">
              {[
                { title: 'Functionalism', subtitle: t('phil1Title'), desc: t('phil1Desc'), icon: Zap },
                { title: 'Simple is King', subtitle: t('phil2Title'), desc: t('phil2Desc'), icon: ShieldCheck },
                { title: 'Space Optimization', subtitle: t('phil3Title'), desc: t('phil3Desc'), icon: Award }
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-8 rounded-xl shadow-sm border border-wood/5 group hover:border-maroon/20 transition-all">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center text-maroon shrink-0 group-hover:bg-maroon group-hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-maroon font-bold text-xs uppercase tracking-widest mb-1">{item.title}</h4>
                      <h5 className="text-xl font-bold text-wood mb-3">{item.subtitle}</h5>
                      <p className="text-sm text-wood/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductCategories />

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[40px] font-serif font-bold text-wood mb-4">{t('srvTitle')}</h2>
            <div className="w-20 h-1 bg-maroon mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: t('srv1Title'), desc: t('srv1Desc'), img: HOME_IMAGES.serviceRetail, tag: t('srv1Tag'), path: '/san-pham' },
              { title: t('srv2Title'), desc: t('srv2Desc'), img: HOME_IMAGES.serviceRental, tag: t('srv2Tag'), path: '/dich-vu/can-ho-cho-thue' },
              { title: t('srv3Title'), desc: t('srv3Desc'), img: HOME_IMAGES.serviceTownhouse, tag: t('srv3Tag'), path: '/dich-vu/nha-pho-chung-cu' }
            ].map((service, i) => (
              <Link key={i} href={service.path} className="block group h-full">
                <motion.div whileHover={{ y: -15, scale: 1.02 }} className="bg-ivory/30 rounded-2xl overflow-hidden border border-wood/5 transition-all hover:shadow-2xl cursor-pointer h-full flex flex-col">
                  <div className="h-[300px] w-full relative shrink-0 overflow-hidden">
                    <OptimizedImage src={service.img} alt={service.title} className="w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-maroon z-10">{service.tag}</div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-maroon transition-colors">{service.title}</h3>
                    <p className="text-sm text-wood/60 leading-relaxed mb-6 flex-1">{service.desc}</p>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-maroon group-hover:gap-4 transition-all mt-auto">
                      {t('srvLearnMore')} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-32 pb-12 bg-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-[40px] font-serif font-bold text-wood mb-6 leading-tight">{t('uspTitle')}</h2>
                <p className="text-wood/70 leading-relaxed font-medium">{t('uspDesc')}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Factory, title: t('usp1Title'), desc: t('usp1Desc') },
                  { icon: Users, title: t('usp2Title'), desc: t('usp2Desc') },
                  { icon: ShieldCheck, title: t('usp3Title'), desc: t('usp3Desc') },
                  { icon: Award, title: t('usp4Title'), desc: t('usp4Desc') }
                ].map((usp, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <usp.icon className="w-6 h-6 text-maroon" />
                    </div>
                    <h4 className="font-bold text-wood">{usp.title}</h4>
                    <p className="text-xs text-wood/60 leading-relaxed">{usp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[600px] w-full">
                <OptimizedImage src={HOME_IMAGES.uspWorkshop} alt="Happy Furniture Workshop" className="w-full h-full" />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-maroon rounded-full flex flex-col items-center justify-center text-white text-center p-4 shadow-2xl border-8 border-ivory">
                <div className="text-3xl font-bold">{t('uspBadge1')}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider">{t('uspBadge2')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QualityStandards />
      <FaqSection />

      <section className="py-24 bg-maroon">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-[32px] md:text-[48px] font-serif font-bold mb-8">{t('ctaTitle')}</h2>
          <p className="text-white/80 mb-12 text-lg">{t('ctaDesc')}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="tel:0909163593" className="bg-white text-maroon px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-wood hover:text-white transition-all shadow-2xl">
              {t('ctaBtn1')}
            </a>
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white hover:text-maroon transition-all flex items-center justify-center">
              {t('ctaBtn2')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
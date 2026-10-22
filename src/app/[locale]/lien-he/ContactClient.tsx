'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Clock, MessageCircle, ArrowUpRight, Factory, Store, PhoneCall } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { QuickLeadCTA } from '@/components/QuickLeadCTA';
import { useLocale, useTranslations } from 'next-intl';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1c.3-1.4 1.4-2.5 2.8-2.8C8.2 4 12 4 12 4s3.8 0 6.7.3c1.4.3 2.5 1.4 2.8 2.8.3 2.9.3 8.9.3 8.9s0 6-.3 8.9c-.3 1.4-1.4 2.5-2.8 2.8-2.9.3-6.7.3-6.7.3s-3.8 0-6.7-.3c-1.4-.3-2.5-1.4-2.8-2.8C2 16 2 10 2 10s0-6 .5-2.9z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

export default function ContactClient() {
  const locale = useLocale();
  const t = useTranslations('ContactPage');
  const tAbout = useTranslations('AboutCompany');
  const tHome = useTranslations('HomeMain');
  const tFooter = useTranslations('Footer');

  // Chỉnh sửa trực tiếp nhãn badge của Xưởng & Showroom tại đây:
  const locations = [
    {
      type: tFooter('col2WSTitle'),
      name: 'Happy Furniture Workshop',
      address: tFooter('col2WSDesc'),
      mapUrl: 'https://maps.app.goo.gl/eFUALjGezoPBD8y46',
      icon: Factory,
      badge: locale === 'vi' ? 'Xưởng sản xuất trực tiếp' : 'Direct Manufacturing Factory'
    },
    {
      type: tFooter('col2StoreTitle'),
      name: 'Happy Furniture Showroom',
      address: tFooter('col2StoreDesc'),
      mapUrl: 'https://maps.app.goo.gl/wPNMErQWShXnE1iz5',
      icon: Store,
      badge: locale === 'vi' ? 'Mua sắm nội thất lẻ' : 'Furniture Store'
    }
  ];

  const socialChannels = [
    {
      name: 'Zalo OA',
      sub: '0909.163.593',
      href: 'https://zalo.me/0909163593',
      icon: MessageCircle,
      activeClass: 'hover:bg-maroon hover:text-white hover:border-maroon'
    },
    {
      name: 'Facebook',
      sub: 'Happy Furniture',
      href: 'https://www.facebook.com/profile.php?id=61585294213927',
      icon: FacebookIcon,
      activeClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]'
    },
    {
      name: 'YouTube',
      sub: 'Academy',
      href: 'http://www.youtube.com/@HappyFurnitureAcademy',
      icon: YoutubeIcon,
      activeClass: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]'
    },
    {
      name: 'Instagram',
      sub: '@happyfurniturevietnam',
      href: 'https://www.instagram.com/happyfurniturevietnam/',
      icon: InstagramIcon,
      activeClass: 'hover:bg-wood hover:text-white hover:border-wood'
    }
  ];

  return (
    <div className="bg-ivory min-h-screen text-wood">
      {/* 1. HERO SECTION (Đã fix lỗi rớt chữ lẻ bằng max-w-3xl + text-balance) */}
      <section className="relative py-24 md:py-28 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <OptimizedImage
            src="https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_001.webp"
            alt="Happy Furniture Workshop"
            aspectRatio="video"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[38px] md:text-[56px] font-serif font-bold mb-6 leading-tight"
          >
            {t('pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-balance"
            dangerouslySetInnerHTML={{ __html: t('pageDesc') }}
          />
        </div>
      </section>

      {/* 2. THANH THÔNG TIN LIÊN HỆ TRỰC TIẾP (Đã fix vừa khít email happyfurniture.net@gmail.com) */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="tel:0909163593"
            className="bg-white p-6 xl:p-8 rounded-2xl shadow-lg border border-wood/5 hover:border-maroon/40 transition-all group flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-ivory text-maroon flex items-center justify-center shrink-0 group-hover:bg-maroon group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[2px] text-wood/40 font-bold mb-1">{t('phoneLabel')}</p>
              <p className="text-lg xl:text-xl font-bold text-wood group-hover:text-maroon transition-colors">0909.163.593</p>
            </div>
          </a>

          <a
            href="mailto:happyfurniture.net@gmail.com"
            className="bg-white p-6 xl:p-8 rounded-2xl shadow-lg border border-wood/5 hover:border-maroon/40 transition-all group flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-ivory text-maroon flex items-center justify-center shrink-0 group-hover:bg-maroon group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[2px] text-wood/40 font-bold mb-1">{t('emailLabel')}</p>
              <p className="text-[14px] xl:text-[15px] font-bold text-wood group-hover:text-maroon transition-colors whitespace-nowrap">
                happyfurniture.net@gmail.com
              </p>
            </div>
          </a>

          <div className="bg-white p-6 xl:p-8 rounded-2xl shadow-lg border border-wood/5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-ivory text-maroon flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[2px] text-wood/40 font-bold mb-1">{t('hoursLabel')}</p>
              <p className="text-[15px] xl:text-lg font-bold text-wood">{t('hoursText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HỆ THỐNG XƯỞNG & SHOWROOM + KÊNH KẾT NỐI + NĂNG LỰC */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-16">
        
        {/* 2 Địa điểm Xưởng & Showroom */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-wood">{tFooter('col2Title')}</h2>
            <div className="h-px flex-1 bg-wood/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((loc, idx) => {
              const IconComponent = loc.icon;
              return (
                <motion.a
                  key={idx}
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-wood/5 hover:border-maroon/30 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-ivory text-maroon flex items-center justify-center group-hover:bg-maroon group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[2px] font-bold px-3 py-1 rounded-full bg-ivory text-maroon">
                        {loc.badge}
                      </span>
                    </div>
                    <p className="text-[11px] uppercase tracking-[3px] text-wood/40 font-bold mb-1">{loc.type}</p>
                    <h3 className="text-2xl font-serif font-bold text-wood mb-3 group-hover:text-maroon transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-wood/70 text-base leading-relaxed mb-8">{loc.address}</p>
                  </div>

                  <div className="pt-5 border-t border-wood/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-maroon">
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* 4 Kênh Social Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {socialChannels.map((ch) => {
            const IconComponent = ch.icon;
            return (
              <a
                key={ch.name}
                href={ch.href}
                target="_blank"
                rel="noreferrer"
                className={`bg-white p-6 rounded-2xl border border-wood/5 shadow-sm transition-all duration-300 flex items-center justify-between group ${ch.activeClass}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <IconComponent className="w-5 h-5 text-maroon group-hover:text-current shrink-0 transition-colors" />
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{ch.name}</p>
                    <p className="text-[11px] opacity-60 truncate">{ch.sub}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 shrink-0 transition-opacity" />
              </a>
            );
          })}
        </div>

        {/* Về Happy Furniture & Chỉ số năng lực */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-wood/5">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-wood">{tAbout('title')}</h3>
              <p className="text-wood/70 leading-relaxed text-sm md:text-base">{tAbout('desc1')}</p>
              <p className="text-wood/70 leading-relaxed text-sm md:text-base">{tAbout('desc2')}</p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-ivory/70 p-6 rounded-xl text-center">
                <p className="text-2xl md:text-3xl font-bold text-maroon mb-1">1000m²</p>
                <p className="text-[10px] uppercase tracking-widest text-wood/50 font-bold">{tFooter('col2WSTitle')}</p>
              </div>
              <div className="bg-ivory/70 p-6 rounded-xl text-center">
                <p className="text-2xl md:text-3xl font-bold text-maroon mb-1">10+</p>
                <p className="text-[10px] uppercase tracking-widest text-wood/50 font-bold">{tAbout('stat2')}</p>
              </div>
              <div className="bg-ivory/70 p-6 rounded-xl text-center">
                <p className="text-2xl md:text-3xl font-bold text-maroon mb-1">-30%</p>
                <p className="text-[10px] uppercase tracking-widest text-wood/50 font-bold">{tAbout('stat3')}</p>
              </div>
              <div className="bg-ivory/70 p-6 rounded-xl text-center">
                <p className="text-2xl md:text-3xl font-bold text-maroon mb-1">24/7</p>
                <p className="text-[10px] uppercase tracking-widest text-wood/50 font-bold">{tAbout('stat4')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA OPTION 1: ĐỂ LẠI SĐT & LỜI NHẮN NHANH (QuickLeadCTA giữ nguyên) */}
      <QuickLeadCTA />

      {/* 5. CTA OPTION 2: KHÁCH CHỦ ĐỘNG GỌI NGAY HOẶC NHẮN ZALO */}
      <section className="py-20 bg-white border-t border-wood/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[42px] font-serif font-bold text-wood mb-4">
            {tHome('ctaTitle')}
          </h2>
          <p className="text-wood/70 mb-10 text-base md:text-lg max-w-2xl mx-auto">
            {tHome('ctaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="tel:0909163593"
              className="bg-maroon text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-wood transition-all shadow-xl flex items-center gap-2.5"
            >
              <PhoneCall className="w-4 h-4" />
              {tHome('ctaBtn1')}
            </a>
            <a
              href="https://zalo.me/0909163593"
              target="_blank"
              rel="noreferrer"
              className="bg-ivory border-2 border-wood/15 text-wood px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-wood hover:text-white hover:border-wood transition-all flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-4 h-4" />
              {tHome('ctaBtn2')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
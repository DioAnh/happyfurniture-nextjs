'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, ArrowRight, ShieldCheck, Factory, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Khôi phục Icon Facebook bằng SVG chuẩn style của Lucide
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Khôi phục Icon Instagram bằng SVG chuẩn style của Lucide
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer = () => {
  const t = useTranslations('Footer'); // Nạp từ điển Footer
  const tHeader = useTranslations('Header'); // Nạp từ điển Header để dùng chung Slogan

  return (
    <footer className="bg-wood text-ivory pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: About */}
          <div className="space-y-6 lg:col-span-1">
            <div>
              <Link href="/" className="flex flex-col items-start group">
                <h2 className="text-2xl font-extrabold tracking-tighter text-white group-hover:text-maroon transition-colors leading-none">HAPPY FURNITURE</h2>
                <p className="text-[11px] uppercase tracking-[3px] text-ivory/60 font-semibold mt-1">
                  {tHeader('logoSubtitle')}
                </p>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-ivory/70">
              <span className="text-white font-bold block mb-2">{t('tagline')}</span>
              {t('desc')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61585294213927#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-maroon transition-colors cursor-pointer">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-maroon transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Core Competencies */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">{t('col1Title')}</h3>
            <div className="flex flex-col gap-4">
              <Link href="/xuong-san-xuat-noi-that" className="text-sm text-ivory/70 hover:text-white transition-colors">
                {t('col1Link1')}
              </Link>
              <Link href="/noi-that-go-cong-nghiep" className="text-sm text-ivory/70 hover:text-white transition-colors">
                {t('col1Link2')}
              </Link>
              <Link href="/san-xuat-noi-that-hien-dai" className="text-sm text-ivory/70 hover:text-white transition-colors">
                {t('col1Link3')}
              </Link>
            </div>
          </div>

          {/* Column 3: System */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">{t('col2Title')}</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Factory className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">{t('col2WSTitle')}</p>
                  <p className="text-sm text-ivory/70">{t('col2WSDesc')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">{t('col2StoreTitle')}</p>
                  <p className="text-sm text-ivory/70">{t('col2StoreDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Commitments */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">{t('col3Title')}</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-white shrink-0" />
                <p className="text-sm text-ivory/70">{t('col3C1')}</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <p className="text-sm text-ivory/70">{t('col3C2')}</p>
              </div>
            </div>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">{t('col4Title')}</h3>
            <div className="space-y-4">
              <a href="tel:0909163593" className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-lg font-bold group-hover:text-white transition-colors">0909.163.593</span>
              </a>
              <div className="space-y-1">
                <p className="text-sm text-ivory/60 break-all">happyfurniture.net@gmail.com</p>
              </div>
              <div className="grid gap-3">
                <a 
                  href="http://www.youtube.com/@HappyFurnitureAcademy" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-red-600 rounded-lg text-sm text-white hover:bg-red-700 transition-all font-bold"
                >
                  <span className="flex items-center gap-2">YouTube Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://zalo.me/0909163593" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-[#0068FF] text-white font-bold rounded-lg text-sm hover:bg-[#0055D4] transition-all"
                >
                  <span>Chat qua Zalo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://maps.app.goo.gl/wPNMErQWShXnE1iz5" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-[#34A853] text-white font-bold rounded-lg text-sm hover:bg-[#2b8a44] transition-all"
                >
                  <span>Xem Google Maps</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/happyfurniturevietnam/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold rounded-lg text-sm hover:opacity-90 transition-all"
                >
                  <span className="flex items-center gap-2">Happy Furniture Instagram</span>
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[2px] text-ivory/40">
          <p>{t('copyright')}</p>
          <div className="flex gap-8">
            <Link href="/chinh-sach-bao-hanh" className="hover:text-white transition-colors cursor-pointer">{t('policy')}</Link>
            <Link href="/quy-trinh-lam-viec" className="hover:text-white transition-colors cursor-pointer">{t('process')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
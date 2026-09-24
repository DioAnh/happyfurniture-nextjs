'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '@/routing';
import { useTranslations } from 'next-intl';

const categories = [
  {
    id: 1,
    titleKey: 'wardrobe',
    type: 'Wardrobe',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/tu-quan-ao-mdf-aura-vua.webp',
  },
  {
    id: 2,
    titleKey: 'bedside',
    type: 'Bedside',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Woodland/tu-dau-giuong-mdf-woodland-vua.webp',
  },
  {
    id: 3,
    titleKey: 'desk',
    type: 'Office+Desk',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Cosmic/ban-lam-viec-hoc-keo-mdf-cosmic-vua.webp',
  },
  {
    id: 4,
    titleKey: 'bed',
    type: 'Bed',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Amberglow/giuong-mdf-amberglow-nho.webp',
  },
  {
    id: 5,
    titleKey: 'tvUnit',
    type: 'TV+Media+Unit',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aether/tu-ke-tivi-mdf-aether-vua.webp',
  },
  {
    id: 6,
    titleKey: 'coffeeTable',
    type: 'Coffee+Table',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/ban-ca-phe-mdf-aura-vua.webp',
  },
  {
    id: 7,
    titleKey: 'shelf',
    type: 'Shelf',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Cosmic/ke-trang-tri-mdf-cosmic-vua.webp', 
  }
];

export const ProductCategories = () => {
  const router = useRouter();
  const t = useTranslations('Categories');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = categories.length;

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      setActiveIndex(prev => (prev + 1) % total);
    } else if (swipe > 50) {
      setActiveIndex(prev => (prev === 0 ? total - 1 : prev - 1));
    }
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh]">
      <div className="max-w-[1920px] w-full mx-auto relative flex flex-col items-center justify-center">

        <div className="absolute top-0 text-[10px] md:text-xs text-wood/40 tracking-[4px] font-sans mb-4 md:mb-6 z-40">
          {activeIndex + 1} &nbsp;/&nbsp; {total}
        </div>

        <div ref={containerRef} className="w-full relative h-[300px] md:h-[400px] lg:h-[480px] flex items-center justify-center mt-6">
          {categories.map((cat, index) => {
            
            let offset = (index - activeIndex) % total;
            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            const isCenter = offset === 0;

            return (
              <motion.div
                key={cat.id}
                initial={false}
                animate={{
                  x: `${offset * 110}%`, 
                  scale: isCenter ? 1.5 : 0.7, 
                  opacity: isCenter ? 1 : (Math.abs(offset) >= 3 ? 0 : 0.4),
                  zIndex: isCenter ? 30 : (Math.abs(offset) >= 3 ? -10 : 10 - Math.abs(offset))
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute w-[45%] md:w-[25%] lg:w-[18%] flex flex-col items-center justify-center ${Math.abs(offset) >= 3 ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
                drag={Math.abs(offset) >= 3 ? false : "x"} // Khóa kéo thả với các món tàng hình
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (Math.abs(offset) >= 3) return; // Khóa click với các món tàng hình
                  if (isCenter) {
                    router.push(`/san-pham?type=${cat.type}`);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="w-full aspect-square p-2 flex items-center justify-center pointer-events-none">
                  {cat.image.startsWith('THAY_LINK') ? (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-[10px] text-center rounded-xl">
                      Chưa có<br/>Link ảnh
                    </div>
                  ) : (
                    <img 
                      src={cat.image} 
                      alt={t(cat.titleKey as any)}
                      draggable={false}
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  )}
                </div>

                <motion.div 
                  initial={false}
                  animate={{
                    scale: isCenter ? 0.9 : 0.55,
                    opacity: isCenter ? 1 : 0.75 
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center mt-2 md:mt-3 pointer-events-none w-full"
                >
                  {/* FIX: Đổi từ font-extrabold -> font-light, tracking-tighter -> tracking-[0.15em] */}
                  <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-maroon tracking-[0.15em] uppercase text-center whitespace-nowrap">
                    {t(cat.titleKey as any)}
                  </h2>
                  
                  <AnimatePresence>
                    {isCenter && (
                      <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="mt-1 md:mt-2 font-serif italic text-wood/40 text-[11px] md:text-sm"
                      >
                        {t('explore')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
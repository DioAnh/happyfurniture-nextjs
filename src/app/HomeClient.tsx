'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Truck, Factory, Users, Award, CheckCircle2, Zap, Star, Clock, Phone, Download } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { RangeSelectionCard } from '@/components/RangeSelectionCard';
import { FaqSection } from '@/components/FaqSection';
import { QualityStandards } from '@/components/QualityStandards';

export const HOME_IMAGES = {
  heroBanner: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/main-pages/noi-that-phong-ngu-mdf-melamine-thuan-an-binh-duong.webp',
  serviceRetail: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
  serviceRental: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop',
  serviceTownhouse: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop',
  uspWorkshop: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_002.webp'
};

const RANGES = [
  { id: 'amb', name: 'Amberglow', code: 'AMB', story: 'Vân sáng, bắt sáng, nới rộng không gian' },
  { id: 'wdl', name: 'Woodland', code: 'WDL', story: 'Sồi tối màu, vân thẳng sắc nét, Rustic Modernism.' },
  { id: 'csm', name: 'Cosmic', code: 'CSM', story: 'Huyền bí, sang trọng, Than chì Charcoal, điểm nhấn kim loại.' },
  { id: 'aet', name: 'Aether', code: 'AET', story: 'Sồi nâu ấm, mắt gỗ tự nhiên, vững chãi trường tồn.' },
  { id: 'aur', name: 'Aura', code: 'AUR', story: 'Sồi trung tính, cân bằng hài hòa.' }
];

const DEMO_IMAGES = {
  ranges: {
    amb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800',
    wdl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800',
    csm: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    aet: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800',
    aur: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800'
  }
};

const workshopPhotos = [
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_001.webp',
    caption: 'XƯỞNG SẢN XUẤT TẠI QUẬN 12'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_002.webp',
    caption: 'LẮP RÁP THÀNH PHẨM'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_003.webp',
    caption: 'KIỂM TRA CHẤT LƯỢNG'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_004.webp',
    caption: 'DÁN CẠNH NẸP VÁN'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_005.webp',
    caption: 'ĐÓNG GÓI CHUẨN BỊ GIAO HÀNG'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_006.webp',
    caption: 'BÓC TÁCH BẢN VẼ SẢN XUẤT'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_007.webp',
    caption: 'ĐỘI NGŨ THỢ MỘC LÀNH NGHỀ'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_008.webp',
    caption: 'QUY TRÌNH KIỂM TRA CHẤT LƯỢNG'
  },
  {
    url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_009.webp',
    caption: 'ĐẢM BẢO CHUẨN XÁC TỪNG MILIMET'
  }
];

const HomeCollections = () => {
  const [selectedRange, setSelectedRange] = useState<string>(RANGES[0].id);
  const router = useRouter();
  const storyRef = useRef<HTMLDivElement>(null);

  const handleSelectRange = (id: string) => {
    setSelectedRange(id);
    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  return (
    <section className="py-24 bg-ivory/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-wood mb-4">Các Bộ Sưu Tập Nổi Bật</h2>
          <p className="text-wood/60 max-w-2xl mx-auto">Mỗi bộ sưu tập là một thiết kế với câu chuyện cảm hứng riêng biệt, mang sắc thái của thiên nhiên vào không gian sống hiện đại. Tuy thiết kế khác nhau, sự tiện nghi và tối ưu công năng sử dụng là yếu tố tiên quyết của tất cả dòng sản phẩm, và đảm bảo chất lượng bằng cốt gỗ MDF lõi xanh chống ẩm phủ Melamine</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-16">
          {RANGES.map((r) => (
            <RangeSelectionCard
              key={r.id} id={r.id} name={r.name} code={r.code}
              image={DEMO_IMAGES.ranges[r.id as keyof typeof DEMO_IMAGES.ranges]}
              isActive={selectedRange === r.id}
              className="w-full" imageClassName="w-full aspect-[4/5]"
              onClick={() => handleSelectRange(r.id)}
            />
          ))}
        </div>

        <div ref={storyRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedRange}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-16 rounded-xl shadow-sm border border-wood/5 flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="w-full md:w-5/12 aspect-[4/5] relative rounded-lg overflow-hidden shadow-xl">
               <OptimizedImage src={DEMO_IMAGES.ranges[selectedRange as keyof typeof DEMO_IMAGES.ranges]} alt={selectedRange} aspectRatio="square" className="w-full h-full object-cover" />
            </div>
              <div className="w-full md:w-7/12 space-y-8">
                <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-[0.3em] font-bold text-maroon">{RANGES.find(r => r.id === selectedRange)?.code}</span>
                    <span className="flex-1 h-px bg-wood/10"></span>
                </div>
                <h3 className="text-5xl md:text-6xl font-serif text-wood">{RANGES.find(r => r.id === selectedRange)?.name}</h3>
                <p className="text-wood/70 leading-relaxed text-lg font-serif italic border-l-4 border-maroon pl-6">
                  &quot;{RANGES.find(r => r.id === selectedRange)?.story}&quot;
                </p>
                
                <div className="pt-4">
                  <button 
                    onClick={() => router.push(`/san-pham?range=${RANGES.find(r => r.id === selectedRange)?.code}`)}
                    className="bg-wood text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-maroon transition-colors"
                  >
                    Khám phá toàn bộ {RANGES.find(r => r.id === selectedRange)?.name}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default function HomeClient() {
  const SHOW_TEAM_SECTION = false;
  
  // 1. Mảng ảnh dự án thực tế từ thư mục interior
  const interiorPhotos = [
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_001.webp', caption: 'HỆ TỦ BẾP HIỆN ĐẠI TỐI ƯU CÔNG NĂNG' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_002.webp', caption: 'KHÔNG GIAN PHÒNG NGỦ TINH GỌN' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_003.webp', caption: 'THIẾT KẾ PHÒNG KHÁCH HIỆN ĐẠI' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_004.webp', caption: 'TỦ QUẦN ÁO LIỀN BÀN HỌC' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_005.webp', caption: 'HỆ GIƯỜNG PHẢNG LƯU TRỮ' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_006.webp', caption: 'KHÔNG GIAN LÀM VIỆC' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_007.webp', caption: 'TỦ BẾP HIỆN ĐẠI' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_008.webp', caption: 'BÀN GIAO THỰC TẾ CĂN HỘ CHUNG CƯ' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_009.webp', caption: 'TỐI ƯU CÔNG NĂNG TỦ BẾP HIỆN ĐẠI' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_010.webp', caption: 'THIẾT KẾ & THI CÔNG, SẢN XUẤT' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_011.webp', caption: 'NỘI THẤT CĂN HỘ HIỆN ĐẠI' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_012.webp', caption: 'HỆ TỦ ÁO KỊCH TRẦN' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_013.webp', caption: 'KHÔNG GIAN NGỦ & LÀM VIỆC' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_014.webp', caption: 'GIƯỜNG & TỦ ÁO MDF CHỐNG ẨM' },
    { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_015.webp', caption: 'PHÒNG NGỦ HIỆN ĐẠI' },
  ];

  // 2. Refs cho 2 Slider
  const workshopScrollRef = useRef<HTMLDivElement>(null);
  const interiorScrollRef = useRef<HTMLDivElement>(null);

  // 3. Logic cuộn tự động dùng chung cho nhiều slider
  useEffect(() => {
    // SỬA LỖI TẠI ĐÂY: Thêm " | null " vào type của ref
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
      autoScroll(workshopScrollRef); // Cuộn slider xưởng
      autoScroll(interiorScrollRef); // Cuộn slider nội thất
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-start pt-10">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src={HOME_IMAGES.heroBanner} 
            alt="Xưởng nội thất Happy Furniture" 
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/95 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[48px] md:text-[68px] font-serif font-bold leading-[1.14] text-wood mb-10">
              <span className="text-maroon italic">Nội Thất</span> <br />Hiện đại Từ<br /> 
              <span className="text-maroon italic">Xưởng Sản xuất</span> <span className="text-maroon italic"> </span> Gỗ công nghiệp
            </h1>
            <p className="text-lg text-wood/70 mb-10 max-w-[600px] leading-relaxed font-medium">
              Giải pháp thiết kế và thi công nội thất cho căn hộ, nhà phố tại <span className="text-maroon font-bold">Bình Dương </span>
              & <span className="text-maroon font-bold">TP.HCM</span>. 
              Tập trung vào tối ưu <span className="text-maroon font-bold">tiện nghi & công năng sử dụng</span>, với mức giá tối ưu nhất nhờ sản xuất trực tiếp tại xưởng với đội ngũ kỹ thuật và thiết kế.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link 
                href="/san-pham"
                className="bg-maroon text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:bg-wood transition-all shadow-xl shadow-maroon/20 flex items-center gap-3 cursor-pointer"
              >
                Xem mẫu thiết kế
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/lien-he"
                className="border-2 border-wood/20 text-wood px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:bg-wood hover:text-white transition-all cursor-pointer"
              >
                Báo giá ngay
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white h-[450px] w-full">
              <OptimizedImage 
                src={HOME_IMAGES.heroBanner} 
                alt="Thiết kế Nội thất chung cư hiện đại" 
                className="w-full h-full"
                priority={true}
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl z-20 max-w-[320px]">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-maroon shrink-0" />
                  <span className="text-sm font-bold text-wood leading-tight">MDF lõi xanh chống ẩm</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-maroon shrink-0" />
                  <span className="text-sm font-bold text-wood leading-tight">Cam kết không chi phí phát sinh</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-maroon shrink-0" />
                  <span className="text-sm font-bold text-wood leading-tight">Giá cả cạnh tranh trên thị trường</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1.1 Intro Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[50px] md:text-[80px] font-serif font-extrabold text-maroon mb-6 tracking-tighter leading-none">
              HAPPY FURNITURE
            </h2>
            <div className="w-20 h-1 bg-maroon mx-auto mb-8" />
            <p className="text-lg md:text-xl text-wood/70 leading-relaxed font-medium">
              Là xưởng sản xuất Nội thất với hơn 10 năm kinh nghiệm, Happy Furniture là nơi biến những ý tưởng về một Không gian sống thành hiện thực. Chúng tôi tự hào mang đến giải pháp thiết kế và thi công nội thất cho không gian sống hiện đại, tập trung vào sự tiện nghi, tối ưu hóa công năng và thẩm mỹ với ngân sách tiết kiệm trực tiếp từ xưởng.
            </p>
          </motion.div>
        </div>
      </section>

      
      {/* 1.2 SECTION GÓC XƯỞNG THỰC TẾ (SLIDER) TRANG CHỦ */}
      <section className="py-24 bg-ivory/50 border-t border-wood/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-3">Trực tiếp từ xưởng sản xuất</h2>
              <h3 className="text-[32px] md:text-[45px] font-serif font-bold text-wood">
                Góc Làm Việc & Xưởng Thực Tế
              </h3>
            </div>
            <Link href="/xuong-san-xuat-noi-that" className="inline-flex items-center gap-2 text-maroon font-bold text-xs uppercase tracking-widest border-b-2 border-maroon pb-1 hover:text-wood hover:border-wood transition-colors shrink-0">
              Xem chi tiết về xưởng <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mx-6 px-6 md:mx-0 md:px-0">
            <div 
              ref={workshopScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {workshopPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                >
                  <div className="group relative overflow-hidden bg-wood/5 aspect-[3/4]">
                    <OptimizedImage 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood/90 via-wood/20 to-transparent opacity-90 flex items-end p-6 md:p-8">
                      <p className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* 1.3. Catalogue CTA Section */}
      <section className="bg-maroon py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
              Khám phá Sản phẩm nội thất & Hồ sơ năng lực xưởng Happy Furniture
            </h2>
            <p className="text-white/70 text-lg">
              Tải ngay Catalogue để cập nhật các xu hướng thiết kế và báo giá chi tiết từ xưởng Happy Furniture.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full"
          >
            <a 
              href="https://drive.google.com/file/d/1LYxW7jWmRYkKrxRvixl7J58aMD2JFgVv/view?usp=sharing" 
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-[280px] bg-white text-maroon px-4 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-wood hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <Download className="w-4 h-4 shrink-0" />
              Catalogue Sản Phẩm Lẻ
            </a>
            <a 
              href="https://drive.google.com/file/d/1vA3qgSCkx1_5xFhajBdmnUzPCyM7oJsT/view?usp=sharing" 
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-[280px] bg-transparent border-2 border-white text-white px-4 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-maroon transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-4 h-4 shrink-0" />
              Hồ sơ Năng lực
            </a>
            <Link 
              href="/vat-lieu"
              className="w-full sm:w-[280px] bg-wood border-2 border-wood text-ivory px-4 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-maroon hover:border-white transition-all flex items-center justify-center gap-3"
            >
              <Star className="w-4 h-4 shrink-0" />
              Xem Bảng Mã Ván
            </Link>
          </motion.div>
        </div>
      </section>



      {/* SECTION NỘI THẤT THỰC TẾ (SLIDER) TRANG CHỦ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-3">Từ bản vẽ đến thực tế</h2>
              <h3 className="text-[32px] md:text-[45px] font-serif font-bold text-wood">
                Không Gian Sống Hoàn Thiện
              </h3>
            </div>
            <Link href="/du-an" className="inline-flex items-center gap-2 text-maroon font-bold text-xs uppercase tracking-widest border-b-2 border-maroon pb-1 hover:text-wood hover:border-wood transition-colors shrink-0">
              Xem tất cả dự án <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mx-6 px-6 md:mx-0 md:px-0">
            <div 
              ref={interiorScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
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



      {/* 1.4. Design Philosophy */}
      <section className="py-24 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Triết lý thiết kế</h2>
                <h3 className="text-[40px] md:text-[50px] font-serif font-bold text-wood leading-tight">
                  Kiến tạo không gian <br />
                  <span className="italic text-maroon">Tiện nghi và Tinh gọn</span>
                </h3>
              </div>
              <p className="text-wood/70 leading-relaxed text-lg">
                Tại Happy Furniture, chúng tôi không chỉ đóng những món đồ nội thất, chúng tôi kiến tạo phong cách sống hiện đại cho gia chủ thông qua 3 giá trị cốt lõi:
              </p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white h-[400px] w-full"
              >
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop" 
                  alt="Triết lý thiết kế nội thất tại Happy Furniture" 
                  className="w-full h-full"
                  priority={true}
                />
                <div className="absolute inset-0 bg-maroon/10 mix-blend-multiply" />
              </motion.div>
            </motion.div>

            <div className="grid gap-6">
              {[
                {
                  title: 'Functionalism',
                  subtitle: 'Công năng là số 1',
                  desc: 'Triết lý "Form follows function" là kim chỉ nam. Một căn bếp đẹp trước hết phải là một căn bếp tiện; một phòng ngủ sang trọng trước hết phải là một nơi nghỉ ngơi khoa học. Không gian sống không phải là nơi để trưng bày nội thất, để sô diễn, để khoe khoang, mà chỉ nên là công cụ để nâng cao chất lượng cuộc sống của bạn.',
                  icon: Zap
                },
                {
                  title: 'Simple is King',
                  subtitle: 'Tinh giản nội thất - Tinh gọn cuộc sống',
                  desc: 'Chúng tôi tin rằng sự tinh gọn mang lại sự tĩnh lặng cho tâm hồn. Loại bỏ những chi tiết rườm rà, nhường chỗ cho ánh sáng, nắng chiều và sự thoáng đãng. Nội thất lúc này đóng vai trò là tấm nền hoàn hảo cho cuộc sống thoải mái của bạn.',
                  icon: ShieldCheck
                },
                {
                  title: 'Space Optimization',
                  subtitle: 'Tối ưu hóa diện tích',
                  desc: 'Đặc biệt với những căn hộ từ 35m2 – 70m2, tất đất là tất vàng, chúng tôi sử dụng các giải pháp tủ kịch trần, nội thất tích hợp đa năng và triệt tiêu góc chết để biến không gian tuy nhỏ nhưng đầy đủ các chức năng sử dụng, linh hoạt & tiện nghi, đáp ứng được nhu cầu của bạn.',
                  icon: Award
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-wood/5 group hover:border-maroon/20 transition-all"
                >
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

      {/* 2. Service Segments */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[40px] font-serif font-bold text-wood mb-4">Dịch Vụ Nội thất</h2>
            <div className="w-20 h-1 bg-maroon mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Nội Thất lẻ MDF Melamine',
                desc: 'Giường, tủ, bàn ghế... thiết kế hiện đại, vật liệu MDF lõi xanh phủ Melamine/Laminate.',
                img: HOME_IMAGES.serviceRetail,
                tag: 'Sản phẩm Nội thất lẻ',
                path: '/san-pham'
              },
              {
                title: 'Combo Căn Hộ Cho Thuê',
                desc: 'Giải pháp tối ưu chi phí, thẩm mỹ bền đẹp, cam kết ROI cao cho chủ nhà.',
                img: HOME_IMAGES.serviceRental,
                tag: 'Giải pháp Nội thất cho thuê',
                path: '/dich-vu/can-ho-cho-thue'
              },
              {
                title: 'Nội Thất Nhà Phố & Chung Cư',
                desc: 'Thiết kế thông minh, tối ưu diện tích cho gia đình trẻ, nhỏ gọn và tiện nghi.',
                img: HOME_IMAGES.serviceTownhouse,
                tag: 'Thiết kế & Thi công Trọn gói',
                path: '/dich-vu/nha-pho-chung-cu'
              }
            ].map((service, i) => (
              <Link key={i} href={service.path} className="block group h-full">
                <motion.div
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="bg-ivory/30 rounded-2xl overflow-hidden border border-wood/5 transition-all hover:shadow-2xl cursor-pointer h-full flex flex-col"
                >
                  <div className="h-[300px] w-full relative shrink-0 overflow-hidden">
                    <OptimizedImage 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-maroon z-10">
                      {service.tag}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-maroon transition-colors">{service.title}</h3>
                    <p className="text-sm text-wood/60 leading-relaxed mb-6 flex-1">{service.desc}</p>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-maroon group-hover:gap-4 transition-all mt-auto">
                      Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* 3. Home Collections */}
      <HomeCollections />

      {/* 4. USP Section */}
      <section className="pt-32 pb-12 bg-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-[40px] font-serif font-bold text-wood mb-6 leading-tight">
                  Tại Sao Hơn 50+ Gia Đình tại TPHCM & Bình Dương <br />
                  Tin Chọn Happy Furniture?
                </h2>
                <p className="text-wood/70 leading-relaxed font-medium">
                  Chúng tôi không chỉ là nhà buôn nội thất, chúng tôi cùng bạn kiến tạo không gian sống hiện đại, tiện nghi và tối ưu công năng sử dụng 
                  với nền tảng kỹ thuật vững chắc, thợ lành nghề và đội ngũ thiết kế chuyên nghiệp.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  {
                    icon: Factory,
                    title: 'Hệ thống xưởng & cửa hàng',
                    desc: 'Xưởng 1000m2 tại Quận 12 với máy móc hiện đại, 2 cửa hàng trưng bày tại Bình Dương và TP.HCM.'
                  },
                  {
                    icon: Users,
                    title: 'Đội ngũ chuyên gia',
                    desc: 'Đội ngũ thiết kế hơn 10 năm kinh nghiệm & Thợ lành nghề hơn 20 năm.'
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Vật liệu bền bỉ',
                    desc: 'Ván Ba Thanh lõi xanh chống ẩm, phủ Melamine, chuẩn E2.'
                  },
                  {
                    icon: Award,
                    title: 'Đặc quyền bảo hành',
                    desc: 'Bảo hành 12 tháng, lắp đặt miễn phí tận nơi trong 10km quanh Thuận An.'
                  }
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
                <OptimizedImage 
                  src={HOME_IMAGES.uspWorkshop} 
                  alt="Xưởng nội thất Happy Furniture" 
                  className="w-full h-full"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-maroon rounded-full flex flex-col items-center justify-center text-white text-center p-4 shadow-2xl border-8 border-ivory">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      {SHOW_TEAM_SECTION && (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="text-[40px] font-serif font-bold text-wood mb-4">Đội Ngũ Của Chúng Tôi</h2>
            <div className="w-20 h-1 bg-maroon mx-auto" />
            <p className="mt-6 text-wood/70 max-w-2xl mx-auto text-lg">
               Những con người đứng sau sự tinh tế và hoàn hảo của từng sản phẩm nội thất kiến tạo nên không gian sống của bạn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                id: 1, name: 'Trần Anh Quân', role: 'Interior Consultant', roleVi: 'Tư vấn Nội thất', experience: '',
                image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/team-images/tran-anh-quan-interior-consultant.webp', desc: ''
              },
              {
                id: 2, name: 'Nguyễn Hoàng Thông', role: 'Creative Concept Designer', roleVi: 'Nhà Thiết kế Nội thất', experience: '',
                image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/team-images/nguyen-hoang-thong-creative-designer.webp', desc: ''
              },
              {
                id: 3, name: 'Bông Bông', role: 'Interior Design Assistant', roleVi: 'Trợ lý Thiết kế Nội thất', experience: '',
                image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/team-images/bong-bong-sales-assistant.jpg', desc: ''
              },
              {
                id: 4, name: 'Mr. Phong già', role: 'Production Manager & Technical Specialist', roleVi: 'Quản lý Sản xuất & Chuyên gia Kỹ thuật', experience: '',
                image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop', desc: ''
              },
              {
                id: 5, name: 'Mr. Đắc cô', role: 'Installation Leader', roleVi: 'Đội trưởng Thi công Lắp đặt', experience: '',
                image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/team-images/dang-hoa-phong.webp', desc: ''
              },
              {
                id: 6, name: 'Mr. An', role: 'Site Supervision', roleVi: 'Giám sát Công trình', experience: '',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', desc: ''
              }
            ].map((member) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-ivory mb-6 relative shadow-md">
                  <OptimizedImage src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
                  {member.experience && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                     <span className="text-maroon font-bold text-[11px] uppercase tracking-widest">{member.experience}</span>
                  </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-wood mb-2">{member.name}</h3>
                  <div className="mb-4">
                    <p className="text-maroon font-bold text-sm uppercase tracking-widest leading-relaxed">{member.role}</p>
                    {member.roleVi && <p className="text-wood/60 text-[12px] italic mt-1">{member.roleVi}</p>}
                  </div>
                  {member.desc && <p className="text-wood/70 text-sm leading-relaxed max-w-xs mx-auto">{member.desc}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}


      {/* 6. THÊM TIÊU CHUẨN VẬT LIỆU VÀO ĐÂY */}
      <QualityStandards />

      {/* 7. THÊM FAQ SECTION VÀO ĐÂY */}
      <FaqSection />

      {/* 8. CTA Section */}
      <section className="py-24 bg-maroon">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-[32px] md:text-[48px] font-serif font-bold mb-8">
            Sẵn Sàng Biến Ngôi Nhà Trong Mơ Thành Hiện Thực?
          </h2>
          <p className="text-white/80 mb-12 text-lg">
            Liên hệ ngay để nhận tư vấn thiết kế miễn phí và báo giá chi tiết từ xưởng.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="tel:0909163593"
              className="bg-white text-maroon px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-wood hover:text-white transition-all shadow-2xl"
            >
              Gọi ngay: 0909.163.593
            </a>
            <a 
              href="https://zalo.me/0909163593"
              target="_blank"
              rel="noreferrer"
              className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white hover:text-maroon transition-all flex items-center justify-center"
            >
              Nhận báo giá qua Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
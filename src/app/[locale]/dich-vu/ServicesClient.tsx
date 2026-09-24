'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { ShieldCheck, HardHat, Hammer, ArrowRight, CornerRightDown } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

// Dữ liệu đầy đủ 5 dịch vụ đã được khôi phục
const servicesData = [
  { 
    slug: 'giai-phap-noi-that-cho-thue', 
    enTitle: 'Rental Solution', 
    title: 'Giải Pháp Nội Thất Cho Thuê', 
    description: 'Gói nội thất tối ưu chi phí, thẩm mỹ bền đẹp, cam kết thời gian thu hồi vốn (ROI) cao nhất cho chủ nhà.', 
    audience: 'Nhà Đầu Tư Bất Động Sản', 
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' 
  },
  { 
    slug: 'nha-pho-chung-cu', 
    enTitle: 'Residential', 
    title: 'Thiết Kế Thi Công Nhà Phố & Chung Cư', 
    description: 'Cá nhân hóa không gian sống, tối ưu công năng từng mét vuông với chất lượng ván MDF lõi xanh cao cấp nhất.', 
    audience: 'Gia Đình Trẻ & Gia Chủ Hiện Đại', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' 
  },
  {
    slug: 'san-xuat-gia-cong-noi-that-le-may-do',
    enTitle: 'Custom Furniture',
    title: 'Sản Xuất & Gia Công Nội Thất Lẻ May Đo',
    description: 'Nhận thiết kế và gia công lẻ các sản phẩm như hệ tủ bếp, tủ quần áo, giường ngủ theo đúng kích thước và cấu trúc không gian thực tế của gia đình.',
    audience: 'Khách Hàng Nâng Cấp Không Gian',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_004.webp'
  },
  {
    slug: 'thau-thi-cong-lap-dat-noi-that',
    enTitle: 'Installation Contractor',
    title: 'Thầu Thi Công & Lắp Đặt Nội Thất',
    description: 'Dịch vụ thi công lắp đặt trọn gói theo bản vẽ 3D có sẵn, đảm bảo độ chính xác tuyệt đối, chuẩn vật liệu và bám sát tiến độ cam kết.',
    audience: 'Đơn Vị Thiết Kế & Chủ Thầu',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_007.webp'
  },
  {
    slug: 'thau-thi-cong-du-an-quy-mo-lon',
    enTitle: 'Commercial Projects',
    title: 'Thầu Thi Công Dự Án Quy Mô Lớn',
    description: 'Đủ năng lực sản xuất hàng loạt, đáp ứng khối lượng lớn cho các dự án thương mại: chuỗi cửa hàng, văn phòng công ty, tòa nhà căn hộ dịch vụ và khách sạn.',
    audience: 'Doanh Nghiệp & CĐT Dự Án',
    image: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/interior/modern_interior_apartment_011.webp'
  }
];

export default function ServicesClient() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="bg-ivory pt-24 pb-0 overflow-hidden">
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end justify-between border-b-2 border-maroon/20 pb-12 gap-8">
          <div className="flex-1">
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-maroon/60 font-semibold tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-maroon/60" /> Đa dạng Dịch Vụ
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-serif font-bold text-wood leading-[1.1] tracking-tight">
              Giải Pháp<br/><span className="text-maroon italic">Nội thất</span>
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right">
            <p className="text-wood/70 text-lg leading-relaxed">Kiến tạo giá trị thực chiến. Chúng tôi cung cấp những khối giải pháp thiết kế - thi công từ quy mô buôn lẻ đến thầu siêu dự án.</p>
            <CornerRightDown className="w-8 h-8 text-maroon mt-8 opacity-50" />
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-40">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={service.slug} className="relative w-full">
                <div className={`relative z-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="w-full md:w-1/2 relative">
                    <div className={`absolute -top-16 md:-top-32 ${isEven ? '-left-6 md:-left-24' : '-right-6 md:-right-24'} text-[12rem] md:text-[20rem] font-serif font-black text-maroon/30 leading-none select-none z-30 pointer-events-none drop-shadow-md`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`relative z-10 aspect-[4/5] md:aspect-[3/4] w-full max-w-md mx-auto ${isEven ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} overflow-hidden rounded-sm`}>
                      <motion.div style={{ y: yParallax }} className="w-full h-[130%] -mt-[15%]">
                        <OptimizedImage src={service.image} alt={service.title} aspectRatio="auto" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`absolute bottom-10 ${isEven ? '-right-4 md:-right-12' : '-left-4 md:-left-12'} bg-white p-6 shadow-2xl border border-wood/10 max-w-[240px] z-20`}>
                      <p className="text-wood/80 font-semibold text-sm leading-snug">&quot;{service.audience}&quot;</p>
                    </motion.div>
                  </motion.div>

                  <div className="w-full md:w-1/2 flex flex-col">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                      <p className="text-maroon/80 font-semibold tracking-[0.2em] text-xs uppercase mb-4">{service.enTitle}</p>
                      <h2 className="text-4xl lg:text-5xl font-serif font-bold text-wood leading-[1.1] mb-6">{service.title}</h2>
                      <p className="text-wood/70 text-lg leading-relaxed mb-10 max-w-lg">{service.description}</p>
                      <Link href={`/dich-vu/${service.slug}`} className="group inline-flex items-center gap-4 text-wood hover:text-maroon transition-colors">
                        <span className="font-semibold tracking-[0.2em] uppercase text-xs border-b border-wood group-hover:border-maroon pb-1 transition-colors">Khám phá chi tiết</span>
                        <div className="w-10 h-10 rounded-full border border-wood/20 group-hover:border-maroon/50 flex items-center justify-center group-hover:bg-maroon/5 transition-all"><ArrowRight className="w-4 h-4" /></div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Values Section - Absolute Visual Commitment (Được khôi phục) */}
      <section className="bg-wood py-32 text-ivory relative overflow-hidden mt-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-maroon to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold max-w-2xl text-white">
              Sự Khác Biệt Nằm Ở Chữ <span className="text-[#E8C599] font-serif italic">Thật</span>
            </h2>
            <div className="w-full h-px bg-white/10 mt-12" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="relative group">
              <span className="absolute -top-16 -left-4 text-8xl font-serif font-black text-white/5 transition-transform group-hover:-translate-y-4 duration-500">01</span>
              <HardHat className="w-10 h-10 text-[#E8C599] mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4 text-white">Vật Liệu <span className="text-[#E8C599]">Thật</span></h3>
              <p className="text-ivory/60 leading-relaxed text-lg">
                MDF Ba Thanh chuẩn E1, nhựa PVC kháng nước, keo dán cạnh PUR. Không sử dụng vật tư trôi nổi không rõ nguồn gốc.
              </p>
            </div>
            
            <div className="relative group outline-none md:border-l border-white/10 md:pl-8">
              <span className="absolute -top-16 -left-4 md:left-4 text-8xl font-serif font-black text-white/5 transition-transform group-hover:-translate-y-4 duration-500">02</span>
              <Hammer className="w-10 h-10 text-[#E8C599] mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4 text-white">Thi Công <span className="text-[#E8C599]">Thật</span></h3>
              <p className="text-ivory/60 leading-relaxed text-lg">
                Đo đạc tỉ mỉ, quy trình lắp đặt khép kín chuẩn xác, và cam kết bàn giao không gian sạch sẽ hoàn toàn.
              </p>
            </div>

            <div className="relative group outline-none md:border-l border-white/10 md:pl-8">
              <span className="absolute -top-16 -left-4 md:left-4 text-8xl font-serif font-black text-white/5 transition-transform group-hover:-translate-y-4 duration-500">03</span>
              <ShieldCheck className="w-10 h-10 text-[#E8C599] mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4 text-white">Bảo Hành <span className="text-[#E8C599]">Thật</span></h3>
              <p className="text-ivory/60 leading-relaxed text-lg">
                Chế độ bảo hành minh bạch tận nơi. Tốc độ phản hồi và có mặt xử lý trong vòng 24 đến 48 giờ làm việc.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
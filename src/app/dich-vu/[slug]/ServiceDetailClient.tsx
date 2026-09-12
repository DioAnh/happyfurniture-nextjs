'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Target, Phone, ArrowLeft, ArrowRight, ShieldCheck, Zap, Award, Gem, HardHat, Factory } from 'lucide-react';

// COMPONENT ĐẾM SỐ (COUNTER)
const Counter = ({ from, to, delay }: { from: number, to: number | string, delay: number }) => {
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

// DỮ LIỆU 5 DỊCH VỤ CỐ ĐỊNH (Thay thế cho servicesData cũ)
const MOCK_SERVICES = [
  {
    slug: 'can-ho-cho-thue',
    title: 'Giải Pháp Nội Thất Cho Thuê',
    audience: 'Nhà Đầu Tư Bất Động Sản',
    description: 'Gói nội thất tối ưu chi phí, thẩm mỹ bền đẹp, cam kết thời gian thu hồi vốn (ROI) cao nhất cho chủ nhà. Giải pháp sử dụng module tiêu chuẩn dễ thay thế khi hỏng hóc.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1600607687940-47a04b629733?q=80&w=1200',
    metrics: [
      { value: 30, unit: '%', label: 'Tiết Kiệm Chi Phí', delay: 0 },
      { value: 15, unit: 'Ngày', label: 'Thi Công Hoàn Thiện', delay: 0.2 },
      { value: 5, unit: 'Năm', label: 'Bảo Trì Vòng Đời', delay: 0.4 }
    ],
    callouts: [
      { x: 30, y: 40, title: 'Vật Liệu Chống Xước', desc: 'Bề mặt Melamine dễ vệ sinh.' },
      { x: 70, y: 60, title: 'Module Độc Lập', desc: 'Dễ dàng thay thế từng phần khi hư hỏng.' }
    ],
    features: [
      { icon: Zap, title: 'Tối Ưu Ngân Sách', desc: 'Sản xuất hàng loạt giảm thiểu chi phí.' },
      { icon: ShieldCheck, title: 'Siêu Bền Bỉ', desc: 'Chống chịu tốt với tần suất sử dụng cao.' },
      { icon: Target, title: 'Đúng Gu Khách Thuê', desc: 'Tone màu trung tính dễ cho thuê phòng.' }
    ]
  },
  {
    slug: 'nha-pho-chung-cu',
    title: 'Thiết Kế Thi Công Nội Thất Nhà Ở',
    audience: 'Gia Đình Trẻ & Gia Chủ Hiện Đại',
    description: 'Cá nhân hóa không gian sống, tối ưu công năng từng mét vuông với chất lượng ván MDF lõi xanh cao cấp nhất, mang lại sự tiện nghi hoàn hảo cho ngôi nhà bạn.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200',
    metrics: [
      { value: 100, unit: '%', label: 'May Đo Riêng', delay: 0 },
      { value: 25, unit: 'Ngày', label: 'Bàn Giao Chìa Khóa', delay: 0.2 },
      { value: 12, unit: 'Tháng', label: 'Bảo Hành Kỹ Thuật', delay: 0.4 }
    ],
    callouts: [
      { x: 20, y: 30, title: 'MDF Lõi Xanh E2', desc: 'An toàn cho sức khỏe hô hấp của trẻ.' },
      { x: 80, y: 50, title: 'Bản Lề Giảm Chấn', desc: 'Triệt tiêu tiếng ồn khi đóng mở tủ.' }
    ],
    features: [
      { icon: Gem, title: 'Thẩm Mỹ Tinh Tế', desc: 'Tập trung vào sự đơn giản và sang trọng.' },
      { icon: Target, title: 'Tối Ưu Công Năng', desc: 'Không có góc chết trong ngôi nhà.' },
      { icon: ShieldCheck, title: 'An Toàn Sức Khỏe', desc: 'Sử dụng vật liệu đạt chuẩn khí thải.' }
    ]
  },
  {
    slug: 'gia-cong-noi-that',
    title: 'Sản Xuất & Gia Công Nội Thất Lẻ',
    audience: 'Khách Hàng Cá Nhân',
    description: 'Cung cấp các sản phẩm nội thất rời (giường, tủ, bàn) theo kích thước yêu cầu với chất lượng xưởng, không qua trung gian.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200',
    metrics: [
      { value: 7, unit: 'Ngày', label: 'Gia Công Nhanh', delay: 0 },
      { value: 300, unit: '+', label: 'Mã Ván Lựa Chọn', delay: 0.2 },
      { value: 0, unit: 'Đ', label: 'Phí Lắp Đặt Khu Vực', delay: 0.4 }
    ],
    callouts: [],
    features: [
      { icon: Factory, title: 'Giá Tại Xưởng', desc: 'Trực tiếp sản xuất, không qua sale.' },
      { icon: Zap, title: 'Nhanh Chóng', desc: 'Giao hàng và lắp ráp trong 7 ngày.' },
      { icon: Award, title: 'Linh Hoạt', desc: 'Điều chỉnh kích thước vừa vặn từng cm.' }
    ]
  },
  {
    slug: 'thi-cong-lap-dat',
    title: 'Thầu Thi Công & Lắp Đặt Nội Thất',
    audience: 'Đối Tác Thiết Kế B2B',
    description: 'Trở thành xưởng gia công hậu phương vững chắc cho các công ty kiến trúc và thiết kế, đảm bảo bản vẽ được hiện thực hóa chuẩn xác 100%.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200',
    metrics: [
      { value: 1000, unit: 'm2', label: 'Quy Mô Xưởng', delay: 0 },
      { value: 99, unit: '%', label: 'Chuẩn Bản Vẽ', delay: 0.2 },
      { value: 50, unit: '+', label: 'Đối Tác B2B', delay: 0.4 }
    ],
    callouts: [],
    features: [
      { icon: HardHat, title: 'Chuyên Nghiệp', desc: 'Đội thợ thi công đọc bản vẽ xuất sắc.' },
      { icon: ShieldCheck, title: 'Bảo Mật Báo Giá', desc: 'Tôn trọng khách hàng của đối tác B2B.' },
      { icon: Zap, title: 'Đúng Tiến Độ', desc: 'Cam kết bàn giao kịp khai trương.' }
    ]
  },
  {
    slug: 'thau-du-an-chung-cu',
    title: 'Thầu Thi Công Dự Án Quy Mô Lớn',
    audience: 'Chủ Đầu Tư Dự Án',
    description: 'Năng lực sản xuất hàng loạt cho các dự án khách sạn, khu dân cư, đảm bảo sự đồng bộ tuyệt đối với tiến độ thần tốc.',
    image: 'https://images.unsplash.com/photo-1556912177-c5403063984d?q=80&w=1200',
    technicalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    metrics: [
      { value: 500, unit: '+', label: 'Sản Phẩm/Tháng', delay: 0 },
      { value: 10, unit: 'Năm', label: 'Kinh Nghiệm', delay: 0.2 },
      { value: 100, unit: '%', label: 'Năng Lực CNC', delay: 0.4 }
    ],
    callouts: [],
    features: [
      { icon: Factory, title: 'Sản Xuất Hàng Loạt', desc: 'Dây chuyền CNC đáp ứng khối lượng lớn.' },
      { icon: ShieldCheck, title: 'Đồng Bộ 100%', desc: 'Chất lượng không sai lệch giữa các lô.' },
      { icon: Award, title: 'Hồ Sơ Năng Lực', desc: 'Đầy đủ chứng từ pháp lý và hóa đơn VAT.' }
    ]
  }
];

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  // Tìm dịch vụ dựa trên slug từ URL
  const service = MOCK_SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory">
        <h1 className="text-3xl font-bold text-maroon mb-4">Không tìm thấy Dịch vụ</h1>
        <Link href="/dich-vu" className="text-wood hover:text-maroon underline">Về trang Tổ hợp Dịch vụ</Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 mt-4 relative z-20">
        <button 
          onClick={() => router.push('/dich-vu')}
          className="flex items-center gap-2 text-wood/60 hover:text-maroon font-semibold tracking-[0.2em] uppercase text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tổ Hợp Dịch Vụ
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
                className="text-wood/80 font-semibold text-sm mb-6 block uppercase tracking-widest text-maroon"
              >
                &quot;{service.audience}&quot;
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-[5.5rem] font-serif font-bold text-wood leading-[1.05] tracking-tight"
              >
                {service.title}
              </motion.h1>
            </div>
            <div className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-wood/70 text-lg leading-relaxed"
              >
                {service.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-maroon/80 font-semibold tracking-[0.2em] uppercase text-xs mb-4">Giá Trị Thực Chiến</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wood">Thước Đo Hiệu Quả</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-wood/5 pt-12">
            {service.metrics?.map((metric, idx) => (
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


      {/* SECTION DỰ ÁN THỰC TẾ SLIDER (SẮC CẠNH DỌC) */}
      <section className="py-24 bg-white overflow-hidden border-t border-wood/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Hình ảnh thực tế</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-4">
              Không Gian Sống Đã Hoàn Thiện
            </h3>
            <p className="text-wood/60 text-sm md:text-base">
              Chúng tôi không bán bản vẽ, chúng tôi trao tay không gian sống thực tế sắc nét từng chi tiết.
            </p>
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
              <p className="text-maroon/80 font-semibold tracking-[0.2em] uppercase text-xs mb-4">Chi Tiết Kỹ Thuật</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood">Zoom In <span className="text-maroon italic">Chất Lượng</span></h2>
            </div>
            <p className="text-wood/70 text-lg leading-relaxed max-w-sm md:text-right">Bóc tách từng lớp cấu tạo để trả lời cho câu hỏi: Tại sao sản phẩm của chúng tôi luôn bền bỉ vượt thời gian?</p>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-sm overflow-hidden bg-wood/5 shadow-2xl">
            <motion.div style={{ scale: scaleImage }} className="w-full h-full">
              <OptimizedImage
                src={service.technicalImage || service.image}
                alt="Technical Details"
                aspectRatio="video"
                className="w-full h-full object-cover filter brightness-75"
                priority={true}
              />
            </motion.div>
            
            {/* Điểm nhấn Callouts (chỉ hiện trên Desktop) */}
            <div className="absolute inset-0 z-10 hidden md:block">
              {service.callouts?.map((callout, idx) => (
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

            {/* Mobile View cho Callouts */}
            <div className="absolute inset-0 bg-black/40 md:hidden flex flex-col justify-center px-6">
              <div className="space-y-4">
                {service.callouts?.map((callout, idx) => (
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
            {service.features.map((feature, fIndex) => (
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

      {/* CTA Section */}
      <section className="py-32 bg-maroon text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-[32px] md:text-[56px] font-serif font-bold mb-8 leading-[1.1]">
            Đã Đến Lúc <br/> Tạo Nên <span className="text-[#E8C599] italic">Tuyệt Tác</span> Của Bạn
          </h2>
          <p className="text-white/80 mb-12 text-xl max-w-2xl mx-auto font-light">
            Liên hệ ngay để chia sẻ bài toán của bạn. Happy Furniture sẽ cung cấp bản lề hoàn hảo nhất cho không gian.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="tel:0909163593"
              className="bg-white text-maroon px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-wood hover:text-white transition-all shadow-xl flex items-center gap-3"
            >
              <Phone className="w-4 h-4" /> HOTLINE: 090 916 3593
            </a>
            <Link 
              href="/lien-he"
              className="bg-transparent border border-white/50 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white hover:text-maroon transition-all flex items-center gap-3"
            >
              Yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
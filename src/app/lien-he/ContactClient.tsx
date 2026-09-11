'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronRight, Factory, Store } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

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
  const locations = [
    {
      type: 'Xưởng sản xuất',
      name: 'Happy Furniture Workshop',
      address: 'Quận 12, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.app.goo.gl/eFUALjGezoPBD8y46',        
      icon: <Factory className="w-6 h-6" />,
      details: 'Chuyên sản xuất, may đo nội thất gỗ công nghiệp MDF, Laminate, Acrylic.'
    },
    {
      type: 'Showroom / Cửa hàng',
      name: 'Happy Furniture Showroom',
      address: 'Thuận An, Bình Dương',
      mapUrl: 'https://maps.app.goo.gl/wPNMErQWShXnE1iz5',
      icon: <Store className="w-6 h-6" />,
      details: 'Trưng bày các mẫu thiết kế mới nhất và tư vấn trực tiếp cho khách hàng.'
    }
  ];

  return (
    <div className="bg-ivory min-h-screen">
      <section className="relative py-24 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop" 
            alt="Xưởng nội thất Happy Furniture" 
            aspectRatio="video"
            className="w-full h-full"
            priority={true}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[42px] md:text-[56px] font-serif font-bold mb-6"
          >
            Liên Hệ Với Chúng Tôi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            Happy Furniture luôn sẵn sàng lắng nghe và hiện thực hóa không gian sống mơ ước của bạn. 
            Trọng tâm phục vụ tại <span className="text-white font-bold">Thuận An, Bình Dương</span> và các khu vực lân cận.
          </motion.p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-wood/5">
              <h3 className="text-[18px] font-bold text-wood mb-6 uppercase tracking-widest border-b border-wood/10 pb-4">Thông tin liên hệ</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-ivory rounded-full flex items-center justify-center text-maroon shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-widest text-wood/40 font-bold mb-1">Hotline / Zalo</p>
                    <a href="tel:0909163593" className="text-[16px] font-bold text-wood hover:text-maroon transition-colors">0909 163 593</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-ivory rounded-full flex items-center justify-center text-maroon shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-widest text-wood/40 font-bold mb-1">Email</p>
                    <p className="text-[16px] font-bold text-wood">contact@happyfurniture.net</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-ivory rounded-full flex items-center justify-center text-maroon shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-widest text-wood/40 font-bold mb-1">Giờ làm việc</p>
                    <p className="text-[16px] font-bold text-wood">Thứ 2 - Chủ Nhật: 08:00 - 20:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-wood/5 space-y-4">
                <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-maroon text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:bg-wood transition-colors">
                  <MessageCircle className="w-5 h-5" /> Chat qua Zalo ngay
                </a>
                <a href="https://www.facebook.com/profile.php?id=61585294213927" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#1877F2] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:bg-[#1877F2]/90 transition-colors">
                  <FacebookIcon className="w-5 h-5" /> Kết nối qua Facebook
                </a>
                <a href="http://www.youtube.com/@HappyFurnitureAcademy" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#FF0000] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:bg-[#FF0000]/90 transition-colors">
                  <YoutubeIcon className="w-5 h-5" /> Kênh YouTube Academy
                </a>
                <a href="https://www.instagram.com/happyfurniturevietnam/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:opacity-90 transition-all">
                  <InstagramIcon className="w-5 h-5" /> Happy Furniture Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[24px] font-serif font-bold text-wood">Địa điểm của chúng tôi</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((loc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white p-8 rounded-sm shadow-sm border border-wood/5 hover:border-maroon/30 transition-all"
                >
                  <div className="text-maroon mb-6">{loc.icon}</div>
                  <p className="text-[11px] uppercase tracking-[3px] text-maroon font-bold mb-2">{loc.type}</p>
                  <h4 className="text-[20px] font-bold text-wood mb-4">{loc.name}</h4>
                  <p className="text-wood/60 mb-6 text-[15px] leading-relaxed">{loc.address}</p>
                  <p className="text-wood/50 text-[13px] mb-8 italic">{loc.details}</p>
                  <a href={loc.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-maroon font-bold uppercase tracking-widest text-[12px] group-hover:gap-4 transition-all">
                    Xem trên Google Maps
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-white p-10 rounded-sm shadow-sm border border-wood/5">
              <h3 className="text-[24px] font-serif font-bold text-wood mb-6">Về Happy Furniture</h3>
              <div className="prose prose-wood max-w-none text-wood/70 leading-relaxed space-y-4">
                <p>Happy Furniture tự hào là đơn vị chuyên thiết kế và thi công nội thất may đo trực tiếp tại xưởng. Với hơn 10 năm kinh nghiệm trong ngành gỗ công nghiệp, chúng tôi thấu hiểu nhu cầu về một không gian sống vừa thẩm mỹ, vừa tối ưu công năng với chi phí hợp lý nhất.</p>
                <p>Chúng tôi cam kết sử dụng vật liệu lõi xanh chống ẩm (MDF, HDF) từ các nhà cung cấp uy tín, kết hợp với công nghệ máy móc hiện đại để tạo ra những sản phẩm có độ hoàn thiện sắc nét nhất.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-wood/5">
                  <div className="text-center">
                    <p className="text-[24px] font-bold text-maroon">1000+</p>
                    <p className="text-[11px] uppercase tracking-widest text-wood/40">Dự án</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[24px] font-bold text-maroon">10+</p>
                    <p className="text-[11px] uppercase tracking-widest text-wood/40">Năm kinh nghiệm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[24px] font-bold text-maroon">Direct</p>
                    <p className="text-[11px] uppercase tracking-widest text-wood/40">Giá tại xưởng</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[24px] font-bold text-maroon">24/7</p>
                    <p className="text-[11px] uppercase tracking-widest text-wood/40">Hỗ trợ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
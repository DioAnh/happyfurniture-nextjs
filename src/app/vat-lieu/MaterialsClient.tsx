'use client';

import React from 'react';
import { motion } from 'motion/react';
import { OptimizedImage } from '@/components/OptimizedImage';

const MATERIALS = [
  { id: 'm1', code: 'HF-MS102 T', name: 'Sồi Nga Sáng (Light Oak)', texture: 'Bề mặt sần nhẹ tự nhiên, chạm cảm giác nhám vân gỗ thật.', story: 'Màu gỗ sồi sáng mang lại vẻ đẹp thanh lịch, tươi mới. Rất được ưa chuộng trong phong cách thiết kế Japandi hoặc Minimalist, giúp không gian thêm phần ấm áp nhưng không bị tối.', image: 'https://images.unsplash.com/photo-1590847702890-aa1e089201a0?q=80&w=800&auto=format&fit=crop' },
  { id: 'm2', code: 'HF-MS204 M', name: 'Óc Chó Đặc Biệt (Dark Walnut)', texture: 'Trơn mịn (Matte), màu sắc chìm sâu sang trọng.', story: 'Tone gỗ óc chó đậm nét, phô diễn sự quyền lực và sang trọng. Tuyệt vời nhất khi phối cùng ánh sáng vàng ấm và các mảng màu Solid xám đen trong phong cách Modern Luxury.', image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop' },
  { id: 'm3', code: 'HF-SOL 01', name: 'Trắng Tuyết (Snow White)', texture: 'Bề mặt bóng mờ nhẹ, chống xước và dễ vệ sinh.', story: 'Sắc trắng thuần khiết, làm nền hoàn hảo giúp tôn lên nội thất decor. Là sự lựa chọn số 1 để "ăn gian" diện tích cho những căn hộ vừa và nhỏ.', image: 'https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=800&auto=format&fit=crop' },
  { id: 'm4', code: 'HF-SOL 07', name: 'Xám Xi Măng (Concrete Grey)', texture: 'Bề mặt giả bê tông nhám, mang đậm phong cách thô mộc công nghiệp.', story: 'Ngôn ngữ thiết kế Industrial đầy phá cách. Tone màu mang đậm tính nghệ thuật, hiện đại nhưng phảng phất sự mộc mạc không nhàm chán.', image: 'https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?q=80&w=800&auto=format&fit=crop' },
  { id: 'm5', code: 'HF-MS305 T', name: 'Sồi Trầm (Rustic Oak)', texture: 'Vân gỗ nổi cuộn sóng, mô phỏng hoàn hảo gỗ tự nhiên cổ điển.', story: 'Khơi gợi vẻ đẹp mộc mạc và sự hoài kỉ của phong cách Rustic. Phù hợp cho những khách hàng yêu mến sự yên bình và tĩnh lặng.', image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=800&auto=format&fit=crop' },
  { id: 'm6', code: 'HF-SOL 12', name: 'Đen Huyền (Matte Black)', texture: 'Trơn lì 100% (Super Matte), chống bám vân tay cao cấp.', story: 'Quyền lực, táo bạo và bí ẩn. Trở thành điểm nhấn thị giác cực mạnh mẽ khi đặt trong những không gian ngập tràn ánh sáng.', image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop' }
];

export default function MaterialsClient() {
  return (
    <div className="pt-24 pb-32 bg-ivory min-h-screen">
      <section className="px-6 mb-20 text-center max-w-4xl mx-auto">
        <h1 className="text-[40px] md:text-[56px] font-serif font-bold text-wood mb-6">Thư Viện Mã Ván</h1>
        <div className="w-20 h-1 bg-maroon mx-auto mb-8" />
        <p className="text-wood/70 leading-relaxed text-lg">
          Lựa chọn màu cốt và vân gỗ quyết định 80% cảm xúc của không gian. Tại Happy Furniture, chúng tôi cung cấp đủ các tùy chọn <strong>MDF lõi xanh chống ẩm phủ Melamine / Laminate cao cấp</strong> - được kiểm tra độ bền, chống trầy xước và thân thiện với sức khỏe gia đình bạn.
        </p>
      </section>

      <section className="px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14">
          {MATERIALS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[122/244] w-full bg-wood/5 overflow-hidden rounded-sm mb-6 border border-wood/10 shadow-sm cursor-pointer">
                <OptimizedImage src={item.image} alt={item.name} aspectRatio="square" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-wood/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                  <span className="text-white text-xs uppercase tracking-[3px] font-bold border border-white/50 px-4 py-2 backdrop-blur-sm">Xem cận cảnh</span>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3 border-b border-wood/10 pb-3">
                  <h3 className="font-bold text-wood text-lg flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-maroon block"></span>{item.code}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-wood/50 font-bold">Ván MDF</span>
                </div>
                <h4 className="font-serif font-bold text-wood mb-2 text-xl">{item.name}</h4>
                <p className="text-sm font-bold text-maroon mb-4 italic">&quot;{item.texture}&quot;</p>
                <p className="text-sm text-wood/70 leading-relaxed max-w-sm mt-auto">{item.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 mt-32 max-w-5xl mx-auto text-center bg-wood p-12 lg:p-20 text-ivory rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
        <div className="relative z-10">
           <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">Chưa Tìm Được Màu Sắc Ưng Ý?</h2>
           <p className="text-ivory/80 leading-relaxed mb-10 max-w-2xl mx-auto">
             Đây chỉ là một phần nhỏ trong số +300 mã vân gỗ thực tế tại kho vật liệu của Happy Furniture. Để trải nghiệm chất cảm trực tiếp và so sánh sắc độ dưới nhiều góc sáng, hãy đăng ký nhận tư vấn và chọn mẫu ván tận nhà.
           </p>
           <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-maroon text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-maroon transition-all shadow-xl">
             Nhận Catalogue Full Mã Ván
           </a>
        </div>
      </section>
    </div>
  );
}
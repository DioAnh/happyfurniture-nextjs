'use client';

import React from 'react';
import { motion } from 'motion/react';
import { OptimizedImage } from '@/components/OptimizedImage';

// Hàm xử lý link ảnh chuẩn xác từ Supabase Storage cho các màu vân gỗ
const getMaterialImageUrl = (code: string) => {
  let formattedCode = code;
  if (code.startsWith('BT')) {
    formattedCode = code.replace('BT', 'BT_');
  }
  return `https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/materials/${formattedCode}_MDF_Melamine_Chong_Am_E2_Ba_Thanh.webp`;
};

// Dữ liệu 14 mã vật liệu (Thêm trường hex cho các màu trơn)
const MATERIALS = [
  { id: 'm1', code: 'BT120', name: 'Vân Gỗ Mun Đen', type: 'MDF LMR Melamine E2', texture: 'Vân gỗ nổi cuộn sóng, bề mặt nhám nhẹ tự nhiên.', story: 'Màu gỗ mun đen huyền bí mang đậm chất Urban Luxury, tạo điểm nhấn quyền lực cho không gian hiện đại.' },
  { id: 'm2', code: 'BT123', name: 'Vân Gỗ Sồi Nhạt', type: 'MDF LMR Melamine E2', texture: 'Vân sồi thẳng, màu sắc tươi sáng, mộc mạc.', story: 'Sắc sồi nhạt thanh lịch mang hơi thở phong cách Japandi, giúp không gian thêm phần rộng rãi và ấm áp.' },
  { id: 'm3', code: 'BT131', name: 'Vân Gỗ Sồi Xám', type: 'MDF LMR Melamine E2', texture: 'Mặt gỗ nhám vân sồi tự nhiên, tone xám khói hiện đại.', story: 'Sự giao thoa hoàn hảo giữa nét cổ điển của vân gỗ và sự thời thượng của tone xám khói, phù hợp với kiến trúc tối giản.' },
  { id: 'm4', code: 'BT178', name: 'Vân Gỗ Óc Chó', type: 'MDF LMR Melamine E2', texture: 'Vân óc chó cuộn xoáy đặc trưng, màu nâu trầm sang trọng.', story: 'Vẻ đẹp kinh điển của gỗ óc chó mang lại sự ấm cúng, đẳng cấp trường tồn với thời gian.' },
  { id: 'm5', code: 'BT180', name: 'Vân Gỗ Sồi Sáng', type: 'MDF LMR Melamine E2', texture: 'Bề mặt sần nhẹ tự nhiên, chạm cảm giác nhám vân gỗ thật.', story: 'Màu gỗ sồi sáng mang lại vẻ đẹp thanh lịch, tươi mới. Giúp không gian thêm phần ấm áp nhưng không bị tối.' },
  { id: 'm6', code: 'BT26', name: 'Vân Gỗ Tần Bì', type: 'MDF LMR Melamine E2', texture: 'Vân tần bì elip đồng tâm nổi bật, sắc vàng ấm áp.', story: 'Sắc vàng tươi tắn của gỗ tần bì mang lại sức sống và năng lượng tích cực cho mọi căn phòng.' },
  { id: 'm7', code: 'BT56', name: 'Vân Gỗ Anh Đào', type: 'MDF LMR Melamine E2', texture: 'Vân gỗ mềm mại, tone nâu đỏ quyến rũ.', story: 'Màu gỗ anh đào (Cherry) mang hơi hướng cổ điển, tạo nên không gian sống đậm chất nghệ thuật và lãng mạn.' },
  { id: 'm8', code: 'BT58', name: 'Vân Gỗ Sồi Trắng', type: 'MDF LMR Melamine E2', texture: 'Vân sồi tự nhiên kết hợp tone trắng xám tinh tế.', story: 'Sự lựa chọn hàng đầu cho phong cách Bắc Âu (Scandinavian), mang lại cảm giác sạch sẽ, thoáng đãng.' },
  
  // CÁC MÀU TRƠN (SOLID) SỬ DỤNG MÃ HEX ĐỂ TỐI ƯU HIỆU NĂNG
  { id: 'm9', code: 'CR', name: 'Crema (Beige)', type: 'MDF LMR Melamine E2', hex: '#EAE6DA', texture: 'Bề mặt trơn mịn bóng mờ, chống xước cao.', story: 'Sắc kem (Beige) trung tính, dịu mắt, là phông nền hoàn hảo để làm nổi bật các món đồ decor trong phòng.' },
  { id: 'm10', code: 'DS', name: 'Dark Sky (Xanh Đen)', type: 'MDF LMR Melamine E2', hex: '#2B3A42', texture: 'Màu trơn nhám mờ, chống bám vân tay.', story: 'Tone xanh đen sâu thẳm như bầu trời đêm, tạo điểm nhấn thị giác cực mạnh mẽ và nam tính.' },
  { id: 'm11', code: 'LG', name: 'Light Grey (Xám Nhạt)', type: 'MDF LMR Melamine E2', hex: '#D9D9D9', texture: 'Mặt phẳng mịn màng, sắc xám hiện đại.', story: 'Màu xám nhạt tối giản, dễ dàng phối hợp với mọi phong cách thiết kế, từ Modern đến Industrial.' },
  { id: 'm12', code: 'MB', name: 'Matte Black (Đen Mờ)', type: 'MDF LMR Melamine E2', hex: '#242424', texture: 'Trơn lì 100% (Super Matte), chống bám vân tay cao cấp.', story: 'Quyền lực, táo bạo và bí ẩn. Lựa chọn tuyệt vời cho những gia chủ thích sự phá cách và cá tính.' },
  { id: 'm13', code: 'SW', name: 'Smooth White (Trắng Trơn)', type: 'MDF LMR Melamine E2', hex: '#FAFAFA', texture: 'Bề mặt trắng tuyết mượt mà, dễ lau chùi.', story: 'Sắc trắng thuần khiết, giải pháp số 1 để "ăn gian" diện tích và bắt sáng tốt nhất cho căn hộ.' },
  { id: 'm14', code: 'WC', name: 'White Cream (Trắng Kem)', type: 'MDF LMR Melamine E2', hex: '#F4F0EA', texture: 'Trơn mịn, sắc trắng ngà ấm áp.', story: 'Không quá chói như trắng tinh, màu trắng kem mang lại cảm giác dịu nhẹ, thanh bình và dễ chịu.' }
];

export default function MaterialsClient() {
  return (
    <div className="pt-24 pb-32 bg-ivory min-h-screen">
      <section className="px-6 mb-20 text-center max-w-4xl mx-auto">
        <h1 className="text-[40px] md:text-[56px] font-serif font-bold text-wood mb-6">Tiêu chuẩn Vật liệu</h1>
        <div className="w-20 h-1 bg-maroon mx-auto mb-8" />
        <p className="text-wood/70 leading-relaxed text-lg">
          Lựa chọn loại cốt ván và vân gỗ quyết định 80% cảm xúc của không gian. Tại Happy Furniture, chúng tôi cung cấp đủ các tùy chọn loại cốt ván: <strong>MDF, MFC, Plywood </strong>, mức độ chống ẩm: <strong> lõi nâu không chống ẩm, lõi xanh LMR chống ẩm thường, lõi xanh MMR chống ẩm tốt </strong>, loại phủ bề mặt: <strong> Melamine / Laminate / Acrylic </strong> được kiểm tra độ bền, chống trầy xước và thân thiện với sức khỏe gia đình bạn.
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
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-square w-full bg-white overflow-hidden rounded-sm mb-6 border border-wood/10 shadow-sm cursor-pointer">
                {/* LOGIC HIỂN THỊ: Có mã Hex thì đổ màu, không có thì load ảnh */}
                {item.hex ? (
                  <div 
                    className="w-full h-full transition-transform duration-1000 group-hover:scale-110" 
                    style={{ backgroundColor: item.hex }} 
                  />
                ) : (
                  <OptimizedImage 
                    src={getMaterialImageUrl(item.code)} 
                    alt={item.name} 
                    tier="card"
                    aspectRatio="square" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                )}
                
                <div className="absolute inset-0 bg-wood/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                  <span className="text-white text-xs uppercase tracking-[3px] font-bold border border-white/50 px-4 py-2 backdrop-blur-sm">Xem cận cảnh</span>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3 border-b border-wood/10 pb-3">
                  <h3 className="font-bold text-wood text-lg flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-maroon block"></span>{item.code}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-wood/50 font-bold">{item.type}</span>
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
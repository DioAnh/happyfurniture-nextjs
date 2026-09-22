'use client';

import React from 'react';
import { ShieldCheck, Layers, Hammer, Leaf, CheckCircle2 } from 'lucide-react';

interface QualityStandardsProps {
  showPricing?: boolean; // Tùy chọn để ẩn/hiện bảng báo giá
}

export const QualityStandards = ({ showPricing = true }: QualityStandardsProps) => {
  return (
    <section className="py-24 bg-white border-t border-wood/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Phần 1: Tiêu Chuẩn Kỹ Thuật (E-E-A-T) */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-maroon mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[3px] font-bold">Cam kết chất lượng</span>
          </div>
          <h2 className="text-[32px] md:text-[45px] font-serif font-bold text-wood mb-4 leading-tight">
            Tiêu Chuẩn Vật Liệu & Thi Công
          </h2>
          <p className="text-wood/60 text-base md:text-lg">
            Sự khác biệt làm nên độ bền hàng chục năm của nội thất Happy Furniture so với các sản phẩm sản xuất đại trà trên thị trường.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${showPricing ? 'mb-24' : ''}`}>
          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">Cốt Gỗ MDF Lõi Xanh 17mm</h3>
            <p className="text-wood/70 text-sm leading-relaxed">
              Tuyệt đối không dùng ván dăm MFC hay ván mỏng 15mm. Chúng tôi chuẩn hóa sử dụng ván MDF lõi xanh chống ẩm với độ dày chuẩn 17mm, đảm bảo kết cấu tủ luôn vững chắc, không sập xệ.
            </p>
          </div>

          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">Công Nghệ Dán Cạnh PUR</h3>
            <p className="text-wood/70 text-sm leading-relaxed">
              Sử dụng máy dán cạnh tự động với keo chống thấm PUR. Đường nẹp sát rạt, không lộ vạch đen chữ V, ngăn chặn tuyệt đối tình trạng nước thấm vào lõi gỗ gây trương nở, bong tróc.
            </p>
          </div>

          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">Phụ Kiện Bản Lề Giảm Chấn</h3>
            <p className="text-wood/70 text-sm leading-relaxed">
              Nói không với bản lề sắt rẻ tiền mau rỉ sét. Toàn bộ tủ kệ đều sử dụng bản lề inox giảm chấn, ray trượt bi 3 tầng chống ồn, mang lại trải nghiệm đóng/mở êm ái, nhẹ nhàng mỗi ngày.
            </p>
          </div>

          <div className="bg-ivory/50 p-8 rounded-2xl border border-wood/5 hover:border-maroon/20 transition-colors group">
            <div className="w-12 h-12 bg-maroon/10 text-maroon rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wood mb-3">An Toàn Sức Khỏe (Chuẩn E2)</h3>
            <p className="text-wood/70 text-sm leading-relaxed">
              Các loại ván trôi nổi thường chứa Formadehyde (gây cay mắt, mùi hắc). Ván tại xưởng đạt tiêu chuẩn phát thải E2, không mùi độc hại, cực kỳ an toàn cho gia đình có trẻ nhỏ và phụ nữ mang thai.
            </p>
          </div>
        </div>

        {/* Phần 2: Bảng Giá Tham Khảo (Được kiểm soát bởi showPricing) */}
        {showPricing && (
          <div className="bg-wood text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon rounded-full blur-[100px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10" />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-[28px] md:text-[36px] font-serif font-bold mb-3">Báo Giá Thi Công Tham Khảo</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Chi phí thực tế sẽ phụ thuộc vào bản vẽ chi tiết và diện tích đo đạc thực tế của từng căn hộ. Khách hàng vui lòng liên hệ Zalo để nhận báo giá dự toán chính xác nhất.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <h4 className="text-lg font-bold text-white mb-2">Căn Hộ 1 Phòng Ngủ</h4>
                  <p className="text-sm text-white/60 mb-4">Diện tích: 45 - 55m²</p>
                  <div className="text-2xl font-bold text-maroon bg-white py-3 rounded-xl mb-4">
                    Từ 45.000.000đ
                  </div>
                  <ul className="text-left text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> Tủ bếp trên/dưới, kính ốp</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> Kệ tivi, tủ giày đụng trần</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> Giường ngủ hộc kéo, tủ quần áo</li>
                  </ul>
                </div>

                <div className="bg-maroon border border-maroon p-6 rounded-2xl text-center transform md:-translate-y-4 shadow-2xl">
                  <div className="bg-white text-maroon text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full inline-block mb-3">
                    Phổ biến nhất
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Căn Hộ 2 Phòng Ngủ</h4>
                  <p className="text-sm text-white/60 mb-4">Diện tích: 60 - 75m²</p>
                  <div className="text-2xl font-bold text-maroon bg-white py-3 rounded-xl mb-4">
                    Từ 75.000.000đ
                  </div>
                  <ul className="text-left text-sm text-white/90 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5"/> Combo tủ bếp Full kịch trần</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5"/> Vách ốp lam sóng phòng khách</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5"/> Combo nội thất 2 phòng ngủ</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <h4 className="text-lg font-bold text-white mb-2">Nhà Phố / Căn Hộ 3PN</h4>
                  <p className="text-sm text-white/60 mb-4">Diện tích: Trên 85m²</p>
                  <div className="text-2xl font-bold text-maroon bg-white py-3 rounded-xl mb-4">
                    Từ 120.000.000đ
                  </div>
                  <ul className="text-left text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> Tủ bếp chữ L/U, bàn đảo</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> Hệ thống tủ kệ lưu trữ âm tường</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> Combo nội thất Master & phòng ngủ phụ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
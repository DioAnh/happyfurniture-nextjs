'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, PackageCheck, Clock } from 'lucide-react';

export default function ShippingClient() {
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-sm shadow-sm border border-wood/5"
        >
          <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-8 border-b border-wood/10 pb-6">
            Chính sách vận chuyển & lắp đặt
          </h1>
          <div className="prose prose-wood max-w-none space-y-10">
            <section>
              <h2 className="text-xl font-bold text-maroon flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6" /> Vận chuyển chuyên nghiệp - Lắp đặt tận tâm
              </h2>
              <p className="text-wood/70 leading-relaxed">
                Happy Furniture sở hữu đội ngũ vận chuyển và thợ lắp đặt trực tiếp từ xưởng, đảm bảo sản phẩm được giao đến tay khách hàng một cách an toàn và đúng kỹ thuật nhất.
              </p>
            </section>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-wood/10 p-6 rounded-sm">
                <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center text-maroon mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-wood mb-2">Khu vực phục vụ</h3>
                <p className="text-sm text-wood/60 leading-relaxed">
                  Chúng tôi phục vụ trọng tâm tại <span className="font-bold text-maroon">Thuận An, Bình Dương</span> và mở rộng ra toàn bộ TPHCM, Đồng Nai, Long An.
                </p>
              </div>
              <div className="border border-wood/10 p-6 rounded-sm">
                <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center text-maroon mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-wood mb-2">Thời gian giao hàng</h3>
                <p className="text-sm text-wood/60 leading-relaxed">
                  Sản phẩm may đo thường được giao sau <span className="font-bold text-wood">7 - 15 ngày</span> làm việc kể từ khi chốt đơn hàng và đặt cọc.
                </p>
              </div>
            </div>
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-wood">Biểu phí vận chuyển</h2>
              <div className="overflow-hidden rounded-sm border border-wood/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ivory text-wood uppercase tracking-widest text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4">Khu vực</th>
                      <th className="px-6 py-4">Phí vận chuyển</th>
                      <th className="px-6 py-4">Phí lắp đặt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-wood/10 text-wood/70">
                    <tr>
                      <td className="px-6 py-4 font-bold text-wood">Thuận An (Bình Dương)</td>
                      <td className="px-6 py-4 text-maroon font-bold">MIỄN PHÍ</td>
                      <td className="px-6 py-4 text-maroon font-bold">MIỄN PHÍ</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-wood">TPHCM & Lân cận</td>
                      <td className="px-6 py-4">Từ 200.000đ - 500.000đ</td>
                      <td className="px-6 py-4 text-maroon font-bold">MIỄN PHÍ</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-wood">Các tỉnh khác</td>
                      <td className="px-6 py-4">Theo cước xe tải thực tế</td>
                      <td className="px-6 py-4">Thỏa thuận</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-wood mb-4">Quy trình lắp đặt</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">01</div>
                  <p className="text-sm text-wood/70 pt-1">Nhân viên liên hệ hẹn giờ giao hàng trước 24h.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">02</div>
                  <p className="text-sm text-wood/70 pt-1">Đội ngũ thợ vận chuyển sản phẩm đến tận công trình.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">03</div>
                  <p className="text-sm text-wood/70 pt-1">Tiến hành lắp đặt, căn chỉnh kỹ thuật và vệ sinh sản phẩm.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-wood text-white flex items-center justify-center shrink-0 font-bold text-xs">04</div>
                  <p className="text-sm text-wood/70 pt-1">Khách hàng nghiệm thu và ký biên bản bàn giao.</p>
                </div>
              </div>
            </section>
            <div className="bg-ivory/50 p-6 rounded-sm flex items-center gap-4 border border-wood/5">
              <PackageCheck className="w-8 h-8 text-maroon shrink-0" />
              <p className="text-sm text-wood/60 italic">
                Lưu ý: Quý khách vui lòng kiểm tra kỹ sản phẩm ngay khi thợ hoàn tất lắp đặt. Mọi khiếu nại về trầy xước sau khi thợ rời đi sẽ khó được giải quyết.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
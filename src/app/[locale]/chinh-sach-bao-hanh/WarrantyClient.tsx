'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Wrench, CheckCircle2 } from 'lucide-react';

export default function WarrantyClient() {
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-sm shadow-sm border border-wood/5"
        >
          <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-8 border-b border-wood/10 pb-6">
            Chính sách bảo hành
          </h1>
          <div className="prose prose-wood max-w-none space-y-10">
            <section>
              <h2 className="text-xl font-bold text-maroon flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6" /> Cam kết chất lượng dài hạn
              </h2>
              <p className="text-wood/70 leading-relaxed">
                Happy Furniture tự tin vào chất lượng sản phẩm may đo trực tiếp từ xưởng. Chúng tôi cam kết đồng hành cùng khách hàng trong suốt quá trình sử dụng với chế độ bảo hành chuyên nghiệp.
              </p>
            </section>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-ivory/50 p-6 rounded-sm text-center">
                <Clock className="w-8 h-8 text-maroon mx-auto mb-4" />
                <h3 className="font-bold text-wood mb-2">12 Tháng</h3>
                <p className="text-[12px] text-wood/60 uppercase tracking-widest">Bảo hành kỹ thuật</p>
              </div>
              <div className="bg-ivory/50 p-6 rounded-sm text-center">
                <Wrench className="w-8 h-8 text-maroon mx-auto mb-4" />
                <h3 className="font-bold text-wood mb-2">24 Tháng</h3>
                <p className="text-[12px] text-wood/60 uppercase tracking-widest">Hỗ trợ bảo trì</p>
              </div>
              <div className="bg-ivory/50 p-6 rounded-sm text-center">
                <CheckCircle2 className="w-8 h-8 text-maroon mx-auto mb-4" />
                <h3 className="font-bold text-wood mb-2">48 Giờ</h3>
                <p className="text-[12px] text-wood/60 uppercase tracking-widest">Phản hồi xử lý</p>
              </div>
            </div>
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-wood">Phạm vi bảo hành</h2>
              <div className="space-y-4">
                <div className="p-4 border border-wood/10 rounded-sm">
                  <h4 className="font-bold text-wood mb-2">Được bảo hành miễn phí:</h4>
                  <ul className="text-sm text-wood/70 space-y-2 list-disc pl-5">
                    <li>Sản phẩm bị lỗi kỹ thuật do quá trình sản xuất hoặc lắp đặt.</li>
                    <li>Phụ kiện (bản lề, ray trượt, tay nắm) bị hỏng hóc trong điều kiện sử dụng bình thường.</li>
                    <li>Bề mặt gỗ bị bong tróc, cong vênh do lỗi vật liệu.</li>
                  </ul>
                </div>
                <div className="p-4 border border-wood/10 rounded-sm">
                  <h4 className="font-bold text-wood mb-2">Không thuộc phạm vi bảo hành:</h4>
                  <ul className="text-sm text-wood/70 space-y-2 list-disc pl-5">
                    <li>Sản phẩm bị hư hỏng do tác động ngoại lực, va đập mạnh.</li>
                    <li>Sản phẩm bị ngâm nước, ẩm mốc do môi trường sử dụng không đảm bảo.</li>
                    <li>Khách hàng tự ý tháo dỡ, di chuyển hoặc sửa chữa sản phẩm.</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="bg-ivory p-8 rounded-sm">
              <h4 className="font-bold text-wood mb-4 uppercase tracking-widest text-xs">Quy trình yêu cầu bảo hành:</h4>
              <ol className="text-sm text-wood/70 space-y-4 list-decimal pl-5">
                <li>Khách hàng chụp ảnh/video lỗi sản phẩm và gửi qua Zalo: <span className="font-bold text-maroon">0909.163.593</span>.</li>
                <li>Happy Furniture tiếp nhận thông tin và phản hồi phương án xử lý trong vòng 24h.</li>
                <li>Đội ngũ kỹ thuật đến tận nơi bảo trì/thay thế trong vòng 48h làm việc tại khu vực TPHCM.</li>
              </ol>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
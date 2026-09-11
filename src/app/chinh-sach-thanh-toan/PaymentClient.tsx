'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Wallet, Landmark, ShieldCheck } from 'lucide-react';

export default function PaymentClient() {
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-sm shadow-sm border border-wood/5"
        >
          <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-8 border-b border-wood/10 pb-6">
            Chính sách thanh toán
          </h1>
          <div className="prose prose-wood max-w-none space-y-10">
            <section>
              <h2 className="text-xl font-bold text-maroon flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6" /> Quy định Đặt cọc (Tạm ứng)
              </h2>
              <p className="text-wood/70 leading-relaxed mb-6">
                Tại Happy Furniture, chúng tôi áp dụng chính sách đặt cọc minh bạch nhằm đảm bảo quá trình sản xuất và thiết kế được diễn ra thuận lợi nhất.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-ivory/50 p-6 rounded-sm border border-wood/5">
                  <h3 className="font-bold text-wood mb-3 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-maroon" /> Sản phẩm lẻ
                  </h3>
                  <p className="text-sm text-wood/60">
                    Đối với các đơn hàng mua sản phẩm nội thất lẻ, khách hàng sẽ thanh toán cọc <span className="font-bold text-wood">20%</span> giá trị đơn hàng.
                  </p>
                </div>
                <div className="bg-ivory/50 p-6 rounded-sm border border-wood/5">
                  <h3 className="font-bold text-wood mb-3 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-maroon" /> Thiết kế thi công trọn gói
                  </h3>
                  <p className="text-sm text-wood/60">
                    Đối với hợp đồng dịch vụ thiết kế và thi công nội thất trọn gói, mức tạm ứng trước khi tiến hành dự án là <span className="font-bold text-wood">50%</span> tổng giá trị hợp đồng.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-wood mb-4">Các Phương thức thanh toán</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 border border-wood/10 rounded-sm">
                  <Landmark className="w-6 h-6 text-maroon shrink-0" />
                  <div>
                    <h4 className="font-bold text-wood">Chuyển khoản (Qua tư vấn viên)</h4>
                    <p className="text-sm text-wood/60">Quý khách vui lòng liên hệ tới Hotline, Zalo hoặc fanpage Facebook của Happy Furniture. Đội ngũ CSKH sẽ gửi thông tin tài khoản chính xác để bạn tiến hành chuyển khoản.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-wood/10 rounded-sm">
                  <Wallet className="w-6 h-6 text-maroon shrink-0" />
                  <div>
                    <h4 className="font-bold text-wood">Thanh toán tiền mặt</h4>
                    <p className="text-sm text-wood/60">Thanh toán trực tiếp bằng tiền mặt tại cửa hàng/showroom của chúng tôi. Nhân viên thu ngân sẽ xuất hóa đơn trực tiếp cho quý khách.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-wood/10 rounded-sm">
                  <CreditCard className="w-6 h-6 text-maroon shrink-0" />
                  <div>
                    <h4 className="font-bold text-wood">Thanh toán thẻ trực tuyến (Visa/Mastercard)</h4>
                    <p className="text-sm text-wood/60">Thanh toán tiện lợi, nhanh chóng qua cổng thanh toán kết nối trực tiếp trên website. Hỗ trợ đa dạng các loại thẻ tín dụng, thẻ ghi nợ quốc tế bảo mật cao.</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-maroon/5 p-8 rounded-sm border-l-4 border-maroon">
              <h4 className="font-bold text-maroon mb-2">Lưu ý chung:</h4>
              <ul className="text-sm text-wood/70 space-y-2 list-disc pl-5">
                <li>Phần giá trị còn lại của đơn hàng sẽ được thanh toán sau khi giao hàng hoặc nghiệm thu lắp đặt trực tiếp tại nhà.</li>
                <li>Mọi giao dịch sẽ có biên lai, xác nhận điện tử từ hệ thống Happy Furniture.</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
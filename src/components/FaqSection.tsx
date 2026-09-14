'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Dữ liệu FAQ chuẩn SEO & Giáo dục khách hàng
const faqs = [
  {
    question: "Xưởng sử dụng chất liệu nào để sản xuất Nội thất?",
    answer: "Happy Furniture cam kết 100% sử dụng ván gỗ MDF lõi xanh chống ẩm cao cấp từ các thương hiệu uy tín như Ba Thanh, An Cường. Bề mặt ván được phủ Melamine chống trầy xước, đạt tiêu chuẩn phát thải E2, tuyệt đối an toàn cho sức khỏe gia đình và bền bỉ trong môi trường khí hậu nhiệt đới."
  }, 
  {
    question: "Chất liệu Gỗ công nghiệp MDF lõi xanh có thật sự bền tốt không?",
    answer: "Rất bền bỉ nếu được gia công chuẩn xác. Ván MDF lõi xanh kết hợp cùng công nghệ dán cạnh nẹp kín tại xưởng giúp hạn chế tối đa hơi nước xâm nhập. Tuy nhiên, 'của bền tại người', tuổi thọ sản phẩm (thường đến tận 10 - 15 năm) còn phụ thuộc lớn vào việc sử dụng và bảo quản đúng cách, đặc biệt là giữ cho môi trường nhà cửa luôn thông thoáng, tránh ngâm nước trực tiếp."
  },
  {
    question: "Tại sao tôi thấy giá sản phẩm của xưởng cao hơn các tủ kệ bán trên mấy shop online khác?",
    answer: "Các sản phẩm nội thất giá rẻ trên sàn TMĐT đa số sử dụng ván dăm (MFC) mỏng chỉ 12mm - 15mm, ván loại 2 không chống ẩm, sử dụng keo dán thủ công nên rất dễ bong tróc, sập xệ chỉ sau vài tháng. Tại Happy Furniture, chúng tôi chuẩn hóa 100% sử dụng ván MDF lõi xanh chống ẩm chuẩn độ dày 17mm, phụ kiện bản lề giảm chấn inox cứng cáp. Giá trị bạn nhận được là sự an tâm tuyệt đối và độ bền hàng chục năm."
  },
  {
    question: "Tôi nên mua sản phẩm bán sẵn trên Website hay yêu cầu xưởng may đo theo kích thước riêng?",
    answer: "Nếu cần tối ưu ngân sách, các sản phẩm tiêu chuẩn trên website là lựa chọn tuyệt vời vì được sản xuất hàng loạt với mức giá cực kỳ tốt. Ngược lại, dịch vụ 'may đo' là giải pháp cao cấp dành riêng cho bạn. Dù chi phí cao hơn do đòi hỏi thiết kế 3D và gia công đơn lẻ, nhưng giá trị thẩm mỹ, tính cá nhân hóa và độ vừa vặn tuyệt đối với không gian là hoàn toàn xứng đáng."
  },
  {
    question: "Thời gian thiết kế và thi công hoàn thiện mất bao lâu?",
    answer: "Thông thường, quy trình sẽ kéo dài từ 14-21 ngày. Lên bản vẽ 3D mất khoảng 3-7 ngày tùy độ phức tạp, thời gian đặt ván 3-5 ngày, quá trình sản xuất tại xưởng mất 7-14 ngày tùy khối lượng hạng mục nội thất, giai đoạn vận chuyển và lắp đặt hoàn thiện tại công trình mất 3-7 ngày."
  },
  {
    question: "Chính sách bảo hành nội thất tại Happy Furniture như thế nào?",
    answer: "Chúng tôi áp dụng chính sách bảo hành 12 tháng cho toàn bộ sản phẩm gỗ và phụ kiện (bản lề, ray trượt...). Sau thời gian bảo hành, xưởng vẫn hỗ trợ bảo trì trọn đời với chi phí vật tư gốc, cam kết luôn đồng hành cùng không gian sống của bạn."
  },
  {
    question: "Chi phí thi công tại xưởng có phát sinh thêm không?",
    answer: "Khách hàng hoàn toàn yên tâm vì bảng báo giá sau khi chốt phương án thiết kế là Báo Giá Cuối Cùng. Chúng tôi cam kết KHÔNG phát sinh bất kỳ chi phí ẩn nào trong quá trình thi công. Đặc biệt, miễn phí lắp đặt cho khách hàng trong bán kính 10km quanh khu vực Thuận An, Bình Dương."
  }
];

export const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Mặc định mở câu đầu tiên

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // TẠO MÃ SCHEMA JSON-LD CHUẨN SEO CỦA GOOGLE
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    // Đã thay đổi py-24 thành pb-24 pt-8 md:pt-12 để thu hẹp khoảng cách với phần ở trên
    <section className="pb-24 pt-0 md:pt-12 bg-ivory">
      {/* 1. Nhúng mã Schema vô hình cho Googlebot đọc */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 2. Giao diện hiển thị cho người dùng */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-maroon mb-2">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[3px] font-bold">Giải đáp thắc mắc</span>
          </div>
          <h2 className="text-[32px] md:text-[45px] font-serif font-bold text-wood mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-wood/60 text-base">
            Tổng hợp những thông tin quan trọng nhất khách hàng thường quan tâm trước khi quyết định làm nội thất.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border transition-all duration-300 rounded-xl overflow-hidden ${
                  isActive ? 'border-maroon/30 shadow-md' : 'border-wood/10 shadow-sm hover:border-maroon/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <h3 className={`text-base md:text-lg font-bold leading-snug transition-colors ${isActive ? 'text-maroon' : 'text-wood'}`}>
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-ivory flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 bg-maroon text-white' : 'text-wood/50'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Khối nội dung có hiệu ứng mở ra/đóng lại mượt mà */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-wood/5">
                        <p className="text-wood/70 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
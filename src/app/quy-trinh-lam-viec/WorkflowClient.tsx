'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, Ruler, Lightbulb, Calculator, PenTool, FileCheck, Wallet, Factory, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WorkflowClient() {
  const steps = [
    { id: '01', title: 'Thấu hiểu', desc: 'Tiếp nhận yêu cầu, phân tích thói quen, nghề nghiệp và ngân sách dự kiến của gia chủ.', icon: Search, color: 'bg-blue-50 text-blue-600' },
    { id: '02', title: 'Khảo sát hiện trạng', desc: 'Đo đạc thực tế chính xác và phân tích luồng di chuyển, ánh sáng tại công trình.', icon: Ruler, color: 'bg-orange-50 text-orange-600' },
    { id: '03', title: 'Ý tưởng sơ phác', desc: 'Lên concept tổng quan và các giải pháp sơ bộ về mặt bằng công năng.', icon: Lightbulb, color: 'bg-yellow-50 text-yellow-600' },
    { id: '04', title: 'Báo giá sơ bộ', desc: 'Cung cấp dự toán ngân sách và điều chỉnh phương án cho phù hợp với chủ nhà.', icon: Calculator, color: 'bg-green-50 text-green-600' },
    { id: '05', title: 'Thiết kế 3D', desc: 'Đồng kiến tạo cùng gia chủ để chốt phương án 3D và bản vẽ kỹ thuật chi tiết.', icon: PenTool, color: 'bg-purple-50 text-purple-600' },
    { id: '06', title: 'Báo giá chi tiết', desc: 'Minh bạch, không phát sinh, chi tiết đến từng phụ kiện và vật liệu sử dụng.', icon: FileCheck, color: 'bg-cyan-50 text-cyan-600' },
    { id: '07', title: 'Đặt cọc sản xuất', desc: 'Tạm ứng 50% để xưởng đặt ván (Ba Thanh) và chuẩn bị nguyên vật liệu sản xuất.', icon: Wallet, color: 'bg-maroon/5 text-maroon' },
    { id: '08', title: 'Gia công tại xưởng', desc: 'Sản xuất trực tiếp tại xưởng Quận 12 trong 7 ngày với tiêu chuẩn kỹ thuật cao.', icon: Factory, color: 'bg-slate-50 text-slate-600' },
    { id: '09', title: 'Vận chuyển & Lắp đặt', desc: 'Giao hàng và thi công hoàn thiện tại công trình trong vòng 7 ngày tiếp theo.', icon: Truck, color: 'bg-indigo-50 text-indigo-600' },
    { id: '10', title: 'Bàn giao & Bảo hành', desc: 'Nghiệm thu, vệ sinh, thanh toán 50% còn lại và kích hoạt bảo hành 1 năm.', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Quy trình thiết kế và thi công nội thất trọn gói - Happy Furniture",
    "description": "Hướng dẫn chi tiết 10 bước từ khảo sát, thiết kế 3D đến gia công tại xưởng và lắp đặt hoàn thiện nội thất nhà ở.",
    "totalTime": "P20D", // Nghĩa là quy trình mất khoảng 20 ngày (Period 20 Days)
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.desc
    }))
  };

  return (
    <div className="bg-ivory min-h-screen py-20">

      {/* CHÈN MÃ SCHEMA VÔ HÌNH VÀO ĐÂY */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Quy trình chuyên nghiệp</h2>
          <h1 className="text-[32px] md:text-[50px] font-serif font-bold text-wood leading-tight">
            Đồng hành cùng Happy Furniture <br />
            <span className="italic text-maroon">Kiến tạo không gian sống</span>
          </h1>
          <p className="mt-6 text-wood/60 max-w-2xl mx-auto">
            Quy trình làm việc minh bạch, gãy gọn giúp khách hàng hoàn toàn an tâm về tiến độ và chất lượng sản phẩm.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-wood/10 -translate-x-1/2" />
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-20 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`bg-white p-8 rounded-2xl shadow-sm border border-wood/5 hover:border-maroon/20 transition-all group`}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${step.color}`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-wood mb-3">
                      <span className="text-maroon/20 mr-2 font-mono">{step.id}.</span>{step.title}
                    </h3>
                    <p className="text-wood/60 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-ivory border-4 border-white shadow-sm z-10 items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-maroon" />
                </div>
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 bg-wood p-10 md:p-16 rounded-3xl text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Factory className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8">Tóm tắt tiến độ & Cam kết</h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Tiến độ</h4>
                <p className="text-sm text-white/70">Tổng thời gian từ lúc chốt 3D đến khi bàn giao: <span className="text-white font-bold">14 - 20 ngày</span>.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Thiết kế</h4>
                <p className="text-sm text-white/70"><span className="text-white font-bold">Miễn phí 100% thiết kế 3D</span> khi khách hàng ký hợp đồng thi công trọn gói.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Bảo hành</h4>
                <p className="text-sm text-white/70">Bảo hành kỹ thuật <span className="text-white font-bold">12 tháng</span> và hỗ trợ bảo trì trọn đời sản phẩm.</p>
              </div>
            </div>
            <div className="mt-12">
              <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-maroon text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-maroon transition-all">
                Bắt đầu dự án ngay <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
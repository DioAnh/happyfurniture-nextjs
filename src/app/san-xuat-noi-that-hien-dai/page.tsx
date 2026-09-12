import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Maximize, LayoutTemplate, ArrowRight, PhoneCall } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'Nội Thất Không Gian Sống Hiện Đại | Tối Ưu Tiện Nghi',
  description: 'Sản xuất và thiết kế nội thất không gian sống hiện đại. Các giải pháp giúp tối ưu tiện nghi, phát huy tối đa công năng sử dụng cho căn hộ chung cư và nhà phố.',
  alternates: { canonical: '/san-xuat-noi-that-hien-dai' },
  keywords: ['nội thất không gian sống hiện đại', 'tối ưu tiện nghi', 'công năng nội thất', 'sản xuất nội thất hiện đại', 'thiết kế nội thất tối giản']
};

export default function NoiThatHienDaiPage() {
  return (
    <div className="bg-ivory min-h-screen text-wood">
      {/* Hero Section */}
      <section className="relative py-24 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
            alt="Thiết kế nội thất hiện đại tối giản" 
            aspectRatio="video"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-maroon px-4 py-2 rounded-full mb-6 shadow-md">
            <LayoutTemplate className="w-4 h-4 text-white" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">Phong cách thiết kế Minimalism & Modern</span>
          </div>
          <h1 className="text-[40px] md:text-[60px] font-serif font-bold mb-6 leading-tight">
            NỘI THẤT KHÔNG GIAN SỐNG <br/>
            <span className="text-white italic">HIỆN ĐẠI & TIỆN NGHI</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Chúng tôi tin rằng sự tinh gọn mang lại sự tĩnh lặng cho tâm hồn. Triết lý của Happy Furniture là loại bỏ các chi tiết rườm rà, nhường chỗ cho ánh sáng, <strong>tối ưu tiện nghi</strong> và đề cao <strong>công năng</strong> sử dụng thực tế nhất cho ngôi nhà của bạn.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-maroon text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-wood transition-all shadow-xl">
              Tư vấn thiết kế không gian
            </a>
            <a href="tel:0909163593" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-wood transition-all flex items-center gap-2">
              <PhoneCall className="w-4 h-4" /> 0909.163.593
            </a>
          </div>
        </div>
      </section>

      {/* Năng lực cốt lõi - Thiết kế */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Triết Lý Thiết Kế</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-6">
              Không gian sống là công cụ phục vụ con người
            </h3>
            <div className="w-20 h-1 bg-maroon mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Zap className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Tối ưu Công năng</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Một bản vẽ đẹp mà khó sử dụng là một bản vẽ thất bại. Mọi sản phẩm từ hệ tủ bếp, tủ quần áo đến giường ngủ đều được tính toán kỹ lưỡng về luồng di chuyển, đảm bảo <strong>công năng</strong> phục vụ hoàn hảo cho thói quen sinh hoạt.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <LayoutTemplate className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Đường nét Hiện đại</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Mang đậm dấu ấn của <strong>nội thất không gian sống hiện đại</strong> với thiết kế phẳng, tay nắm âm tủ, sử dụng các mảng khối màu sắc trung tính giúp không gian luôn có cảm giác sạch sẽ và rộng rãi.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Maximize className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Tối ưu Tiện nghi</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Giải pháp thông minh cho căn hộ vừa và nhỏ. Kết hợp phụ kiện thông minh, thiết kế kịch trần, triệt tiêu góc chết giúp <strong>tối ưu tiện nghi</strong> và tăng sức chứa lên đến 30% mà không gây ngột ngạt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action cuối trang */}
      <section className="py-24 bg-maroon text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[48px] font-serif font-bold mb-6">
            Làm mới không gian, nâng tầm cuộc sống
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Gửi cho chúng tôi mặt bằng căn hộ của bạn, đội ngũ Happy Furniture sẽ đưa ra giải pháp thiết kế hiện đại và tối ưu tiện nghi nhất.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-white text-maroon px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wood hover:text-white transition-all shadow-2xl">
              Gửi mặt bằng qua Zalo
            </a>
            <Link href="/du-an" className="border-2 border-white text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-maroon transition-all flex items-center gap-2">
              Xem dự án thực tế <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
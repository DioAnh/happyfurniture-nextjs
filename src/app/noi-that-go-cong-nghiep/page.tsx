import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Layers, Droplets, ArrowRight, PhoneCall } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'Nội Thất Gỗ Công Nghiệp Tối Ưu Tiện Nghi | Happy Furniture',
  description: 'Chuyên nội thất gỗ công nghiệp MDF lõi xanh. Kiến tạo nội thất không gian sống hiện đại, tối ưu tiện nghi và công năng sử dụng với mức giá xưởng tại TPHCM & Bình Dương.',
  alternates: { canonical: '/noi-that-go-cong-nghiep' },
  keywords: ['nội thất gỗ công nghiệp', 'nội thất không gian sống hiện đại', 'tối ưu tiện nghi', 'công năng', 'mdf lõi xanh chống ẩm', 'thi công nội thất gỗ mdf']
};

export default function GoCongNghiepPage() {
  return (
    <div className="bg-ivory min-h-screen text-wood">
      {/* Hero Section */}
      <section className="relative py-24 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <OptimizedImage 
            src="https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/main-pages/noi-that-phong-ngu-mdf-melamine-thuan-an-binh-duong.webp" 
            alt="Nội thất gỗ công nghiệp MDF lõi xanh" 
            aspectRatio="video"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-maroon px-4 py-2 rounded-full mb-6 shadow-md">
            <Layers className="w-4 h-4 text-white" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">Chuyên Gỗ Công Nghiệp Chất Lượng Cao</span>
          </div>
          <h1 className="text-[40px] md:text-[60px] font-serif font-bold mb-6 leading-tight">
            NỘI THẤT GỖ CÔNG NGHIỆP <br/>
            <span className="text-white italic">TỐI ƯU CÔNG NĂNG</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Sự kết hợp hoàn hảo giữa độ bền bỉ vượt thời gian và vẻ đẹp tinh tế. Happy Furniture chuyên ứng dụng ván gỗ MDF tiêu chuẩn cao để kiến tạo nên những bộ <strong>nội thất không gian sống hiện đại</strong>, <strong>tối ưu tiện nghi</strong> và phát huy tối đa <strong>công năng</strong> sử dụng cho gia đình bạn.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-maroon text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-wood transition-all shadow-xl">
              Nhận tư vấn vật liệu
            </a>
            <a href="tel:0909163593" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-wood transition-all flex items-center gap-2">
              <PhoneCall className="w-4 h-4" /> 0909.163.593
            </a>
          </div>
        </div>
      </section>

      {/* Năng lực cốt lõi - Vật liệu */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Tiêu Chuẩn Chất Lượng</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-6">
              Vật liệu nền tảng cho nội thất không gian sống hiện đại
            </h3>
            <div className="w-20 h-1 bg-maroon mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Thương hiệu uy tín</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Chỉ sử dụng phôi ván gỗ công nghiệp từ các nhà cung cấp uy tín hàng đầu thị trường như Ba Thanh, An Cường. Đảm bảo nguồn gốc xuất xứ rõ ràng và chất lượng đồng đều.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Droplets className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">100% Lõi xanh chống ẩm</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Tất cả sản phẩm đều sử dụng cốt ván MDF lõi xanh, kết hợp kỹ thuật dán cạnh kín khít giúp gia tăng tuổi thọ, giữ cho nội thất luôn bền đẹp và đảm bảo công năng lâu dài.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Layers className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">An toàn sức khỏe (Chuẩn E2)</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Bề mặt phủ Melamine, Laminate hoặc Acrylic kiểm soát chặt chẽ nồng độ phát thải Formaldehyde (đạt chuẩn E2, E1), mang lại một không gian sống hiện đại và an toàn cho cả trẻ nhỏ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action cuối trang */}
      <section className="py-24 bg-maroon text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[48px] font-serif font-bold mb-6">
            Bạn cần tư vấn chọn mã màu vân gỗ?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Chúng tôi có sẵn hàng trăm mã màu Melamine vân gỗ tự nhiên, màu trơn Pastel tinh tế. Phù hợp hoàn hảo để tối ưu tiện nghi cho tổ ấm của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-white text-maroon px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wood hover:text-white transition-all shadow-2xl">
              Nhận Catalogue Bảng Màu
            </a>
            <Link href="/vat-lieu" className="border-2 border-white text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-maroon transition-all flex items-center gap-2">
              Tìm hiểu thêm về vật liệu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
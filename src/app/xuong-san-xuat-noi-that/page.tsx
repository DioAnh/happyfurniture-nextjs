import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Factory, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'Xưởng Sản Xuất Nội Thất Hiện Đại tại TP.HCM | Happy Furniture',
  description: 'Tham quan xưởng sản xuất nội thất tại Quận 12, TPHCM. Chuyên gỗ công nghiệp MDF lõi xanh chống ẩm cho không gian sống hiện đại, tối ưu tiện nghi và công năng, tiết kiệm đến 30% chi phí.',
  alternates: { canonical: '/xuong-san-xuat-noi-that' },
  keywords: ['xưởng nội thất', 'xưởng sản xuất nội thất', 'xưởng mộc gỗ công nghiệp', 'nội thất giá xưởng bình dương tphcm']
};

export default function XuongSanXuatPage() {
  return (
    <div className="bg-ivory min-h-screen text-wood">
      {/* Hero Section */}
      <section className="relative py-24 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage 
            src="https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/team-images/xuong.webp" 
            alt="Xưởng sản xuất nội thất Happy Furniture" 
            aspectRatio="video"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-maroon px-4 py-2 rounded-full mb-6 shadow-md">
            <Factory className="w-4 h-4 text-white" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">Xưởng Sản Xuất Nội thất Trực Tiếp</span>
          </div>
          <h1 className="text-[40px] md:text-[60px] font-serif font-bold mb-6 leading-tight">
            XƯỞNG NỘI THẤT <br/>
            <span className="text-white italic">CHUYÊN SẢN XUẤT & THI CÔNG</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Loại bỏ chi phí trung gian, Xưởng tại Quận 12 của chúng tôi đảm nhiệm từ khâu Sản xuất, Thiết kế cho đến Thi công lắp đặt tại công trình với đội thợ mộc giàu kinh nghiệm nghề và team thiết kế kỹ thuật. Kiến tạo không gian sống hiện đại cho gia đình bạn tại Bình Dương và TP.HCM với mức giá tối ưu nhất.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-maroon text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-wood transition-all shadow-xl">
              Nhận báo giá gốc tại xưởng
            </a>
            <a href="tel:0909163593" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-wood transition-all flex items-center gap-2">
              <PhoneCall className="w-4 h-4" /> 0909.163.593
            </a>
          </div>
        </div>
      </section>

      {/* Năng lực cốt lõi */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Năng Lực Thực Tế</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-6">
              Vì sao quý khách hàng chọn xưởng thay vì đơn vị thiết kế thương mại?
            </h3>
            <div className="w-20 h-1 bg-maroon mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Factory className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Xưởng sản xuất Nội thất</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Trang bị đầy đủ hệ thống máy cắt ván gỗ công nghiệp, máy dán cạnh nẹp, đảm bảo độ chuẩn xác đến từng milimet cho mọi bản vẽ đáp ứng đa dạng nhu cầu của quý khách.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Vật liệu chuẩn chính hãng</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Cam kết sử dụng 100% cốt gỗ MDF lõi xanh chống ẩm tiêu chuẩn cao (vân gỗ Ba Thanh, An Cường), phủ Melamine chống trầy xước, đạt chuẩn E2 an toàn tuyệt đối cho sức khỏe gia đình.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Zap className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Tiết kiệm đến 30% chi phí</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Không tốn phí thuê mặt bằng showroom đắt đỏ ở trung tâm thành phố hay chi phí cho bản vẽ thiết kế, mọi khoản đầu tư của bạn đều dồn vào chất lượng ván gỗ và phụ kiện thông minh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình sản xuất khép kín */}
      <section className="py-24 bg-ivory border-t border-wood/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Quy Trình Khép Kín</h2>
              <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-6">
                Từ bản vẽ kỹ thuật đến sản phẩm thực tế tại xưởng
              </h3>
              <p className="text-wood/70 text-lg leading-relaxed mb-8">
                Mọi đường nét thiết kế trên phần mềm đều được quy chuẩn hóa với bản vẽ kỹ thuật chuẩn xác và tay nghề của những người thợ mộc trên 20 năm kinh nghiệm.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Bước 1: Khảo sát hiện trạng không gian thực tế tại công trình.",
                  "Bước 2: Lên bản vẽ 3D phối cảnh và bóc tách bản vẽ kỹ thuật 2D sản xuất.",
                  "Bước 3: Gia công cắt, chạy rãnh, dán cạnh tự động tại xưởng Quận 12.",
                  "Bước 4: Lắp ráp thử nghiệm tại xưởng trước khi vận chuyển.",
                  "Bước 5: Vận chuyển, lắp đặt tận nơi và nghiệm thu bàn giao bảo hành."
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-wood/5">
                    <CheckCircle22 className="w-5 h-5 text-maroon shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-wood">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[500px] w-full border-8 border-white">
                <OptimizedImage 
                  src="https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/team-images/xuong.webp" 
                  alt="Quy trình sản xuất tại xưởng Happy Furniture" 
                  aspectRatio="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action cuối trang */}
      <section className="py-24 bg-maroon text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[48px] font-serif font-bold mb-6">
            Bạn muốn tham quan xưởng sản xuất trực tiếp?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Chúng tôi luôn chào đón bạn đến kiểm chứng chất lượng ván gỗ, máy móc và quy trình làm việc thực tế tại xưởng Quận 12, TP.HCM.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="bg-white text-maroon px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wood hover:text-white transition-all shadow-2xl">
              Hẹn lịch thăm xưởng qua Zalo
            </a>
            <Link href="/san-pham" className="border-2 border-white text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-maroon transition-all flex items-center gap-2">
              Xem các sản phẩm mẫu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle22(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}
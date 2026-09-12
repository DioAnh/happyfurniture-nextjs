import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Factory, ArrowRight, PhoneCall, Camera } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'Xưởng Sản Xuất Nội Thất Hiện Đại tại TP.HCM | Happy Furniture',
  description: 'Tham quan hình ảnh thực tế xưởng sản xuất nội thất tại Quận 12, TPHCM. Chuyên gỗ công nghiệp MDF lõi xanh chống ẩm, tối ưu tiện nghi và công năng.',
  alternates: { canonical: '/xuong-san-xuat-noi-that' },
  keywords: ['xưởng nội thất', 'hình ảnh xưởng sản xuất', 'xưởng mộc gỗ công nghiệp', 'nội thất giá xưởng bình dương tphcm']
};

const workshopPhotos = [
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_001.webp', caption: 'XƯỞNG SẢN XUẤT TẠI QUẬN 12' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_002.webp', caption: 'GIA CÔNG CẮT VÁN' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_003.webp', caption: 'LẮP RÁP THỬ NGHIỆM MOCK-UP' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_004.webp', caption: 'DÁN CẠNH NẸP VÁN' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_005.webp', caption: 'ĐÓNG GÓI CHUẨN BỊ GIAO HÀNG' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_006.webp', caption: 'BÓC TÁCH BẢN VẼ SẢN XUẤT' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_007.webp', caption: 'ĐỘI NGŨ THỢ MỘC LÀNH NGHỀ' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_008.webp', caption: 'QUY TRÌNH KIỂM TRA CHẤT LƯỢNG' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_009.webp', caption: 'ĐẢM BẢO CHUẨN XÁC TỪNG MILIMET' }
];

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
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">Xưởng Sản Xuất Nội Thất Trực Tiếp</span>
          </div>
          <h1 className="text-[40px] md:text-[60px] font-serif font-bold mb-6 leading-tight">
            XƯỞNG NỘI THẤT <br/>
            <span className="text-white italic">CHUYÊN SẢN XUẤT & THI CÔNG</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Xưởng tại Quận 12 của chúng tôi đảm nhiệm từ khâu Sản xuất, Thiết kế cho đến Thi công lắp đặt tại công trình với đội thợ mộc giàu kinh nghiệm nghề. Kiến tạo nội thất không gian sống hiện đại, tối ưu tiện nghi và công năng cho gia đình bạn.
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

      {/* SECTION HÌNH ẢNH XƯỞNG THỰC TẾ (SLIDER VUÔNG VỨC) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-maroon mb-2">
              <Camera className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[3px] font-bold">Góc xưởng chân thực</span>
            </div>
            <h2 className="text-[32px] md:text-[42px] font-serif font-bold text-wood mb-4">
              Nhật Ký Sản Xuất Tại Xưởng
            </h2>
            <p className="text-wood/60 text-sm md:text-base">
              Bộ sưu tập hình chụp thực tế tại không gian làm việc mỗi ngày, minh chứng cho quy mô và tâm huyết trong từng sản phẩm bàn giao đến khách hàng. Kéo lướt để xem thêm.
            </p>
            <div className="w-20 h-1 bg-maroon mx-auto mt-6" />
          </div>

          <div className="-mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {workshopPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                >
                  <div className="group relative overflow-hidden bg-wood/5 aspect-[3/4]">
                    <OptimizedImage 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood/90 via-wood/20 to-transparent opacity-90 flex items-end p-6 md:p-8">
                      <p className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Năng lực cốt lõi */}
      <section className="py-24 bg-ivory border-t border-wood/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Năng Lực Thực Tế</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-6">
              Vì sao quý khách hàng chọn xưởng thay vì đơn vị thiết kế thương mại?
            </h3>
            <div className="w-20 h-1 bg-maroon mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Factory className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Xưởng sản xuất Nội thất</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Trang bị đầy đủ hệ thống máy cắt ván gỗ công nghiệp, máy dán cạnh nẹp, đảm bảo độ chuẩn xác đến từng milimet cho mọi bản vẽ đáp ứng đa dạng nhu cầu của quý khách.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Vật liệu chuẩn chính hãng</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Cam kết sử dụng 100% cốt gỗ MDF lõi xanh chống ẩm tiêu chuẩn cao (vân gỗ Ba Thanh, An Cường), phủ Melamine chống trầy xước, đạt chuẩn E2 an toàn tuyệt đối cho sức khỏe gia đình.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-wood/5 shadow-sm">
              <div className="w-14 h-14 bg-maroon text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Zap className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wood mb-3">Tối ưu chi phí đầu tư</h4>
              <p className="text-wood/70 text-sm leading-relaxed">
                Không tốn phí thuê mặt bằng showroom đắt đỏ ở trung tâm thành phố hay chi phí cho bản vẽ thiết kế, mọi khoản đầu tư của bạn đều dồn vào chất lượng ván gỗ và phụ kiện thông minh.
              </p>
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
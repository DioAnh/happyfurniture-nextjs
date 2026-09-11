import React from 'react';
import Link from 'next/link';
// Đã xóa Facebook và Instagram ra khỏi lucide-react
import { MapPin, Phone, MessageCircle, ArrowRight, ShieldCheck, Factory, Zap } from 'lucide-react';

// Khôi phục Icon Facebook bằng SVG chuẩn style của Lucide
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Khôi phục Icon Instagram bằng SVG chuẩn style của Lucide
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-wood text-ivory pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="flex flex-col items-start group">
                <h2 className="text-2xl font-extrabold tracking-tighter text-white group-hover:text-maroon transition-colors leading-none">HAPPY FURNITURE</h2>
                <p className="text-[11px] uppercase tracking-[3px] text-ivory/60 font-semibold mt-1">
                  Nội thất nhà làm - Trực tiếp từ xưởng
                </p>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-ivory/70">
              <span className="text-white font-bold block mb-2">Xưởng sản xuất 1000m2 tại Quận 12, TP.HCM.</span>
              Chuyên thiết kế và thi công nội thất may đo trọn gói tại <span className="text-white font-bold">TP.HCM, Bình Dương</span> và các khu vực lân cận (Đồng Nai, Tây Ninh & Long An).
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61585294213927#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-maroon transition-colors cursor-pointer">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-maroon transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: System */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">Hệ thống</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Factory className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">Xưởng sản xuất</p>
                  <p className="text-sm text-ivory/70">Thạnh Xuân 25, Quận 12, TPHCM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">Cửa hàng</p>
                  <p className="text-sm text-ivory/70">Thuận Giao, Thuận An, Bình Dương</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Commitments */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">Cam kết</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-white shrink-0" />
                <p className="text-sm text-ivory/70">Sản xuất trực tiếp - Không qua trung gian - Tiết kiệm đến 30% ngân sách.</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <p className="text-sm text-ivory/70">Vật liệu MDF lõi xanh chống ẩm cao cấp, bền bỉ theo thời gian.</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[4px] font-bold text-white border-b border-white/10 pb-4">Liên hệ</h3>
            <div className="space-y-4">
              <a href="tel:0909163593" className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-lg font-bold group-hover:text-white transition-colors">0909.163.593</span>
              </a>
              <div className="space-y-1">
                <p className="text-sm text-ivory/60 break-all">contact@happyfurniture.net</p>
              </div>
              <div className="grid gap-3">
                <a 
                  href="http://www.youtube.com/@HappyFurnitureAcademy" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-red-600 rounded-lg text-sm text-white hover:bg-red-700 transition-all font-bold"
                >
                  <span className="flex items-center gap-2">YouTube Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://zalo.me/0909163593" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-[#0068FF] text-white font-bold rounded-lg text-sm hover:bg-[#0055D4] transition-all"
                >
                  <span>Chat qua Zalo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://maps.app.goo.gl/wPNMErQWShXnE1iz5" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-[#34A853] text-white font-bold rounded-lg text-sm hover:bg-[#2b8a44] transition-all"
                  title="Happy Furniture - Thiết kế, Sản xuất Nội thất tại xưởng & Lắp đặt, Thi Công trọn gói tận nơi"
                >
                  <span>Xem Google Maps</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/happyfurniturevietnam/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold rounded-lg text-sm hover:opacity-90 transition-all"
                  title="Happy Furniture Instagram"
                >
                  <span className="flex items-center gap-2">Happy Furniture Instagram</span>
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[2px] text-ivory/40">
          <p>© 2026 Happy Furniture. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/chinh-sach-bao-hanh" className="hover:text-white transition-colors cursor-pointer">Chính sách bảo hành</Link>
            <Link href="/quy-trinh-lam-viec" className="hover:text-white transition-colors cursor-pointer">Quy trình làm việc</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
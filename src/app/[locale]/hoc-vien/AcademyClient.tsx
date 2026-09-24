'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, Target, ShieldCheck, Zap, ArrowRight, UserCheck } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

// Bổ sung icon CheckCircle2 để tránh lỗi như trước
const CheckCircle2Icon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

export default function AcademyClient() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1541888088034-75466dba6e81?q=80&w=2000&auto=format&fit=crop" 
            alt="Xưởng nội thất Happy Furniture" 
            aspectRatio="video"
            className="w-full h-full"
            priority={true}
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-maroon px-4 py-2 rounded-full mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">Happy Furniture Academy</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[40px] md:text-[60px] font-serif font-bold mb-6 leading-tight">
            HỌC VIỆN NỘI THẤT <br/><span className="text-white italic">THỰC CHIẾN</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/70 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Nếu bạn muốn vẽ những thứ bay bổng không thực tế, đây không phải nơi dành cho bạn. Nếu bạn muốn trở thành một người làm nghề thực thụ, biết cách biến gỗ và nhựa thành không gian sống tiện nghi, và được khách hàng săn đón vì sự tận tâm và thực tế — Chào mừng bạn đến với Happy Furniture Academy.
          </motion.p>
        </div>
      </section>

      {/* Video Thư viện */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-4">Thư Viện Kiến Thức Video</h2>
            <div className="w-20 h-1 bg-maroon mx-auto mb-6" />
            <p className="text-wood/70 max-w-2xl mx-auto">
              Nơi chia sẻ các kiến thức về nội thất, công trình, kỹ thuật phần mềm được đúc kết từ những Nhà thiết kế và kỹ sư của Happy Furniture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Cài đặt bảng thông số Render Vray Scketchup nhanh gọn", videoId: "EJHceP_45AU", youtubeLink: "https://youtu.be/EJHceP_45AU", tag: "Phần Mềm" },
              { title: "Dùng SketchUp & Enscape ra phối cảnh trong 30 phút", thumb: "https://images.unsplash.com/photo-1616489953149-1d4eeb5c8b73?q=80&w=800", tag: "Phần Mềm" },
              { title: "Khác biệt giữa keo PUR và cạnh dán tiêu chuẩn", thumb: "https://images.unsplash.com/photo-1622372736853-27eb92723049?q=80&w=800", tag: "Kỹ Thuật Thi Công" }
            ].map((video, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group relative">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-lg bg-wood">
                  {video.videoId ? (
                    <iframe className="w-full h-full absolute inset-0 z-10" src={`https://www.youtube.com/embed/${video.videoId}?rel=0`} title={video.title} frameBorder="0" allowFullScreen></iframe>
                  ) : (
                    <>
                      <OptimizedImage src={video.thumb!} alt={video.title} aspectRatio="video" className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-wood/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-16 h-16 text-white" />
                      </div>
                    </>
                  )}
                  {!video.videoId && (
                    <div className="absolute top-4 left-4 bg-maroon text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-20 pointer-events-none shadow-md">{video.tag}</div>
                  )}
                </div>
                
                {video.youtubeLink ? (
                  <a href={video.youtubeLink} target="_blank" rel="noreferrer" className="block">
                    <h3 className="font-bold text-wood text-lg mb-2 hover:text-maroon transition-colors">{video.title}</h3>
                    <p className="text-sm font-bold text-maroon flex items-center gap-2"><PlayCircle className="w-4 h-4" /> Xem trên Youtube</p>
                  </a>
                ) : (
                  <div>
                    <h3 className="font-bold text-wood text-lg mb-2">{video.title}</h3>
                    <p className="text-sm font-bold text-wood/50 flex items-center gap-2"><PlayCircle className="w-4 h-4" /> Video sắp ra mắt</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="http://www.youtube.com/@HappyFurnitureAcademy" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-transparent border-2 border-maroon text-maroon hover:bg-maroon hover:text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all">
              <PlayCircle className="w-4 h-4" /> Đăng ký kênh Youtube
            </a>
          </div>
        </div>
      </section>

      {/* Program Details: Philosophy */}
      <section className="py-24 bg-ivory border-t border-wood/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-4">Mô hình Apprenticeship</h2>
            <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-6">Học Thật - Làm Thật - Kết Quả Thật</h3>
            <p className="text-wood/70 text-lg leading-relaxed">Khác với các trung tâm đào tạo phần mềm đơn thuần, Học viện Happy Furniture tập trung vào: Thực chiến 100%, Tư duy Duy lý, và Am hiểu Vật liệu & Kỹ thuật.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Thực chiến 100%", desc: "Học viên tham gia trực tiếp vào luồng công việc của các dự án đang triển khai như chung cư BenHill.", icon: Target },
              { title: "Tư duy Duy lý", desc: "Đào tạo kỹ năng thiết kế ưu tiên công năng, tối ưu diện tích và giải quyết bài toán sinh hoạt thực tế.", icon: Zap },
              { title: "Am hiểu Kỹ thuật", desc: "Tiếp cận với công nghệ sản xuất hiện nay (Keo PUR, MDF chống ẩm E2) ngay tại xưởng.", icon: ShieldCheck }
            ].map((item, idx) => (
               <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-wood/5">
                 <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center text-maroon mb-6"><item.icon className="w-6 h-6" /></div>
                 <h4 className="text-lg font-bold text-wood mb-3">{item.title}</h4>
                 <p className="text-wood/70 leading-relaxed text-sm">{item.desc}</p>
               </div>
            ))}
          </div>

          <div className="bg-wood text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute -right-20 -top-20 opacity-5"><Zap className="w-96 h-96" /></div>
             <div className="relative z-10 max-w-4xl">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8">Tại Happy Furniture, chúng tôi đào tạo những người làm nghề có tư duy kinh doanh và kỹ năng thực tế:</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4"><ArrowRight className="w-6 h-6 text-maroon shrink-0 mt-1" /><div><strong className="block text-xl mb-1 text-ivory">1. Thiết kế là giải quyết vấn đề</strong><p className="text-white/70">Một bản vẽ đẹp mà chi phí trên trời hoặc không thể thi công là một bản vẽ thất bại.</p></div></li>
                  <li className="flex gap-4"><ArrowRight className="w-6 h-6 text-maroon shrink-0 mt-1" /><div><strong className="block text-xl mb-1 text-ivory">2. Thị trường là thước đo</strong><p className="text-white/70">Khách hàng trả tiền cho giải pháp giúp họ sống tốt hơn hoặc sinh lời cao hơn.</p></div></li>
                  <li className="flex gap-4"><ArrowRight className="w-6 h-6 text-maroon shrink-0 mt-1" /><div><strong className="block text-xl mb-1 text-ivory">3. Thiết kế gắn liền thực tế</strong><p className="text-white/70">Mọi đường nét trên SketchUp phải được đọc hiểu bằng ngôn ngữ của máy cắt CNC và bàn tay thợ mộc.</p></div></li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-serif font-bold text-wood mb-4">Chương Trình Đào Tạo Nghề Nội thất thực chiến</h2>
            <div className="w-20 h-1 bg-maroon mx-auto mb-6" />
            <p className="text-wood/70 leading-relaxed font-bold uppercase tracking-widest text-sm">Thời lượng: 6 Tháng</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-ivory p-8 md:p-10 rounded-2xl">
              <span className="text-maroon font-bold text-4xl opacity-20 block mb-4">01</span>
              <h3 className="text-xl font-bold text-wood mb-4 border-b border-wood/10 pb-4">Công cụ thiết kế</h3>
              <p className="text-wood/70 mb-6 text-sm">Thay vì học dàn trải, chúng tôi tập trung dạy bạn tư duy vẽ để phục vụ thi công.</p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-wood/80"><CheckCircle2Icon className="w-5 h-5 text-maroon shrink-0" /> Dựng hệ tủ kịch trần từ số liệu thực.</li>
                <li className="flex gap-3 text-sm text-wood/80"><CheckCircle2Icon className="w-5 h-5 text-maroon shrink-0" /> Render nhanh Enscape chốt phương án.</li>
                <li className="flex gap-3 text-sm text-wood/80"><CheckCircle2Icon className="w-5 h-5 text-maroon shrink-0" /> Thực hành đo và dựng hình tại công trình.</li>
              </ul>
            </div>

            <div className="bg-wood text-white p-8 md:p-10 rounded-2xl">
              <span className="text-white font-bold text-4xl opacity-20 block mb-4">02</span>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-white/20 pb-4">Vật liệu & Kỹ thuật</h3>
              <p className="text-white/70 mb-6 text-sm">Học viên xuống xưởng trực tiếp để kiểm chứng các vật liệu thi công.</p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-white/90"><CheckCircle2Icon className="w-5 h-5 text-ivory shrink-0" /> Trực tiếp cầm MDF lõi xanh kiểm chứng.</li>
                <li className="flex gap-3 text-sm text-white/90"><CheckCircle2Icon className="w-5 h-5 text-ivory shrink-0" /> Đánh giá chất lượng đường keo máy dán cạnh.</li>
                <li className="flex gap-3 text-sm text-white/90"><CheckCircle2Icon className="w-5 h-5 text-ivory shrink-0" /> Lắp ráp module hệ tủ bếp.</li>
              </ul>
            </div>

            <div className="bg-ivory p-8 md:p-10 rounded-2xl">
              <span className="text-maroon font-bold text-4xl opacity-20 block mb-4">03</span>
              <h3 className="text-xl font-bold text-wood mb-4 border-b border-wood/10 pb-4">Quy trình chuyên nghiệp</h3>
              <p className="text-wood/70 mb-6 text-sm">Trở thành một phần của bộ máy thiết kế - thi công tiêu chuẩn.</p>
              <ul className="space-y-3 text-sm text-wood/80">
                <li><strong>1. Khảo sát:</strong> Đánh giá không gian hiện trạng.</li>
                <li><strong>2. Thiết kế:</strong> Phát triển phương án tối ưu.</li>
                <li><strong>3. Thuyết trình:</strong> Bảo vệ phương án kỹ thuật.</li>
                <li><strong>4. Giám sát:</strong> Theo sát quá trình thi công.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cam Kết & Thông Tin */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
           <div>
              <h2 className="text-3xl font-serif font-bold text-wood mb-8">4. CAM KẾT ĐẦU RA</h2>
              <p className="text-wood/70 mb-6 font-medium italic border-l-4 border-maroon pl-4">Chúng tôi đào tạo bạn trở thành những nhân tố cốt lõi, có năng lực thực thụ.</p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-maroon/10 rounded-full flex justify-center items-center shrink-0"><Target className="w-5 h-5 text-maroon" /></div>
                  <div>
                    <strong className="block text-wood mb-1">Kinh nghiệm thực tế</strong>
                    <p className="text-wood/60 text-sm">6 tháng học rút ngắn thời gian tương đương 2 năm đi làm bên ngoài.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-maroon/10 rounded-full flex justify-center items-center shrink-0"><ShieldCheck className="w-5 h-5 text-maroon" /></div>
                  <div>
                    <strong className="block text-wood mb-1">Sản phẩm thực</strong>
                    <p className="text-wood/60 text-sm">Một Portfolio gồm các công trình thi công thực tế.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-maroon/10 rounded-full flex justify-center items-center shrink-0"><UserCheck className="w-5 h-5 text-maroon" /></div>
                  <div>
                    <strong className="block text-wood mb-1">Cơ hội nghề nghiệp</strong>
                    <p className="text-wood/60 text-sm">Trở thành nhân lực nòng cốt của Happy Furniture sau 6 tháng.</p>
                  </div>
                </li>
              </ul>
           </div>

           <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-t-4 border-maroon">
              <h2 className="text-3xl font-serif font-bold text-wood mb-8">THÔNG TIN KHÓA HỌC</h2>
              <div className="space-y-6 mb-10">
                 <div>
                   <strong className="text-wood/50 uppercase tracking-widest text-[11px]">Đối tượng phù hợp</strong>
                   <p className="text-wood font-medium">18 – 25 tuổi, đam mê nội thất, tư duy cầu tiến.</p>
                 </div>
                 <div>
                   <strong className="text-wood/50 uppercase tracking-widest text-[11px]">Địa điểm thực chiến</strong>
                   <ul className="text-wood font-medium list-disc list-inside mt-2 space-y-1">
                     <li><strong>Lý thuyết:</strong> Showroom Thuận An, Bình Dương</li>
                     <li><strong>Sản xuất:</strong> Xưởng Quận 12, TP.HCM</li>
                     <li><strong>Công trình:</strong> Dự án tại Bình Dương & lân cận</li>
                   </ul>
                 </div>
                 <div className="p-4 bg-maroon/5 rounded-xl border border-maroon/10">
                   <strong className="text-maroon uppercase tracking-widest text-xs block mb-1">Học phí gốc</strong>
                   <p className="text-2xl font-bold text-wood">25.000.000 VNĐ <span className="text-sm font-normal text-wood/60">/ khóa 6 tháng</span></p>
                 </div>
              </div>
              <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="w-full bg-maroon text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wood transition-all flex justify-center shadow-lg">
                Đăng ký tư vấn ngay
              </a>
           </div>
        </div>
      </section>
    </div>
  );
}
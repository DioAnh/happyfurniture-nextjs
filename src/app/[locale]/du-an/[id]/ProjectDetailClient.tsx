'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, MapPin, Calendar, Maximize, Tag, ArrowLeft, Quote, CheckCircle2 } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function ProjectDetailClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Giả lập lấy data như code cũ của bạn
    const isBenHill = projectId.includes('benhill');
    setProject({
      id: projectId,
      title: isBenHill ? 'Chung cư BenHill Thuận An - Căn hộ 01 (Japandi Style)' : 'Dự án Nội thất Hiện đại',
      category: isBenHill ? 'Căn hộ chung cư' : 'Nhà phố',
      location: isBenHill ? 'Thuận An, Bình Dương' : 'Bình Dương',
      thumbnail: `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200`,
      year: '2023',
      area: '65m2',
      description: 'Dự án thiết kế và thi công trọn gói cho gia đình trẻ tại Thuận An.',
      concept: 'Phong cách Japandi - Sự kết hợp tinh tế giữa nét mộc mạc của Nhật Bản và sự hiện đại của Bắc Âu.',
      story: 'Chủ đầu tư là một cặp vợ chồng trẻ mong muốn có một tổ ấm vừa là nơi nghỉ ngơi sau giờ làm việc, vừa là không gian sáng tạo.',
      images: [
        `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200`,
        `https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200`,
        `https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200`
      ],
      features: ['Gỗ MDF lõi xanh chống ẩm', 'Hệ tủ kịch trần tối ưu lưu trữ', 'Sofa may đo theo kích thước phòng']
    });
  }, [projectId]);

  if (!project) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-wood/40">
          <Link href="/" className="hover:text-maroon">Trang chủ</Link> <ChevronRight className="w-3 h-3" />
          <Link href="/du-an" className="hover:text-maroon">Công trình thực tế</Link> <ChevronRight className="w-3 h-3" />
          <span className="text-wood/80 font-bold">{project.title}</span>
        </div>
      </div>

      {/* Copy phần thân HTML từ dòng <section className="max-w-7xl mx-auto px-6 mb-20"> trong code cũ vào đây, thay `Link to` bằng `Link href` */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h1 className="text-[36px] md:text-[52px] font-serif font-bold text-wood leading-tight mb-8">{project.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-wood/10">
           <div className="space-y-1">
             <div className="flex items-center gap-2 text-wood/40"><MapPin className="w-3 h-3" /><span className="text-[10px] uppercase tracking-widest font-bold">Vị trí</span></div>
             <p className="font-bold text-wood text-sm">{project.location}</p>
           </div>
           <div className="space-y-1">
             <div className="flex items-center gap-2 text-wood/40"><Maximize className="w-3 h-3" /><span className="text-[10px] uppercase tracking-widest font-bold">Diện tích</span></div>
             <p className="font-bold text-wood text-sm">{project.area}</p>
           </div>
           <div className="space-y-1">
             <div className="flex items-center gap-2 text-wood/40"><Calendar className="w-3 h-3" /><span className="text-[10px] uppercase tracking-widest font-bold">Năm hoàn thiện</span></div>
             <p className="font-bold text-wood text-sm">{project.year}</p>
           </div>
           <div className="space-y-1">
             <div className="flex items-center gap-2 text-wood/40"><Tag className="w-3 h-3" /><span className="text-[10px] uppercase tracking-widest font-bold">Hạng mục</span></div>
             <p className="font-bold text-wood text-sm">{project.category}</p>
           </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-[16/9] rounded-sm overflow-hidden bg-white border border-wood/5 mb-4">
           <OptimizedImage src={project.images?.[activeImage] || project.thumbnail} alt="Ảnh dự án" aspectRatio="video" className="w-full h-full" priority={true}/>
         </motion.div>
         <div className="grid grid-cols-5 gap-4">
           {project.images?.map((img: string, index: number) => (
             <button key={index} onClick={() => setActiveImage(index)} className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${activeImage === index ? 'border-maroon' : 'border-transparent hover:border-maroon/30'}`}>
               <OptimizedImage src={img} alt={`Thumbnail ${index}`} aspectRatio="square" className="w-full h-full" />
             </button>
           ))}
         </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
         <div className="grid lg:grid-cols-3 gap-20">
           <div className="lg:col-span-2 space-y-16">
             <div><h2 className="text-2xl font-serif font-bold text-wood mb-6 flex items-center gap-4"><span className="w-12 h-[1px] bg-maroon" /> Concept Thiết kế</h2><p className="text-wood/70 leading-relaxed text-lg">{project.concept}</p></div>
             <div><h2 className="text-2xl font-serif font-bold text-wood mb-6 flex items-center gap-4"><span className="w-12 h-[1px] bg-maroon" /> Câu chuyện thiết kế</h2><p className="text-wood/70 leading-relaxed text-lg">{project.story}</p></div>
           </div>
           <aside className="space-y-12">
             <div className="sticky top-32">
                <Link href="/du-an" className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-wood/40 hover:text-maroon transition-colors"><ArrowLeft className="w-4 h-4" /> Quay lại danh sách dự án</Link>
             </div>
           </aside>
         </div>
      </section>
    </div>
  );
}
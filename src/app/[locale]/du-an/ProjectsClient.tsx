'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, Download } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

const DUMMY_PROJECTS = [
  { id: 'benhill-thuan-an-01', title: 'Chung cư BenHill Thuận An - Căn hộ 01 (Japandi)', category: 'Căn hộ chung cư', location: 'Thuận An, Bình Dương', thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200', description: 'Thiết kế tối ưu cho căn hộ 2 phòng ngủ.', year: '2023', area: '65m2' },
  { id: 'benhill-thuan-an-02', title: 'Chung cư BenHill Thuận An - Căn hộ 05 (Minimalist)', category: 'Căn hộ chung cư', location: 'Thuận An, Bình Dương', thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200', description: 'Giải pháp nội thất may đo hoàn hảo.', year: '2023', area: '72m2' },
  { id: 'townhouse-lai-thieu', title: 'Nhà phố Lái Thiêu - Tân cổ điển nhẹ nhàng', category: 'Nhà phố', location: 'Lái Thiêu, Thuận An', thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200', description: 'Sự kết hợp hoàn hảo giữa đường nét cổ điển và vật liệu hiện đại.', year: '2023', area: '120m2' },
  { id: 'rental-roi-thuan-an', title: 'Nội thất cho thuê - Căn hộ Astral City', category: 'Nội thất cho thuê', location: 'Astral City, Thuận An', thumbnail: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1200', description: 'Gói nội thất tối ưu chi phí, độ bền cao.', year: '2024', area: '55m2' },
];

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [projects, setProjects] = useState<any[]>([]);
  const categories = ['Tất cả', 'Căn hộ chung cư', 'Nhà phố', 'Nội thất cho thuê'];

  useEffect(() => { setProjects(DUMMY_PROJECTS); }, []);

  const filteredProjects = selectedCategory === 'Tất cả' ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-ivory min-h-screen">
      <section className="bg-maroon py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Khám phá trọn bộ sưu tập nội thất mới nhất</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-12 text-lg">Tải ngay Catalogue để cập nhật các xu hướng thiết kế và báo giá chi tiết từ xưởng Happy Furniture.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#" className="w-full sm:w-auto bg-white text-maroon px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-wood hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"><Download className="w-4 h-4" /> Tải Catalogue Sản Phẩm Lẻ</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h1 className="text-[42px] md:text-[56px] font-serif font-bold text-wood leading-tight mb-6">Công trình thực tế</h1>
              <p className="text-wood/60 text-lg leading-relaxed">Hơn 200+ công trình nhà phố & căn hộ chung cư đã hoàn thiện tại Bình Dương & TPHCM.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-maroon border-maroon text-white shadow-lg shadow-maroon/20' : 'bg-white border-wood/10 text-wood/60 hover:border-maroon hover:text-maroon'}`}>{cat}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div layout key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <Link href={`/du-an/${project.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-white border border-wood/5 mb-6">
                      <OptimizedImage src={project.thumbnail} alt={project.title} aspectRatio="square" className="w-full h-full transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-wood/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8">
                        <div className="w-full bg-white text-wood py-5 rounded-full font-bold uppercase tracking-widest text-[11px] text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">Xem chi tiết công trình</div>
                      </div>
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-maroon shadow-sm">{project.category}</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-wood/40"><MapPin className="w-3 h-3" /><span className="text-[10px] uppercase tracking-widest font-bold">{project.location}</span></div>
                      <h3 className="text-xl font-serif font-bold text-wood group-hover:text-maroon transition-colors leading-tight">{project.title}</h3>
                      <p className="text-sm text-wood/60 line-clamp-2 leading-relaxed">{project.description}</p>
                      <div className="pt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-maroon group-hover:gap-4 transition-all">Khám phá dự án <ArrowRight className="w-4 h-4" /></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
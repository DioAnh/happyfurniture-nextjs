'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/routing';
import { motion } from 'motion/react';
import {
  ChevronRight,
  ShieldCheck,
  Factory,
  Layers,
  Truck,
  Ruler,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { QuickLeadCTA } from '@/components/QuickLeadCTA';
import { useTranslations } from 'next-intl';

interface CategoryProduct {
  id: string;
  group_id?: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  old_price?: number | null;
  size?: string | null;
  dimensions?: string | null;
  material_code?: string | null;
  images?: string[] | null;
}

interface CategoryClientProps {
  categorySlug: string;
  typeCode: string;
  displayTitle: string;
  initialProducts: CategoryProduct[];
}

export default function CategoryClient({
  displayTitle,
  initialProducts
}: CategoryClientProps) {
  const t = useTranslations('CategoryPage');
  const tProd = useTranslations('ProductsPage');

  // States cho Filter & Sort
  const [selectedSurface, setSelectedSurface] = useState<'all' | 'wood' | 'solid'>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [onlyDiscount, setOnlyDiscount] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  const ITEMS_PER_PAGE = 16;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Tự động trích xuất các Size thực tế đang có trong danh mục này (VD: S, M, L)
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.size && p.size.trim() !== '') {
        sizes.add(p.size.trim().toUpperCase());
      }
    });
    return Array.from(sizes);
  }, [initialProducts]);

  // Lọc & sắp xếp sản phẩm
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = initialProducts.filter((product) => {
      // 1. Lọc theo bề mặt (Vân gỗ BT* vs Đơn sắc)
      if (selectedSurface !== 'all') {
        const isWood = (product.material_code || '').toUpperCase().startsWith('BT');
        if (selectedSurface === 'wood' && !isWood) return false;
        if (selectedSurface === 'solid' && isWood) return false;
      }

      // 2. Lọc theo Size
      if (selectedSize !== 'all') {
        if ((product.size || '').toUpperCase() !== selectedSize) return false;
      }

      // 3. Lọc theo Khoảng giá
      if (selectedPrice !== 'all') {
        const p = product.price || 0;
        if (selectedPrice === 'under3' && p >= 3000000) return false;
        if (selectedPrice === 'under5' && p >= 5000000) return false;
        if (selectedPrice === 'under9' && p >= 9000000) return false;
        if (selectedPrice === 'over9' && p < 9000000) return false;
      }

      // 4. Lọc theo Đang giảm giá
      if (onlyDiscount) {
        if (!product.old_price || product.old_price <= product.price) return false;
      }

      return true;
    });

    if (sortBy === 'priceAsc') {
      return [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sortBy === 'priceDesc') {
      return [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return filtered;
  }, [initialProducts, selectedSurface, selectedSize, selectedPrice, onlyDiscount, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);

  const hasActiveFilter =
    selectedSurface !== 'all' ||
    selectedSize !== 'all' ||
    selectedPrice !== 'all' ||
    onlyDiscount ||
    sortBy !== 'default';

  const resetFilters = () => {
    setSelectedSurface('all');
    setSelectedSize('all');
    setSelectedPrice('all');
    setOnlyDiscount(false);
    setSortBy('default');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const heroImage =
    initialProducts.find((p) => p.images && p.images.length > 0)?.images?.[0] ||
    'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/tu-quan-ao-mdf-aura-vua-roomshot-01.webp';

  const trustBadges = [
    { icon: Layers, title: t('trust1Title'), desc: t('trust1Desc') },
    { icon: ShieldCheck, title: t('trust2Title'), desc: t('trust2Desc') },
    { icon: Factory, title: t('trust3Title'), desc: t('trust3Desc') },
    { icon: Truck, title: t('trust4Title'), desc: t('trust4Desc') }
  ];

  return (
    <div className="bg-white min-h-screen text-wood">
      {/* 1. EDITORIAL HEADER TRÊN NỀN TRẮNG (KHÔNG ĐÓNG HỘP, ẢNH VUÔNG 1:1 KHÔNG BỊ CẮT) */}
      <section className="pt-8 pb-12 border-b border-wood/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-wood/40 mb-6">
            <Link className="hover:text-maroon transition-colors" href="/">
              {tProd('breadcrumbHome')}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link className="hover:text-maroon transition-colors" href="/san-pham">
              {tProd('breadcrumbCat')}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-maroon font-bold">{displayTitle}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Cột trái: Tiêu đề + Mô tả ngắn gọn + 4 Trust Badges uy tín */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon/5 text-maroon text-[10px] font-bold uppercase tracking-[0.2em]">
                <span>{t('factoryPriceBadge')}</span>
              </div>

              <h1 className="text-[32px] md:text-[46px] font-serif font-bold text-wood leading-[1.15] tracking-tight">
                {t('h1Title', { name: displayTitle })}
              </h1>

              <p
                className="text-wood/70 leading-relaxed text-[15px] md:text-base max-w-2xl"
                dangerouslySetInnerHTML={{ __html: t.raw('p1Html').replace('{name}', displayTitle) }}
              />

              {/* 4 Huy hiệu bảo chứng chất lượng thay cho Wall of Text */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-wood/10">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-ivory flex items-center justify-center text-maroon">
                      <badge.icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-wood leading-snug">{badge.title}</h4>
                    <p className="text-[11px] text-wood/55 leading-relaxed">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Ảnh đại diện chuẩn khổ vuông 1:1, dùng !object-contain không bao giờ cắt sản phẩm */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[380px] aspect-square relative">
                <OptimizedImage
                  src={heroImage}
                  alt={displayTitle}
                  tier="detail"
                  aspectRatio="square"
                  imgClassName="!object-contain p-2 mix-blend-multiply"
                  className="w-full h-full"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THANH BỘ LỌC NHANH (FILTER BAR) & SẮP XẾP */}
      <section className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-wood/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Nhóm Filter Pills bên trái */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-wood/50 mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-maroon" />
              <span>{tProd('filterLabel')}:</span>
            </div>

            {/* Filter Bề mặt: Tất cả / Vân gỗ / Đơn sắc */}
            <div className="inline-flex rounded-full bg-ivory p-1 border border-wood/10">
              {(['all', 'wood', 'solid'] as const).map((surf) => (
                <button
                  key={surf}
                  type="button"
                  onClick={() => {
                    setSelectedSurface(surf);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedSurface === surf
                      ? 'bg-wood text-white shadow-sm'
                      : 'text-wood/60 hover:text-wood'
                  }`}
                >
                  {surf === 'all'
                    ? tProd('all')
                    : surf === 'wood'
                    ? tProd('surfaces.wood')
                    : tProd('surfaces.solid')}
                </button>
              ))}
            </div>

            {/* Filter Kích thước (Size S, M, L nếu có) */}
            {availableSizes.length > 1 && (
              <select
                value={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="px-3.5 py-2 rounded-full text-xs font-semibold bg-ivory border border-wood/10 text-wood focus:border-maroon focus:outline-none cursor-pointer"
              >
                <option value="all">{t('allSizes')}</option>
                {availableSizes.map((sz) => (
                  <option key={sz} value={sz}>
                    Size {sz}
                  </option>
                ))}
              </select>
            )}

            {/* Filter Khoảng giá */}
            <select
              value={selectedPrice}
              onChange={(e) => {
                setSelectedPrice(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-ivory border border-wood/10 text-wood focus:border-maroon focus:outline-none cursor-pointer"
            >
              <option value="all">{tProd('filterPrice')}: {tProd('all')}</option>
              <option value="under3">{tProd('prices.under3')}</option>
              <option value="under5">{tProd('prices.under5')}</option>
              <option value="under9">{tProd('prices.under9')}</option>
              <option value="over9">{t('over9M')}</option>
            </select>

            {/* Nút lọc Đang giảm giá */}
            <button
              type="button"
              onClick={() => {
                setOnlyDiscount((prev) => !prev);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                onlyDiscount
                  ? 'bg-maroon text-white border-maroon'
                  : 'bg-white text-wood/70 border-wood/15 hover:border-maroon/40'
              }`}
            >
              {tProd('onSale')}
            </button>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-maroon hover:text-wood px-2 py-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{tProd('clearFilter')}</span>
              </button>
            )}
          </div>

          {/* Nhóm Đếm số lượng & Sort bên phải */}
          <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-wood/5">
            <span className="text-xs font-semibold text-wood/50">
              {t('productListTitle', { count: filteredAndSortedProducts.length })}
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-wood/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'priceAsc' | 'priceDesc')}
                className="border border-wood/15 rounded-full px-3.5 py-1.5 text-xs bg-white outline-none focus:border-maroon font-semibold text-wood cursor-pointer"
              >
                <option value="default">{t('sortDefault')}</option>
                <option value="priceAsc">{t('sortAsc')}</option>
                <option value="priceDesc">{t('sortDesc')}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LƯỚI SẢN PHẨM NỔI TRÊN NỀN TRẮNG (FRAMELESS + HIỂN THỊ KÍCH THƯỚC RÕ RÀNG) */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-ivory/40 rounded-2xl border border-wood/5">
            <p className="text-base text-wood/60 mb-4">{tProd('emptyState')}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-maroon font-bold text-xs uppercase tracking-widest underline underline-offset-4 cursor-pointer"
            >
              {tProd('clearFilterAll')}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {displayedProducts.map((product) => {
                const discountPercent =
                  product.old_price && product.old_price > product.price
                    ? Math.round((1 - product.price / product.old_price) * 100)
                    : null;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group flex flex-col"
                  >
                    <Link href={`/san-pham/${product.slug}`} className="flex flex-col h-full">
                      {/* Ảnh sản phẩm Frameless trên nền trắng */}
                      <div className="relative aspect-square w-full mb-5 overflow-hidden bg-white">
                        {discountPercent && (
                          <span className="absolute top-3 left-3 z-10 bg-maroon text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            -{discountPercent}%
                          </span>
                        )}

                        {product.material_code && (
                          <span className="absolute top-3 right-3 z-10 bg-ivory/90 backdrop-blur-sm text-wood/70 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-wood/10">
                            {product.material_code}
                          </span>
                        )}

                        <OptimizedImage
                          src={
                            product.images?.[0] ||
                            'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/tu-quan-ao-mdf-aura-vua-roomshot-01.webp'
                          }
                          alt={product.name}
                          tier="card"
                          aspectRatio="square"
                          imgClassName="!object-contain p-2 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                          className="w-full h-full"
                        />

                        {product.images?.[1] && (
                          <OptimizedImage
                            src={product.images[1]}
                            alt={`${product.name} roomshot`}
                            tier="card"
                            aspectRatio="square"
                            imgClassName="object-cover"
                            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        )}
                      </div>

                      {/* Thông tin sản phẩm + Kích thước bên ngoài */}
                      <div className="flex flex-col flex-1 px-1">
                        {/* Dòng thông số Kích thước (Size & Dimensions) */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-wood/55 mb-2">
                          {product.size && (
                            <span className="font-bold text-wood/80 bg-ivory px-2 py-0.5 rounded">
                              Size {product.size}
                            </span>
                          )}
                          {product.dimensions && (
                            <span className="inline-flex items-center gap-1 font-medium text-wood/60">
                              <Ruler className="w-3 h-3 text-maroon/70 shrink-0" />
                              {product.dimensions} mm
                            </span>
                          )}
                        </div>

                        {/* Tên sản phẩm */}
                        <h3 className="text-[15px] md:text-[17px] font-serif text-wood font-medium leading-snug mb-3 group-hover:text-maroon transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Giá bán */}
                        <div className="mt-auto pt-2 border-t border-wood/5 flex items-baseline gap-2.5">
                          <span className="text-[15px] md:text-[16px] font-bold text-maroon">
                            {formatPrice(product.price)}
                          </span>
                          {product.old_price && product.old_price > product.price && (
                            <span className="text-xs text-wood/40 line-through">
                              {formatPrice(product.old_price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Nút Xem thêm */}
            {visibleCount < filteredAndSortedProducts.length && (
              <div className="mt-16 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 bg-white border-2 border-wood text-wood px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wood hover:text-white transition-all cursor-pointer"
                >
                  {tProd('loadMore')}
                </button>
                <p className="text-wood/40 text-xs mt-3">
                  {tProd('showing')} {displayedProducts.length} {tProd('of')} {filteredAndSortedProducts.length}{' '}
                  {tProd('designs')}
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* 4. QUICK LEAD CTA CUỐI TRANG */}
      <QuickLeadCTA />
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, Search, X, ChevronDown, Phone, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OptimizedImage } from './OptimizedImage';

const menuItems = [
  {
    title: 'Sản phẩm lẻ',
    path: '/san-pham',
    isMegaMenu: true,
    dropdown: [
      { label: 'Kệ sách trang trí', path: '/san-pham?type=Shelf' },
      { label: 'Tủ đựng đồ Đa năng', path: '/san-pham?type=Storage+Cabinet' },
      { label: 'Tủ giày', path: '/san-pham?type=Shoes+Cabinet' },
      { label: 'Giường ngủ', path: '/san-pham?type=Bed' },
      { label: 'Tủ đầu giường', path: '/san-pham?type=Bedside' },
      { label: 'Tủ hộc kéo', path: '/san-pham?type=Drawer+Cabinet' },
      { label: 'Tủ quần áo', path: '/san-pham?type=Wardrobe' },
      { label: 'Bàn làm việc', path: '/san-pham?type=Office+Desk' },
      { label: 'Kệ Tivi', path: '/san-pham?type=TV+Media+Unit' },
      { label: 'Bàn Console trang trí', path: '/san-pham?type=Console+Table' },
      { label: 'Bàn trà cà phê', path: '/san-pham?type=Coffee+Table' },
      { label: 'Bàn ăn', path: '/san-pham?type=Dining+Table' }
    ]
  },
  {
    title: 'Dịch vụ trọn gói',
    path: '/dich-vu',
    dropdown: [
      { label: 'Giải Pháp Nội Thất Cho Thuê', path: '/dich-vu/can-ho-cho-thue' },
      { label: 'Thiết Kế & Thi Công Nội Thất Nhà Ở', path: '/dich-vu/nha-pho-chung-cu' },
      { label: 'Sản Xuất & Gia Công Nội Thất Lẻ May Đo', path: '/dich-vu/gia-cong-noi-that' },
      { label: 'Thầu Thi Công & Lắp Đặt Nội Thất', path: '/dich-vu/thi-cong-lap-dat' },
      { label: 'Thầu Thi Công Dự Án Quy Mô Lớn', path: '/dich-vu/thau-du-an-chung-cu' }
    ]
  },
  {
    title: 'Dự án thực tế',
    path: '/du-an',
    dropdown: [
      { label: 'Công trình thực tế Nội thất cho thuê', path: '/du-an/noi-that-cho-thue' },
      { label: 'Công trình thực tế Căn hộ chung cư', path: '/du-an/can-ho-chung-cu' },
      { label: 'Công trình thực tế Nhà phố', path: '/du-an/nha-pho' }
    ]
  },
  {
    title: 'Cộng đồng',
    path: '/cong-dong',
    dropdown: [
      { label: 'Học viện Happy Furniture Academy', path: '/hoc-vien' },
      { label: 'Kiến thức nội thất', path: '/cong-dong?category=Kiến+thức' },
      { label: 'Xu hướng thiết kế', path: '/cong-dong?category=Xu+hướng' },
      { label: 'Workshop & Sự kiện', path: '/cong-dong?category=Workshop' }
    ]
  },
  {
    title: 'Liên hệ',
    path: '/lien-he',
    dropdown: [
      { label: 'Bảng mã vân gỗ (Vật liệu)', path: '/vat-lieu' },
      { label: 'Thông tin liên hệ', path: '/lien-he' },
      { label: 'Quy trình làm việc', path: '/quy-trinh-lam-viec' },
      { label: 'Chính sách thanh toán', path: '/chinh-sach-thanh-toan' },
      { label: 'Chính sách bảo hành', path: '/chinh-sach-bao-hanh' },
      { label: 'Chính sách vận chuyển & lắp đặt', path: '/chinh-sach-van-chuyen' },
      { label: 'Xưởng sản xuất Nội thất (Quận 12)', path: 'https://maps.app.goo.gl/eFUALjGezoPBD8y46' },
      { label: 'Cửa hàng Nội thất (Bình Dương)', path: 'https://maps.app.goo.gl/wPNMErQWShXnE1iz5' }
    ]
  }
];

export const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen, isAnimatingCartIcon } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSearch = (e?: React.FormEvent, directQuery?: string) => {
    if (e) e.preventDefault();
    const query = directQuery !== undefined ? directQuery : searchQuery;
    if (!query.trim()) return;

    setIsSearchOpen(false);
    const lowerQuery = query.toLowerCase().trim();

    if (lowerQuery.includes('thuê')) {
      router.push('/du-an');
    } else if (lowerQuery.includes('bảo hành')) {
      router.push('/chinh-sach-bao-hanh');
    } else {
      router.push(`/san-pham?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-wood/10">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start flex-shrink-0">
            <h1 className="text-[22px] font-extrabold tracking-tighter text-maroon uppercase leading-none">
              HAPPY FURNITURE
            </h1>
            <p className="text-[9px] uppercase tracking-[3px] text-wood/60 font-semibold mt-1 ml-[1px]">
              Nội thất nhà làm
            </p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 h-full lg:ml-12 xl:ml-20">
            {menuItems.map((item) => (
              <div 
                key={item.title}
                className="relative group h-full flex items-center shrink-0"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={item.path} 
                  className="flex items-center gap-1 text-[11px] xl:text-[13px] font-semibold uppercase tracking-widest hover:text-maroon transition-colors h-full px-1 xl:px-2 whitespace-nowrap"
                >
                  {item.title}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full bg-white shadow-2xl border border-wood/5 rounded-sm overflow-hidden ${item.isMegaMenu ? '-left-64 w-[850px]' : 'left-0 w-[280px]'}`}
                    >
                      {item.isMegaMenu ? (
                        // MEGA MENU (Sản phẩm lẻ)
                        <div className="flex p-8">
                          {/* Cột trái: Bộ sưu tập */}
                          <div className="w-1/2 pr-8 border-r border-wood/10">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-wood/40 mb-6">Theo Bộ Sưu Tập</h3>
                            <div className="space-y-4">
                              {[
                                { name: 'Amberglow', code: 'AMB', desc: 'Sắc hạ rực rỡ' },
                                { name: 'Woodland', code: 'WDL', desc: 'Hơi thở rừng sâu' },
                                { name: 'Cosmic', code: 'CSM', desc: 'Sắc đen huyền bí' },
                                { name: 'Aether', code: 'AET', desc: 'Ấm áp tinh tế' },
                                { name: 'Aura', code: 'AUR', desc: 'Nắng sớm nhẹ nhàng' }
                              ].map(col => (
                                <Link 
                                  key={col.code} 
                                  href={`/san-pham?range=${col.code}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-ivory transition-colors"
                                >
                                  <div>
                                    <div className="font-serif text-lg text-wood group-hover:text-maroon transition-colors">{col.name}</div>
                                    <div className="text-[11px] text-wood/50 font-sans">{col.desc}</div>
                                  </div>
                                  <div className="w-8 h-px bg-maroon/0 group-hover:bg-maroon transition-all duration-300"></div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          
                          {/* Cột phải: Phân loại */}
                          <div className="w-1/2 pl-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-wood/40 mb-6">Dòng Sản Phẩm</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.path}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-3 py-2 text-[13px] text-wood/80 hover:bg-ivory hover:text-maroon transition-all rounded-md"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // MENU THƯỜNG
                        <div className="py-4">
                          {item.dropdown.map((subItem) => (
                            subItem.path.startsWith('http') ? (
                              <a
                                key={subItem.label}
                                href={subItem.path}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setActiveDropdown(null)}
                                className="block px-6 py-3 text-[13px] text-wood/80 hover:bg-ivory hover:text-maroon transition-all border-l-2 border-transparent hover:border-maroon cursor-pointer"
                              >
                                {subItem.label}
                              </a>
                            ) : (
                              <Link
                                key={subItem.label}
                                href={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-6 py-3 text-[13px] text-wood/80 hover:bg-ivory hover:text-maroon transition-all border-l-2 border-transparent hover:border-maroon cursor-pointer"
                              >
                                {subItem.label}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4">
              <Search 
                className="w-5 h-5 cursor-pointer hover:text-maroon transition-colors" 
                onClick={() => setIsSearchOpen(true)}
              />

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  animate={isAnimatingCartIcon ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ShoppingBag 
                    className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${
                      totalItems > 0 ? 'text-green-600' : 'text-wood hover:text-maroon'
                    }`} 
                  />
                </motion.div>
                
                <motion.span 
                  animate={isAnimatingCartIcon ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    totalItems > 0 ? 'bg-green-600' : 'bg-maroon'
                  }`}
                >
                  {totalItems}
                </motion.span>
              </button>
            </div>
            
            <a 
              href="https://zalo.me/0909163593"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 bg-maroon text-white px-4 xl:px-6 py-3 rounded-full text-[11px] xl:text-[12px] font-bold uppercase tracking-wider hover:bg-wood transition-all shadow-lg shadow-maroon/20 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3 h-3" />
              Tư vấn ngay
            </a>

            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-wood/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-10 p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col items-start gap-1">
                  <div className="font-extrabold text-maroon text-xl tracking-tighter leading-none">HAPPY FURNITURE</div>
                  <div className="text-[9px] uppercase tracking-[3px] text-wood/60 font-semibold">Nội thất nhà làm</div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-wood/5 rounded-full transition-colors -mt-2 -mr-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {menuItems.map((item) => (
                  <div key={item.title} className="space-y-4">
                    <Link 
                      href={item.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[11px] uppercase tracking-[3px] text-maroon font-bold block"
                    >
                      {item.title}
                    </Link>
                    
                    {item.isMegaMenu ? (
                      <div className="pl-2 space-y-8">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-wood/40 mb-4 border-b border-wood/5 pb-2">Bộ Sưu Tập</div>
                          <div className="grid gap-4">
                            {[
                              { name: 'Amberglow', code: 'AMB' },
                              { name: 'Woodland', code: 'WDL' },
                              { name: 'Cosmic', code: 'CSM' },
                              { name: 'Aether', code: 'AET' },
                              { name: 'Aura', code: 'AUR' }
                            ].map(col => (
                              <Link 
                                key={col.code} 
                                href={`/san-pham?range=${col.code}`} 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="text-xl font-serif font-bold text-wood hover:text-maroon flex items-center gap-2"
                              >
                                {col.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-wood/40 mb-4 border-b border-wood/5 pb-2">Dòng Sản Phẩm</div>
                          <div className="grid gap-4">
                            {item.dropdown.map((subItem) => (
                              <Link 
                                key={subItem.label} 
                                href={subItem.path} 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="text-lg font-medium text-wood/80 hover:text-maroon"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4 pl-2">
                        {item.dropdown.map((subItem) => (
                          subItem.path.startsWith('http') ? (
                            <a 
                              key={subItem.label} 
                              href={subItem.path}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-lg font-medium text-wood/80 hover:text-maroon"
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <Link 
                              key={subItem.label} 
                              href={subItem.path} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-lg font-medium text-wood/80 hover:text-maroon"
                            >
                              {subItem.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-wood/5">
                <a 
                  href="tel:0909163593"
                  className="w-full bg-maroon text-white py-5 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-maroon/20"
                >
                  <Phone className="w-4 h-4" />
                  Tư vấn ngay
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-wood/98 backdrop-blur-2xl z-[110] flex flex-col p-6 md:p-12"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
              <div className="flex justify-end mb-20">
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-4 text-white/60 hover:text-white transition-colors bg-white/5 rounded-full"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col justify-center max-w-4xl">
                <p className="text-white/60 font-bold uppercase tracking-[4px] text-xs mb-6">Bạn đang tìm kiếm gì?</p>
                <form onSubmit={(e) => handleSearch(e)} className="relative group">
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Nhập tên sản phẩm, dịch vụ..."
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 md:py-6 text-4xl md:text-7xl text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all duration-500 font-serif leading-tight"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
                    <Search className="w-12 h-12 text-white/10 group-focus-within:text-white transition-colors" />
                  </button>
                </form>
                
                <div className="mt-12 flex flex-wrap gap-4">
                  <p className="text-white/40 text-[11px] uppercase tracking-widest w-full mb-2 font-bold">Gợi ý phổ biến:</p>
                  {['Tủ áo kịch trần', 'Giường ngủ MDF', 'Bàn làm việc Thuận An', 'Combo căn hộ cho thuê'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        handleSearch(undefined, tag);
                      }}
                      className="px-6 py-3 bg-white/5 hover:bg-maroon hover:text-white text-white/70 rounded-full text-sm transition-all border border-white/5 hover:border-maroon"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[120]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-wood/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-[480px] bg-white z-10 shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-wood/10 flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-xl font-bold text-wood uppercase tracking-widest">Giỏ hàng</h3>
                  <p className="text-[10px] text-wood/40 uppercase tracking-widest mt-1">{totalItems} sản phẩm trong giỏ</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-wood/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto bg-white">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-24 h-24 bg-ivory rounded-full flex items-center justify-center mb-8">
                      <ShoppingBag className="w-10 h-10 text-wood/10" />
                    </div>
                    <h4 className="text-lg font-bold text-wood mb-2">Giỏ hàng đang trống</h4>
                    <p className="text-wood/50 mb-10 text-sm leading-relaxed">Hãy khám phá các mẫu nội thất may đo <br />tuyệt vời từ xưởng Happy Furniture.</p>
                    <Link 
                      href="/san-pham" 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-maroon text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-wood transition-all shadow-lg shadow-maroon/20"
                    >
                      Bắt đầu mua sắm
                    </Link>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-wood/5 shrink-0 relative aspect-square">
                          <OptimizedImage src={item.image} alt={item.name} aspectRatio="square" className="w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-wood text-sm truncate pr-2">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-wood/20 hover:text-maroon transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-wood/40 uppercase tracking-widest mb-3">{item.material}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 bg-ivory/50 rounded-full px-3 py-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-maroon"><Minus className="w-3 h-3" /></button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-maroon"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="font-bold text-wood text-sm">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 bg-ivory/30 border-t border-wood/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-wood uppercase tracking-widest text-xs">Tạm tính:</span>
                  <span className="font-bold text-maroon text-2xl">{formatPrice(totalPrice)}</span>
                </div>
                {cart.length > 0 ? (
                  <Link 
                    href="/thanh-toan"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-maroon text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[12px] hover:bg-wood transition-all shadow-lg shadow-maroon/20 flex items-center justify-center gap-3"
                  >
                    Tiến hành thanh toán
                  </Link>
                ) : (
                  <button className="w-full bg-wood/10 text-wood/30 py-5 rounded-xl font-bold uppercase tracking-widest text-[12px] cursor-not-allowed border border-wood/5">
                    Tiến hành thanh toán
                  </button>
                )}
                <p className="text-center text-[10px] text-wood/40 uppercase tracking-widest mt-6">
                  Miễn phí vận chuyển & lắp đặt tại Thuận An
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
'use client';

import React, { useState, useEffect } from 'react';
import { Link, usePathname, useRouter } from '@/routing'; 
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, Search, X, ChevronDown, Phone, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OptimizedImage } from './OptimizedImage';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Header');
  const tCart = useTranslations('Cart');

  const menuItems = [
    {
      title: t('retail'), 
      path: '/san-pham',
      isMegaMenu: true,
      dropdown: [
        { label: t('prodShelf'), path: '/san-pham?type=Shelf' },
        { label: t('prodStorage'), path: '/san-pham?type=Storage+Cabinet' },
        { label: t('prodShoes'), path: '/san-pham?type=Shoes+Cabinet' },
        { label: t('prodBed'), path: '/san-pham?type=Bed' },
        { label: t('prodBedside'), path: '/san-pham?type=Bedside' },
        { label: t('prodDrawer'), path: '/san-pham?type=Drawer+Cabinet' },
        { label: t('prodWardrobe'), path: '/san-pham?type=Wardrobe' },
        { label: t('prodDesk'), path: '/san-pham?type=Office+Desk' },
        { label: t('prodTv'), path: '/san-pham?type=TV+Media+Unit' },
        { label: t('prodConsole'), path: '/san-pham?type=Console+Table' },
        { label: t('prodCoffee'), path: '/san-pham?type=Coffee+Table' },
        { label: t('prodDining'), path: '/san-pham?type=Dining+Table' }
      ]
    },
    {
      title: t('services'), 
      path: '/dich-vu',
      dropdown: [
        { label: t('srvRental'), path: '/dich-vu/can-ho-cho-thue' },
        { label: t('srvResidential'), path: '/dich-vu/nha-pho-chung-cu' },
        { label: t('srvBespoke'), path: '/dich-vu/gia-cong-noi-that' },
        { label: t('srvInstallation'), path: '/dich-vu/thi-cong-lap-dat' },
        { label: t('srvContract'), path: '/dich-vu/thau-du-an-chung-cu' }
      ]
    },
    {
      title: t('projects'),
      path: '/du-an',
      dropdown: [
        { label: t('prjRental'), path: '/du-an/noi-that-cho-thue' },
        { label: t('prjApartment'), path: '/du-an/can-ho-chung-cu' },
        { label: t('prjTownhouse'), path: '/du-an/nha-pho' }
      ]
    },
    {
      title: t('community'),
      path: '/cong-dong',
      dropdown: [
        { label: t('comAcademy'), path: '/hoc-vien' },
        { label: t('comKnowledge'), path: '/cong-dong?category=Kiến+thức' },
        { label: t('comTrends'), path: '/cong-dong?category=Xu+hướng' },
        { label: t('comWorkshop'), path: '/cong-dong?category=Workshop' }
      ]
    },
    {
      title: t('contact'),
      path: '/lien-he',
      dropdown: [
        { label: t('cntMaterials'), path: '/vat-lieu' },
        { label: t('cntInfo'), path: '/lien-he' },
        { label: t('cntWorkflow'), path: '/quy-trinh-lam-viec' },
        { label: t('cntPayment'), path: '/chinh-sach-thanh-toan' },
        { label: t('cntWarranty'), path: '/chinh-sach-bao-hanh' },
        { label: t('cntShipping'), path: '/chinh-sach-van-chuyen' },
        { label: t('cntFactory'), path: 'https://maps.app.goo.gl/eFUALjGezoPBD8y46' },
        { label: t('cntShowroom'), path: 'https://maps.app.goo.gl/wPNMErQWShXnE1iz5' }
      ]
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen, isAnimatingCartIcon } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [scrollOpacity, setScrollOpacity] = useState(0);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.min(window.scrollY / 150, 1);
      setScrollOpacity(opacity);
    };
    
    if (isHomePage) {
      handleScroll(); 
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrollOpacity(1); 
    }
  }, [isHomePage]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSearch = (e?: React.FormEvent, directQuery?: string) => {
    if (e) e.preventDefault();
    const query = directQuery !== undefined ? directQuery : searchQuery;
    if (!query.trim()) return;

    setIsSearchOpen(false);
    const lowerQuery = query.toLowerCase().trim();

    if (lowerQuery.includes('thuê') || lowerQuery.includes('rental')) {
      router.push('/du-an');
    } else if (lowerQuery.includes('bảo hành') || lowerQuery.includes('warranty')) {
      router.push('/chinh-sach-bao-hanh');
    } else {
      router.push(`/san-pham?search=${encodeURIComponent(query)}`);
    }
  };

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const isDarkText = scrollOpacity > 0.6 || !isHomePage; 

  const headerStyle = {
    backgroundColor: `rgba(250, 248, 245, ${scrollOpacity})`,
    borderBottom: `1px solid rgba(139, 90, 43, ${scrollOpacity * 0.1})`,
    backdropFilter: scrollOpacity > 0.1 ? `blur(${scrollOpacity * 8}px)` : 'none',
    WebkitBackdropFilter: scrollOpacity > 0.1 ? `blur(${scrollOpacity * 8}px)` : 'none',
  };

  const textClass = isDarkText ? 'text-wood' : 'text-white drop-shadow-md';
  const logoClass = isDarkText ? 'text-maroon' : 'text-white drop-shadow-md';
  const hoverClass = isDarkText ? 'hover:text-maroon' : 'hover:text-white/70';

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-colors duration-500" style={headerStyle}>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-[80px] flex items-center justify-between">
          
          <Link href="/" className="flex flex-col items-start shrink-0">
            <h1 className={`text-[22px] font-extrabold tracking-tighter uppercase leading-none transition-colors duration-500 ${logoClass}`}>
              HAPPY FURNITURE
            </h1>
            <p className={`text-[9px] uppercase tracking-[3px] font-semibold mt-1 ml-[1px] transition-colors duration-500 ${isDarkText ? 'text-wood/60' : 'text-white/80'}`}>
              {t('logoSubtitle')}
            </p>
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-3 xl:gap-6 h-full px-2 xl:px-8">
            {menuItems.map((item) => (
              <div 
                key={item.title}
                className="relative group h-full flex items-center shrink-0"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={item.path} 
                  className={`flex items-center gap-1 text-[11px] xl:text-[13px] font-semibold uppercase tracking-widest transition-colors duration-300 h-full px-1 xl:px-2 whitespace-nowrap ${textClass} ${hoverClass}`}
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
                      className={`absolute top-full bg-white shadow-2xl border border-wood/5 rounded-sm overflow-hidden ${item.isMegaMenu ? 'left-0 w-[520px]' : 'left-0 w-[280px]'}`}
                    >
                      {item.isMegaMenu ? (
                        <div className="p-8">
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-wood/40 mb-6">{t('byProductLine')}</h3>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-3 py-2.5 text-[13px] text-wood/80 hover:bg-ivory hover:text-maroon transition-all rounded-md"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
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

          <div className={`flex items-center shrink-0 gap-3 xl:gap-5 pl-3 xl:pl-6 lg:border-l transition-colors duration-500 ${isDarkText ? 'border-wood/20' : 'border-white/30'}`}>
            
            <div className={`hidden md:flex items-center gap-2 text-[11px] font-bold tracking-widest ${textClass} transition-colors duration-300`}>
              <button 
                onClick={() => handleLocaleChange('vi')}
                className={`transition-all ${locale === 'vi' ? 'text-maroon scale-110' : 'opacity-50 hover:opacity-100 hover:text-maroon'}`}
              >
                VI
              </button>
              <span className="w-px h-3 bg-current opacity-30"></span>
              <button 
                onClick={() => handleLocaleChange('en')}
                className={`transition-all ${locale === 'en' ? 'text-maroon scale-110' : 'opacity-50 hover:opacity-100 hover:text-maroon'}`}
              >
                EN
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 xl:gap-4">
              <Search 
                className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${textClass} ${hoverClass}`} 
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
                      totalItems > 0 ? (isDarkText ? 'text-green-600' : 'text-green-400') : `${textClass}${hoverClass}`
                    }`} 
                  />
                </motion.div>
                
                <motion.span 
                  animate={isAnimatingCartIcon ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    totalItems > 0 
                      ? (isDarkText ? 'bg-green-600' : 'bg-green-500') 
                      : (isDarkText ? 'bg-maroon' : 'bg-white/30 border border-white/50')
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
              className={`hidden md:flex items-center gap-2 px-4 xl:px-6 py-3 rounded-full text-[11px] xl:text-[12px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                isDarkText 
                  ? 'bg-maroon text-white hover:bg-wood shadow-lg shadow-maroon/20' 
                  : 'bg-white/10 text-white border border-white/50 hover:bg-white hover:text-maroon backdrop-blur-sm'
              }`}
            >
              <Phone className="w-3 h-3" />
              {t('consultBtn')}
            </a>

            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className={`w-6 h-6 transition-colors duration-300 ${textClass}`} />
            </button>
          </div>
        </div>
      </header>

      {!isHomePage && <div className="h-[80px] w-full shrink-0" aria-hidden="true" />}

      {/* MOBILE MENU */}
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
                  <div className="text-[9px] uppercase tracking-[3px] text-wood/60 font-semibold">{t('menuSubtitle')}</div>
                </div>
                <div className="flex items-center gap-3 -mt-1 -mr-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-wood px-2 py-1 bg-ivory rounded-md">
                    <button 
                      onClick={() => { handleLocaleChange('vi'); setIsMobileMenuOpen(false); }}
                      className={`transition-all ${locale === 'vi' ? 'text-maroon font-extrabold' : 'opacity-50'}`}
                    >
                      VI
                    </button>
                    <span className="w-px h-3 bg-wood/20"></span>
                    <button 
                      onClick={() => { handleLocaleChange('en'); setIsMobileMenuOpen(false); }}
                      className={`transition-all ${locale === 'en' ? 'text-maroon font-extrabold' : 'opacity-50'}`}
                    >
                      EN
                    </button>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-wood/5 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
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
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-wood/5">
                <a 
                  href="tel:0909163593"
                  className="w-full bg-maroon text-white py-5 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-maroon/20"
                >
                  <Phone className="w-4 h-4" />
                  {t('consultBtn')}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SEARCH PANEL */}
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
                <p className="text-white/60 font-bold uppercase tracking-[4px] text-xs mb-6">{t('searchTitle')}</p>
                <form onSubmit={(e) => handleSearch(e)} className="relative group">
                  <input 
                    autoFocus
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 md:py-6 text-4xl md:text-7xl text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all duration-500 font-serif leading-tight"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
                    <Search className="w-12 h-12 text-white/10 group-focus-within:text-white transition-colors" />
                  </button>
                </form>
                
                <div className="mt-12 flex flex-wrap gap-4">
                  <p className="text-white/40 text-[11px] uppercase tracking-widest w-full mb-2 font-bold">{t('searchSuggestionsLabel')}</p>
                  {[t('searchSuggestion1'), t('searchSuggestion2'), t('searchSuggestion3'), t('searchSuggestion4')].map(tag => (
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

      {/* CART DRAWER */}
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
                  <h3 className="text-xl font-bold text-wood uppercase tracking-widest">{tCart('drawerTitle')}</h3>
                  <p className="text-[10px] text-wood/40 uppercase tracking-widest mt-1">
                    {tCart('itemsInCart').replace('{count}', totalItems.toString())}
                  </p>
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
                    <h4 className="text-lg font-bold text-wood mb-2">{tCart('emptyTitle')}</h4>
                    <p className="text-wood/50 mb-10 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: tCart('emptyDesc') }}></p>
                    <Link 
                      href="/san-pham" 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-maroon text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-wood transition-all shadow-lg shadow-maroon/20"
                    >
                      {tCart('exploreBtn')}
                    </Link>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-wood/5 shrink-0 relative aspect-square">
                          <OptimizedImage src={item.image} alt={item.name} tier="thumbnail" aspectRatio="square" className="w-full h-full" />
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
                          <p className="text-[10px] text-wood/40 uppercase tracking-widest mb-3">
                            {tCart('colorLabel')} {item.material}
                          </p>
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
                  <span className="font-bold text-wood uppercase tracking-widest text-xs">{tCart('subtotalDrawer')}</span>
                  <span className="font-bold text-maroon text-2xl">{formatPrice(totalPrice)}</span>
                </div>
                {cart.length > 0 ? (
                  <Link 
                    href="/thanh-toan"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-maroon text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[12px] hover:bg-wood transition-all shadow-lg shadow-maroon/20 flex items-center justify-center gap-3"
                  >
                    {tCart('drawerCheckoutBtn')}
                  </Link>
                ) : (
                  <button className="w-full bg-wood/10 text-wood/30 py-5 rounded-xl font-bold uppercase tracking-widest text-[12px] cursor-not-allowed border border-wood/5">
                    {tCart('drawerCheckoutBtn')}
                  </button>
                )}
                <p className="text-center text-[10px] text-wood/40 uppercase tracking-widest mt-6">
                  {tCart('drawerFreeShippingNote')}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
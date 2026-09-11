'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  material: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  isAnimatingCartIcon: boolean;
  setIsAnimatingCartIcon: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Cờ chặn Hydration Error
  
  // State UI
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimatingCartIcon, setIsAnimatingCartIcon] = useState(false);

  // Chỉ đọc LocalStorage sau khi component đã mount trên Client
  useEffect(() => {
    const savedCart = localStorage.getItem('happy_furniture_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Lỗi parse giỏ hàng", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Lưu lại mỗi khi cart thay đổi (chỉ chạy sau khi đã load xong)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('happy_furniture_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: any, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        material: product.material || 'MDF lõi xanh',
        quantity 
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      isAnimatingCartIcon,
      setIsAnimatingCartIcon 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
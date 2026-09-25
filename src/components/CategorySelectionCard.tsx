import React from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';


interface Props {
  id: string;
  name: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategorySelectionCard: React.FC<Props> = ({ name, image, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center text-center space-y-3 w-full cursor-pointer"
    >
      {/* Theo đúng chuẩn UI từ Document v1.7: w-36 h-36, p-1, rounded-[2px] */}
      <div
        className={`relative w-36 h-36 p-1 rounded-[2px] transition-all duration-300 mx-auto ${
          isActive ? 'border-2 border-maroon shadow-md scale-105 bg-white' : 'border border-wood/10 hover:border-maroon/50 bg-ivory/50 hover:bg-white'
        }`}
      >
        <div className="relative w-full h-full rounded-[2px] overflow-hidden">
          <OptimizedImage 
            src={image} 
            alt={name} 
            tier="thumbnail" // Sử dụng tier thumbnail cho các ảnh nhỏ
            aspectRatio="square" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      <h3
        className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors ${
          isActive ? 'text-maroon' : 'text-wood/70 group-hover:text-maroon'
        }`}
      >
        {name}
      </h3>
    </button>
  );
};
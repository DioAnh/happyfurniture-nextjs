import React from 'react';
import { OptimizedImage } from './OptimizedImage';

interface Props {
  id: string;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  imageClassName?: string;
}

export const RangeSelectionCard: React.FC<Props> = ({ name, code, image, isActive, onClick, className = '', imageClassName = '' }) => {
  return (
    <button onClick={onClick} className={`text-left group flex flex-col ${className}`}>
      <div className={`relative w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ${isActive ? 'border-maroon shadow-lg' : 'border-transparent'} ${imageClassName}`}>
        <OptimizedImage src={image} alt={name} className="w-full h-full transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="mt-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-maroon mb-1">{code}</h4>
        <h3 className="font-serif text-lg text-wood group-hover:text-maroon transition-colors">{name}</h3>
      </div>
    </button>
  );
};
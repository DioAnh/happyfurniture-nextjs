import React from 'react';

export default function LoadingCommunity() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-wood/40 text-sm uppercase tracking-widest animate-pulse">
        Đang nạp dữ liệu cộng đồng...
      </div>
    </div>
  );
}
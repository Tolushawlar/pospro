import React from 'react';

const ProductCardSkeleton: React.FC = () => (
  <div className="bg-gray-100 rounded-lg p-4 animate-pulse h-64 w-full">
    <div className="bg-gray-200 h-32 w-full rounded-md mb-4"></div>
    <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
    <div className="bg-gray-200 h-4 w-1/2 rounded mb-2"></div>
    <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
  </div>
);

export default ProductCardSkeleton;

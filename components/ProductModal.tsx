// components/ProductModal.tsx
"use client";

import React, { Suspense } from "react";
import Image from "next/image";

// Define the product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductModalProps {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const ProductModalContent = ({ selectedProduct, setSelectedProduct }: ProductModalProps) => {
  if (!selectedProduct) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
            <button 
              onClick={() => setSelectedProduct(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 h-64 relative">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-500 mb-2">{selectedProduct.category}</p>
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{selectedProduct.rating.rate}</span>
                </div>
                <span className="text-gray-500">{selectedProduct.rating.count} reviews</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${selectedProduct.price.toFixed(2)}</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ selectedProduct, setSelectedProduct }: ProductModalProps) => {
  if (!selectedProduct) return null;
  
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">Loading...</div>}>
      <ProductModalContent selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
    </Suspense>
  );
};

export default ProductModal;

/* eslint-disable react-hooks/rules-of-hooks */
// components/ProductModal.tsx
"use client";

import React, { Suspense, useCallback } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "../context/CartContext";


interface ProductModalProps {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const ProductModalContent = ({ selectedProduct, setSelectedProduct }: ProductModalProps) => {
  const { addToCart } = useCart();

  if (!selectedProduct) return null;

  // Handle modal close
  const handleClose = useCallback(() => {
    // Ensure we cleanup before closing
    setSelectedProduct(null);
  }, [setSelectedProduct]);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    try {
      if (!product) {
        throw new Error('Product is undefined');
      }
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart', {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

      <ToastContainer />
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl md:text-3xl font-bold ml-2 md:ml-4">{selectedProduct.title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="w-full md:w-1/2 h-48 md:h-64 relative text-left">
              <Image
                src={selectedProduct.photo}
                alt={selectedProduct.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-start">
              <p className="text-lg md:text-xl text-gray-500 mb-2">Category: {selectedProduct.category}</p>
              <p className="text-sm md:text-base text-gray-700 mb-4">Description: {selectedProduct.note}</p>

              {/* <div className="flex flex-col items-left mb-4 space-y-2">
                <div className="flex items-center mr-4">
                  <span className="text-sm md:text-base text-black mr-1">Product In Store: </span>
                  <span className="text-sm md:text-base">{selectedProduct.qty}</span>
                </div>
                <span className="text-sm md:text-base text-gray-500">Product Barcode: {selectedProduct.barcode}</span>
              </div> */}

              <div className="flex flex-col justify-start items-start space-y-2">
                <span className="text-xl md:text-2xl font-bold text-orange-600">₦{selectedProduct.price.toLocaleString('en-US')}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition text-sm md:text-base"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
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

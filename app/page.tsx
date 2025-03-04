"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

// Lazy loaded component
const ProductModal = React.lazy(() => import("../components/ProductModal"));

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://salespro.livepetal.com/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Product Catalog</h1>
          <p className="text-gray-600 mt-2">Discover our amazing collection</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Product grid */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="h-48 relative bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600">{product.rating.rate} ({product.rating.count})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Product details modal */}
      {selectedProduct && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg animate-pulse w-80 h-60"></div>
        </div>}>
          <ProductModal
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </Suspense>
      )}
    </div>
  );
}

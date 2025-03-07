"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import Pagination from "../components/Pagination";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
const ProductModal = React.lazy(() => import("../components/ProductModal"));

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust this number as needed
  const { getCartItemsCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    // Implement your cart modal/drawer logic here
  };

  useEffect(() => {
    async function postProduct() {
      const url = "https://salespro.livepetal.com/v1/products";

      const headers = {
        'Authorization': 'Bearer p2cjbobmwa1mraiv175hji7d5xwewetvwtvte',
        'Content-Type': 'application/json'
      };

      const body = {};

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.data);
        setLoading(false);
        console.log(data);
        console.log("products", products);
      } catch (error) {
        setError(error);
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    postProduct();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        cartItemsCount={getCartItemsCount()}
        onCartClick={handleCartClick}
      />

      {/* Rest of your products page content */}

      {/* Optional: Cart Modal/Drawer */}
      {isCartOpen && (
        // Implement your cart modal/drawer component here
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
          {/* Cart content */}
        </div>
      )}

      <main className="overflow-x-hidden container mx-auto px-4 py-8 ">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Product grid */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-[118px] lg:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="mx-8 lg:m-0 space-x-4 space-y-2 bg-white rounded-lg shadow-md border-[1px] border-orange-100 overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="h-48 relative bg-gray-100">
                      <Image
                        src={product.photo}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-4"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-xl mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">Description: {product.note}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-600 font-bold">#{product.price.toFixed(2)}</span>
                        <div className="flex flex-column justify-center items-center">
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>       //... Product card content remains the same ...
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={products.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main >

      {/* Product details modal */}
      {
        selectedProduct && (
          <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg animate-pulse w-80 h-60"></div>
          </div>}>
            <ProductModal
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </Suspense>
        )
      }
    </div >
  );
}

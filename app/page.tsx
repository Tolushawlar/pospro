"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import Pagination from "../components/Pagination";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
// import { TabView } from "../components/TabView";
const ProductModal = React.lazy(() => import("../components/ProductModal"));

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 9;
  const { getCartItemsCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
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
      } catch (error) {
        setError(error);
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    postProduct();
  }, []);

  // Filter products by selected category
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        cartItemsCount={getCartItemsCount()}
        onCartClick={handleCartClick}
      />

      {isCartOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
        </div>
      )}

      <main className="overflow-x-hidden container mx-auto px-4 py-8 ">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4">
            <div className="overflow-x-auto whitespace-nowrap py-4 flex">
            <button
                  className={`inline-block px-6 py-2 mr-4 rounded-full text-sm font-medium flex-shrink-0
                     ${selectedCategory === null ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'} 
                     hover:bg-orange-200 transition-colors duration-200`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
              {Array.from(new Set(products.map(product => product.category))).map((category, index) => (
                <button
                  key={index}
                  className={`inline-block px-6 py-2 mr-4 rounded-full text-sm font-medium flex-shrink-0
                     ${selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'} 
                     hover:bg-orange-200 transition-colors duration-200`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-[118px] lg:mt-32 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="mx-0 lg:m-0 bg-white rounded-lg shadow-md border-[1px] border-orange-100 overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="h-48 relative bg-gray-100">
                      <Image
                        src={product.photo}
                        alt={product.title}
                        fill
                        sizes="(max-width: 760px) 35vw, (max-width: 1100px) 35vw, 25vw" loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-xl mb-1 line-clamp-2">{product.title}</h3>
                      <p className="text-orange-600 font-bold">#{product.price.toFixed(2)}</p>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition lg:mt-0 mt-1  ">
                        Add to Cart
                      </button>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-column justify-center items-center">
                        </div>
                      </div>
                    </div>
                  </div>))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main >

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
    </div >
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Product } from "../../../types/product";
import Pagination from "../../../components/Pagination";
import ProductCardSkeleton from "../../../components/ProductCardSkeleton";
import Header from "../../../components/Header";
import { useCart } from "../../../context/CartContext";
import Cart from "../../../components/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FixedBottomBar from "../../../components/FixedBottomBar";
const ProductModal = React.lazy(() => import("../../../components/ProductModal"));
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 9;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, getCartItemsCount } = useCart();
  const [business, setBusiness] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isInvalidToken, setIsInvalidToken] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const pageUrl = window.location.href;
    const lastUrlSegment = pageUrl.split('/').pop() || '';
    setToken(lastUrlSegment);
    localStorage.setItem('bearerToken', lastUrlSegment);
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Check if item is already in cart
  // const isInCart = (productId: number) => {
  //   return cartItems.some(item => item.id === productId);
  // };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    async function postProduct() {
      const url = "https://salespro.livepetal.com/v1/productsqr";
      const token = process.env.NEXT_PUBLIC_BEARER_TOKEN || localStorage.getItem('bearerToken');

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.post(url, {}, { headers });
        setDescription(response.data.businessdescription);
        setProducts(response.data.data);
        setBusiness(response.data.business)
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setIsInvalidToken(true);
          }
          setError(error.response?.data?.message || error.message);
        } else {
          setError('An error occurred');
        }
        setLoading(false);
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

  if (isInvalidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Access</h1>
          <p className="text-gray-600 mb-6">The link you are trying to access is invalid or has expired. Please check your link and try again.</p>
          <p className="text-sm text-gray-500">If you continue to experience issues, please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        cartItemsCount={getCartItemsCount()}
        onCartClick={handleCartClick}
        storeName={business}
        storeDescription={description}
      />

      {isCartOpen && (
        <div className="fixed right-0 top-[60px] md:top-16 w-full md:w-96 h-screen bg-white shadow-lg z-50">
          <Cart />
        </div>
      )}

      <ToastContainer />

      <main className="overflow-x-hidden container mx-auto px-4 py-8 ">
        {error && !isInvalidToken && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="fixed top-[60px] md:top-16 left-0 right-0 bg-white shadow-md z-10">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-10">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-[130px] lg:mt-34 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[14px]">
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="mx-0 lg:m-0   overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    <div className="h-48 lg:h-64 z-0 relative bg-gray-100">
                      <Image
                        src={product.photo}
                        alt={product.title}
                        fill
                        sizes="(max-width: 760px) 35vw, (max-width: 1100px) 35vw, 25vw"
                        loading="lazy"
                        className="object-contain"
                        onClick={() => setSelectedProduct(product)}
                      />
                    </div>
                    <div className="p-2 lg:p-4">
                      <h3 className="font-semibold text-base lg:text-xl mb-1 line-clamp-2">{product.title}</h3>
                      <p className="text-orange-600 font-bold text-sm lg:text-base">₦{product.price.toLocaleString('en-NG')}</p>                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md transition lg:mt-0 mt-1 w-full text-sm lg:text-base">
                        Add to Cart
                      </button>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-column justify-center items-center">
                        </div>
                      </div>
                    </div>
                  </div>))}
              </div>              <Pagination
                currentPage={currentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        <FixedBottomBar />

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

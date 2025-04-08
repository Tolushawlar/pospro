// components/Header.tsx
import React, { useState } from 'react';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import Link from 'next/link';

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
  storeName?: string;
  storeDescription?: string;
}

const Header = ({ cartItemsCount, onCartClick, storeName, storeDescription }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <header className="fixed bg-white shadow-md w-full z-10">
      <div className="container mx-auto px-4 py-4 mb-10 md:mb-0">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <h3 className="text-orange-600 text-2xl font-semibold mb-2">{storeName}</h3>
            </Link>
            <p className="text-gray-600 text-sm max-w-[300px] lg:w-full ">{storeDescription}</p>
          </div>

          <div className="relative cursor-pointer" onClick={handleCartClick}>

            {isCartOpen ? (
              <div className="flex flex-row items-center justify-between w-full space-x-5 relative bottom-4 mt-0">
                {cartItemsCount === 0 && (
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="block lg:hidden mt-4 w-[150px] md:w-full bg-orange-500 text-white px-1 md:px-6 py-2 rounded-md hover:bg-orange-600 transition "
                  >
                    Back to Shopping
                  </button>
                )}
                <FiX className="text-2xl text-gray-700 hover:text-orange-600 transition-colors mt-4" />
              </div>
            ) : (
              <>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-1 text-white bg-orange-600 text-sm w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
                <FiShoppingCart className="text-2xl text-gray-700 hover:text-orange-600 transition-colors" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

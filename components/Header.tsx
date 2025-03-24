// components/Header.tsx
import React, { useState } from 'react';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import Link from 'next/link';

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
  storeName?: string;
}

const Header = ({ cartItemsCount = 4, onCartClick, storeName }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <header className="fixed bg-white shadow-md w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <h3 className="text-orange-600 text-2xl font-semibold">{storeName}</h3>
            </Link>
            <p className="text-gray-600 text-sm">Product Listing</p>
          </div>

          <div className="relative cursor-pointer" onClick={handleCartClick}>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-1 text-white bg-orange-600 text-sm w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            {isCartOpen ? (
              <FiX className="text-2xl text-gray-700 hover:text-orange-600 transition-colors" />
            ) : (
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-orange-600 transition-colors" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

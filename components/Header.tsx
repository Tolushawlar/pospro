// components/Header.tsx
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Header = ({ cartItemsCount = 0, onCartClick }: HeaderProps) => {
  return (
    <header className="fixed bg-white shadow-md w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <h3 className="text-orange-600 text-2xl font-semibold">Obam Stores</h3>
            </Link>
            <p className="text-gray-600 text-sm">Product Listing</p>
          </div>

          <div className="relative cursor-pointer" onClick={onCartClick}>
            <FiShoppingCart className="text-2xl text-gray-700 hover:text-orange-600 transition-colors" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

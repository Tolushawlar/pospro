import React, { useState } from 'react'
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const FixedBottomBar = () => {
    const { getCartTotal } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <div className='bottomNav lg:hidden fixed bottom-0 left-0 w-full flex bg-orange-500 p-6 flex-row justify-between items-center ml-0'>
                <div className='flex flex-col'>
                    <p className='text-sm text-white font-medium'>Total Amount</p>
                    <p className='text-xl font-bold text-white'>#{getCartTotal().toFixed(2)}</p>
                </div>
                <button className='bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors'
                    onClick={handleCartClick}
                >
                    Continue
                </button>
            </div>

            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                    <div className="fixed right-0 top-0 w-full md:w-96 h-screen bg-white shadow-lg z-50">
                        <button 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={handleCartClick}
                        >
                            ✕
                        </button>
                        <Cart />
                    </div>
                </div>
            )}
        </>
    )
}

export default FixedBottomBar

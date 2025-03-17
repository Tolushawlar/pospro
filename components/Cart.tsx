// components/Cart.tsx
import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (productId: number, title: string, newQuantity: number, currentQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
            toast.success(`${title} quantity ${newQuantity > currentQuantity ? 'increased' : 'decreased'} to ${newQuantity}!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleRemoveFromCart = (id: number, title: string) => {
        removeFromCart(id);
        toast.error(`${title} removed from cart!`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="p-4 text-center">
                <p className="text-gray-500">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                        <div className="relative w-20 h-20">
                            <Image
                                src={item.photo}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                                sizes="80px"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-orange-600">#{item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    className="bg-gray-200 px-2 py-1 rounded"
                                    onClick={() => handleQuantityChange(item.id, item.title, item.quantity - 1, item.quantity)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="bg-gray-200 px-2 py-1 rounded"
                                    onClick={() => handleQuantityChange(item.id, item.title, item.quantity + 1, item.quantity)}
                                >
                                    +
                                </button>
                                <button
                                    className="ml-auto text-red-500"
                                    onClick={() => handleRemoveFromCart(item.id, item.title)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="text-orange-600 font-bold">
                        #{calculateTotal().toFixed(2)}
                    </span>
                </div>
                <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                    Checkout
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cart;

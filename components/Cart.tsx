/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Cart.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        // Get stored user details from localStorage
        const storedName = localStorage.getItem('customerName');
        const storedPhone = localStorage.getItem('customerPhone');
        const storedPaymentMethod = localStorage.getItem('paymentMethod');

        if (storedName) setName(storedName);
        if (storedPhone) setPhone(storedPhone);
        if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod);
    }, []);

    const handleQuantityChange = (productId: number, title: string, newQuantity: number, currentQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
            toast.success(`${title} quantity ${newQuantity > currentQuantity ? 'increased' : 'decreased'} to ${newQuantity}!`, {
                position: "bottom-right",
                autoClose: 1000,
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
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const prepareOrderData = () => {
        return {
            servedBy: name,
            payMethod: paymentMethod,
            sent: true,
            name,
            phone,
            cart: cartItems.map(item => ({
                id: item.id.toString(),
                title: item.title,
                note: "food",
                category: item.category || "General",
                price: item.price,
                qty: item.quantity,
                barcode: "",
                photo: item.photo,
                localImagePath: "",
                amount: item.price * item.quantity
            })),
            total: calculateTotal(),
            salesID: Date.now().toString(),
            timestamp: new Date().toISOString()
        };
    };

    const submitOrderToAPI = async (orderData: any) => {
        const loadingToast = toast.loading('Processing order...', {
            position: "top-center"
        });

        try {
            const token = 30915546;
            const response = await axios.post('https://salespro.livepetal.com/v1/addorder/', 
                new URLSearchParams({
                    data: JSON.stringify(orderData)
                }), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            toast.dismiss(loadingToast);

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            toast.success('Order submitted successfully!', {
                position: "top-center",
                autoClose: 3000
            });

            clearCart();
            setShowForm(false);

        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Error submitting order:', error);
            toast.error('Failed to submit order', {
                position: "top-center",
                autoClose: 3000
            });
        }
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem('customerName', name);
        localStorage.setItem('customerPhone', phone);
        localStorage.setItem('paymentMethod', paymentMethod);

        const orderData = prepareOrderData();
        console.log(orderData);
        await submitOrderToAPI(orderData);
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
            <h2 className="text-xl font-bold mb-4">Cart Items</h2>
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
                {!showForm ? (
                    <button
                        className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                        onClick={() => setShowForm(true)}
                    >
                        Place Order
                    </button>
                ) : (
                    <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Opay">Opay</option>
                                <option value="Monipoint">Monipoint</option>
                                <option value="GT bank">GT bank</option>
                                <option value="firstbank">First Bank</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                        >
                            Confirm Order
                        </button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cart;

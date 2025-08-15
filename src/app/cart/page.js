"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const [showGuestForm, setShowGuestForm] = useState(false);
    const [guestEmail, setGuestEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGuestCheckout = () => {
        setShowGuestForm(true);
    };

        const handleGuestOrderSubmit = async (e) => {
        e.preventDefault();
        if (!guestEmail.trim()) return;

        setIsSubmitting(true);

        try {
            // Simulate order submission (replace with your own logic later)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            // Success message
            alert(`Order placed successfully! We'll send shipping and payment details to ${guestEmail}`);

            // Clear cart and reset form
            clearCart();
            setShowGuestForm(false);
            setGuestEmail('');
        } catch (error) {
            console.error('Order submission failed:', error);
            alert('Failed to place order. Please try again or contact support.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelGuestCheckout = () => {
        setShowGuestForm(false);
        setGuestEmail('');
    };

    if (cartItems.length === 0) {
        return (
            <div className="mt-20 min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
                <Navbar />
                <div className="pt-20 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
                        <img src="/shopping-cart-svgrepo-com.svg" alt="Shopping Cart" className="w-20 h-20 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-custom-darkBlue mb-2">Your cart is empty</h2>
                        <p className="text-custom-mediumBlue mb-6">Looks like you haven't added any items to your cart yet.</p>
                        <a
                            href="/shop"
                            className="inline-block bg-custom-mediumBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors"
                        >
                            Start Shopping
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10 min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
            <Navbar />
            <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Playful Title */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center mb-8">
                    <h1 className="text-6xl font-bold text-custom-lightBlue mb-4" style={{
                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
                        textShadow: '3px 3px 0px #1e40af, 6px 6px 0px #1e3a8a',
                        transform: 'rotate(-2deg)',
                        display: 'inline-block'
                    }}>
                        Shopping Cart
                    </h1>
                    <p className="text-2xl text-custom-darkBlue font-semibold" style={{
                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive"
                    }}>
                        Let's see what you've picked!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center p-6 border-b border-gray-100 last:border-b-0">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0 w-20 h-20 mr-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-custom-darkBlue mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-custom-mediumBlue text-sm mb-2">
                                            {item.description}
                                        </p>
                                        <p className="text-xl font-bold text-custom-darkBlue">
                                            ${item.price}
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-3 mr-4">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-full bg-custom-lightGray text-custom-darkBlue hover:bg-custom-mediumBlue hover:text-white transition-colors flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-semibold text-custom-darkBlue">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full bg-custom-lightGray text-custom-darkBlue hover:bg-custom-mediumBlue hover:text-white transition-colors flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Total Price */}
                                    <div className="text-right mr-4">
                                        <p className="text-lg font-bold text-custom-darkBlue">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                                        aria-label="Remove item"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Clear Cart Button */}
                        <div className="mt-4 text-right">
                            <button
                                onClick={clearCart}
                                className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Guest Checkout Form */}
                        {showGuestForm && (
                            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-custom-darkBlue mb-4">Guest Checkout</h3>
                                <form onSubmit={handleGuestOrderSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="guestEmail" className="block text-sm font-medium text-custom-darkBlue mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="guestEmail"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            required
                                            placeholder="Enter your email address"
                                            className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                        />
                                        <p className="text-xs text-custom-mediumBlue mt-1">
                                            We'll send order confirmation and payment details to this email
                                        </p>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !guestEmail.trim()}
                                            className="flex-1 bg-custom-mediumBlue text-white py-3 px-6 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelGuestCheckout}
                                            className="px-6 py-3 border border-custom-mediumBlue text-custom-mediumBlue rounded-lg font-semibold hover:bg-custom-mediumBlue hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            {/* Order Process Clarification */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-semibold text-blue-800 mb-1">How Our Ordering Works</h3>
                                        <p className="text-xs text-blue-700">
                                            This website doesn't process payments directly. When you place an order, we'll receive it and send you an email with shipping details and payment instructions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-custom-darkBlue mb-4">Order Summary</h2>
                            
                            {/* Subtotal */}
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-custom-mediumBlue">Subtotal</span>
                                <span className="font-semibold text-custom-darkBlue">${getCartTotal().toFixed(2)}</span>
                            </div>
                            
                            {/* Shipping */}
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-custom-mediumBlue">Shipping</span>
                                <span className="font-semibold text-custom-darkBlue">$5.99</span>
                            </div>
                            
                            {/* Total */}
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-lg font-bold text-custom-darkBlue">Total</span>
                                <span className="text-xl font-bold text-custom-darkBlue">
                                    ${(getCartTotal() + 5.99).toFixed(2)}
                                </span>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full bg-custom-mediumBlue text-white py-3 px-6 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors mt-6">
                                Place Order
                            </button>

                            {/* Continue Shopping */}
                            <a
                                href="/shop"
                                className="block text-center text-custom-mediumBlue hover:text-custom-navyBlue transition-colors mt-4 font-medium"
                            >
                                Continue Shopping
                            </a>

                            {/* Guest Checkout Section */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-custom-darkBlue mb-3">Place Order As:</h3>
                                
                                {/* Guest Checkout */}
                                <div className="mb-3">
                                    <button 
                                        onClick={() => handleGuestCheckout()}
                                        className="w-full bg-custom-lightBlue text-white py-2 px-4 rounded-lg font-medium hover:bg-custom-mediumBlue transition-colors text-sm"
                                    >
                                        Guest (Email Only)
                                    </button>
                                </div>

                                {/* Logged In User */}
                                <div>
                                    <a
                                        href="/login"
                                        className="w-full bg-custom-mediumBlue text-white py-2 px-4 rounded-lg font-medium hover:bg-custom-navyBlue transition-colors text-sm block text-center"
                                    >
                                        Login to Order
                                    </a>
                                </div>

                                <p className="text-xs text-custom-mediumBlue text-center mt-3">
                                    Guest orders require only your email address
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

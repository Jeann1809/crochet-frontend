"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orders';
import { getUserProfile } from '../services/users';
import Navbar from '../components/navbar';
import Link from 'next/link';

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [useExistingAddress, setUseExistingAddress] = useState(true);
    const [guestEmail, setGuestEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        zip: '',
        country: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // Fetch user profile
            fetchUserProfile();
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await getUserProfile();
            // Extract user data from the response structure
            const userData = response.data || response;
            setUser(userData);
            // Pre-fill shipping address if user has one
            if (userData.shippingAddress) {
                setShippingAddress(userData.shippingAddress);
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressChange = (field, value) => {
        setShippingAddress(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!guestEmail.trim() && !isLoggedIn) {
            alert('Please enter your email address');
            return;
        }
        
        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip || !shippingAddress.country) {
            alert('Please fill in all address fields');
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare order data
            const orderData = {
                products: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                })),
                total: getCartTotal(),
                shippingAddress: shippingAddress,
                email: isLoggedIn ? user.email : guestEmail,
                user: isLoggedIn ? user._id : null
            };

            // Submit order using the service
            const result = await createOrder(orderData);
            setOrderId(result._id);
            setOrderSuccess(true);
            clearCart();
        } catch (error) {
            console.error('Order submission failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-4">
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-custom-darkBlue mb-4">Order Placed Successfully!</h1>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-green-800 font-medium">Order ID: {orderId}</p>
                        </div>
                        
                        <div className="text-left space-y-4 mb-8">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                                <ul className="text-blue-700 text-sm space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        You will receive an email from us within 24 hours
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        The email will contain detailed shipping costs and delivery timeframes
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        We'll provide available payment methods and instructions
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        You can track your order status through our updates
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
                                <ul className="text-yellow-700 text-sm space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-yellow-600 mr-2">•</span>
                                        Please check your email (including spam folder) for our communication
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-600 mr-2">•</span>
                                        If you don't receive an email within 24 hours, please contact our support
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <Link
                                href="/shop"
                                className="inline-block bg-custom-mediumBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors"
                            >
                                Continue Shopping
                            </Link>
                            
                            <Link
                                href="/"
                                className="block text-custom-mediumBlue hover:text-custom-navyBlue transition-colors font-medium"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <div className="text-white text-xl">Loading checkout...</div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
                        <img src="/shopping-cart-svgrepo-com.svg" alt="Shopping Cart" className="w-20 h-20 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-custom-darkBlue mb-2">Your cart is empty</h2>
                        <p className="text-custom-mediumBlue mb-6">Add some items to your cart to proceed with checkout.</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-custom-mediumBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
            <Navbar />
            <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
                    <h1 className="text-4xl font-bold text-custom-darkBlue mb-2">Checkout</h1>
                    <p className="text-custom-mediumBlue">Complete your order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {isLoggedIn ? (
                                /* Logged In User Flow */
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold text-custom-darkBlue mb-4">Welcome back, {user?.name}!</h2>
                                        
                                        {/* User Info Display */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <h3 className="font-medium text-custom-darkBlue mb-2">Your Information</h3>
                                            <p className="text-sm text-custom-mediumBlue">Email: {user?.email}</p>
                                            <p className="text-sm text-custom-mediumBlue">Phone: {user?.phone || 'Not provided'}</p>
                                        </div>

                                        {/* Address Choice */}
                                        <div className="mb-6">
                                            <h3 className="font-medium text-custom-darkBlue mb-3">Shipping Address</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        checked={useExistingAddress}
                                                        onChange={() => setUseExistingAddress(true)}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-sm">Use my existing address</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        checked={!useExistingAddress}
                                                        onChange={() => setUseExistingAddress(false)}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-sm">Use a different address</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Address Form */}
                                        {!useExistingAddress && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                        Street Address <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={shippingAddress.street}
                                                        onChange={(e) => handleAddressChange('street', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                        placeholder="Enter street address"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                            City <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={shippingAddress.city}
                                                            onChange={(e) => handleAddressChange('city', e.target.value)}
                                                            required
                                                            className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                            placeholder="Enter city"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                            ZIP Code <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={shippingAddress.zip}
                                                            onChange={(e) => handleAddressChange('zip', e.target.value)}
                                                            required
                                                            className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                            placeholder="Enter ZIP code"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                        Country <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        value={shippingAddress.country}
                                                        onChange={(e) => handleAddressChange('country', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                    >
                                                        <option value="">Select country</option>
                                                        <option value="United States">United States</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="Mexico">Mexico</option>
                                                        <option value="United Kingdom">United Kingdom</option>
                                                        <option value="Germany">Germany</option>
                                                        <option value="France">France</option>
                                                        <option value="Spain">Spain</option>
                                                        <option value="Italy">Italy</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Guest User Flow */
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold text-custom-darkBlue mb-4">Guest Checkout</h2>
                                        
                                        {/* Guest Options */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                            <p className="text-blue-800 mb-3">You're checking out as a guest. Would you like to:</p>
                                            <div className="space-y-2">
                                                <Link
                                                    href="/login"
                                                    className="inline-block bg-custom-mediumBlue text-white px-4 py-2 rounded-lg text-sm hover:bg-custom-navyBlue transition-colors mr-3"
                                                >
                                                    Login to Existing Account
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    className="inline-block bg-custom-lightBlue text-white px-4 py-2 rounded-lg text-sm hover:bg-custom-mediumBlue transition-colors mr-3"
                                                >
                                                    Create New Account
                                                </Link>
                                                <span className="text-blue-700 text-sm">or continue as guest below</span>
                                            </div>
                                        </div>

                                        {/* Guest Email */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={guestEmail}
                                                onChange={(e) => setGuestEmail(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                placeholder="Enter your email address"
                                            />
                                            <p className="text-xs text-custom-mediumBlue mt-1">
                                                We'll send order confirmation and shipping details to this email
                                            </p>
                                        </div>

                                        {/* Guest Address Form */}
                                        <div className="space-y-4">
                                            <h3 className="font-medium text-custom-darkBlue">Shipping Address</h3>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                    Street Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={shippingAddress.street}
                                                    onChange={(e) => handleAddressChange('street', e.target.value)}
                                                    required
                                                    className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                    placeholder="Enter street address"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                        City <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={shippingAddress.city}
                                                        onChange={(e) => handleAddressChange('city', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                        placeholder="Enter city"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                        ZIP Code <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={shippingAddress.zip}
                                                        onChange={(e) => handleAddressChange('zip', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                        placeholder="Enter ZIP code"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                                    Country <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={shippingAddress.country}
                                                    onChange={(e) => handleAddressChange('country', e.target.value)}
                                                    required
                                                    className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                                >
                                                    <option value="">Select country</option>
                                                    <option value="United States">United States</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Mexico">Mexico</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="France">France</option>
                                                    <option value="Spain">Spain</option>
                                                    <option value="Italy">Italy</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSubmitOrder}
                                    disabled={isSubmitting}
                                    className="w-full bg-custom-mediumBlue text-white py-3 px-6 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-custom-darkBlue mb-4">Order Summary</h2>
                            
                            {/* Cart Items */}
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex-1">
                                            <p className="font-medium text-custom-darkBlue">{item.name}</p>
                                            <p className="text-custom-mediumBlue">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-semibold text-custom-darkBlue">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Totals */}
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-custom-mediumBlue">Subtotal</span>
                                    <span className="font-semibold text-custom-darkBlue">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-custom-mediumBlue">Shipping</span>
                                    <span className="font-semibold text-custom-darkBlue">TBD</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <span className="text-lg font-bold text-custom-darkBlue">Total</span>
                                    <span className="text-xl font-bold text-custom-darkBlue">
                                        ${getCartTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Back to Cart */}
                            <Link
                                href="/cart"
                                className="block text-center text-custom-mediumBlue hover:text-custom-navyBlue transition-colors mt-4 font-medium"
                            >
                                ← Back to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

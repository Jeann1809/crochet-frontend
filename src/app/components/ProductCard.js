"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
    const { name, price, image, description = "Beautiful handmade creation", inStock } = product;
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        addToCart({ id: product.id || Math.random().toString(36).substr(2, 9), name, price, image, description });
    };

    const handlePlaceOrder = () => {
        addToCart({ id: product.id || Math.random().toString(36).substr(2, 9), name, price, image, description });
        router.push('/cart');
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 sm:active:scale-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
        >
            {/* Product Image - Mobile Optimized */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                    src={image} 
                    alt={name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                        isHovered 
                            ? 'scale-110 opacity-60 blur-sm' 
                            : 'scale-100 opacity-100 blur-0'
                    }`}
                />
                
                {/* Add to Cart overlay - Mobile Optimized */}
                {isHovered && inStock && (
                    <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                        <button 
                            onClick={handleAddToCart}
                            className="bg-custom-mediumBlue text-white py-2 px-4 rounded-lg font-semibold hover:bg-custom-navyBlue active:bg-custom-navyBlue transition-colors text-sm font-quicksand shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Product Info - Mobile Optimized */}
            <div className="p-3 sm:p-4">
                {/* Product Name */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 font-quicksand leading-tight">
                    {name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 font-inter leading-relaxed">
                    {description}
                </p>

                {/* Price - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                    <span className="text-xl sm:text-2xl font-bold text-custom-darkBlue font-quicksand">
                        ${price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 font-inter">
                        Shipping not included
                    </span>
                </div>
                
                {/* Action Buttons - Mobile Optimized */}
                <div className="flex gap-2">
                    {inStock ? (
                        <button 
                            onClick={handlePlaceOrder}
                            className="flex-1 bg-custom-lightBlue text-white py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg font-semibold hover:bg-custom-mediumBlue active:bg-custom-mediumBlue transition-colors text-sm font-quicksand shadow-sm active:shadow-md"
                        >
                            Place Order
                        </button>
                    ) : (
                        <button 
                            disabled
                            className="flex-1 bg-gray-400 text-white py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg font-semibold cursor-not-allowed text-sm"
                        >
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 
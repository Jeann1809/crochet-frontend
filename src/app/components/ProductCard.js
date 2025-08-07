"use client";

import { useState } from 'react';

export default function ProductCard({ 
    name, 
    price, 
    image, 
    description = "Beautiful handmade creation",
    onAddToCart 
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={image} 
                    alt={name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                        isHovered ? 'scale-110' : 'scale-100'
                    }`}
                />
                {/* Add to Cart overlay */}
                {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <button 
                        onClick={() => onAddToCart && onAddToCart({ name, price, image })}
                        className="bg-custom-mediumBlue text-white py-2 px-3 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors text-sm"
                    >
                        Add to Cart
                    </button>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-custom-darkBlue">
                        ${price}
                    </span>
                    <span className="text-sm text-gray-500">
                        Shipping not included
                    </span>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex-1 bg-custom-lightBlue text-white py-2 px-4 rounded-lg font-semibold hover:bg-custom-mediumBlue transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
} 
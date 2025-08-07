"use client";

import { useState } from 'react';

export default function Navbar() {
    const [cartItems, setCartItems] = useState(1); // State variable for cart items

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="flex justify-between items-center h-20">
                    {/* Logo at the very beginning */}
                    <div className="flex-shrink-0 ml-10">
                        <a 
                            href="#" 
                            className="text-3xl font-bold text-custom-darkBlue hover:text-custom-navyBlue transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            LOGO
                        </a>
                    </div>
                    
                    {/* Navigation elements at the very end */}
                    <div className="flex items-center space-x-6 mr-10">
                        <a
                            href="#"
                            className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-2 text-lg font-medium relative"
                        >
                            <img src="/shopping-cart-svgrepo-com.svg" alt="Shopping Cart" className="w-10 h-10" />
                            {cartItems > 0 && (
                                <span className="absolute -top-3 -right-3 bg-custom-navyBlue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItems}
                                </span>
                            )}
                        </a>
                        <a
                            href="#"
                            className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-2 text-lg font-medium"
                        >
                            <img src="/profile-svgrepo-com.svg" alt="Profile icon" className="w-8 h-8" />
                        </a>
                    </div>
                </div>
        </nav>
    )
}

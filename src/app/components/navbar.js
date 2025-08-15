"use client";

import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="flex justify-between items-center h-20">
                    {/* Logo at the very beginning */}
                    <div className="flex-shrink-0 ml-8">
                        <a 
                            href="/" 
                            className="text-3xl font-bold text-custom-darkBlue hover:text-custom-navyBlue transition-colors cursor-pointer"
                        >
                            LOGO
                        </a>
                    </div>
                    
                    {/* Navigation elements at the very end */}
                    <div className="flex items-center space-x-6 mr-10">
                        <a
                            href="/cart"
                            className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-2 text-lg font-medium relative"
                        >
                            <img src="/shopping-cart-svgrepo-com.svg" alt="Shopping Cart" className="w-10 h-10" />
                            {cartCount > 0 && (
                                <span className="absolute -top-3 -right-3 bg-custom-navyBlue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </a>
                        <a
                            href="/login"
                            className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-2 text-lg font-medium"
                        >
                            <img src="/profile-svgrepo-com.svg" alt="Profile icon" className="w-8 h-8" />
                        </a>
                    </div>
                </div>
        </nav>
    )
}

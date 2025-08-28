"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getUserProfile } from '../services/users';

export default function Navbar() {
    const { cartCount } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Check if token is expired
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Date.now() / 1000;
                    
                    if (payload.exp && payload.exp > currentTime) {
                        setIsLoggedIn(true);
                        // Check if user is admin
                        try {
                            const userProfile = await getUserProfile();
                            const userData = userProfile.data || userProfile;
                            setIsAdmin(userData.role === 'admin');
                        } catch (error) {
                            // Handle error silently
                            setIsAdmin(false);
                        }
                    } else {
                        // Token expired, remove it
                        localStorage.removeItem('token');
                        setIsLoggedIn(false);
                        setIsAdmin(false);
                    }
                } catch (error) {
                    // Invalid token, remove it
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        };

        checkAuthStatus();
        
        // Listen for storage changes (when login/logout happens in other tabs)
        window.addEventListener('storage', checkAuthStatus);
        
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="flex justify-between items-center h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
                {/* Logo - Mobile Optimized */}
                <div className="flex-shrink-0">
                    <a 
                        href="/" 
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-custom-darkBlue hover:text-custom-navyBlue transition-colors cursor-pointer font-bellaboo leading-none"
                    >
                        Marimar
                    </a>
                </div>
                
                {/* Navigation elements - Mobile Optimized */}
                <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                    {/* Cart - Mobile Optimized */}
                    <a
                        href="/cart"
                        className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-medium relative font-quicksand p-2 sm:p-1"
                        aria-label="Shopping Cart"
                    >
                        <img src="/shopping-cart-svgrepo-com.svg" alt="Shopping Cart" className="w-8 h-8 sm:w-10 sm:h-10" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-custom-navyBlue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center font-quicksand">
                                {cartCount}
                            </span>
                        )}
                    </a>
                    
                    {/* Admin Link - Mobile Optimized */}
                    {isAdmin && (
                        <a
                            href="/admin"
                            className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-medium font-quicksand p-2 sm:p-1"
                            aria-label="Admin Panel"
                        >
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="hidden sm:inline">Admin</span>
                        </a>
                    )}
                    
                    {/* Profile/Login - Mobile Optimized */}
                    <a
                        href={isLoggedIn ? "/profile" : "/login"}
                        className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-medium font-quicksand p-2 sm:p-1"
                        aria-label={isLoggedIn ? "Profile" : "Login"}
                    >
                        <img src="/profile-svgrepo-com.svg" alt={isLoggedIn ? "Profile" : "Login"} className="w-6 h-6 sm:w-8 sm:h-8" />
                    </a>
                </div>
            </div>
        </nav>
    )
}

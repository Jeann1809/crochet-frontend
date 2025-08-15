"use client";

import { useState } from 'react';
import Link from 'next/link';
import ProductBubblesBackground from '../components/ProductBubblesBackground';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue flex items-center justify-center px-4 relative">
            <ProductBubblesBackground />
            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
                                        textShadow: '3px 3px 0px #1e40af, 6px 6px 0px #1e3a8a',
                                        transform: 'rotate(1deg)',
                                        display: 'inline-block'
                                    }}>
                                        Welcome again!
                                    </h1>
                                    <p className="text-2xl text-custom-darkBlue font-semibold" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive"
                                    }}>
                                        Sign in to your account
                                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-custom-darkBlue mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-custom-darkBlue mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-12 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-custom-mediumBlue hover:text-custom-navyBlue transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-custom-mediumBlue hover:text-custom-navyBlue transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-custom-mediumBlue hover:bg-custom-navyBlue text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-mediumBlue focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-custom-darkBlue">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="font-semibold text-custom-mediumBlue hover:text-custom-navyBlue transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="text-custom-darkBlue hover:text-custom-navyBlue transition-colors font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/users';
import ProductBubblesBackground from '../components/ProductBubblesBackground';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Try to validate the token by checking if it's expired
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Date.now() / 1000;
                    
                    if (payload.exp && payload.exp > currentTime) {
                        // Token is valid and not expired, show logged-in message
                        setSuccess('You are already logged in!');
                    } else {
                        // Token is expired, remove it
                        localStorage.removeItem('token');

                    }
                } catch (error) {
                    // Invalid token format, remove it
                    localStorage.removeItem('token');

                }
            }
        };
        
        checkAuthStatus();
    }, []);

    // Cleanup form data on unmount for security
    useEffect(() => {
        return () => {
            setFormData({
                email: '',
                password: ''
            });
            setError('');
            setSuccess('');
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.email.trim() || !formData.password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        clearMessages();
        setIsLoading(true);

        try {
            const result = await loginUser({
                email: formData.email.trim(),
                password: formData.password
            });


            
            // Store token in localStorage
            if (result.token) {
                localStorage.setItem('token', result.token);
                setSuccess('Login successful! Redirecting to home page...');
                
                // Clear form
                setFormData({
                    email: '',
                    password: ''
                });
                
                // Redirect to home page after a short delay
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                setError('Login successful but no token received');
            }
        } catch (err) {
            // Handle error silently
            const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-custom-lightBlue md:bg-gradient-to-br md:from-custom-lightBlue md:to-custom-mediumBlue flex items-center justify-center px-4 relative">
            <div className="hidden md:block">
                <ProductBubblesBackground />
            </div>
            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4 font-dancing-script">
                        Welcome again!
                    </h1>
                    <p className="text-2xl text-custom-darkBlue font-semibold font-quicksand">
                        Sign in to your account
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 font-inter">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg font-inter">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="bg-custom-lightBlue border border-white text-white px-4 py-3 rounded-lg font-inter">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {success}
                                </div>
                                {success.includes('already logged in') && (
                                    <Link
                                        href="/profile"
                                        className="bg-custom-mediumBlue hover:bg-custom-navyBlue text-white px-4 py-2 rounded-lg text-sm transition-colors font-quicksand"
                                    >
                                        Go to Profile
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                disabled={isLoading}
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                                    isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={isLoading}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 pr-12 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                                        isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
                                    }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute inset-y-0 right-0 pr-3 flex items-center text-custom-mediumBlue hover:text-custom-navyBlue transition-colors ${
                                        isLoading ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
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
                        <div className="flex items-center justify-between font-inter">
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
                            disabled={isLoading}
                            className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 font-quicksand ${
                                isLoading
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-custom-mediumBlue hover:bg-custom-navyBlue text-white hover:scale-105 focus:ring-custom-mediumBlue'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-custom-darkBlue font-inter">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="font-semibold text-custom-mediumBlue hover:text-custom-navyBlue transition-colors font-quicksand"
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
                        className="text-custom-darkBlue hover:text-custom-navyBlue transition-colors font-medium font-quicksand"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserProfile, getOrdersByUser, updateUser, deleteUser } from '../services/users';
import { getOrdersByUser as getOrdersByUserService } from '../services/orders';
import Navbar from '../components/navbar';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                setIsLoading(true);
                
                // Load user profile
                const userProfile = await getUserProfile();
                const userData = userProfile.data || userProfile;
                setUser(userData);

                // Load user orders
                try {
                    setOrdersLoading(true);
                    const userOrders = await getOrdersByUserService();
                    const ordersData = userOrders.data?.data || userOrders.data || userOrders;
                    if (Array.isArray(ordersData)) {
                        setOrders(ordersData);
                    } else {
                        setOrders([]);
                    }
                } catch (orderError) {
                    console.error('Failed to load orders:', orderError);
                    setOrders([]);
                } finally {
                    setOrdersLoading(false);
                }

            } catch (error) {
                console.error('Failed to load profile:', error);
                if (error.response?.status === 401) {
                    // Token is invalid, redirect to login
                    localStorage.removeItem('token');
                    router.push('/login');
                } else {
                    setError('Failed to load profile data');
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthAndLoadData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const handleEditProfile = () => {
        setEditData({
            name: user?.name || '',
            phone: user?.phone || '',
            shippingAddress: {
                street: user?.shippingAddress?.street || '',
                city: user?.shippingAddress?.city || '',
                zip: user?.shippingAddress?.zip || '',
                country: user?.shippingAddress?.country || ''
            }
        });
        setIsEditing(true);
        setUpdateError('');
        setUpdateSuccess('');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({});
        setUpdateError('');
        setUpdateSuccess('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('shippingAddress.')) {
            const field = name.replace('shippingAddress.', '');
            setEditData(prev => ({
                ...prev,
                shippingAddress: {
                    ...prev.shippingAddress,
                    [field]: value
                }
            }));
        } else {
            setEditData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleUpdateProfile = async () => {
        // Validate required fields
        if (!editData.name?.trim()) {
            setUpdateError('Name is required');
            return;
        }

        setIsUpdating(true);
        setUpdateError('');
        setUpdateSuccess('');

        try {
            const result = await updateUser(editData);
            console.log('Profile updated successfully:', result);
            
            // Update local user state
            setUser(prev => ({
                ...prev,
                ...editData
            }));
            
            setUpdateSuccess('Profile updated successfully!');
            setIsEditing(false);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setUpdateSuccess('');
            }, 3000);
            
        } catch (error) {
            console.error('Profile update failed:', error);
            setUpdateError(error.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteConfirm(true);
        setDeleteError('');
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeleteError('');
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        setDeleteError('');

        try {
            // Get user ID from current user
            const userId = user?._id || user?.id;
            if (!userId) {
                throw new Error('User ID not found');
            }

            await deleteUser(userId);
            
            // Clear token and redirect to home
            localStorage.removeItem('token');
            router.push('/');
            
        } catch (error) {
            console.error('Account deletion failed:', error);
            setDeleteError(error.message || 'Failed to delete account. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-custom-lightBlue flex items-center justify-center">
                <div className="text-center">
                    {/* Sewing Kit Image */}
                    <div className="mb-8">
                        <img 
                            src="/sewing.svg" 
                            alt="Sewing Kit" 
                            className="w-24 h-24 mx-auto"
                        />
                    </div>
                    
                    <div className="text-white text-xl mb-6 font-semibold">Loading your profile...</div>
                    
                    {/* Main Loading Bar */}
                    <div className="w-80 bg-white/20 rounded-full h-4 overflow-hidden mb-4">
                        <div className="h-full bg-gradient-to-r from-white via-blue-200 to-white rounded-full animate-pulse-glow relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                    
                    {/* Progress Text */}
                    <div className="text-white/80 text-sm mb-6">Fetching your information...</div>
                    
                    {/* Loading Dots */}
                    <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    
                    {/* Loading Steps */}
                    <div className="text-white/60 text-xs space-y-1">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <span>Loading profile data...</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <span>Fetching order history...</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <span>Preparing your dashboard...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-custom-lightBlue flex items-center justify-center">
                <div className="text-center">
                    {/* Sewing Kit Image */}
                    <div className="mb-6">
                        <img 
                            src="/sewing.svg" 
                            alt="Sewing Kit" 
                            className="w-20 h-20 mx-auto opacity-80"
                        />
                    </div>
                    
                    <div className="text-white text-xl">{error}</div>
                    
                    {/* Retry Button */}
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-6 bg-custom-mediumBlue hover:bg-custom-navyBlue text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-custom-lightBlue relative">
            <Navbar />
            
            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 pb-8 pt-32">
                {/* Welcome Header */}
                <div className="text-center mb-8">
                    <h1 className="text-6xl font-bold text-white mb-4" style={{
                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
                        textShadow: '3px 3px 0px #1e40af, 6px 6px 0px #1e3a8a',
                        transform: 'rotate(1deg)',
                        display: 'inline-block'
                    }}>
                        Welcome back, {user?.name || 'User'}!
                    </h1>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex space-x-1 mb-6">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                activeTab === 'profile'
                                    ? 'bg-custom-mediumBlue text-white'
                                    : 'text-custom-darkBlue hover:bg-gray-100'
                            }`}
                        >
                            Personal Info
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                activeTab === 'orders'
                                    ? 'bg-custom-mediumBlue text-white'
                                    : 'text-custom-darkBlue hover:bg-gray-100'
                            }`}
                        >
                            My Orders ({orders.length})
                        </button>
                    </div>

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold text-custom-darkBlue">Personal Information</h2>
                                {!isEditing && (
                                    <button
                                        onClick={handleEditProfile}
                                        className="px-4 py-2 bg-custom-mediumBlue hover:bg-custom-navyBlue text-white rounded-lg transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                            
                            {/* Success/Error Messages */}
                            {updateSuccess && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {updateSuccess}
                                    </div>
                                </div>
                            )}
                            
                            {updateError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {updateError}
                                    </div>
                                </div>
                            )}
                            
                            {isEditing ? (
                                /* Edit Mode */
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editData.phone || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">
                                            Address Information
                                        </label>
                                        
                                        <div>
                                            <label className="block text-xs font-medium text-custom-mediumBlue mb-1">
                                                Street Address
                                            </label>
                                            <input
                                                type="text"
                                                name="shippingAddress.street"
                                                value={editData.shippingAddress?.street || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue"
                                                placeholder="Enter your street address"
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-custom-mediumBlue mb-1">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shippingAddress.city"
                                                    value={editData.shippingAddress?.city || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue"
                                                    placeholder="Enter your city"
                                                />
                                            </div>
                                        
                                            <div>
                                                <label className="block text-xs font-medium text-custom-mediumBlue mb-1">
                                                    ZIP/Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shippingAddress.zip"
                                                    value={editData.shippingAddress?.zip || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue"
                                                    placeholder="Enter ZIP code"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-medium text-custom-mediumBlue mb-1">
                                                Country
                                            </label>
                                            <select
                                                name="shippingAddress.country"
                                                value={editData.shippingAddress?.country || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue"
                                            >
                                                <option value="">Select your country</option>
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Germany">Germany</option>
                                                <option value="France">France</option>
                                                <option value="Spain">Spain</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Japan">Japan</option>
                                                <option value="China">China</option>
                                                <option value="India">India</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Edit Action Buttons */}
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            onClick={handleUpdateProfile}
                                            disabled={isUpdating}
                                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                                isUpdating
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                        >
                                            {isUpdating ? 'Updating...' : 'Save Changes'}
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            disabled={isUpdating}
                                            className="px-6 py-3 border border-custom-mediumBlue text-custom-mediumBlue rounded-lg hover:bg-custom-mediumBlue hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* View Mode */
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">Name</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border text-custom-darkBlue">
                                            {user?.name || 'Not provided'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">Email</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border text-custom-darkBlue">
                                            {user?.email || 'Not provided'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">Phone</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border text-custom-darkBlue">
                                            {user?.phone || 'Not provided'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2">Address</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border text-custom-darkBlue">
                                            {user?.shippingAddress?.street ? (
                                                <div className="space-y-1">
                                                    <p>{user.shippingAddress.street}</p>
                                                    <p>{user.shippingAddress.city}, {user.shippingAddress.zip}</p>
                                                    <p>{user.shippingAddress.country}</p>
                                                </div>
                                            ) : (
                                                'Not provided'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Logout Button */}
                            {!isEditing && (
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4"
                                    >
                                        Logout
                                    </button>
                                    
                                    {/* Delete Account Button */}
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="w-full bg-gray-400 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                                    >
                                        Delete My Account
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-custom-darkBlue">Order History</h2>
                            
                            {ordersLoading ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex items-center space-x-2 text-custom-darkBlue">
                                        <div className="w-4 h-4 bg-custom-mediumBlue rounded-full animate-bounce"></div>
                                        <div className="w-4 h-4 bg-custom-mediumBlue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-4 h-4 bg-custom-mediumBlue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <p className="text-custom-darkBlue mt-2">Loading your orders...</p>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order, index) => (
                                        <div key={order._id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-medium text-custom-darkBlue">Order #{order._id?.slice(-8) || 'Unknown'}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date unknown'}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {String(order.status || 'unknown').toUpperCase()}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="font-medium">Total:</span> ${String(order.total || 0)}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Items:</span> {String(order.products?.length || 0)}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Email:</span> {String(order.email || 'N/A')}
                                                </div>
                                            </div>
                                            
                                            {order.shippingAddress && (
                                                <div className="mt-3 pt-3 border-t border-gray-200">
                                                    <span className="font-medium text-sm">Shipping Address:</span>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No orders found.</p>
                                    <Link href="/shop" className="text-custom-mediumBlue hover:text-custom-navyBlue mt-2 inline-block">
                                        Start shopping!
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Account Confirmation Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
                        <div className="text-center">
                            {/* Warning Icon */}
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            
                            <h3 className="text-xl font-semibold text-custom-darkBlue mb-2">
                                Delete Your Account?
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                                This action cannot be undone. All your data, orders, and account information will be permanently deleted.
                            </p>
                            
                            {/* Error Message */}
                            {deleteError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {deleteError}
                                    </div>
                                </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleCancelDelete}
                                    disabled={isDeleting}
                                    className="flex-1 px-6 py-3 border border-custom-mediumBlue text-custom-mediumBlue rounded-lg hover:bg-custom-mediumBlue hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={isDeleting}
                                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                                        isDeleting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                                >
                                    {isDeleting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </div>
                                    ) : (
                                        'Yes, Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

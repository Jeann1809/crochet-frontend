"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { getUserProfile } from '../services/users';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/products';
import { getAllOrders, updateOrder, deleteOrder } from '../services/orders';

import Navbar from '../components/navbar';

export default function AdminDashboard() {
    const router = useRouter();
    const { cartCount } = useCart();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('products');
    
    // Products state
    const [products, setProducts] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    });
    
    // Orders state
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    


    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const userProfile = await getUserProfile();
            const userData = userProfile.data || userProfile;
            
            if (userData.role !== 'admin') {
                router.push('/');
                return;
            }

            setIsAdmin(true);
            setIsLoading(false);
            fetchData();
        } catch (error) {
            console.error('Admin check failed:', error);
            router.push('/login');
        }
    };

    const fetchData = async () => {
        try {
            // Fetch products and orders
            const [productsData, ordersData] = await Promise.all([
                getProducts(),
                getAllOrders()
            ]);
            
            setProducts(productsData.data || productsData);
            setOrders(ordersData.data || ordersData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    // Product management functions
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await updateProduct(editingProduct._id, productForm);
            } else {
                await createProduct(productForm);
            }
            setShowProductForm(false);
            setEditingProduct(null);
            setProductForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
            fetchData();
        } catch (error) {
            console.error('Product operation failed:', error);
            alert('Operation failed: ' + error.message);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.categories?.[0] || product.category || '',
            stock: product.stock.toString(),
            image: product.image
        });
        setShowProductForm(true);
    };

    const handleDeleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchData();
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Delete failed: ' + error.message);
            }
        }
    };

    // Order management functions
    const handleOrderStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrder(orderId, { status: newStatus });
            fetchData();
        } catch (error) {
            console.error('Order update failed:', error);
            alert('Update failed: ' + error.message);
        }
    };

    const handleDeleteOrder = async (id) => {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id);
                fetchData();
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Delete failed: ' + error.message);
            }
        }
    };



    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
                <Navbar />
                <div className="pt-32 flex items-center justify-center">
                    <div className="text-white text-xl">Loading admin dashboard...</div>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
            <Navbar />
            <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
                    <h1 className="text-4xl font-bold text-custom-darkBlue mb-2 font-quicksand">Admin Dashboard</h1>
                    <p className="text-custom-mediumBlue font-inter">Manage your store's products and orders</p>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex space-x-4 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`py-2 px-4 font-medium rounded-t-lg transition-colors font-quicksand ${
                                activeTab === 'products'
                                    ? 'text-custom-mediumBlue border-b-2 border-custom-mediumBlue'
                                    : 'text-gray-500 hover:text-custom-mediumBlue'
                            }`}
                        >
                            Products ({products.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`py-2 px-4 font-medium rounded-t-lg transition-colors font-quicksand ${
                                activeTab === 'orders'
                                    ? 'text-custom-mediumBlue border-b-2 border-custom-mediumBlue'
                                    : 'text-gray-500 hover:text-custom-mediumBlue'
                            }`}
                        >
                            Orders ({orders.length})
                        </button>

                    </div>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-custom-darkBlue font-quicksand">Products</h2>
                            <button
                                onClick={() => {
                                    setShowProductForm(true);
                                    setEditingProduct(null);
                                    setProductForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
                                }}
                                className="bg-custom-mediumBlue text-white px-4 py-2 rounded-lg hover:bg-custom-navyBlue transition-colors font-quicksand"
                            >
                                Add Product
                            </button>
                        </div>

                        {/* Product Form */}
                        {showProductForm && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold text-custom-darkBlue mb-4 font-quicksand">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <form onSubmit={handleProductSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={productForm.name}
                                                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                                Price <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={productForm.price}
                                                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                                Category <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={productForm.category}
                                                onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                                Stock <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                value={productForm.stock}
                                                onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={productForm.description}
                                            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                            required
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-custom-darkBlue mb-2 font-inter">
                                            Image URL <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={productForm.image}
                                            onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-custom-mediumBlue text-white px-6 py-2 rounded-lg hover:bg-custom-navyBlue transition-colors font-quicksand"
                                        >
                                            {editingProduct ? 'Update Product' : 'Add Product'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowProductForm(false);
                                                setEditingProduct(null);
                                                setProductForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
                                            }}
                                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-quicksand"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Products List */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-quicksand">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-quicksand">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-quicksand">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-quicksand">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-quicksand">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                        <div className="text-sm text-gray-500">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.categories?.[0] || product.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.stock}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleEditProduct(product)}
                                                    className="text-custom-mediumBlue hover:text-custom-navyBlue mr-3 font-quicksand"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="text-red-600 hover:text-red-900 font-quicksand"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-custom-darkBlue mb-6 font-quicksand">Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {order._id.slice(-8)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.email || 'Guest'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${order.total}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                                                    className="text-sm border border-gray-300 rounded px-2 py-1"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}

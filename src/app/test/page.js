"use client";

import React, { useState, useEffect } from "react";
import { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  updateUser, 
  updatePass,
  forgotPassword,
  resetPassword,
  deleteUser
} from "../services/users";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../services/products";
import { createOrder, getAllOrders, getOrdersByUser, updateOrder, deleteOrder } from "../services/orders";
import { addProductToCart, getCart, removeFromCart } from "../services/cart";

export default function ServiceTestPage() {
  // State for all services
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  
  // Update profile state
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  // Update password state
  const [newPassword, setNewPassword] = useState("");
  
  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  
  // Reset password state
  const [resetPasswordJWT, setResetPasswordJWT] = useState("");
  const [resetPasswordNewPassword, setResetPasswordNewPassword] = useState("");

  // Delete user state
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);

  // Create product state
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    stock: "",
    image: ""
  });

  // Get products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Get one product state
  const [productId, setProductId] = useState("");
  const [singleProduct, setSingleProduct] = useState(null);
  const [singleProductLoading, setSingleProductLoading] = useState(false);

  // Update product state
  const [updateProductId, setUpdateProductId] = useState("");
  const [updateProductData, setUpdateProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });
  const [updateProductLoading, setUpdateProductLoading] = useState(false);

  // Delete product state
  const [deleteProductId, setDeleteProductId] = useState("");
  const [deleteProductLoading, setDeleteProductLoading] = useState(false);

  // Create order state
  const [orderData, setOrderData] = useState({
    user: "",
    products: [{ productId: "", quantity: 1 }],
    email: "",
    total: "",
    shippingAddress: {
      street: "",
      city: "",
      zip: "",
      country: ""
    },
    status: "pending"
  });
  const [createOrderLoading, setCreateOrderLoading] = useState(false);

  // Get all orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Get orders by user state
  const [userOrders, setUserOrders] = useState([]);
  const [userOrdersLoading, setUserOrdersLoading] = useState(false);

  // Update order state
  const [updateOrderId, setUpdateOrderId] = useState("");
  const [updateOrderData, setUpdateOrderData] = useState({
    status: "",
    total: "",
    email: "",
    shippingAddress: {
      street: "",
      city: "",
      zip: "",
      country: ""
    }
  });
  const [updateOrderLoading, setUpdateOrderLoading] = useState(false);

  // Delete order state
  const [deleteOrderId, setDeleteOrderId] = useState("");
  const [deleteOrderLoading, setDeleteOrderLoading] = useState(false);

  // Add product to cart state
  const [cartProductData, setCartProductData] = useState({
    productId: "",
    quantity: 1
  });
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  // Get cart state
  const [cart, setCart] = useState(null);
  const [getCartLoading, setGetCartLoading] = useState(false);
  const [removeFromCartLoading, setRemoveFromCartLoading] = useState(false);
  const [removeFromCartError, setRemoveFromCartError] = useState(null);
  
  // Response/error state
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("useEffect - Token found:", !!token);
    if (token) {
      setIsLoggedIn(true);
      console.log("useEffect - Calling fetchProfile");
      fetchProfile();
    } else {
      console.log("useEffect - No token found");
    }
  }, []);

  const clearMessages = () => {
    setResponse("");
    setError("");
  };

  // Test Get Products Service
  const handleGetProducts = async () => {
    clearMessages();
    setProductsLoading(true);
    try {
      const result = await getProducts();
      // Handle nested data structure: result.data.data
      const productsData = result.data?.data || result.data || result;
      
      // Ensure productsData is an array and filter out any invalid products
      if (Array.isArray(productsData)) {
        const validProducts = productsData.filter(product => 
          product && typeof product === 'object' && product._id
        );
        setProducts(validProducts);
        setResponse(`Successfully fetched ${validProducts.length} products`);
      } else {
        setProducts([]);
        setError("Invalid products data received from API");
      }
    } catch (err) {
      setError(`Failed to fetch products: ${err.response?.data?.message || err.message}`);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  // Test Get One Product Service
  const handleGetOneProduct = async () => {
    if (!productId.trim()) {
      setError("Please enter a product ID");
      return;
    }
    
    clearMessages();
    setSingleProductLoading(true);
    try {
      const result = await getProductById(productId.trim());
      console.log("Get One Product Result:", result);
      // Handle nested data structure: result.data.data
      const productData = result.data?.data || result.data || result;
      console.log("Processed Product Data:", productData);
      
      // Ensure productData is a valid product object
      if (productData && typeof productData === 'object' && productData._id) {
        setSingleProduct(productData);
        setResponse(`Successfully fetched product: ${productData.name || 'Unknown Product'}`);
      } else {
        setError("Invalid product data received from API");
        setSingleProduct(null);
      }
    } catch (err) {
      console.error("Get One Product Error:", err);
      setError(`Failed to fetch product: ${err.response?.data?.message || err.message}`);
      setSingleProduct(null);
    } finally {
      setSingleProductLoading(false);
    }
  };

  // Test Update Product Service
  const handleUpdateProduct = async () => {
    if (!updateProductId.trim()) {
      setError("Please enter a product ID to update");
      return;
    }

    // Only require the product ID - all other fields are optional for updates
    clearMessages();
    setUpdateProductLoading(true);
    try {
      // Create payload with only the fields that have values
      const productPayload = {};
      
      if (updateProductData.name) productPayload.name = updateProductData.name;
      if (updateProductData.description) productPayload.description = updateProductData.description;
      if (updateProductData.price) productPayload.price = parseFloat(updateProductData.price);
      if (updateProductData.category) productPayload.category = updateProductData.category;
      if (updateProductData.stock) productPayload.stock = parseInt(updateProductData.stock);
      if (updateProductData.image) productPayload.image = updateProductData.image;

      // Check if at least one field is provided for update
      if (Object.keys(productPayload).length === 0) {
        setError("Please provide at least one field to update");
        setUpdateProductLoading(false);
        return;
      }

      const result = await updateProduct(updateProductId.trim(), productPayload);
      setResponse(`Product updated successfully! Product ID: ${result._id || result.id || 'N/A'}`);
      
      // Clear form
      setUpdateProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
      });
      setUpdateProductId("");
    } catch (err) {
      setError(`Product update failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUpdateProductLoading(false);
    }
  };

  // Test Delete Product Service
  const handleDeleteProduct = async () => {
    if (!deleteProductId.trim()) {
      setError("Please enter a product ID to delete");
      return;
    }

    clearMessages();
    setDeleteProductLoading(true);
    try {
      const result = await deleteProduct(deleteProductId.trim());
      setResponse(`Product deleted successfully! Product ID: ${deleteProductId.trim()}`);
      
      // Clear form
      setDeleteProductId("");
    } catch (err) {
      setError(`Product deletion failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setDeleteProductLoading(false);
    }
  };

  // Test Create Order Service
  const handleCreateOrder = async () => {
    // Validate required fields
    if (!orderData.products[0].productId || !orderData.total || !orderData.shippingAddress.street || !orderData.shippingAddress.city || !orderData.shippingAddress.zip || !orderData.shippingAddress.country) {
      setError("Please fill in all required fields: product ID, total, and shipping address");
      return;
    }

    // If user is not logged in, email is required
    if (!isLoggedIn && !orderData.email) {
      setError("Please provide an email address for guest orders");
      return;
    }

    clearMessages();
    setCreateOrderLoading(true);
    try {
      // Convert total to number
      const orderPayload = {
        ...orderData,
        total: parseFloat(orderData.total),
        products: orderData.products.filter(p => p.productId.trim() && p.quantity > 0)
      };

      const result = await createOrder(orderPayload);
      setResponse(`Order created successfully! Order ID: ${result._id || result.id || 'N/A'}`);
      
      // Clear form
      setOrderData({
        user: "",
        products: [{ productId: "", quantity: 1 }],
        email: "",
        total: "",
        shippingAddress: {
          street: "",
          city: "",
          zip: "",
          country: ""
        },
        status: "pending"
      });
    } catch (err) {
      setError(`Order creation failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setCreateOrderLoading(false);
    }
  };

  // Test Get All Orders Service
  const handleGetAllOrders = async () => {
    clearMessages();
    setOrdersLoading(true);
    try {
      const result = await getAllOrders();
      // Handle nested data structure: result.data.data
      const ordersData = result.data?.data || result.data || result;
      
      // Ensure ordersData is an array and filter out any invalid orders
      if (Array.isArray(ordersData)) {
        const validOrders = ordersData.filter(order => 
          order && typeof order === 'object' && order._id
        );
        setOrders(validOrders);
        setResponse(`Successfully fetched ${validOrders.length} orders`);
      } else {
        setOrders([]);
        setError("Invalid orders data received from API");
      }
    } catch (err) {
      setError(`Failed to fetch orders: ${err.response?.data?.message || err.message}`);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Test Get Orders By User Service
  const handleGetOrdersByUser = async () => {
    clearMessages();
    setUserOrdersLoading(true);
    try {
      const result = await getOrdersByUser();
      // Handle nested data structure: result.data.data
      const ordersData = result.data?.data || result.data || result;
      
      // Ensure ordersData is an array and filter out any invalid orders
      if (Array.isArray(ordersData)) {
        const validOrders = ordersData.filter(order => 
          order && typeof order === 'object' && order._id
        );
        setUserOrders(validOrders);
        setResponse(`Successfully fetched ${validOrders.length} orders for current user`);
      } else {
        setUserOrders([]);
        setError("Invalid user orders data received from API");
      }
    } catch (err) {
      setError(`Failed to fetch user orders: ${err.response?.data?.message || err.message}`);
      setUserOrders([]);
    } finally {
      setUserOrdersLoading(false);
    }
  };

  // Test Update Order Service
  const handleUpdateOrder = async (orderId) => {
    if (!orderId.trim()) {
      setError("Please enter an order ID to update");
      return;
    }

    // Only require the order ID - all other fields are optional for updates
    clearMessages();
    setUpdateOrderLoading(true);
    try {
      // Create payload with only the fields that have values
      const orderPayload = {};
      
      if (updateOrderData.status) orderPayload.status = updateOrderData.status;
      if (updateOrderData.total) orderPayload.total = parseFloat(updateOrderData.total);
      if (updateOrderData.email) orderPayload.email = updateOrderData.email;
      
      // Handle shipping address updates
      const shippingAddressUpdates = {};
      if (updateOrderData.shippingAddress.street) shippingAddressUpdates.street = updateOrderData.shippingAddress.street;
      if (updateOrderData.shippingAddress.city) shippingAddressUpdates.city = updateOrderData.shippingAddress.city;
      if (updateOrderData.shippingAddress.zip) shippingAddressUpdates.zip = updateOrderData.shippingAddress.zip;
      if (updateOrderData.shippingAddress.country) shippingAddressUpdates.country = updateOrderData.shippingAddress.country;
      
      if (Object.keys(shippingAddressUpdates).length > 0) {
        orderPayload.shippingAddress = shippingAddressUpdates;
      }

      // Check if at least one field is provided for update
      if (Object.keys(orderPayload).length === 0) {
        setError("Please provide at least one field to update");
        setUpdateOrderLoading(false);
        return;
      }

      const result = await updateOrder(orderId.trim(), orderPayload);
      setResponse(`Order updated successfully! Order ID: ${result._id || result.id || 'N/A'}`);
      
      // Clear form
      setUpdateOrderData({
        status: "",
        total: "",
        email: "",
        shippingAddress: {
          street: "",
          city: "",
          zip: "",
          country: ""
        }
      });
      setUpdateOrderId("");
    } catch (err) {
      setError(`Order update failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUpdateOrderLoading(false);
    }
  };

  // Test Delete Order Service
  const handleDeleteOrder = async () => {
    if (!deleteOrderId.trim()) {
      setError("Please enter an order ID to delete");
      return;
    }

    clearMessages();
    setDeleteOrderLoading(true);
    try {
      const result = await deleteOrder(deleteOrderId.trim());
      setResponse(`Order deleted successfully! Order ID: ${deleteOrderId.trim()}`);
      
      // Clear form
      setDeleteOrderId("");
    } catch (err) {
      setError(`Order deletion failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setDeleteOrderLoading(false);
    }
  };

  // Test Add Product to Cart Service
  const handleAddProductToCart = async () => {
    if (!cartProductData.productId.trim()) {
      setError("Please enter a product ID");
      return;
    }

    if (!currentUser?._id && !currentUser?.id) {
      setError("Please log in first to add products to cart");
      return;
    }

    clearMessages();
    setAddToCartLoading(true);
    try {
      const userId = currentUser._id || currentUser.id;
      const cartPayload = {
        productId: cartProductData.productId.trim(),
        quantity: parseInt(cartProductData.quantity) || 1
      };

      const result = await addProductToCart(userId, cartPayload);
      setResponse(`Product added to cart successfully! Product ID: ${cartPayload.productId}, Quantity: ${cartPayload.quantity}`);
      
      // Clear form
      setCartProductData({
        productId: "",
        quantity: 1
      });
    } catch (err) {
      setError(`Failed to add product to cart: ${err.response?.data?.message || err.message}`);
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Test Get Cart Service
  const handleGetCart = async () => {
    if (!currentUser) {
      alert("Please log in first");
      return;
    }

    // Get user ID from either _id or id property
    const userId = currentUser._id || currentUser.id;
    if (!userId) {
      alert("User ID not found. Please try logging in again.");
      return;
    }

    setGetCartLoading(true);
    setRemoveFromCartError(null);
    try {
      const result = await getCart(userId);
      console.log("Get Cart Result:", result);
      
      // Handle nested data structure if needed
      const cartData = result.data?.data || result.data || result;
      
      if (cartData && Array.isArray(cartData)) {
        setCart(cartData);
      } else {
        console.error("Invalid cart data structure:", cartData);
        setCart([]);
      }
    } catch (error) {
      console.error("Get cart failed:", error);
      setRemoveFromCartError(error.response?.data?.message || error.message || "Failed to get cart");
      setCart(null);
    } finally {
      setGetCartLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!currentUser) {
      alert("Please log in first");
      return;
    }

    // Get user ID from either _id or id property
    const userId = currentUser._id || currentUser.id;
    if (!userId) {
      alert("User ID not found. Please try logging in again.");
      return;
    }

    setRemoveFromCartLoading(true);
    setRemoveFromCartError(null);
    try {
      await removeFromCart(userId, productId);
      
      // Remove the item from local cart state
      setCart(prevCart => prevCart.filter(item => item.productId._id !== productId));
      
      // Show success message
      alert("Product removed from cart successfully!");
    } catch (error) {
      console.error("Remove from cart failed:", error);
      setRemoveFromCartError(error.response?.data?.message || error.message || "Failed to remove product from cart");
    } finally {
      setRemoveFromCartLoading(false);
    }
  };

  // Helper functions for order management
  const addProductToOrder = () => {
    setOrderData(prev => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: 1 }]
    }));
  };

  const removeProductFromOrder = (index) => {
    setOrderData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const updateOrderProduct = (index, field, value) => {
    setOrderData(prev => ({
      ...prev,
      products: prev.products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const updateShippingAddress = (field, value) => {
    setOrderData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value
      }
    }));
  };

  const updateOrderShippingAddress = (field, value) => {
    setUpdateOrderData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value
      }
    }));
  };

  // Test Login Service
  const handleLogin = async () => {
    clearMessages();
    try {
      const result = await loginUser({
        email: loginEmail,
        password: loginPassword
      });
      setResponse(`Login successful! User ID: ${result.user?._id || result.user?.id || 'N/A'}`);
      setIsLoggedIn(true);
      setCurrentUser(result.user);
      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      setError(`Login failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Register Service
  const handleRegister = async () => {
    clearMessages();
    try {
      const result = await registerUser(registerData);
      setResponse(`Registration successful! User ID: ${result.user?._id || result.user?.id || 'N/A'}`);
      // Clear form
      setRegisterData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      });
    } catch (err) {
      setError(`Registration failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Get Profile Service
  const fetchProfile = async () => {
    console.log("fetchProfile - Starting...");
    clearMessages();
    try {
      const profile = await getUserProfile();
      console.log("fetchProfile - Raw profile result:", profile);
      
      // Handle nested data structure
      const userData = profile.data || profile;
      console.log("fetchProfile - Processed userData:", userData);
      
      setResponse(`Profile fetched successfully! Name: ${userData.name}, Email: ${userData.email}`);
      console.log("fetchProfile - Setting currentUser to:", userData);
      setCurrentUser(userData);
      // Pre-fill update form with current data
      setUpdateData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || ""
      });
    } catch (err) {
      console.error("fetchProfile - Error:", err);
      setError(`Failed to fetch profile: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Update Profile Service
  const handleUpdateProfile = async () => {
    clearMessages();
    try {
      await updateUser(updateData);
      setResponse(`Profile updated successfully!`);
      // Refresh profile
      fetchProfile();
    } catch (err) {
      setError(`Profile update failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Update Password Service
  const handleUpdatePassword = async () => {
    clearMessages();
    try {
      await updatePass(newPassword);
      setResponse(`Password updated successfully!`);
      setNewPassword("");
    } catch (err) {
      setError(`Password update failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Forgot Password Service
  const handleForgotPassword = async () => {
    clearMessages();
    try {
      await forgotPassword(forgotPasswordEmail);
      setResponse(`Forgot password request sent successfully! Check your email for reset link.`);
      setForgotPasswordEmail("");
    } catch (err) {
      setError(`Forgot password request failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Reset Password Service
  const handleResetPassword = async () => {
    clearMessages();
    try {
      await resetPassword(resetPasswordJWT, resetPasswordNewPassword);
      setResponse(`Password reset successfully! You can now login with your new password.`);
      setResetPasswordJWT("");
      setResetPasswordNewPassword("");
    } catch (err) {
      setError(`Password reset failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Test Delete User Service
  const handleDeleteUser = async () => {
    if (!deleteUserId.trim()) {
      setError("Please enter a user ID to delete");
      return;
    }

    clearMessages();
    setDeleteUserLoading(true);
    try {
      const result = await deleteUser(deleteUserId.trim());
      setResponse(`User deleted successfully! User ID: ${deleteUserId.trim()}`);
      
      // Clear form
      setDeleteUserId("");
      
      // If the deleted user is the current user, log them out
      if (currentUser && (currentUser._id === deleteUserId.trim() || currentUser.id === deleteUserId.trim())) {
        handleLogout();
      }
    } catch (err) {
      setError(`User deletion failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setDeleteUserLoading(false);
    }
  };

  // Test Create Product Service
  const handleCreateProduct = async () => {
    clearMessages();
    try {
      // Validate required fields
      if (!productData.name || !productData.price || !productData.categories.length || !productData.stock) {
        setError("Please fill in all required fields: name, price, categories, and stock");
        return;
      }

      // Convert price and stock to numbers
      const productPayload = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock)
      };

      const result = await createProduct(productPayload);
      setResponse(`Product created successfully! Product ID: ${result._id || result.id || 'N/A'}`);
      
      // Clear form
      setProductData({
        name: "",
        description: "",
        price: "",
        categories: [],
        stock: "",
        image: ""
      });
    } catch (err) {
      setError(`Product creation failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setProductData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setResponse("Logged out successfully!");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Service Testing Dashboard
        </h1>

        {/* Status Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Login Status: </span>
              <span className={`px-2 py-1 rounded text-sm ${
                isLoggedIn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isLoggedIn ? 'Logged In' : 'Not Logged In'}
              </span>
            </div>
            <div>
              <span className="font-medium">User ID: </span>
              <span className="text-gray-600">{currentUser?._id || currentUser?.id || 'N/A'}</span>
            </div>
          </div>
          {currentUser && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <span className="font-medium">Current User: </span>
              {currentUser.name} ({currentUser.email})
            </div>
          )}
        </div>

        {/* Response/Error Display */}
        {(response || error) && (
          <div className="mb-6">
            {response && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {response}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Login Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Login Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Test Login
          </button>
        </div>

        {/* Register Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Register Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={registerData.phone}
              onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={registerData.address}
              onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />
          </div>
          <button
            onClick={handleRegister}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Test Register
          </button>
        </div>

        {/* Get Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Get Products Service</h2>
          <p className="text-gray-600 mb-4">
            Fetch all available products
          </p>
          <button
            onClick={handleGetProducts}
            disabled={productsLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              productsLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {productsLoading ? 'Loading...' : 'Test Get Products'}
          </button>
          
          {/* Display Products */}
          {products.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Products Found ({products.length}):</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product, index) => (
                  <div key={product._id || index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <h4 className="font-medium text-gray-800">{product.name || 'No Name'}</h4>
                    <p className="text-sm text-gray-600">${product.price || 0}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stock || 0}</p>
                    <p className="text-xs text-gray-500">Categories: {
                      Array.isArray(product.categories) 
                        ? product.categories.join(', ') 
                        : typeof product.categories === 'string' 
                          ? product.categories 
                          : 'No categories'
                    }</p>
                    {product.image && (
                      <img src={product.image} alt={product.name || 'Product'} className="w-full h-auto rounded-lg border border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
              {products.length > 6 && (
                <p className="text-sm text-gray-500 mt-2">Showing first 6 products...</p>
              )}
            </div>
          )}
        </div>

        {/* Get One Product Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Get One Product Service</h2>
          <p className="text-gray-600 mb-4">
            Fetch a specific product by ID
          </p>
          {/* Debug Info */}
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <p><strong>Debug Info:</strong></p>
            <p>Product ID: {productId || 'None'}</p>
            <p>Single Product State: {singleProduct ? 'Set' : 'Null'}</p>
            <p>Loading: {singleProductLoading ? 'Yes' : 'No'}</p>
            {singleProduct && (
              <p>Product Name: {String(singleProduct.name || 'No Name')}</p>
            )}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            />
            <button
              onClick={handleGetOneProduct}
              disabled={!productId.trim() || singleProductLoading}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !productId.trim() || singleProductLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {singleProductLoading ? 'Loading...' : 'Get Product'}
            </button>
          </div>
          
          {/* Display Single Product */}
          {singleProduct ? (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-3">{singleProduct.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Price:</span> ${singleProduct.price || 0}
                </div>
                <div>
                  <span className="font-medium">Stock:</span> {singleProduct.stock || 0}
                </div>
                <div>
                  <span className="font-medium">Categories:</span> {
                    Array.isArray(singleProduct.categories) 
                      ? singleProduct.categories.join(', ') 
                      : typeof singleProduct.categories === 'string' 
                        ? singleProduct.categories 
                        : 'No categories'
                  }
                </div>
                <div>
                  <span className="font-medium">ID:</span> {singleProduct._id || 'N/A'}
                </div>
              </div>
              {singleProduct.description && (
                <div className="mt-3">
                  <span className="font-medium">Description:</span>
                  <p className="text-gray-600 mt-1">{singleProduct.description}</p>
                </div>
              )}
              {singleProduct.image && (
                <div className="mt-3">
                  <span className="font-medium">Image:</span>
                  <div className="mt-2">
                    <img 
                      src={singleProduct.image} 
                      alt={singleProduct.name}
                      className="w-full max-w-xs h-auto rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <p className="text-red-500 text-sm mt-1 hidden">Failed to load image</p>
                    <p className="text-blue-600 text-sm mt-1 break-all">{singleProduct.image}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 text-center text-gray-500">
              {singleProductLoading ? 'Loading product...' : 'No product selected. Enter a product ID and click "Get Product".'}
            </div>
          )}
        </div>

        {/* Update Product Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Update Product Service</h2>
          <p className="text-gray-600 mb-4">
            Update an existing product (requires authentication)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product ID to Update *"
              value={updateProductId}
              onChange={(e) => setUpdateProductId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Product Name (optional)"
              value={updateProductData.name}
              onChange={(e) => setUpdateProductData({...updateProductData, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price (optional)"
              value={updateProductData.price}
              onChange={(e) => setUpdateProductData({...updateProductData, price: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Stock (optional)"
              value={updateProductData.stock}
              onChange={(e) => setUpdateProductData({...updateProductData, stock: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category (optional)"
              value={updateProductData.category}
              onChange={(e) => setUpdateProductData({...updateProductData, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={updateProductData.image}
              onChange={(e) => setUpdateProductData({...updateProductData, image: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description (optional)"
              value={updateProductData.description}
              onChange={(e) => setUpdateProductData({...updateProductData, description: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              rows="3"
            />
          </div>

          <button
            onClick={handleUpdateProduct}
            disabled={!isLoggedIn || updateProductLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isLoggedIn && !updateProductLoading
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {updateProductLoading ? 'Updating...' : 'Test Update Product'}
          </button>
        </div>

        {/* Delete Product Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Delete Product Service</h2>
          <p className="text-gray-600 mb-4">
            Delete an existing product (requires authentication)
          </p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Product ID to Delete *"
              value={deleteProductId}
              onChange={(e) => setDeleteProductId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button
            onClick={handleDeleteProduct}
            disabled={!isLoggedIn || !deleteProductId.trim() || deleteProductLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              isLoggedIn && deleteProductId.trim() && !deleteProductLoading
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {deleteProductLoading ? 'Deleting...' : 'Test Delete Product'}
          </button>
        </div>

        {/* Create Order Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Create Order Service</h2>
          <p className="text-gray-600 mb-4">
            Create a new order (works with or without authentication)
          </p>
          
          {/* Guest Email (only shown if not logged in) */}
          {!isLoggedIn && (
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address * (required for guest orders)"
                value={orderData.email}
                onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          )}

          {/* Order Total */}
          <div className="mb-4">
            <input
              type="number"
              step="0.01"
              placeholder="Order Total *"
              value={orderData.total}
              onChange={(e) => setOrderData({...orderData, total: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>

          {/* Products */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Products *</h3>
              <button
                type="button"
                onClick={addProductToOrder}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                + Add Product
              </button>
            </div>
            {orderData.products.map((product, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Product ID *"
                  value={product.productId}
                  onChange={(e) => updateOrderProduct(index, 'productId', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={product.quantity}
                  onChange={(e) => updateOrderProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                />
                {orderData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductFromOrder(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Shipping Address *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Street *"
                value={orderData.shippingAddress.street}
                onChange={(e) => updateShippingAddress('street', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="City *"
                value={orderData.shippingAddress.city}
                onChange={(e) => updateShippingAddress('city', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="ZIP Code *"
                value={orderData.shippingAddress.zip}
                onChange={(e) => updateShippingAddress('zip', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Country *"
                value={orderData.shippingAddress.country}
                onChange={(e) => updateShippingAddress('country', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            disabled={createOrderLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              !createOrderLoading
                ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {createOrderLoading ? 'Creating Order...' : 'Test Create Order'}
          </button>
        </div>

        {/* Get All Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Get All Orders Service</h2>
          <p className="text-gray-600 mb-4">
            Fetch all orders (requires authentication)
          </p>
          <button
            onClick={handleGetAllOrders}
            disabled={!isLoggedIn || ordersLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoggedIn && !ordersLoading
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {ordersLoading ? 'Loading...' : 'Test Get All Orders'}
          </button>
          
          {/* Display Orders */}
          {orders.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Orders Found ({orders.length}):</h3>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order, index) => (
                  <div key={order._id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Order ID:</span> {String(order._id || 'N/A')}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {String(order.status || 'unknown')}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Total:</span> ${String(order.total || 0)}
                      </div>
                      <div>
                        <span className="font-medium">User:</span> {String(order.user || 'Guest')}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {String(order.email || 'N/A')}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    
                    {/* Products */}
                    {order.products && Array.isArray(order.products) && order.products.length > 0 && (
                      <div className="mt-3">
                        <span className="font-medium">Products:</span>
                        <div className="mt-1 space-y-1">
                          {order.products.map((product, pIndex) => (
                            <div key={pIndex} className="text-xs text-gray-600 ml-4">
                              • Product ID: {String(product.productId || 'N/A')} - Quantity: {String(product.quantity || 0)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Shipping Address */}
                    {order.shippingAddress && typeof order.shippingAddress === 'object' && (
                      <div className="mt-3">
                        <span className="font-medium">Shipping Address:</span>
                        <div className="mt-1 text-xs text-gray-600 ml-4">
                          {String(order.shippingAddress.street || 'N/A')}, {String(order.shippingAddress.city || 'N/A')}, {String(order.shippingAddress.zip || 'N/A')}, {String(order.shippingAddress.country || 'N/A')}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {orders.length > 5 && (
                <p className="text-sm text-gray-500 mt-2">Showing first 5 orders...</p>
              )}
            </div>
          )}
        </div>

        {/* Get Orders By User Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Get Orders By User Service</h2>
          <p className="text-gray-600 mb-4">
            Fetch orders for the currently logged-in user (requires authentication)
          </p>
          <button
            onClick={handleGetOrdersByUser}
            disabled={!isLoggedIn || userOrdersLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isLoggedIn && !userOrdersLoading
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {userOrdersLoading ? 'Loading...' : 'Test Get Orders By User'}
          </button>
          
          {/* Display User Orders */}
          {userOrders.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Your Orders ({userOrders.length}):</h3>
              <div className="space-y-4">
                {userOrders.slice(0, 5).map((order, index) => (
                  <div key={order._id || index} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Order ID:</span> {String(order._id || 'N/A')}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {String(order.status || 'unknown')}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Total:</span> ${String(order.total || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {String(order.email || 'N/A')}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    
                    {/* Products */}
                    {order.products && Array.isArray(order.products) && order.products.length > 0 && (
                      <div className="mt-3">
                        <span className="font-medium">Products:</span>
                        <div className="mt-1 space-y-1">
                          {order.products.map((product, pIndex) => (
                            <div key={pIndex} className="text-xs text-gray-600 ml-4">
                              • Product ID: {String(product.productId || 'N/A')} - Quantity: {String(product.quantity || 0)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Shipping Address */}
                    {order.shippingAddress && typeof order.shippingAddress === 'object' && (
                      <div className="mt-3">
                        <span className="font-medium">Shipping Address:</span>
                        <div className="mt-1 text-xs text-gray-600 ml-4">
                          {String(order.shippingAddress.street || 'N/A')}, {String(order.shippingAddress.city || 'N/A')}, {String(order.shippingAddress.zip || 'N/A')}, {String(order.shippingAddress.country || 'N/A')}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {userOrders.length > 5 && (
                <p className="text-sm text-gray-500 mt-2">Showing first 5 orders...</p>
              )}
            </div>
          )}
        </div>

        {/* Update Order Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Update Order Service</h2>
          <p className="text-gray-600 mb-4">
            Update an existing order (requires authentication)
          </p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Order ID to Update *"
              value={updateOrderId}
              onChange={(e) => setUpdateOrderId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="New Status (optional)"
              value={updateOrderData.status}
              onChange={(e) => setUpdateOrderData({...updateOrderData, status: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              step="0.01"
              placeholder="New Total (optional)"
              value={updateOrderData.total}
              onChange={(e) => setUpdateOrderData({...updateOrderData, total: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="New Email (optional)"
              value={updateOrderData.email}
              onChange={(e) => setUpdateOrderData({...updateOrderData, email: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="New Street (optional)"
              value={updateOrderData.shippingAddress.street}
              onChange={(e) => updateOrderShippingAddress('street', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="New City (optional)"
              value={updateOrderData.shippingAddress.city}
              onChange={(e) => updateOrderShippingAddress('city', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="New ZIP (optional)"
              value={updateOrderData.shippingAddress.zip}
              onChange={(e) => updateOrderShippingAddress('zip', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="New Country (optional)"
              value={updateOrderData.shippingAddress.country}
              onChange={(e) => updateOrderShippingAddress('country', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => handleUpdateOrder(updateOrderId)}
            disabled={!isLoggedIn || !updateOrderId.trim() || updateOrderLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              isLoggedIn && updateOrderId.trim() && !updateOrderLoading
                ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {updateOrderLoading ? 'Updating...' : 'Test Update Order'}
          </button>
        </div>

        {/* Delete Order Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Delete Order Service</h2>
          <p className="text-gray-600 mb-4">
            Delete an existing order (requires authentication)
          </p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Order ID to Delete *"
              value={deleteOrderId}
              onChange={(e) => setDeleteOrderId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
            />
          </div>
          <button
            onClick={handleDeleteOrder}
            disabled={!isLoggedIn || !deleteOrderId.trim() || deleteOrderLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              isLoggedIn && deleteOrderId.trim() && !deleteOrderLoading
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {deleteOrderLoading ? 'Deleting...' : 'Test Delete Order'}
          </button>
        </div>

        {/* Add Product to Cart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Add Product to Cart Service</h2>
          <p className="text-gray-600 mb-4">
            Add a product to the current user's cart (requires authentication)
          </p>
          
          {/* Debug Info */}
          <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
            <div><strong>Debug Info:</strong></div>
            <div>Is Logged In: {String(isLoggedIn)}</div>
            <div>Current User: {currentUser ? JSON.stringify(currentUser, null, 2) : 'null'}</div>
            <div>User ID: {currentUser ? (currentUser._id || currentUser.id || 'Not found') : 'No user'}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product ID to Add *"
              value={cartProductData.productId}
              onChange={(e) => setCartProductData({...cartProductData, productId: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              min="1"
              placeholder="Quantity (default: 1)"
              value={cartProductData.quantity}
              onChange={(e) => setCartProductData({...cartProductData, quantity: parseInt(e.target.value) || 1})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddProductToCart}
            disabled={!isLoggedIn || !cartProductData.productId.trim() || addToCartLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isLoggedIn && cartProductData.productId.trim() && !addToCartLoading
                ? 'bg-purple-500 text-white hover:bg-purple-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {addToCartLoading ? 'Adding...' : 'Test Add Product to Cart'}
          </button>
        </div>

        {/* Get Cart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Get Cart Service</h2>
          <p className="text-gray-600 mb-4">
            Retrieve the current user's shopping cart (requires authentication)
          </p>
          <button
            onClick={handleGetCart}
            disabled={!isLoggedIn || getCartLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isLoggedIn && !getCartLoading
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {getCartLoading ? 'Loading...' : 'Test Get Cart'}
          </button>
          
          {/* Display Cart */}
          {cart && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Your Cart:</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                {/* Cart Items */}
                {cart && Array.isArray(cart) && cart.length > 0 && (
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <div key={item._id || index} className="border border-gray-200 rounded p-3 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Product Image */}
                          {item.productId?.image && (
                            <div className="flex justify-center">
                              <img 
                                src={item.productId.image} 
                                alt={item.productId.name || 'Product'} 
                                className="w-20 h-20 object-cover rounded border border-gray-200"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          
                          {/* Product Details */}
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Product:</span> {String(item.productId?.name || 'Unknown Product')}
                            </div>
                            <div>
                              <span className="font-medium">Price:</span> ${String(item.productId?.price || 0)}
                            </div>
                            <div>
                              <span className="font-medium">Quantity:</span> {String(item.quantity || 0)}
                            </div>
                            <div>
                              <span className="font-medium">Total:</span> ${String((item.productId?.price || 0) * (item.quantity || 0))}
                            </div>
                            <div>
                              <span className="font-medium">Category:</span> {String(item.productId?.category || 'N/A')}
                            </div>
                            <div>
                              <span className="font-medium">Stock:</span> {String(item.productId?.stock || 0)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Product Description */}
                        {item.productId?.description && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <span className="font-medium text-sm">Description:</span>
                            <p className="text-xs text-gray-600 mt-1">{String(item.productId.description)}</p>
                          </div>
                        )}
                        
                        {/* Remove Button */}
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => handleRemoveFromCart(item.productId._id)}
                            disabled={removeFromCartLoading}
                            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs px-3 py-1 rounded transition-colors"
                          >
                            {removeFromCartLoading ? 'Removing...' : 'Remove from Cart'}
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Cart Summary */}
                    <div className="mt-4 pt-3 border-t border-gray-200 bg-blue-50 p-3 rounded">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Total Items:</span> {String(cart.reduce((sum, item) => sum + (item.quantity || 0), 0))}
                        </div>
                        <div>
                          <span className="font-medium">Total Price:</span> ${String(cart.reduce((sum, item) => sum + ((item.productId?.price || 0) * (item.quantity || 0)), 0).toFixed(2))}
                        </div>
                        <div>
                          <span className="font-medium">Unique Products:</span> {String(cart.length)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Empty Cart Message */}
                {(!cart || !Array.isArray(cart) || cart.length === 0) && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    Your cart is empty. Add some products to get started!
                  </div>
                )}
                
                {/* Remove from Cart Error */}
                {removeFromCartError && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                    <span className="font-medium">Error:</span> {removeFromCartError}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Create Product Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Create Product Service</h2>
          <p className="text-gray-600 mb-4">
            Create a new product (requires authentication)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product Name *"
              value={productData.name}
              onChange={(e) => setProductData({...productData, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price *"
              value={productData.price}
              onChange={(e) => setProductData({...productData, price: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Stock *"
              value={productData.stock}
              onChange={(e) => setProductData({...productData, stock: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={productData.image}
              onChange={(e) => setProductData({...productData, image: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description (optional)"
              value={productData.description}
              onChange={(e) => setProductData({...productData, description: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              rows="3"
            />
          </div>
          
          {/* Categories Selection */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Categories * (select at least one):</p>
            <div className="flex flex-wrap gap-2">
              {['animals', 'space', 'flowers', 'lovables'].map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productData.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateProduct}
            disabled={!isLoggedIn}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isLoggedIn 
                ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Test Create Product
          </button>
        </div>

        {/* Get Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Get Profile Service</h2>
          <p className="text-gray-600 mb-4">
            Fetch the current user's profile information
          </p>
          <button
            onClick={fetchProfile}
            disabled={!isLoggedIn}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isLoggedIn 
                ? 'bg-purple-500 text-white hover:bg-purple-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Test Get Profile
          </button>
        </div>

        {/* Update Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Update Profile Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={updateData.name}
              onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={updateData.email}
              onChange={(e) => setUpdateData({...updateData, email: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={updateData.phone}
              onChange={(e) => setUpdateData({...updateData, phone: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={updateData.address}
              onChange={(e) => setUpdateData({...updateData, address: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            disabled={!isLoggedIn}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              isLoggedIn 
                ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Test Update Profile
          </button>
        </div>

        {/* Update Password Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Update Password Service</h2>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            disabled={!isLoggedIn}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              isLoggedIn 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Test Update Password
          </button>
        </div>

        {/* Forgot Password Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Forgot Password Service</h2>
          <p className="text-gray-600 mb-4">
            Send a password reset request to the specified email address
          </p>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button
            onClick={handleForgotPassword}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Test Forgot Password
          </button>
        </div>

        {/* Reset Password Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Reset Password Service</h2>
          <p className="text-gray-600 mb-4">
            Use the JWT token from the reset email to set a new password
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="JWT Token from reset email"
              value={resetPasswordJWT}
              onChange={(e) => setResetPasswordJWT(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={resetPasswordNewPassword}
              onChange={(e) => setResetPasswordNewPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Test Reset Password
          </button>
        </div>

        {/* Delete User Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Delete User Service</h2>
          <p className="text-gray-600 mb-4">
            Delete a user account (requires authentication)
          </p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="User ID to Delete *"
              value={deleteUserId}
              onChange={(e) => setDeleteUserId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button
            onClick={handleDeleteUser}
            disabled={!isLoggedIn || !deleteUserId.trim() || deleteUserLoading}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              isLoggedIn && deleteUserId.trim() && !deleteUserLoading
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {deleteUserLoading ? 'Deleting...' : 'Test Delete User'}
          </button>
        </div>

        {/* Logout Section */}
        {isLoggedIn && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Logout</h2>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

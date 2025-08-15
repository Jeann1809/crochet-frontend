// API Configuration for Node.js Backend
export const API_CONFIG = {
    // Base URL for your Node.js API
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    
    // API Endpoints
    ENDPOINTS: {
        // Products
        PRODUCTS: '/products',
        PRODUCT_CATEGORIES: '/products/categories',
        
        // Cart
        CART: '/cart',
        CART_ADD: '/cart/add',
        CART_UPDATE: '/cart/items',
        CART_REMOVE: '/cart/items',
        CART_CLEAR: '/cart/clear',
        
        // Orders
        ORDERS: '/orders',
        GUEST_ORDERS: '/orders/guest',
        
        // Authentication
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        CURRENT_USER: '/auth/me',
        
        // Shipping
        SHIPPING_OPTIONS: '/shipping/options',
        SHIPPING_CALCULATE: '/shipping/calculate'
    },
    
    // Request timeout (in milliseconds)
    TIMEOUT: 10000,
    
    // Retry configuration
    RETRY: {
        MAX_ATTEMPTS: 3,
        DELAY: 1000
    },
    
    // Headers
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get endpoint by key
export const getEndpoint = (key) => {
    return API_CONFIG.ENDPOINTS[key] || key;
};

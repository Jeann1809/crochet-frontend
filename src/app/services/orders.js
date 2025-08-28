import  api  from './api';

export async function createOrder(orderData) {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    let userId = null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id || payload._id || null;
      } catch (error) {
        // Handle error silently
      }
    }

    // Backend exposes POST /orders (no guest route). Send minimal payload.
    const endpoint = '/orders';

    const orderPayload = {
      products: orderData.products, // [{ productId, quantity }]
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      email: orderData.email || undefined, // guests provide email
      user: userId || orderData.user || undefined, // logged-in users
    };

    const response = await api.post(endpoint, orderPayload);
    return response.data;
  } catch (error) {
    // Handle error silently
    throw error;
  }
}

export async function getAllOrders() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await api.get('/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error silently
    throw error;
  }
}

export async function getOrdersByUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id || payload._id;
    
    if (!userId) {
      throw new Error("Could not extract user ID from token");
    }

    const response = await api.get(`/orders/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error silently
    throw error;
  }
}

export async function updateOrder(id, orderData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await api.put(`/orders/${id}`, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error silently
    throw error;
  }
}

export async function deleteOrder(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await api.delete(`/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error silently
    throw error;
  }
}

import  api  from './api';

export async function createOrder(orderData) {
  try {
    // If user is logged in, get their ID from token
    const token = localStorage.getItem("token");
    let userId = null;
    
    if (token) {
      try {
        // Decode JWT to get user ID (assuming token contains user info)
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id || payload._id;
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    // Prepare order payload
    const orderPayload = {
      ...orderData,
      user: userId || orderData.user || null,
      email: userId ? "n/a" : orderData.email, // Use provided email if no user ID
      createdAt: new Date().toISOString()
    };

    const response = await api.post('/orders', orderPayload);
    return response.data;
  } catch (error) {
    console.error("Create order failed:", error);
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
    console.error("Get all orders failed:", error);
    throw error;
  }
}

export async function getOrdersByUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    // Decode JWT to get user ID
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
    console.error("Get orders by user failed:", error);
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
    console.error("Update order failed:", error);
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
    console.error("Delete order failed:", error);
    throw error;
  }
}

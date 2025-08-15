import api from "./api";

export function getProducts() {
  return api.get('/products');
}

export function getProductById(id) {
  return api.get(`/products/${id}`);
}

export async function createProduct(productData) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await api.post('/products', productData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Create product failed:", error);
    throw error;
  }
}

export async function updateProduct(id, productData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Update product failed:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Delete product failed:", error);
    throw error;
  }
}

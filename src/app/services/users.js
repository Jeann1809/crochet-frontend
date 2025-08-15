// services/users.js
import api from "./api";
import { jwtDecode } from "jwt-decode";

// Login function
export async function loginUser(credentials) {
  try {
    const response = await api.post("/users/login", credentials);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function getID() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const decoded = jwtDecode(token);
  
  // Try different possible field names for user ID
  const id = decoded.id || decoded.userId || decoded._id || decoded.user_id;
  return id;
}

// Get profile
export async function getUserProfile() {
  const id = await getID();
  try {
    const response = await api.get(`/users/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fetching profile failed:", error);
    throw error;
  }
}

// Register user
export async function registerUser(userData) {
  try {
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("Name, email, and password are required");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error("Please enter a valid email address");
    }

    // Password strength validation
    if (userData.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    // Prepare the registration payload
    const registrationPayload = {
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      phone: userData.phone?.trim() || "",
      shippingAddress: {
        street: userData.shippingAddress?.street?.trim() || "",
        city: userData.shippingAddress?.city?.trim() || "",
        zip: userData.shippingAddress?.zip?.trim() || "",
        country: userData.shippingAddress?.country?.trim() || ""
      },
      role: userData.role || "customer"
    };

    // Make the API call
    const response = await api.post('/users/register', registrationPayload);
    
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    
    // Handle different types of errors
    if (error.response?.status === 409) {
      throw new Error("An account with this email already exists");
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || "Invalid registration data");
    } else if (error.response?.status === 422) {
      throw new Error(error.response.data?.message || "Validation failed");
    } else if (error.message) {
      throw error; // Re-throw our custom validation errors
    } else {
      throw new Error("Registration failed. Please try again later.");
    }
  }
}

// Update user info
export async function updateUser(updatedData) {
  const id = await getID();
  const token = localStorage.getItem("token");

  try {
    const response = await api.put(`/users/update/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

// Update password
export async function updatePass(newPassword) {
  const id = await getID();
  const token = localStorage.getItem("token");

  try {
    const response = await api.put(
      `/users/updatepass/${id}`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Password update failed:", error);
    throw error;
  }
}

// Forgot password
export async function forgotPassword(email) {
  try {
    const response = await api.put("/users/forgetpass", { email });
    return response.data;
  } catch (error) {
    console.error("Forgot password request failed:", error);
    throw error;
  }
}

// Reset password with JWT token
export async function resetPassword(token, newPassword) {
  try {
    const response = await api.post('/users/reset-password', {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = await api.delete(`/users/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Delete user failed:", error);
    throw error;
  }
}

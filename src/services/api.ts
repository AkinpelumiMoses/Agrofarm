const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4500/api';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to create headers with auth
const createHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const productApi = {
  // Get products
  getAllProducts: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/products/All`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

   // Get all products
  getProducts: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get product by ID
  getProductById: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('failed to fetch product');
    return response.json();
  },

  // Create new product
  createProduct: async (product: Omit<any, '_id'>): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: createHeaders(true),
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  // Update product
  updateProduct: async (id: string, product: Partial<any>): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },
};

export const authApi = {
  // User signup
  signup: async (userData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  // newstaff signup
   newstaff: async (userData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/newstaff`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create staff');
    return response.json();
  },

  // User login
  login: async (credentials: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  // User logout
  logout: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: 'POST',
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Logout failed');
  },

  // user logout from all devices
    logoutAll: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/logoutAll`, {
      method: 'POST',
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Logout failed');
  },

  

  // Get user profile
  getProfile: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  // Update user profile
  updateProfile: async (userData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: createHeaders(true),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  // Delete user account
   deleteAccount: async (userData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'DELETE',
      headers: createHeaders(true),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
};

export const orderApi = {
  // Create order from cart
  createOrder: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Get user orders
  getUserOrders: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Get staff orders only
getStaffOrders: async (status?: string): Promise<any> => {
    const url = new URL(`${API_BASE_URL}/orders/staff-orders`);
    if (status) url.searchParams.append('status', status);
    
    const response = await fetch(url.toString(), {
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to fetch all orders');
    return response.json();
  },

  // Get all orders (admin)
  getAllOrders: async (status?: string): Promise<any> => {
    const url = new URL(`${API_BASE_URL}/orders/admin/all-orders`);
    if (status) url.searchParams.append('status', status);
    
    const response = await fetch(url.toString(), {
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to fetch all orders');
    return response.json();
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  // Update order status (admin)
  updateOrderStatus: async (id: string, status: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: createHeaders(true),
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },
};

export const cartApi = {
  // Get user cart
  getCart: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: createHeaders(true),
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  // Remove item from cart
  removeFromCart: async (productId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },

  // Clear cart
  clearCart: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  },
};

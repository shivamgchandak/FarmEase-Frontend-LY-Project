import axiosInstance from './axiosInstance';

export const consumerApi = {
  // Profile
  getProfile: () => axiosInstance.get('/consumer/profile'),
  updateProfile: (data: any) => axiosInstance.put('/consumer/profile', data),
  
  // Addresses
  addAddress: (data: any) => axiosInstance.post('/consumer/addresses', data),
  updateAddress: (id: string, data: any) => 
    axiosInstance.put(`/consumer/addresses/${id}`, data),
  deleteAddress: (id: string) => 
    axiosInstance.delete(`/consumer/addresses/${id}`),
  
  // Products
  getProducts: (params?: any) => axiosInstance.get('/products', { params }),
  getProductById: (id: string) => axiosInstance.get(`/products/${id}`),
  getUrgentProducts: () => axiosInstance.get('/products/urgent'),
  
  // Cart
  getCart: () => axiosInstance.get('/cart'),
  addToCart: (data: any) => axiosInstance.post('/cart/add', data),
  updateCartItem: (itemId: string, data: any) => 
    axiosInstance.put(`/cart/update/${itemId}`, data),
  removeFromCart: (itemId: string) => 
    axiosInstance.delete(`/cart/remove/${itemId}`),
  clearCart: () => axiosInstance.delete('/cart/clear'),
  
  // Orders
  createOrder: (data: any) => axiosInstance.post('/orders/create', data),
  createPaymentIntent: (amount: number) => 
    axiosInstance.post('/orders/create-payment-intent', { amount }),
  updatePaymentStatus: (orderId: string, data: any) => 
    axiosInstance.patch(`/orders/${orderId}/payment`, data),
  getOrders: (params?: any) => axiosInstance.get('/orders', { params }),
  getOrderById: (orderId: string) => axiosInstance.get(`/orders/${orderId}`),
  cancelOrder: (orderId: string, reason: string) => 
    axiosInstance.patch(`/orders/${orderId}/cancel`, { reason }),
  getOrderStats: () => axiosInstance.get('/orders/stats/summary'),
};
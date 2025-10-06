// api/consumerApi.ts
import { consumerAxios } from './axiosInstance';
import { ENDPOINTS } from './config';

export const consumerApi = {
  // Profile
  getProfile: () => consumerAxios.get(ENDPOINTS.CONSUMER.PROFILE),
  updateProfile: (data: any) => consumerAxios.put(ENDPOINTS.CONSUMER.PROFILE, data),
  
  // Addresses
  addAddress: (data: any) => consumerAxios.post(ENDPOINTS.CONSUMER.ADDRESSES, data),
  updateAddress: (id: string, data: any) => 
    consumerAxios.put(`${ENDPOINTS.CONSUMER.ADDRESSES}/${id}`, data),
  deleteAddress: (id: string) => 
    consumerAxios.delete(`${ENDPOINTS.CONSUMER.ADDRESSES}/${id}`),
  
  // Products
  getProducts: (params?: any) => consumerAxios.get(ENDPOINTS.PRODUCTS.LIST, { params }),
  getProductById: (id: string) => 
    consumerAxios.get(ENDPOINTS.PRODUCTS.DETAIL.replace(':id', id)),
  getUrgentProducts: () => consumerAxios.get(ENDPOINTS.PRODUCTS.URGENT),
  searchProducts: (query: string) => 
    consumerAxios.get(ENDPOINTS.PRODUCTS.SEARCH, { params: { q: query } }),
  getCategories: () => consumerAxios.get(ENDPOINTS.PRODUCTS.CATEGORIES),
  
  // Cart
  getCart: () => consumerAxios.get(ENDPOINTS.CART.GET),
  addToCart: (data: any) => consumerAxios.post(ENDPOINTS.CART.ADD, data),
  updateCartItem: (itemId: string, data: any) => 
    consumerAxios.put(ENDPOINTS.CART.UPDATE.replace(':itemId', itemId), data),
  removeFromCart: (itemId: string) => 
    consumerAxios.delete(ENDPOINTS.CART.REMOVE.replace(':itemId', itemId)),
  clearCart: () => consumerAxios.delete(ENDPOINTS.CART.CLEAR),
  
  // Orders
  createOrder: (data: any) => consumerAxios.post(ENDPOINTS.ORDERS.CREATE, data),
  createPaymentIntent: (amount: number) => 
    consumerAxios.post(ENDPOINTS.ORDERS.PAYMENT_INTENT, { amount }),
  updatePaymentStatus: (orderId: string, data: any) => 
    consumerAxios.patch(ENDPOINTS.ORDERS.UPDATE_PAYMENT.replace(':orderId', orderId), data),
  getOrders: (params?: any) => consumerAxios.get(ENDPOINTS.ORDERS.LIST, { params }),
  getOrderById: (orderId: string) => 
    consumerAxios.get(ENDPOINTS.ORDERS.DETAIL.replace(':orderId', orderId)),
  cancelOrder: (orderId: string, reason: string) => 
    consumerAxios.patch(ENDPOINTS.ORDERS.CANCEL.replace(':orderId', orderId), { reason }),
  getOrderStats: () => consumerAxios.get('/orders/stats/summary'),
};
import { create } from 'zustand';
import axiosInstance from '@/api/axiosInstance';

interface Order {
  _id: string;
  orderId: string;
  consumerId: string;
  items: any[];
  shippingAddress: any;
  paymentDetails: any;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createOrder: (orderData: any) => Promise<any>;
  fetchOrders: (filters?: any) => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string, reason: string) => Promise<void>;
  createPaymentIntent: (amount: number) => Promise<any>;
  updatePaymentStatus: (orderId: string, paymentData: any) => Promise<void>;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/orders/create', orderData);
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to create order',
        isLoading: false 
      });
      throw error;
    }
  },

  fetchOrders: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/orders', { params: filters });
      set({ 
        orders: response.data.orders || response.data, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch orders',
        isLoading: false 
      });
    }
  },

  fetchOrderById: async (orderId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      set({ selectedOrder: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch order',
        isLoading: false 
      });
    }
  },

  cancelOrder: async (orderId: string, reason: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/orders/${orderId}/cancel`, { reason });
      
      // Refresh orders
      await get().fetchOrders();
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to cancel order',
        isLoading: false 
      });
      throw error;
    }
  },

  createPaymentIntent: async (amount: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/orders/create-payment-intent', { amount });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to create payment intent',
        isLoading: false 
      });
      throw error;
    }
  },

  updatePaymentStatus: async (orderId: string, paymentData: any) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/orders/${orderId}/payment`, paymentData);
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to update payment status',
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
import { create } from 'zustand';
import axiosInstance from '@/api/axiosInstance';

interface CartItem {
  _id: string;
  productId: string;
  productName: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  pricePerUnit: number;
  imageUrl?: string;
  isUrgent?: boolean;
}

interface Cart {
  _id: string;
  consumerId: string;
  items: CartItem[];
  totalAmount: number;
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (item: Partial<CartItem>) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItemCount: () => number;
  clearError: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/cart');
      set({ cart: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch cart',
        isLoading: false 
      });
    }
  },

  addToCart: async (item) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/cart/add', item);
      set({ cart: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to add item to cart',
        isLoading: false 
      });
      throw error;
    }
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/cart/update/${itemId}`, { quantity });
      set({ cart: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to update cart item',
        isLoading: false 
      });
      throw error;
    }
  },

  removeFromCart: async (itemId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/cart/remove/${itemId}`);
      set({ cart: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to remove item from cart',
        isLoading: false 
      });
      throw error;
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete('/cart/clear');
      set({ cart: response.data.cart, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to clear cart',
        isLoading: false 
      });
    }
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart?.items?.length || 0;
  },

  clearError: () => set({ error: null }),
}));
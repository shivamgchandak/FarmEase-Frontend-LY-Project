import { create } from 'zustand';
import axiosInstance from '@/api/axiosInstance';

interface Product {
  _id: string;
  productId: string;
  name: string;
  description: string;
  category: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: {
    city: string;
    state: string;
  };
  images: Array<{ url: string; isPrimary: boolean }>;
  price: number;
  originalPrice?: number;
  discountPercent: number;
  unit: string;
  stock: number;
  rating: {
    average: number;
    count: number;
  };
  isUrgent: boolean;
  expiryDate?: string;
}

interface ProductState {
  products: Product[];
  urgentProducts: Product[];
  categories: any[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: (filters?: any) => Promise<void>;
  fetchUrgentProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  urgentProducts: [],
  categories: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/products', { params: filters });
      set({ 
        products: response.data.products || response.data, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch products',
        isLoading: false 
      });
    }
  },

  fetchUrgentProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/products/urgent');
      set({ urgentProducts: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch urgent products',
        isLoading: false 
      });
    }
  },

  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ selectedProduct: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch product',
        isLoading: false 
      });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/categories');
      set({ categories: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch categories',
        isLoading: false 
      });
    }
  },

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/products', {
        params: { search: query }
      });
      set({ products: response.data.products || response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to search products',
        isLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));
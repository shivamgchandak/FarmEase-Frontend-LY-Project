// store/productStore.ts (Updated to use consumerAxios)
import { create } from 'zustand';
import { consumerAxios } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/config';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

interface Product {
  _id: string;
  productId: string;
  name: string;
  description: string;
  category: Category | string;
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
  categories: Category[];
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
      const response = await consumerAxios.get(ENDPOINTS.PRODUCTS.LIST, { params: filters });
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
      const response = await consumerAxios.get(ENDPOINTS.PRODUCTS.URGENT);
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
      const response = await consumerAxios.get(ENDPOINTS.PRODUCTS.DETAIL.replace(':id', id));
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
      const response = await consumerAxios.get(ENDPOINTS.PRODUCTS.CATEGORIES);
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
      const response = await consumerAxios.get(ENDPOINTS.PRODUCTS.SEARCH, {
        params: { q: query }
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

// Helper function to get category name
export const getCategoryName = (category: Category | string): string => {
  if (typeof category === 'string') {
    return category;
  }
  return category?.name || 'N/A';
};

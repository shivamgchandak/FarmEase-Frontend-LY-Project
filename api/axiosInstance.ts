// api/axiosInstances.ts
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '../store/authStore';
import { API_CONFIG } from './config';

// Create axios instance factory
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add auth token
  instance.interceptors.request.use(
    (config) => {
      const { accessToken } = useAuthStore.getState();
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle token refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { refreshAccessToken } = useAuthStore.getState();
          await refreshAccessToken();

          // Retry the original request with new token
          const { accessToken } = useAuthStore.getState();
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
          return instance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          const { logout } = useAuthStore.getState();
          await logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create separate instances for each service
export const authAxios = createAxiosInstance(API_CONFIG.AUTH_SERVICE);
export const consumerAxios = createAxiosInstance(API_CONFIG.CONSUMER_SERVICE);
export const farmerAxios = createAxiosInstance(API_CONFIG.FARMER_SERVICE);
export const productAxios = createAxiosInstance(API_CONFIG.PRODUCT_SERVICE);

// Default export for backward compatibility (uses CONSUMER_SERVICE)
export default consumerAxios;
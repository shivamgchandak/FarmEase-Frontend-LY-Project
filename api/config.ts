// api/config.ts
export const API_CONFIG = {
  AUTH_SERVICE: 'https://wvsgtjj7-3000.inc1.devtunnels.ms/api',
  CONSUMER_SERVICE: 'https://wvsgtjj7-3001.inc1.devtunnels.ms/api',
  FARMER_SERVICE: 'https://wvsgtjj7-3002.inc1.devtunnels.ms/api',
  PRODUCT_SERVICE: 'https://wvsgtjj7-3003.inc1.devtunnels.ms/api', // Usually same as consumer
};

export const ENDPOINTS = {
  // Auth endpoints (use AUTH_SERVICE)
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register', 
    LOGOUT: '/auth/logout',
    VERIFY_OTP: '/auth/verify-otp',
    SEND_OTP: '/auth/send-otp',
    REFRESH: '/token/refresh',
  },
  
  // Consumer endpoints (use CONSUMER_SERVICE)
  CONSUMER: {
    PROFILE: '/consumer/profile',
    ADDRESSES: '/consumer/addresses',
  },
  
  // Product endpoints (use CONSUMER_SERVICE or PRODUCT_SERVICE)
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    URGENT: '/products/urgent',
    CATEGORIES: '/categories',
    SEARCH: '/products/search',
  },
  
  // Cart endpoints (use CONSUMER_SERVICE)
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update/:itemId',
    REMOVE: '/cart/remove/:itemId',
    CLEAR: '/cart/clear',
  },
  
  // Order endpoints (use CONSUMER_SERVICE)
  ORDERS: {
    CREATE: '/orders/create',
    LIST: '/orders',
    DETAIL: '/orders/:orderId',
    CANCEL: '/orders/:orderId/cancel',
    PAYMENT_INTENT: '/orders/create-payment-intent',
    UPDATE_PAYMENT: '/orders/:orderId/payment',
  },
  
  // Farmer endpoints (use FARMER_SERVICE)
  FARMER: {
    PROFILE: '/farmer/profile',
    DASHBOARD: '/farmer/dashboard',
    PRODUCTS: '/farmer/my-products',
    EARNINGS: '/earnings',
    ANALYTICS: '/analytics',
    GET: '/farmer/nearby?latitude=19.0760&longitude=72.8777'
  },
};
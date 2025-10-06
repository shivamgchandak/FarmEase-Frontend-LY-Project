export const API_CONFIG = {
  AUTH_SERVICE: 'http://localhost:3000/api/auth',
  CONSUMER_SERVICE: 'http://localhost:3001/api',
  FARMER_SERVICE: 'http://localhost:3002/api',
  PRODUCT_SERVICE: 'http://localhost:3003/api',
};

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register', 
    LOGOUT: '/auth/logout',
    VERIFY_OTP: '/auth/verify-otp',
    SEND_OTP: '/auth/send-otp',
    REFRESH: '/token/refresh',
  },
  
  // Consumer
  CONSUMER: {
    PROFILE: '/consumer/profile',
    ADDRESSES: '/consumer/addresses',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    URGENT: '/products/urgent',
    CATEGORIES: '/categories',
    SEARCH: '/products/search',
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update/:itemId',
    REMOVE: '/cart/remove/:itemId',
    CLEAR: '/cart/clear',
  },
  
  // Orders
  ORDERS: {
    CREATE: '/orders/create',
    LIST: '/orders',
    DETAIL: '/orders/:orderId',
    CANCEL: '/orders/:orderId/cancel',
    PAYMENT_INTENT: '/orders/create-payment-intent',
    UPDATE_PAYMENT: '/orders/:orderId/payment',
  },
  
  // Farmer
  FARMER: {
    PROFILE: '/farmer/profile',
    DASHBOARD: '/farmer/dashboard',
    PRODUCTS: '/farmer/my-products',
    EARNINGS: '/earnings',
    ANALYTICS: '/analytics',
  },
};
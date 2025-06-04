import axios from "axios";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtPlugin(({ $config }) => {
  const { $loader } = useNuxtApp();
  const api = axios.create({
    baseURL: $config.public.API_URL,
    withCredentials: true,
  });

  const authStore = useAuthStore();
  
  // For token refresh management
  let isRefreshing = false;
  let refreshSubscribers = [];

  // Function to add failed requests to queue
  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  // Function to retry all queued requests
  const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  };

  // Request interceptor to add Bearer token to all requests
  api.interceptors.request.use(
    (config) => {
      const accessToken = authStore.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 errors and token refresh
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // If 401 error and not already retrying
      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          $loader.show();

          try {
            // Get refresh token
            const refreshToken = authStore.refreshToken;
            if (!refreshToken) {
              return Promise.reject(error);
            }

            // Call refresh token endpoint
            const response = await authStore.doRefreshToken();
            
            if (response?.data?.data) {
              // Notify all subscribers about the new token
              onRefreshed(authStore.accessToken);
              $loader.hide();
              isRefreshing = false;
              
              // Create a fresh request with new token
              const newRequest = { ...originalRequest };
              newRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${authStore.accessToken}`,
              };
              return api(newRequest);
            } else {
              // If refresh failed, reject all pending requests
              refreshSubscribers = [];
              isRefreshing = false;
              $loader.hide();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            // If refresh failed, reject all pending requests
            refreshSubscribers = [];
            isRefreshing = false;
            $loader.hide();
            return Promise.reject(refreshError);
          }
        } else {
          // If already refreshing, add request to queue
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});

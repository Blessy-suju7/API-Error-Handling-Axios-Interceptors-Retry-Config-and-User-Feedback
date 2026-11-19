
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor: attach authentication token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle global errors
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    // 401: redirect to login
    if (status === 401) {
      window.location.href = "/login";
    }

    // 5xx: show global error message
    if (status >= 500) {
      window.alert("Something went wrong. Please try again later.");
    }

    // Pass all errors to TanStack Query and component onError
    return Promise.reject(error);
  }
);

export default apiClient;

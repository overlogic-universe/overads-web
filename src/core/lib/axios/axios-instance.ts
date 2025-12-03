import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

console.log("process.env.API_URL: ",process.env.NEXT_PUBLIC_API_URL )

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Jika ingin menambah header lain secara global
    config.headers["Cache-Control"] = "no-cache";
    config.headers.Pragma = "no-cache";

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token invalid atau expired");

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

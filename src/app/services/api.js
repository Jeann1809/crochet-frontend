import axios from "axios";
import { API_CONFIG } from "../config/api.config";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || API_CONFIG.BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: API_CONFIG.TIMEOUT || 20000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {}
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with retry/backoff for network/timeout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};
    const isNetwork = !error.response;
    const isTimeout = error.code === "ECONNABORTED" || /timeout/i.test(error.message || "");

    if ((isNetwork || isTimeout) && !config.__retryCount) {
      config.__retryCount = 0;
    }

    if ((isNetwork || isTimeout) && config.__retryCount < (API_CONFIG.RETRY?.MAX_ATTEMPTS || 0)) {
      config.__retryCount += 1;
      const delay = (API_CONFIG.RETRY?.DELAY || 1000) * Math.pow(2, config.__retryCount - 1);
      await new Promise((res) => setTimeout(res, delay));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;

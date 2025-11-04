import axios from "axios";

export const apiBaseurl = process.env.NEXT_PUBLIC_ROCKWORTH_BACKEND_API;
export const verificationKey = process.env.NEXT_PUBLIC_PRODUCT_VERIFICATION_KEY;

// Validate environment variables
if (!apiBaseurl) {
  console.error("NEXT_PUBLIC_ROCKWORTH_BACKEND_API is not set");
}

if (!verificationKey) {
  console.error("NEXT_PUBLIC_PRODUCT_VERIFICATION_KEY is not set");
}

export const api = axios.create({
  baseURL: `${apiBaseurl}/api/v1/it`,
  headers: {
    "Content-Type": "application/json",
    "verification-key": `${verificationKey}`,
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    console.error("API Response Error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

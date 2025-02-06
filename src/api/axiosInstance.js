import axios from "axios";
import { HandleAxiosError } from "./axioserror";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
     },
});

// Request Interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers["authorization"] = `Bearer ${String(token)}`;
  }
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    if (res.data?.data?.accessToken) {
      sessionStorage.setItem("accessToken", res.data.data.accessToken);
    }
    return res;
  },
  (err) => {
    HandleAxiosError(err)// Call the error handler function
    return Promise.reject(err);
  }
);



export { axiosInstance };





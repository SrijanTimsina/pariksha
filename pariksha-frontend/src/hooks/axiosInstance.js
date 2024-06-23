import axios from "axios";
import { API_URL } from "./constant.js";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Request was made and server responded with a status code out of the range of 2xx
      return Promise.reject(error.response);
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject(new Error("No response received from the server."));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new Error(error.message));
    }
  }
);

export default axiosInstance;

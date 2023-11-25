import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const REQUEST_TIMEOUT = 30000;

// generate with ngrok
const baseUrl = "https://ca02-2405-4800-5716-5eaf-f06f-842a-5a3f-2ba8.ngrok-free.app/api";
export const axiosClient = axios.create({
  baseURL: baseUrl, // Set the base URL for all requests
  timeout: 30000, // Set the default timeout for requests

  // Set default headers if needed
  headers: {
    common: {
      authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
    },
  },
});

const InterceptorsRequest = async (config: AxiosRequestConfig) => {
  // lấy token từ store và gắn vào header trước khi gửi request
  const token = await AsyncStorage.getItem("token");
  if (token === undefined) {
    return config;
  }

  const interceptorHeaders = {
    token: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const headers = {
    ...config.headers,
    ...interceptorHeaders,
  };

  config.headers = headers;
  return config;
};

const InterceptorsError = (error: AxiosError) => {
  console.error("Lỗi: ", error);
  if (error.config) {
    console.log('Request:', error.config);
  }
  if (error.response) {
    console.log('Response:', error.response);
  }
  return Promise.reject(error);
};

const InterceptorResponse = (response: AxiosResponse) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
};

axiosClient.interceptors.request.use(
  InterceptorsRequest as any,
  InterceptorsError
);
axiosClient.interceptors.response.use(InterceptorResponse, InterceptorsError);

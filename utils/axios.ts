import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

export const REQUEST_TIMEOUT = 30000;

// generate with ngrok
const baseUrl = "http://clinusapi.live/api/";
export const axiosClient = axios.create({
  baseURL: baseUrl, // Set the base URL for all requests
  timeout: 30000, // Set the default timeout for requests

  // Set default headers if needed
  headers: {
    common: {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
    },
  },
});

const InterceptorsRequest = async (config: AxiosRequestConfig) => {
  // lấy token từ cookie và gắn vào header trước khi gửi request
  const token = await SecureStore.getItemAsync("token");

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
  // thông báo lỗi khi không gửi hay nhận được request
  // eslint-disable-next-line no-console
  console.error("Lỗi: ", error);
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

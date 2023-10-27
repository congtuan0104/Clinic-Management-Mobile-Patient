import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const REQUEST_TIMEOUT = 30000;

// generate with ngrok
const baseUrl =
  "https://c991-2402-800-63a8-8e84-88c6-df-829-f493.ngrok-free.app/api";
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

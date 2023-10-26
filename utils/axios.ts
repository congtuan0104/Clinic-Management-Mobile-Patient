import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const REQUEST_TIMEOUT = 30000;

export const axiosClient = axios.create({
  // host api được cấu hình trong vite.config.ts -> thay đổi theo env
  baseURL: "http://localhost:2222/api",
  timeout: REQUEST_TIMEOUT,

  // Config header token
  // headers: {
  //   Authorization: 'Bearer token'
  // }
});

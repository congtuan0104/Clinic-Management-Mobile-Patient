import { axiosClient } from "../utils/axios";
import {
  ILoginRequest,
  ILoginResponse,
  IApiResponse,
  IRegisterRequest,
  IRegisterResponse,
  ILoginWithGoogleRequest,
  ILoginWithGoogleResponse,
} from "../types";

export const authApi = {
  login(data: ILoginRequest): Promise<IApiResponse<ILoginResponse>> {
    return axiosClient.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
  },
  register(data: IRegisterRequest): Promise<IApiResponse<IRegisterResponse>> {
    return axiosClient.post("/auth/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  },
  loginWithGoogle(
    data: ILoginWithGoogleRequest
  ): Promise<IApiResponse<ILoginWithGoogleResponse>> {
    return axiosClient.post("/auth/account", data);
  },
};

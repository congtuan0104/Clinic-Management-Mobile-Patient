import { axiosClient } from "../utils/axios";
import { ILoginRequest, ILoginResponse, IApiResponse } from "../types";

export const authApi = {
  login(data: ILoginRequest): Promise<IApiResponse<ILoginResponse>> {
    return axiosClient.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
  },
};

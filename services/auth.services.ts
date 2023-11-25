import { axiosClient } from "../utils/axios";
import {
  ILoginRequest,
  ILoginResponse,
  IApiResponse,
  IRegisterRequest,
  IRegisterResponse,
  ILoginWithGoogleRequest,
  ILoginWithGoogleResponse,
  ILoginResponseData,
  ILinkAccountRequest
} from "../types";

export const authApi = {
  async login(data: ILoginRequest): Promise<ILoginResponseData> {
    // Log thông tin request trước khi gửi đi
    console.log('Login Request:', {
      email: data.email,
      password: data.password,
    });

    // Gửi request và nhận response từ server
    return axiosClient.post("/auth/login", {
      email: data.email,
      password: data.password,
    })
      .then(response => {
        // Log thông tin response khi nhận được từ server
        console.log('Login Response:', response);
        return response.data; // Trả về dữ liệu từ response
      })
      .catch(error => {
        // Xử lý và log lỗi khi gọi API
        console.error('Login Error:', error);
        throw error; // Ném lại error để xử lý ở phần gọi API
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
  getUserByAccountId(accountId: string, provider: string): Promise<any> {
    return axiosClient.get(
      `/auth/account?key=${accountId}&provider=${provider}`
    );
  },
  sendEmailVerifyUser(data: {
    email: string;
    key: string;
    provider: string;
  }): Promise<any> {
    return axiosClient.get("/auth/user/send-email-verify-user", {
      params: data,
    });
  },

  linkAccount(data: ILinkAccountRequest): Promise<any> {
    return axiosClient.post('/auth/link-account', data);
  },

  geLinkAccount(userId: string): Promise<any> {
    return axiosClient.get(`/auth/${userId}/accounts`);
  },
  
  disConnectLinkAccount(userId: string, accountId: string): Promise<any> {
    return axiosClient.delete(`/auth/${userId}/accounts/${accountId}`);
  }
};

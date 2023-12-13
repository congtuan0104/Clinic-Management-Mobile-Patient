// Interface cho thông tin người dùng

export interface IUserInfo {
  id: string;
  email: string;
  isInputPassword: boolean;
  emailVerified: boolean;
  role: string;
}

// Interface xử lí đăng nhập

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUserInfo;
  token: string;
}

export interface ILoginWithGoogleRequest {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface ILoginResponseData {
  token: string;
  user: IUserInfo;
}

export interface ILoginWithGoogleResponse {
  data: {
    user: {
      email: string;
      emailVerified: boolean;
      id: string;
      password: string;
      role: string;
    };
    token: string;
  };
  message: string;
  status: string;
}

// Register

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface IRegisterResponse {
  user: IUserInfo;
}

export interface ILinkAccountRequest {
  key: string | null;
  userId: string | null | undefined;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  provider: string | null;
}

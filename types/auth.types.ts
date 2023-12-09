import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Create an object type with mappings for route name to the params of the route
export type RootNativeStackParamList = {
  // undefined: the route doesn't have params
  Login: { setLogin: (user: IUserInfo | null, token: string | null) => void };
  Register: {
    setLogin: (user: IUserInfo | null, token: string | null) => void;
  };
  UserScreen: { setLogout: () => void };
  DoctorScreen: { setLogout: () => void };
  ValidateNotification: {
    setLogin: (user: IUserInfo | null, token: string | null) => void;
  };
};

// Define type of props
export type LoginScreenProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "Login"
>;
export type RegisterScreenProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "Register"
>;

export type UserScreenProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "UserScreen"
>;

export type DoctorScreenProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "DoctorScreen"
>;

export type ValidateNotificationProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "ValidateNotification"
>;

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

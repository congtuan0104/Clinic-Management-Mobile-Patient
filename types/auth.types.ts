import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Create an object type with mappings for route name to the params of the route
export type RootNativeStackParamList = {
  // undefined: the route doesn't have params
  Login: { setToken: (token: string | null) => void };
  Register: { setToken: (token: string | null) => void };
  Home: { setToken: (token: string | null) => void };
  ValidateNotification: {
    email: string;
    setToken: (token: string | null) => void;
  };
  UserProfile: undefined;
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

export type HomeScreenProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "Home"
>;

export type UserProfileScreenProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "UserProfile"
>;

export type ValidateNotificationProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "ValidateNotification"
>;

export interface IUserInfo {
  id: string;
  email: string;
  emailVerified: boolean;
  role: string;
  token: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginWithGoogleRequest {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface ILoginResponse {
  data: {
    token: string;
    user: IUserInfo;
  };
  message: string;
  status: string;
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

export interface IRegisterResponse {
  data: {
    user: IUserInfo;
  };
  message: string;
  status: string;
}

export interface ILinkAccountRequest {
  key: string | null;
  userId: string | null | undefined;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  provider: string | null;
}
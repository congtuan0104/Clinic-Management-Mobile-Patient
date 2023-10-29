import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Create an object type with mappings for route name to the params of the route
export type RootNativeStackParamList = {
  // undefined: the route doesn't have params
  Login: { setToken: (token: string | null) => void };
  Register: { setToken: (token: string | null) => void };
  Home: { setToken: (token: string | null) => void };
  ValidateNotification: { setToken: (token: string | null) => void };
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

export type ValidateNotificationProps = NativeStackScreenProps<
  RootNativeStackParamList,
  "ValidateNotification"
>;

export interface IUserInfo {
  id: string;
  email: string;
  emailVerified: boolean;
  role: string;
  // firstName: string;
  // lastName: string;
  // token: string;
  // avatar: string;
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

export interface ILoginResponse {
  data: {
    token: string;
    user: IUserInfo;
  };
  message: string;
  status: string;
}

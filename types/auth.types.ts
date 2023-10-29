import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Create an object type with mappings for route name to the params of the route
export type RootNativeStackParamList = {
  // undefined: the route doesn't have params
  Login: { setToken: (token: string | null) => void };
  Register: undefined;
  Home: { setToken: (token: string | null) => void };
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

// Comment soon
export interface IRegisterInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginResponse {
  data: {
    token: string;
    user: IUserInfo;
  };
  message: string;
  status: string;
}

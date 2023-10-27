import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Create an object type with mappings for route name to the params of the route
export type RootNativeStackParamList = {
  // undefined: the route doesn't have params
  Login: { setUserToken: (token: any | null) => void };
  Register: undefined;
  Home: { setUserToken: (token: any | null) => void };
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
  password: string;
  emailVerified: boolean;
  role: string;
}

export type LoginInfo = {
  username: string;
  password: string;
};

export type RegisterInfo = {
  email: string;
  password: string;
  confirmPassword: string;
};

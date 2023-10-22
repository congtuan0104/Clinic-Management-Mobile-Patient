import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Create an object type with mappings for route name to the params of the route
export type RootNativeStackParamList = {
  // undefined: the route doesn't have params
  Login: undefined;
  Register: undefined;
}
// Define type of props
export type LoginScreenProps = NativeStackScreenProps<RootNativeStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootNativeStackParamList, 'Register'>;

export interface IUserInfo {
  id: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: string;
}
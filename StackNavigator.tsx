import { LogBox, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/AuthenticationScreen/Login/LoginScreen";
import RegisterScreen from "./screens/AuthenticationScreen/Register/RegisterScreen";
import { ILoginResponse, IUserInfo, RootNativeStackParamList } from "./types";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import UserScreen from "./screens/UserScreen/UserScreen";
import ValidateNotification from "./screens/AuthenticationScreen/ValidateNotification/ValidateNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreUserInfo } from "./store";
import SplashScreen from "./screens/AuthenticationScreen/SplashScreen/SplashScreen";
import { ReactNavigationTheme } from "./config/react-navigation.theme";
import DoctorScreen from "./screens/DoctorScreen/DoctorScreen";
import { useAppDispatch } from "./hooks";

const StackNavigator = () => {
  // define userToken for validation
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<IUserInfo | null>(null);
  const RootStack = createNativeStackNavigator<RootNativeStackParamList>();

  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  // Telling out navigator use it

  React.useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        // Restore userInfo and dispatch to the store
        const testData = await AsyncStorage.getItem("user");
        const tokenString = await AsyncStorage.getItem("token");
        if (tokenString && testData) {
          setToken(tokenString);
          const testDataObject = JSON.parse(testData);
          setUser(testDataObject);
          const UserResponseObject: ILoginResponse = {
            user: testDataObject,
            token: tokenString,
          };
          dispatch(restoreUserInfo(UserResponseObject));
        } else {
          setToken(null);
        }
      } catch (e) {
        // Restoring token failed
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={ReactNavigationTheme}>
        <RootStack.Navigator>
          {token === null ? (
            <>
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
                initialParams={{ setToken }}
              />
              <RootStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
                initialParams={{ setToken }}
              />
              <RootStack.Screen
                name="ValidateNotification"
                component={ValidateNotification}
                options={{ headerShown: false }}
                initialParams={{ setToken }}
              />
            </>
          ) : user?.role === "doctor" ? (
            <>
              <RootStack.Screen
                name="DoctorScreen"
                component={DoctorScreen}
                options={{ headerShown: false }}
                initialParams={{ setToken }}
              />
            </>
          ) : user?.role === "user" ? (
            <>
              <RootStack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerShown: false }}
                initialParams={{ setToken }}
              />
            </>
          ) : null}
        </RootStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

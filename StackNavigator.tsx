import { LogBox, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/AuthenticationScreen/Login/LoginScreen";
import RegisterScreen from "./screens/AuthenticationScreen/Register/RegisterScreen";
import { RootNativeStackParamList } from "./types";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import UserScreen from "./screens/UserScreen/UserScreen";
import ValidateNotification from "./screens/AuthenticationScreen/ValidateNotification/ValidateNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeState } from "./store";
import SplashScreen from "./screens/AuthenticationScreen/SplashScreen/SplashScreen";
import { ReactNavigationTheme } from "./config/react-navigation.theme";
import DoctorScreen from "./screens/DoctorScreen/DoctorScreen";

const StackNavigator = () => {
  // define userToken for validation
  const [token, setToken] = React.useState<string | null>(null);
  const [isReduxInitialized, setReduxInitialized] = React.useState(false);
  const RootStack = createNativeStackNavigator<RootNativeStackParamList>();

  // Telling out navigator use it

  React.useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

  const userInfo = {
    id: "adsfadfadsfdaf",
    email: "asdfadfadfadfs ",
    isInputPassword: false,
    emailVerified: false,
    // Sửa role ở đây để thay đổi render
    role: "user",
  };
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // Khởi tạo token
      console.log("Initialzied token");
      const tokenInfo = await AsyncStorage.getItem("token");

      if (tokenInfo) {
        setToken(tokenInfo);
      } else {
        setToken(null);
      }
      // Khởi tạo redux
      console.log("Initialized redux");
      await initializeState();
      setReduxInitialized(true);
    };
    bootstrapAsync();
  });

  if (!isReduxInitialized) {
    console.log("Redux not initialzed");
    return <SplashScreen />;
  } else console.log("Redux was initialized");
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
          ) : userInfo.role === "doctor" ? (
            <>
              <RootStack.Screen
                name="DoctorScreen"
                component={DoctorScreen}
                options={{ headerShown: false }}
                initialParams={{ setToken }}
              />
            </>
          ) : userInfo.role === "user" ? (
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

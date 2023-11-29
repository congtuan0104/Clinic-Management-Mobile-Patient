import { LogBox, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import { RootNativeStackParamList } from "./types";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import HomeScreen from "./screens/Homepage/HomeScreen";
import UserProfileScreen from "./screens/UserProfile/UserProfileScreen";
import ValidateNotification from "./screens/ValidateNotification/ValidateNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeState } from "./store";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import { ReactNavigationTheme } from "./config/react-navigation.theme";

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
          ) : (
            <>
              <RootStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Homepage" }}
                initialParams={{ setToken }}
              />
              <RootStack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{ title: "User Profile" }}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import { RootNativeStackParamList } from "./types";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import HomeScreen from "./screens/Homepage/HomeScreen";

const StackNavigator = () => {
  // define userToken for validation
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const getUserToken = async () => {
    // testing purposes
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    try {
      // custom logic
      await sleep(2000);
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  // Telling out navigator use it
  const RootStack = createNativeStackNavigator<RootNativeStackParamList>();
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator>
          {userToken == null ? (
            <>
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: true }}
                initialParams={{ setUserToken }}
              />
              <RootStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "Register" }}
              />
            </>
          ) : (
            <>
              <RootStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Homepage" }}
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

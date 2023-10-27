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
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "./hooks";
import { restoreToken } from "./store";

const StackNavigator = () => {
  // define userToken for validation
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  // const getUserToken = async () => {
  //   // testing purposes
  //   const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  //   try {
  //     // custom logic
  //     await sleep(2000);
  //     const token = null;
  //     setUserToken(token);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync("userToken");
        console.log(userToken);
      } catch (e) {
        // Restoring token failed
      } finally {
        setIsLoading(false);
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (userToken) {
        dispatch(restoreToken({ token: userToken }));
        setUserToken(userToken);
      }
    };
    bootstrapAsync();
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
                initialParams={{ setUserToken }}
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

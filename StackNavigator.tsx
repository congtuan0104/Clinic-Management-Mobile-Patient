import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import { IUserInfo, RootNativeStackParamList } from "./types";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import HomeScreen from "./screens/Homepage/HomeScreen";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "./hooks";
import { restoreUserInfo } from "./store";
import ValidateNotification from "./screens/ValidateNotification/ValidateNotification";
const StackNavigator = () => {
  // define userToken for validation
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken: string;
      try {
        // Restore userInfo and dispatch to the store
        const testData = await SecureStore.getItemAsync("user");
        if (testData) {
          const testDataObject = JSON.parse(testData);
          const userInfo: IUserInfo = {
            id: testDataObject.id,
            email: testDataObject.email,
            emailVerified: testDataObject.emailVerified,
            role: testDataObject.role,
          };
          dispatch(restoreUserInfo(userInfo));
        }
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await JSON.parse(
          JSON.stringify(SecureStore.getItemAsync("token"))
        );
        // setToken
        setToken(userToken);
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
  // Telling out navigator use it
  const RootStack = createNativeStackNavigator<RootNativeStackParamList>();
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator>
          {token == null ? (
            <>
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: true }}
                initialParams={{ setToken }}
              />
              <RootStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "Register" }}
                initialParams={{ setToken }}
              />
              <RootStack.Screen
                name="ValidateNotification"
                component={ValidateNotification}
                options={{ title: "Validation Notification" }}
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
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

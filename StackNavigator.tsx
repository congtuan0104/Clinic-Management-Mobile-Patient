import { Alert, LogBox, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
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
import messaging from "@react-native-firebase/messaging";

const StackNavigator = () => {
  // define userToken for validation
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<IUserInfo | null>(null);
  // Define rootStack to handle root navigation
  const RootStack = createNativeStackNavigator<RootNativeStackParamList>();

  // Set loading state to render splash screen
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  // Ignore unessessary notifications
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

  // Define two function to handle login and logout
  const setLogin = (user: IUserInfo | null, token: string | null) => {
    setUser(user);
    setToken(token);
  };
  const setLogout = () => {
    setUser(null);
    setToken(null);
  };

  // Running before render
  const bootstrapAsync = useCallback(async () => {
    try {
      // const userToStorage: IUserInfo = {
      //   id: "testId",
      //   email: "test@gmai.com",
      //   emailVerified: false,
      //   isInputPassword: false, // dữ liệu tạm thời
      //   role: "user",
      // };
      // const token = "thisistestingtoken";
      // await AsyncStorage.setItem("user", JSON.stringify(userToStorage));
      // await AsyncStorage.setItem("token", token);

      // await AsyncStorage.removeItem("user");
      // await AsyncStorage.removeItem("token");
      // Restore userInfo and dispatch to the store
      const testData = await AsyncStorage.getItem("user");
      const tokenString = await AsyncStorage.getItem("token");
      if (tokenString && testData) {
        // console.log("Test data: ", testData);
        // console.log("Token string: ", tokenString);
        const testDataObject = JSON.parse(testData);
        setLogin(testDataObject, tokenString);
        const UserResponseObject: ILoginResponse = {
          user: testDataObject,
          token: tokenString,
        };
        dispatch(restoreUserInfo(UserResponseObject));
      } else {
        setLogout();
      }
    } catch (e) {
      // Restoring token failed
    } finally {
      setIsLoading(false);
    }
  }, []);
  React.useEffect(() => {
    bootstrapAsync();
  }, [bootstrapAsync]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      return true;
    } else return false;
  };
  React.useEffect(() => {
    const getFCMToken = async () => {
      if (await requestUserPermission()) {
        // return fcm token for the device
        messaging()
          .getToken()
          .then((token: string) => {
            console.log("FCM token: ", token);
          });
      } else {
        console.log("Failed token");
      }
    };
    getFCMToken();

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          // set Initial route here
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      // set Initial route here
    });

    // Handle background messages using setBackgroundMessageHandler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    // Handle foreground messages using setBackgroundMessageHandler
    messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  // console.log("USER", user);
  // console.log("TOKEN", token);
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={ReactNavigationTheme}>
        <RootStack.Navigator>
          {token === null || user === null ? (
            <>
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
                initialParams={{ setLogin: setLogin }}
              />
              <RootStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
                initialParams={{ setLogin: setLogin }}
              />
              <RootStack.Screen
                name="ValidateNotification"
                component={ValidateNotification}
                options={{ headerShown: false }}
                initialParams={{ setLogin: setLogin }}
              />
            </>
          ) : user?.role === "doctor" ? (
            <>
              <RootStack.Screen
                name="DoctorScreen"
                component={DoctorScreen}
                options={{ headerShown: false }}
                initialParams={{ setLogout: setLogout }}
              />
            </>
          ) : user?.role === "user" ? (
            <>
              <RootStack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerShown: false }}
                initialParams={{ setLogout: setLogout }}
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

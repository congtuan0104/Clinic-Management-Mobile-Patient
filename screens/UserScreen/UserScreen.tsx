import * as React from "react";
import { UserScreenProps } from "../../types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "../UserScreen/UserProfile/UserProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Function02 from "./Function02/Function02";
import { appColor } from "../../theme";
// Import custom icons
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../../components/CustomDrawer/CustomDrawer";
import ChattingScreen from "./Chatting/ChattingScreen";

export type RootNativeDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setLogout: () => void };
  Chatting: undefined;
  Function02: undefined;
};

export type UserProfileScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "UserProfile"
>;
export type ChattingScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "Chatting"
>;

const RootDrawer = createDrawerNavigator<RootNativeDrawerParamList>();

export default function UserScreen({ navigation, route }: UserScreenProps) {
  const { setLogout } = route.params;

  return (
    <RootDrawer.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerStyle: {
          backgroundColor: appColor.background,
        },
        headerTintColor: appColor.title,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        drawerStyle: {
          backgroundColor: appColor.background,
        },
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: appColor.primary,
        drawerInactiveTintColor: appColor.primary,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <RootDrawer.Screen
        options={{
          title: "Tài khoản",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        name="UserProfile"
        component={UserProfile}
        initialParams={{ setLogout: setLogout }}
      />
      <RootDrawer.Screen
        name="Chatting"
        options={{
          title: "Nhắn tin",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={ChattingScreen}
      />
      <RootDrawer.Screen
        name="Function02"
        options={{
          title: "Chức năng 2",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={Function02}
      />
    </RootDrawer.Navigator>
  );
}

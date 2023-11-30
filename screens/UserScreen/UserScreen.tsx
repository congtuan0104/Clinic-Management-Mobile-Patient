import * as React from "react";
import { UserScreenProps } from "../../types";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import UserProfile from "../UserScreen/UserProfile/UserProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Function01 from "./Function01/Function01";
import Function02 from "./Function02/Function02";
import { appColor } from "../../theme";
// Import custom icons
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "native-base";
import CustomDrawer from "../../components/CustomDrawer/CustomDrawer";

export type RootNativeDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setToken: (token: string | null) => void };
  Function01: undefined;
  Function02: undefined;
};
export type UserProfileScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "UserProfile"
>;

const RootDrawer = createDrawerNavigator<RootNativeDrawerParamList>();

export default function UserScreen({ navigation, route }: UserScreenProps) {
  const { setToken } = route.params;

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
        initialParams={{ setToken }}
      />
      <RootDrawer.Screen
        name="Function01"
        options={{
          title: "Chức năng 1",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={Function01}
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

import * as React from "react";
import { UserNavigatorProps } from "./StackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Function02 from "../screens/UserScreen/Function02/Function02";
import { appColor } from "../theme";
// Import custom icons
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import ChattingNavigator from "./ChattingNavigator";
import ProfileNavigator from "./ProfileNavigator";
import SubscriptionNavigator from "./SubscriptionNavigator";
import NotificationNavigator from "./NotificationNavigator";

export type UserNavigatorDrawerParamList = {
  // undefined: the route doesn't have params
  ProfileNavigator: undefined;
  ChattingNavigator: undefined;
  SubscriptionNavigator: undefined;
  NotificationNavigator: undefined;
  Function02: undefined;
};

export type ProfileNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "ProfileNavigator"
>;
export type ChattingNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "ChattingNavigator"
>;
export type SubscriptionNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "SubscriptionNavigator"
>;
export type NotificationNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "NotificationNavigator"
>;
const UserNavigatorDrawer =
  createDrawerNavigator<UserNavigatorDrawerParamList>();

export default function UserScreen({ navigation, route }: UserNavigatorProps) {
  const { setLogout } = route.params?.params;
  return (
    <UserNavigatorDrawer.Navigator
      initialRouteName="ProfileNavigator"
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
      drawerContent={(props) => <CustomDrawer {...props} logOut={setLogout} />}
    >
      <UserNavigatorDrawer.Screen
        options={{
          title: "Tài khoản",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        name="ProfileNavigator"
        component={ProfileNavigator}
      />
      <UserNavigatorDrawer.Screen
        options={{
          title: "Quản lý gói",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        name="SubscriptionNavigator"
        component={SubscriptionNavigator}
      />
      <UserNavigatorDrawer.Screen
        name="ChattingNavigator"
        options={{
          title: "Nhắn tin",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={ChattingNavigator}
      />
      <UserNavigatorDrawer.Screen
        name="NotificationNavigator"
        options={{
          title: "Thông báo",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={NotificationNavigator}
      />
      <UserNavigatorDrawer.Screen
        name="Function02"
        options={{
          title: "Chức năng 2",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={Function02}
      />
    </UserNavigatorDrawer.Navigator>
  );
}

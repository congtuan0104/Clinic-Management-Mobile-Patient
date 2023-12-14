import * as React from "react";
import { UserNavigatorProps } from "./StackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Function02 from "../screens/UserScreen/Function02/Function02";
import { appColor } from "../theme";
// Import custom icons
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import ChattingNavigator from "./ChattingNavigator";
import ProfileNavigator from "./ProfileNavigator";

export type UserNavigatorDrawerParamList = {
  // undefined: the route doesn't have params
  ProfileNavigator: undefined;
  ChattingNavigator: undefined;
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

const UserNavigatorDrawer =
  createDrawerNavigator<UserNavigatorDrawerParamList>();

export default function UserScreen({ navigation, route }: UserNavigatorProps) {
  const { setLogout } = route.params;

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

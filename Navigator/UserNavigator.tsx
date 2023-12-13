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

export type RootNativeDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setLogout: () => void };
  ChattingNavigator: undefined;
  Function02: undefined;
};

export type ProfileScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "UserProfile"
>;
export type ChattingNavigatorProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "ChattingNavigator"
>;

const RootDrawer = createDrawerNavigator<RootNativeDrawerParamList>();

export default function UserScreen({ navigation, route }: UserNavigatorProps) {
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
        component={ProfileScreen}
        initialParams={{ setLogout: setLogout }}
      />
      <RootDrawer.Screen
        name="ChattingNavigator"
        options={{
          title: "Nhắn tin",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={ChattingNavigator}
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

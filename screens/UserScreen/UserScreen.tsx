import { Button, Drawer } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../store";
import { userInfoSelector } from "../../store";
import { UserScreenProps, IUserInfo } from "../../types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "../Feed/Feed";
import Article from "../Article/Article";
import UserProfile from "../UserProfile/UserProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
export type RootNativeDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setToken: (token: string | null) => void };
  Feed: undefined;
  Article: undefined;
};
export type UserProfileScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "UserProfile"
>;

const RootDrawer = createDrawerNavigator<RootNativeDrawerParamList>();

export default function UserScreen({ navigation, route }: UserScreenProps) {
  const userInfo = useAppSelector(userInfoSelector);
  const dispatch = useAppDispatch();
  const { setToken } = route.params;
  const [user, setUser] = React.useState<IUserInfo | null>(null);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen
        name="UserProfile"
        component={UserProfile}
        initialParams={{ setToken }}
      />
      <RootDrawer.Screen name="Feed" component={Feed} />
      <RootDrawer.Screen name="Article" component={Article} />
    </RootDrawer.Navigator>
  );
}

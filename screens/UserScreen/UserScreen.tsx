import * as React from "react";
import { UserScreenProps } from "../../types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./Feed/Feed";
import Article from "./Article/Article";
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
  const { setToken } = route.params;

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

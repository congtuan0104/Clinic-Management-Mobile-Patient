import * as React from "react";
import { DoctorScreenProps } from "../../types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "../UserProfile/UserProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppointmentScreen from "./AppointmentScreen/AppointmentScreen";
export type RootNativeDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setToken: (token: string | null) => void };
  Appointment: undefined;
};
export type UserProfileScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "UserProfile"
>;

const RootDrawer = createDrawerNavigator<RootNativeDrawerParamList>();

export default function DoctorScreen({ navigation, route }: DoctorScreenProps) {
  const { setToken } = route.params;

  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen
        name="UserProfile"
        component={UserProfile}
        initialParams={{ setToken }}
      />
      <RootDrawer.Screen name="Appointment" component={AppointmentScreen} />
    </RootDrawer.Navigator>
  );
}

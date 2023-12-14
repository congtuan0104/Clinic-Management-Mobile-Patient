import * as React from "react";
import { DoctorNavigatorProps } from "./StackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppointmentScreen from "../screens/DoctorScreen/AppointmentScreen/AppointmentScreen";
export type DoctorNavigatorDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setLogout: () => void };
  Appointment: undefined;
};
export type UserProfileScreenProps = NativeStackScreenProps<
  DoctorNavigatorDrawerParamList,
  "UserProfile"
>;

const DoctorNavigatorDrawer =
  createDrawerNavigator<DoctorNavigatorDrawerParamList>();

export default function DoctorScreen({
  navigation,
  route,
}: DoctorNavigatorProps) {
  const { setLogout } = route.params;

  return (
    <DoctorNavigatorDrawer.Navigator>
      <DoctorNavigatorDrawer.Screen
        name="UserProfile"
        component={ProfileScreen}
        initialParams={{ setLogout }}
      />
      <DoctorNavigatorDrawer.Screen
        name="Appointment"
        component={AppointmentScreen}
      />
    </DoctorNavigatorDrawer.Navigator>
  );
}

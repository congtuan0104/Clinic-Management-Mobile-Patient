import * as React from "react";
import { DoctorNavigatorProps } from "./StackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppointmentScreen from "../screens/DoctorScreen/AppointmentScreen/AppointmentScreen";
export type RootNativeDrawerParamList = {
  // undefined: the route doesn't have params
  UserProfile: { setLogout: () => void };
  Appointment: undefined;
};
export type UserProfileScreenProps = NativeStackScreenProps<
  RootNativeDrawerParamList,
  "UserProfile"
>;

const RootDrawer = createDrawerNavigator<RootNativeDrawerParamList>();

export default function DoctorScreen({
  navigation,
  route,
}: DoctorNavigatorProps) {
  const { setLogout } = route.params;

  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen
        name="UserProfile"
        component={ProfileScreen}
        initialParams={{ setLogout }}
      />
      <RootDrawer.Screen name="Appointment" component={AppointmentScreen} />
    </RootDrawer.Navigator>
  );
}

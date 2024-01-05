import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ClinicInfoNavigatorProps } from "./UserNavigator";
import ClinicInfoDashboardScreen from "../screens/ClinicInfoScreen/ClinicInfoDashboardScreen";

export type SubscriptionNavigatorStackParamList = {
  ClinicInfoDashboard: { clinic: any };
};

export type ClinicInfoDashboardScreenProps = NativeStackScreenProps<
  SubscriptionNavigatorStackParamList,
  "ClinicInfoDashboard"
>;

const ClinicInfoStackNavigator =
  createNativeStackNavigator<SubscriptionNavigatorStackParamList>();

export default function ClinicInfoNavigator({
  navigation,
  route,
}: ClinicInfoNavigatorProps) {
  const { clinic } = route.params;
  return (
    <ClinicInfoStackNavigator.Navigator initialRouteName="ClinicInfoDashboard">
      <ClinicInfoStackNavigator.Screen
        name="ClinicInfoDashboard"
        component={ClinicInfoDashboardScreen}
        options={{ headerShown: false }}
        initialParams={{ clinic }}
      />
    </ClinicInfoStackNavigator.Navigator>
  );
}

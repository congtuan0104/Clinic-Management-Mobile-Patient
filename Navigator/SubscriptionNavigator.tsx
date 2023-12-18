import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { SubscriptionNavigatorProps } from "./UserNavigator";
import SubscriptionDashboardScreen from "../screens/SubscriptionScreen/SubscriptionDashboardScreen";

export type SubscriptionNavigatorStackParamList = {
  SubscriptionDashboard: undefined;
  SubscriptionRegistration: undefined;
  SubscriptionHistory: undefined;
};

export type SubscriptionDashboardScreenProps = NativeStackScreenProps<
  SubscriptionNavigatorStackParamList,
  "SubscriptionDashboard"
>;

export type SubscriptionRegistrationScreenProps = NativeStackScreenProps<
  SubscriptionNavigatorStackParamList,
  "SubscriptionRegistration"
>;

export type SubscriptionHistoryScreenProps = NativeStackScreenProps<
  SubscriptionNavigatorStackParamList,
  "SubscriptionHistory"
>;

const SubscriptionStackNavigator =
  createNativeStackNavigator<SubscriptionNavigatorStackParamList>();

export default function SubscriptionNavigator({
  navigation,
  route,
}: SubscriptionNavigatorProps) {
  return (
    <SubscriptionStackNavigator.Navigator initialRouteName="SubscriptionDashboard">
      <SubscriptionStackNavigator.Screen
        name="SubscriptionDashboard"
        component={SubscriptionDashboardScreen}
        options={{ headerShown: false }}
      />
    </SubscriptionStackNavigator.Navigator>
  );
}

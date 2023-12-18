import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { SubscriptionNavigatorProps } from "./UserNavigator";
import SubscriptionDashboardScreen from "../screens/SubscriptionScreen/SubscriptionDashboardScreen";
import SubscriptionRegistrationScreen from "../screens/SubscriptionScreen/SubscriptionRegistrationScreen";
import SubscriptionDetailScreen from "../screens/SubscriptionScreen/SubscriptionDetailScreen";
import SubscriptionHistoryScreen from "../screens/SubscriptionScreen/SubscriptionHistory";

export type SubscriptionNavigatorStackParamList = {
  SubscriptionDashboard: undefined;
  SubscriptionRegistration: undefined;
  SubscriptionHistory: undefined;
  SubscriptionDetail: undefined;
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

export type SubscriptionDetailScreenProps = NativeStackScreenProps<
  SubscriptionNavigatorStackParamList,
  "SubscriptionDetail"
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
      <SubscriptionStackNavigator.Screen
        name="SubscriptionRegistration"
        component={SubscriptionRegistrationScreen}
        options={{ headerShown: false }}
      />
      <SubscriptionStackNavigator.Screen
        name="SubscriptionDetail"
        component={SubscriptionDetailScreen}
        options={{ headerShown: false }}
      />
      <SubscriptionStackNavigator.Screen
        name="SubscriptionHistory"
        component={SubscriptionHistoryScreen}
        options={{ headerShown: false }}
      />
    </SubscriptionStackNavigator.Navigator>
  );
}

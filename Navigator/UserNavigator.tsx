import * as React from "react";
import { UserNavigatorProps } from "./StackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Function02 from "../screens/UserScreen/Function02/Function02";
import { appColor } from "../theme";
// Import custom icons
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import ChattingNavigator from "./ChattingNavigator";
import ProfileNavigator from "./ProfileNavigator";
import SubscriptionNavigator from "./SubscriptionNavigator";
import NotificationNavigator from "./NotificationNavigator";
import { clinicService } from "../services";
import ToastAlert from "../components/Toast/Toast";
import { useToast } from "native-base";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import ClinicInfoNavigator from "./ClinicInfoNavigator";

export type UserNavigatorDrawerParamList = {
  // undefined: the route doesn't have params
  ProfileNavigator: undefined;
  ChattingNavigator: undefined;
  SubscriptionNavigator: undefined;
  NotificationNavigator: undefined;
  ClinicInfoNavigator: { clinic: any };
  Function02: {
    clinic: string;
    clinicList: any;
    setClinic: (clinic: string) => void;
  };
};

export type ProfileNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "ProfileNavigator"
>;
export type ChattingNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "ChattingNavigator"
>;
export type SubscriptionNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "SubscriptionNavigator"
>;
export type NotificationNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "NotificationNavigator"
>;

export type Function02NavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "Function02"
>;

export type ClinicInfoNavigatorProps = NativeStackScreenProps<
  UserNavigatorDrawerParamList,
  "ClinicInfoNavigator"
>;

const UserNavigatorDrawer =
  createDrawerNavigator<UserNavigatorDrawerParamList>();

export default function UserScreen({ navigation, route }: UserNavigatorProps) {
  const { setLogout } = route.params?.params;
  const [clinic, setClinic] = React.useState<any>(null);
  const [clinicList, setClinicList] = React.useState<any>(null);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const toast = useToast();
  React.useEffect(() => {
    // Call API to get active clinic
    const getActiveClinic = async () => {
      try {
        const response = await clinicService.getAllClinic();
        let activeClinic: any = [];
        // Get all clinic with status = 3 (active)
        response.data.map((clinicItem: any) => {
          if (clinicItem.subscriptions[0].status === 3) {
            activeClinic.push(clinicItem);
          }
        });
        setClinicList(activeClinic);
      } catch (error) {
        toast.show({
          render: () => {
            return (
              <ToastAlert
                title="Lỗi"
                description="Không có phòng khám. Vui lòng thử lại sau."
                status="error"
              />
            );
          },
        });
      }
    };
    setShowLoading(true);
    getActiveClinic();
    setShowLoading(false);
  }, []);
  return (
    <>
      {showLoading && <LoadingSpinner showLoading={true} />}
      {!showLoading && clinicList && (
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
          drawerContent={(props) => (
            <CustomDrawer {...props} logOut={setLogout} />
          )}
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
            name="Function02"
            options={{
              title: "Danh sách phòng khám",
              drawerIcon: ({ color }) => (
                <Ionicons name="settings-outline" size={24} color={color} />
              ),
            }}
            component={Function02}
            initialParams={{
              clinic,
              setClinic,
              clinicList,
            }}
          />
          <UserNavigatorDrawer.Screen
            options={{
              title: "Quản lý gói",
              drawerIcon: ({ color }) => (
                <Ionicons name="settings-outline" size={24} color={color} />
              ),
            }}
            name="SubscriptionNavigator"
            component={SubscriptionNavigator}
          />
          {clinic && (
            <>
              <UserNavigatorDrawer.Screen
                name="ClinicInfoNavigator"
                options={{
                  title: "Thông tin phòng khám",
                  drawerIcon: ({ color }) => (
                    <Ionicons name="settings-outline" size={24} color={color} />
                  ),
                }}
                component={ClinicInfoNavigator}
                initialParams={{
                  clinic,
                }}
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
                name="NotificationNavigator"
                options={{
                  title: "Thông báo",
                  drawerIcon: ({ color }) => (
                    <Ionicons name="settings-outline" size={24} color={color} />
                  ),
                }}
                component={NotificationNavigator}
              />
            </>
          )}
        </UserNavigatorDrawer.Navigator>
      )}
    </>
  );
}

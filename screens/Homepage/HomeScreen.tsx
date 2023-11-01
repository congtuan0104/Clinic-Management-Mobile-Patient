import { Button } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../store";
import * as SecureStore from "expo-secure-store";
import { HomeScreenProps, IUserInfo } from "../../types";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const dispatch = useAppDispatch();
  const { setToken } = route.params;
  const [user, setUser] = React.useState<IUserInfo | null>(null);
  const [tokenString, setTokenString] = React.useState<string | null>(null);
  React.useEffect(() => {
    const getUserInfo = async () => {
      const userInfoString = await SecureStore.getItemAsync("user");
      if (userInfoString) {
        const userInfoObject = JSON.parse(userInfoString);
        const userInfo: IUserInfo = {
          id: userInfoObject.id,
          email: userInfoObject.email,
          emailVerified: userInfoObject.emailVerified,
          role: userInfoObject.role,
        };
        setUser(userInfo);
      }
      const tokenString = await SecureStore.getItemAsync("token");
      setTokenString(tokenString);
    };
    getUserInfo();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Xin chao, {user?.email}</Text>
      <Text>Role cua ban la: {user?.role}</Text>
      <Text>ID cua ban la: {user?.id}</Text>
      <Text>
        Da xac thuc email:{" "}
        {user?.emailVerified ? "Da xac thuc" : "Chua xac thuc"}
      </Text>
      <Text>Token hien tai cua ban la: {tokenString}</Text>
      <Button
        onPress={() => {
          SecureStore.deleteItemAsync("userToken");
          dispatch(logout());
          setToken(null);
        }}
      >
        Log out
      </Button>
    </View>
  );
}

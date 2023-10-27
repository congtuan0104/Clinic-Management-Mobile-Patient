import { Button } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../store";
import * as SecureStore from "expo-secure-store";
import { HomeScreenProps } from "../../types";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const dispatch = useAppDispatch();
  const { setUserToken } = route.params;
  const [user, setUser] = React.useState<string | null>(null);
  React.useEffect(() => {
    const getUserToken = async () => {
      const userToken = await SecureStore.getItemAsync("userToken");
      setUser(userToken);
    };
    getUserToken();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Xin chao, {user}</Text>
      <Button
        onPress={() => {
          SecureStore.deleteItemAsync("userToken");
          dispatch(logout());
          setUserToken(null);
        }}
      >
        Log out
      </Button>
    </View>
  );
}

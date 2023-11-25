import { Button } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../store";
import { userInfoSelector } from '../../store';
import { HomeScreenProps, IUserInfo } from "../../types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const userInfo = useAppSelector(userInfoSelector);
  const dispatch = useAppDispatch();
  const { setToken } = route.params;
  const [user, setUser] = React.useState<IUserInfo | null>(null);


  useEffect(() => {
    setUser(userInfo);
  }, []);
  const goToUserProfile = () => {
    navigation.navigate('UserProfile');
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Xin chao, {user?.email}</Text>
      
      <Button
        onPress={async () => {
          // await GoogleSignin.revokeAccess();
          // await GoogleSignin.signOut();
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('token');
          dispatch(logout());
          setToken(null);
        }}
      >
        Log out
      </Button>
      <Button onPress={goToUserProfile} style={{ marginTop: 15 }}>Go to User Profile</Button>
    </View>
  );
}

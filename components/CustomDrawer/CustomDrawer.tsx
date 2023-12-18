import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Button, HStack, Image, Text, View } from "native-base";
import { appColor } from "../../theme";
import { ImageBackground } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, userInfoSelector } from "../../store";

const CustomDrawer = (props: any) => {
  const userInfo = useAppSelector(userInfoSelector);
  const { logOut } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    dispatch(logout());
    logOut();
    setIsLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <LoadingSpinner showLoading={isLoading} setShowLoading={setIsLoading} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: appColor.background,
        }}
      >
        <ImageBackground
          source={require("../../assets/images/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          <Avatar
            alignSelf="center"
            bg="green.500"
            source={{
              uri: `https://ui-avatars.com/api/?name=${userInfo?.firstName}`,
            }}
            size="xl"
            mb={2}
          ></Avatar>
          <Text color="#fff" fontWeight="bold" fontSize="16">
            {userInfo?.lastName + " " + userInfo?.firstName}
          </Text>
          <Text color="#fff" fontSize="13">
            {userInfo?.email}
          </Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      z
      <View p="5" borderTopWidth="1" borderTopColor="#ccc">
        <Button onPress={handleLogout}>
          <HStack space={1}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text fontSize={15} color="#fff">
              Đăng xuất
            </Text>
          </HStack>
        </Button>
      </View>
    </View>
  );
};

export default CustomDrawer;

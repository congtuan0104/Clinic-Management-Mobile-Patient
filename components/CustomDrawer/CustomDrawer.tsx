import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, HStack, Image, Text, View } from "native-base";
import { appColor } from "../../theme";
import { ImageBackground } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../store";

const CustomDrawer = (props: any) => {
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
          <Image
            source={require("../../assets/images/default_avatar.jpg")}
            borderRadius={100}
            size="sm"
            alt="testimage"
            mb={5}
          />
          <Text color="#fff" fontWeight="bold" fontSize="16">
            Nguyễn Nhật Khang
          </Text>
          <Text color="#fff" fontSize="13">
            khangnl24112002@gmail.com
          </Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
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

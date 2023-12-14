import React from "react";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import {
  Button,
  View,
  Text,
  Box,
  Avatar,
  Input,
  Stack,
  Icon,
  FormControl,
  HStack,
  VStack,
} from "native-base";
import { showMessage } from "react-native-flash-message";
import { authApi } from "../../services/auth.services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ProfileScreenProps } from "../../Navigator/UserNavigator";
import { MaterialIcons } from "@expo/vector-icons";
import { appColor } from "../../theme";
GoogleSignin.configure({
  webClientId:
    "931199521045-rn8i7um077q2b9pgpsrdejj90qj26fvv.apps.googleusercontent.com",
});

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const userInfo = useAppSelector(userInfoSelector);
  const { linkAccountFacebook, linkAccountGoogle } = useAuth();

  const [googleAccoutId, setgoogleAccoutId] = useState<string>("");

  const [fbAccoutId, setfbAccoutId] = useState("");

  const [isGoogleLink, setisGoogleLink] = useState(false);

  const [isFacebookLink, setisFacebookLink] = useState(false);

  const [isRender, setisRender] = useState<boolean>(false);
  // Kiểm tra và lấy danh sách tài khoản  liên kết
  useEffect(() => {
    if (userInfo?.id) {
      authApi
        .getLinkAccount(userInfo.id)
        .then((res) => {
          console.log("Data: ", res.data);
          res.data.forEach((item: any) => {
            if (item.provider === "google") {
              setgoogleAccoutId(item.id);
              setisGoogleLink(true);
            }
            if (item.provider === "facebook") {
              setfbAccoutId(item.id);
              setisFacebookLink(true);
            }
          });
        })
        .catch((error) => {
          console.log("Call api to get profile error: ");
          console.log(error);
        });
    }
  }, [isGoogleLink, isFacebookLink, isRender]);

  const changePassword = () => {
    // Logic for changing password
  };

  const connectFacebook = async () => {
    await linkAccountFacebook();
    setisRender(!isRender);
  };

  const disConnectFacebook = () => {
    if (userInfo?.id) {
      authApi.disConnectLinkAccount(userInfo.id, fbAccoutId).then(() => {
        setisFacebookLink(false);
        // Hiển thị thông báo
        showMessage({
          message: "Hủy liên kết tài khoản thành công",
          color: "green",
        });
      });
    }
  };

  const connectGoogle = async () => {
    await linkAccountGoogle();
    setisGoogleLink(true);
  };

  const disConnectGoogle = () => {
    if (userInfo?.id) {
      authApi
        .disConnectLinkAccount(userInfo.id, googleAccoutId)
        .then(() => {
          setisGoogleLink(false);
          // Hiển thị thông báo
          showMessage({
            message: "Hủy liên kết tài khoản thành công",
            color: "green",
          });
          GoogleSignin.signOut();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box
      bgColor="#fff"
      width="90%"
      alignSelf="center"
      alignItems="center"
      p={5}
      borderRadius={20}
    >
      <Box
        width="full"
        alignItems="center"
        py={3}
        mb={3}
        borderBottomWidth={1}
        borderBottomColor="#EDEDF2"
      >
        <Avatar
          alignSelf="center"
          bg="green.500"
          source={{
            uri: `https://ui-avatars.com/api/?name=${userInfo?.firstName}`,
          }}
          size="xl"
          mb={2}
        >
          ABC
        </Avatar>
        <Text color={appColor.textTitle} fontWeight="extrabold" fontSize="17">
          {userInfo?.lastName + " " + userInfo?.firstName}
        </Text>
        <Text color={appColor.textSecondary}>{userInfo?.email}</Text>
      </Box>
      <Box alignItems="flex-start" width="100%">
        <VStack space="5">
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Họ và tên</Text>
            <Text color={appColor.textSecondary}>
              {userInfo?.lastName + " " + userInfo?.firstName}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Địa chỉ</Text>
            <Text color={appColor.textSecondary}>Thành phố Hồ Chí Minh</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Giới tính</Text>
            <Text color={appColor.textSecondary}>Nam</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Email</Text>
            <Text color={appColor.textSecondary}>{userInfo?.email}</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Ngày sinh</Text>
            <Text color={appColor.textSecondary}>24/11/2002</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Nghề nghiệp</Text>
            <Text color={appColor.textSecondary}>Kỹ sư phần mềm</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Google</Text>
            <Text color={appColor.textSecondary}>Đã kết nối</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Facebook</Text>
            <Text color={appColor.textSecondary}>Chưa kết nối</Text>
          </HStack>
          <HStack width="full">
            <Button width="full">Kết nối với Google</Button>
          </HStack>
          <HStack width="full">
            <Button width="full">Kết nối với Facebook</Button>
          </HStack>
        </VStack>
      </Box>
    </Box>

    // <View style={styles.container}>
    //   <Text style={styles.heading}>Thông tin cá nhân</Text>

    //   <View style={styles.section}>
    //     <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>
    //       Email:{" "}
    //     </Text>
    //     <Text style={{ fontSize: 15 }}>{userInfo?.email}</Text>
    //     <TouchableOpacity onPress={changePassword}>
    //       <Text style={styles.changePassword}>Đổi mật khẩu</Text>
    //     </TouchableOpacity>
    //   </View>

    //   <View style={styles.socialAccounts}>
    //     <Text style={styles.heading}>Tài khoản mạng xã hội</Text>

    //     <View style={{ marginTop: 50 }}>
    //       <View style={styles.socialButtons}>
    //         <Text style={{ fontWeight: "bold", fontSize: 18 }}>Facebook</Text>
    //         {isFacebookLink ? (
    //           <Button
    //             variant="solid"
    //             style={styles.socialButtons}
    //             onPress={disConnectFacebook}
    //           >
    //             Hủy kết nối
    //           </Button>
    //         ) : (
    //           <Button
    //             variant="solid"
    //             style={styles.socialButtons}
    //             onPress={connectFacebook}
    //           >
    //             Kết nối
    //           </Button>
    //         )}
    //       </View>
    //       <Text>{isFacebookLink ? `Đã kết nối` : "Chưa kết nối"}</Text>
    //     </View>
    //     <View style={{ marginTop: 50 }}>
    //       <View style={styles.socialButtons}>
    //         <Text style={{ fontWeight: "bold", fontSize: 18 }}>Google</Text>
    //         {isGoogleLink ? (
    //           <Button
    //             variant="solid"
    //             style={styles.socialButtons}
    //             onPress={disConnectGoogle}
    //           >
    //             Hủy kết nối
    //           </Button>
    //         ) : (
    //           <Button
    //             variant="solid"
    //             style={styles.socialButtons}
    //             onPress={connectGoogle}
    //           >
    //             Kết nối
    //           </Button>
    //         )}
    //       </View>
    //       <Text>{isGoogleLink ? `Đã kết nối` : "Chưa kết nối"}</Text>
    //     </View>
    //   </View>
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   changePassword: {
//     color: "blue",
//     fontSize: 15,
//     marginTop: 20,
//     fontWeight: "bold",
//   },
//   socialAccounts: {
//     marginTop: 40,
//   },
//   socialHeading: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   socialButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   socialButton: {
//     borderWidth: 0,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     flex: 0.48, // Adjust flex value for desired width of buttons
//     alignItems: "center",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   connectButton: {
//     fontWeight: "bold",
//     fontSize: 18,
//   },
// });

export default ProfileScreen;

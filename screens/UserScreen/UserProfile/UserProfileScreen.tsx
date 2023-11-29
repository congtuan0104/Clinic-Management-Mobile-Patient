import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout, userInfoSelector } from "../../../store";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebase } from "../../../config/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/auth";
import { Button } from "native-base";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { authApi } from "../../../services/auth.services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfileScreenProps } from "../UserScreen";

GoogleSignin.configure({
  webClientId:
    "931199521045-rn8i7um077q2b9pgpsrdejj90qj26fvv.apps.googleusercontent.com",
});

const UserProfile = ({ navigation, route }: UserProfileScreenProps) => {
  const userInfo = useAppSelector(userInfoSelector);
  const { linkAccountFacebook, linkAccountGoogle } = useAuth();

  const [googleAccoutId, setgoogleAccoutId] = useState<string>("");

  const [fbAccoutId, setfbAccoutId] = useState("");

  const [isGoogleLink, setisGoogleLink] = useState(false);

  const [isFacebookLink, setisFacebookLink] = useState(false);

  const [isRender, setisRender] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setToken } = route.params;
  // Kiểm tra và lấy danh sách tài khoản  liên kết
  useEffect(() => {
    if (userInfo?.id) {
      authApi.geLinkAccount(userInfo.id).then((res) => {
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
      });
    }
  }, [isGoogleLink, isFacebookLink, isRender]);

  const signInWithFB = async () => {
    await linkAccountFacebook();
  };

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
      authApi.disConnectLinkAccount(userInfo.id, googleAccoutId).then(() => {
        setisGoogleLink(false);
        // Hiển thị thông báo
        showMessage({
          message: "Hủy liên kết tài khoản thành công",
          color: "green",
        });
      });
      GoogleSignin.signOut();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thông tin cá nhân</Text>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>
          Email:{" "}
        </Text>
        <Text style={{ fontSize: 15 }}>{userInfo?.email}</Text>
        <TouchableOpacity onPress={changePassword}>
          <Text style={styles.changePassword}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialAccounts}>
        <Text style={styles.heading}>Tài khoản mạng xã hội</Text>

        <View style={{ marginTop: 50 }}>
          <View style={styles.socialButtons}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Facebook</Text>
            {isFacebookLink ? (
              <Button
                variant="subtle"
                style={styles.socialButtons}
                onPress={disConnectFacebook}
              >
                Hủy kết nối
              </Button>
            ) : (
              <Button
                variant="subtle"
                style={styles.socialButtons}
                onPress={connectFacebook}
              >
                Kết nối
              </Button>
            )}
          </View>
          <Text>{isFacebookLink ? `Đã kết nối` : "Chưa kết nối"}</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={styles.socialButtons}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Google</Text>
            {isGoogleLink ? (
              <Button
                variant="subtle"
                style={styles.socialButtons}
                onPress={disConnectGoogle}
              >
                Hủy kết nối
              </Button>
            ) : (
              <Button
                variant="subtle"
                style={styles.socialButtons}
                onPress={connectGoogle}
              >
                Kết nối
              </Button>
            )}
          </View>
          <Text>{isGoogleLink ? `Đã kết nối` : "Chưa kết nối"}</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Button
            onPress={async () => {
              // await GoogleSignin.revokeAccess();
              // await GoogleSignin.signOut();
              AsyncStorage.removeItem("user");
              AsyncStorage.removeItem("token");
              dispatch(logout());
              setToken(null);
            }}
          >
            Log out
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  changePassword: {
    color: "blue",
    fontSize: 15,
    marginTop: 20,
    fontWeight: "bold",
  },
  socialAccounts: {
    marginTop: 40,
  },
  socialHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    borderWidth: 0,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 0.48, // Adjust flex value for desired width of buttons
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  connectButton: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UserProfile;

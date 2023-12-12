import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
} from "react-native";
import React, { useEffect } from "react";
import { ChattingDetailScreenProps } from "./ChattingScreen";
import { StyleSheet } from "react-native";
import MsgComponent from "../../../components/MsgComponent/MsgComponent";
import { Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { appColor } from "../../../theme";
import { firebase } from "@react-native-firebase/database";
import { useAppSelector } from "../../../hooks";
import { userInfoSelector } from "../../../store";
import dayjs from "dayjs";
import UploadImageModal from "../../../components/UploadImageModal/UploadImageModal";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import storage from "@react-native-firebase/storage";
import { helpers } from "../../../utils/helper";

export interface MsgType {
  link?: string;
  content: string;
  messageId: string;
  senderId: string;
  senderName: string;
  timestamp: any;
  type: string;
}

const ChattingDetailScreen: React.FC<ChattingDetailScreenProps> = ({
  route,
}) => {
  // Lấy thông tin user
  const userInfo = useAppSelector(userInfoSelector);

  const { groupId } = route.params;
  const [msg, setMsg] = React.useState<string>("");
  const [allChat, setallChat] = React.useState<MsgType[]>([]);
  const [disabled, setdisabled] = React.useState(false);
  const msgvalid = (txt: string) => txt && txt.replace(/\s/g, "").length;
  const [showModal, setShowModal] = React.useState<boolean>(false);

  useEffect(() => {
    setallChat([]);
    const reference = firebase
      .app()
      .database(
        "https://clinus-1d1d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
      )
      .ref(`/chats/${groupId}`);
    const onChildAdd = reference.on("child_added", (snapshot) => {
      setallChat((state) => [snapshot.val(), ...state]);
    });
    // Stop listening for updates when no longer required
    return () => reference.off("child_added", onChildAdd);
  }, [groupId]);

  // Hiệu ứng khi gửi tin nhắn
  const opacity = React.useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleUploadToRealtimeDB = async (
    msg: string,
    type: string,
    link?: string
  ) => {
    if (msg == "" || msgvalid(msg) == 0) {
      return false;
    }
    setdisabled(true);
    let msgData: MsgType = {
      content: msg,
      messageId: dayjs().unix().toString(),
      senderId: userInfo?.id ? userInfo.id : "null",
      senderName: userInfo?.email ? userInfo.email : "unknown",
      timestamp: dayjs().toISOString(),
      type: type,
      link: link,
    };
    // Lấy danh sách nhắn tin tại 1 thời điểm
    let currentLength = 0;
    const reference = firebase
      .app()
      .database(
        "https://clinus-1d1d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
      )
      .ref(`/chats/${groupId}`);
    reference.once("value").then((snapshot) => {
      currentLength = snapshot.val() === null ? 0 : snapshot.val().length;
      firebase
        .app()
        .database(
          "https://clinus-1d1d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
        )
        .ref(`/chats/${groupId}/${currentLength}`)
        .set(msgData)
        .then(() => {
          console.log("data set");
        });
      setdisabled(false);
    });
  };

  const handlePress = () => {
    handleUploadToRealtimeDB(msg, "text");
    setMsg("");
  };

  const onPressCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        // save image
        await handleSendImage(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPressUploadImageGallery = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        // save image
        await handleSendImage(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendImage = async (image: any) => {
    try {
      setShowModal(false);
      // set imageName = currentDate
      const imageName = dayjs().toISOString();
      const reference = storage().ref(`/chats/${groupId}/${imageName}`);
      try {
        await reference.putFile(image);
        const url = await storage()
          .ref(`/chats/${groupId}/${imageName}`)
          .getDownloadURL();
        handleUploadToRealtimeDB(url, "image");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } catch (error) {}
  };

  const handleDocumentPicker = async () => {
    const docRes = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: true,
    });
    const assets = docRes.assets;
    if (!assets) {
      return;
    } else {
      const fileList = assets;
      fileList.map(async (file) => {
        try {
          setShowModal(false);
          // Check if file is image
          if (helpers.checkFileType(file.mimeType) === "image") {
            await handleSendImage(file.uri);
            return;
          }
          const filename = file.name;
          const reference = storage().ref(`/chats/${groupId}/${filename}`);
          try {
            await reference.putFile(file.uri);
            const url = await storage()
              .ref(`/chats/${groupId}/${filename}`)
              .getDownloadURL();
            handleUploadToRealtimeDB(filename, "file", url);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };
  return (
    <>
      {userInfo ? (
        <View style={styles.container}>
          <FlatList
            style={{ flex: 1 }}
            data={allChat}
            showsVerticalScrollIndicator={false}
            inverted
            renderItem={({ item }) => {
              return (
                <MsgComponent
                  sender={item.senderId === userInfo.id ? true : false}
                  content={item.content}
                  time={item.timestamp}
                  type={item.type}
                  link={item.link ? item.link : null}
                />
              );
            }}
          />

          {/**Bottom sending message bar */}
          <View
            style={{
              backgroundColor: "#fff",
              elevation: 5,
              // height: 60,
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 4,
              justifyContent: "space-evenly",
            }}
          >
            {/** Send file button */}
            <Pressable
              disabled={disabled}
              onPress={handleDocumentPicker}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              {({ isPressed }) => (
                <Animated.View
                  style={{
                    opacity: isPressed ? opacity : 1,
                  }}
                >
                  <Ionicons name="attach" size={24} color={appColor.primary} />
                </Animated.View>
              )}
            </Pressable>
            {/** Send image button */}
            <Pressable
              disabled={disabled}
              onPress={() => {
                setShowModal(true);
              }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              {({ isPressed }) => (
                <Animated.View
                  style={{
                    opacity: isPressed ? opacity : 1,
                  }}
                >
                  <Ionicons
                    name="image-outline"
                    size={24}
                    color={appColor.primary}
                  />
                </Animated.View>
              )}
            </Pressable>
            <TextInput
              style={{
                backgroundColor: "#f0f2fd",
                width: "70%",
                height: "auto",
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: "#fff",
                color: "#000",
                paddingVertical: 7,
                paddingLeft: 10,
                paddingRight: 7,
              }}
              placeholder="Nhập tin nhắn"
              placeholderTextColor="#a8a29e"
              multiline={true}
              value={msg}
              onChangeText={(val) => setMsg(val)}
            />

            {/** Send message button */}
            <Pressable
              disabled={disabled}
              onPress={handlePress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              {({ isPressed }) => (
                <Animated.View
                  style={{
                    opacity: isPressed ? opacity : 1,
                  }}
                >
                  <Ionicons name="send" size={24} color={appColor.primary} />
                </Animated.View>
              )}
            </Pressable>
          </View>
          <UploadImageModal
            showModal={showModal}
            setShowModal={setShowModal}
            onPressCamera={onPressCamera}
            onPressUploadImageGallery={onPressUploadImageGallery}
          />
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChattingDetailScreen;

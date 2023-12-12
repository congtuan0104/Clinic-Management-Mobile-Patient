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

export interface MsgType {
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

  // dùng useEffect để gọi dữ liệu
  useEffect(() => {
    // Stop listening for updates when no longer required
  }, [groupId]);

  useEffect(() => {
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

  const handlePress = async () => {
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
      type: "text",
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
      setMsg("");
      setdisabled(false);
    });
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
                  message={item.content}
                  time={item.timestamp}
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
              justifyContent: "space-evenly",
            }}
          >
            <TextInput
              style={{
                backgroundColor: "#f0f2fd",
                width: "80%",
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

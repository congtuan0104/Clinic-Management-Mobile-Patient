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

export interface MsgType {
  message: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
}

const ChattingDetailScreen: React.FC<ChattingDetailScreenProps> = ({
  route,
}) => {
  // Lấy thông tin user
  const userInfo = useAppSelector(userInfoSelector);

  const { groupId } = route.params;
  const [msg, setMsg] = React.useState<MsgType>({
    message: "",
    senderId: userInfo?.id ? userInfo?.id : "tempId",
    senderName: userInfo?.email ? userInfo?.id : "unknown",
    timestamp: new Date(),
  });
  const [msgList, setMsgList] = React.useState<MsgType[]>([
    // {
    //   message: "dffsdfs",
    //   senderId: "dfjdfdfadsf",
    //   senderName: "xfdfsdsdf",
    //   timestamp: new Date("2022-03-25"),
    // },
  ]);

  // Thiết lập firebase
  let path = groupId;
  // Tạo tham chiếu đến groupId
  // const reference = firebase
  //   .app()
  //   .database(
  //     "https://clinus-8d987-default-rtdb.asia-southeast1.firebasedatabase.app/"
  //   )
  //   .ref("/users/123");
  // dùng useEffect để gọi dữ liệu
  // useEffect(() => {
  //   const onValueChange =
  //     reference.on("value", (snapshot) => {
  //       console.log("User data: ", snapshot.val());
  //     });

  //   // Stop listening for updates when no longer required
  //   return () => reference.off("value", onValueChange);
  // }, []);

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

  const handlePress = () => {
    if (msg !== null && msg) {
      setMsg({ ...msg, timestamp: new Date() });
      // Nếu tin nhắn tồn tại nội dung: push vào trong messageList
      const updatedList = [...msgList, msg];
      updatedList.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      setMsgList(updatedList);
      setMsg({
        ...msg,
        message: "",
      });
      console.log(msgList);
    }
  };

  return (
    <>
      {userInfo ? (
        <View style={styles.container}>
          <FlatList
            style={{ flex: 1 }}
            data={msgList}
            showsVerticalScrollIndicator={false}
            inverted
            renderItem={({ item }) => {
              return (
                <MsgComponent
                  sender={item.senderId === userInfo.id ? true : false}
                  message={item.message}
                  item={item}
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
              value={msg.message}
              onChangeText={(val) =>
                setMsg({
                  ...msg,
                  message: val,
                })
              }
            />

            <Pressable
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

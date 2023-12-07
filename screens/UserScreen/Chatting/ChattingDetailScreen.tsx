import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
} from "react-native";
import React from "react";
import { ChattingDetailScreenProps } from "./ChattingScreen";
import { StyleSheet } from "react-native";
import MsgComponent from "../../../components/MsgComponent/MsgComponent";
import { Button, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { appColor } from "../../../theme";
// const mockData = [
//   { name: "khang", content: "ff" },
//   { name: "minh", content: "ffzz" },
//   { name: "thinh", content: "ffzzzdfdf" },
// ];

const Data = [
  {
    massage: "Yes Ofcourse..",
    type: "sender",
  },
  {
    massage: "How are You ?",
    type: "sender",
  },
  {
    massage: "How Your Opinion about the one done app ?",
    type: "sender",
  },
  {
    massage:
      "Well i am not satisfied with this design plzz make design better ",
    type: "receiver",
  },
  {
    massage: "could you plz change the design...",
    type: "receiver",
  },
  {
    massage: "How are You ?",
    type: "sender",
  },
  {
    massage: "How Your Opinion about the one done app ?",
    type: "sender",
  },
  {
    massage:
      "Well i am not satisfied with this design plzz make design better ",
    type: "receiver",
  },
  {
    massage: "could you plz change the design...",
    type: "receiver",
  },
  {
    massage: "How are You ?",
    type: "sender",
  },
  {
    massage: "How Your Opinion about the one done app ?",
    type: "sender",
  },
  {
    massage: "Yes Ofcourse..",
    type: "sender",
  },
  {
    massage: "How are You ?",
    type: "sender",
  },
  {
    massage: "How Your Opinion about the one done app ?",
    type: "sender",
  },
  {
    massage:
      "Well i am not satisfied with this design plzz make design better ",
    type: "receiver",
  },
  {
    massage: "could you plz change the design...",
    type: "receiver",
  },
  {
    massage: "How are You ?",
    type: "sender",
  },
  {
    massage: "How Your Opinion about the one done app ?",
    type: "sender",
  },
  {
    massage:
      "Well i am not satisfied with this design plzz make design better ",
    type: "receiver",
  },
  {
    massage: "could you plz change the design...",
    type: "receiver",
  },
  {
    massage: "How are You ?",
    type: "sender",
  },
  {
    massage: "How Your Opinion about the one done app ?",
    type: "sender",
  },
];

const ChattingDetailScreen: React.FC<ChattingDetailScreenProps> = ({
  route,
}) => {
  const { groupId } = route.params;

  const [msg, setMsg] = React.useState("");
  const [update, setupdate] = React.useState(false);
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);
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
    console.log("Sending");
    // Add more actions or effects here when the button is pressed
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={Data}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({ item }) => {
          return (
            <MsgComponent
              sender={item.type == "sender"}
              massage={item.massage}
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
          value={msg}
          onChangeText={(val) => setMsg(val)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChattingDetailScreen;

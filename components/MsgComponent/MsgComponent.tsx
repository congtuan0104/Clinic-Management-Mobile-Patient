// import moment from 'moment';
import React, { Component } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "native-base";
import { appColor } from "../../theme";
import { Image } from "native-base";

const MsgComponent = (props: any) => {
  const { sender, message, item, sendTime } = props;
  return (
    <Pressable style={{ marginVertical: 0 }}>
      <Image
        src="https://picsum.photos/200"
        borderRadius={100}
        size={50}
        alt="ff"
        style={[styles.avatarBox, sender ? styles.right : [styles.left]]}
      />
      <View
        style={[
          styles.masBox,
          {
            alignSelf: sender ? "flex-end" : "flex-start",
            backgroundColor: sender ? appColor.primary : appColor.white,
          },
        ]}
      >
        <Text color={sender ? "#fff" : "#000"}>{message}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  masBox: {
    alignSelf: "flex-end",
    // Khoảng cách 2 bên của message box
    marginHorizontal: 45,
    minWidth: 80,
    maxWidth: "80%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 10,
  },

  avatarBox: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  left: {
    left: 7,
    bottom: 5,
  },
  right: {
    right: 7,
    bottom: 5,
  },
});

export default MsgComponent;

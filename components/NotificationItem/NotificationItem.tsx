import React from "react";
import { HStack, Image, Text, VStack } from "native-base";
import PropTypes from "prop-types";
type Props = {
  image: string;
  content: string;
  time: string;
  isRead: boolean;
};
const NotificationItem = ({ image, content, time, isRead }: Props) => {
  return (
    <HStack
      backgroundColor={isRead ? "#DFDEFF" : "secondary.100"}
      p={2}
      space={2}
      alignItems="center"
      borderRadius={10}
      justifyContent="space-evenly"
    >
      <Image
        size={60}
        borderRadius={100}
        source={{
          //   uri: "https://wallpaperaccess.com/full/317501.jpg",
          uri: image,
        }}
        alt="Alternate Text"
      />
      <VStack width="4/5" maxW="4/5">
        <Text color="#3d3d66" fontSize={14}>
          {content}
        </Text>
        <Text color="#70708c" fontSize={12}>
          {time}
        </Text>
      </VStack>
    </HStack>
  );
};
export default NotificationItem;

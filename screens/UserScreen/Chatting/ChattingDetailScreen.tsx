import { View, Text } from "react-native";
import React from "react";
import { ChattingDetailScreenProps } from "./ChattingScreen";

const mockData = [
  { name: "khang", content: "ff" },
  { name: "minh", content: "ffzz" },
  { name: "thinh", content: "ffzzzdfdf" },
];
const ChattingDetailScreen: React.FC<ChattingDetailScreenProps> = ({
  route,
}) => {
  const { groupId } = route.params;

  return (
    <View>
      <Text>Chat Detail Screen for Group ID: {groupId}</Text>
      {/* Add chat messages or other details for the group */}
    </View>
  );
};

export default ChattingDetailScreen;
